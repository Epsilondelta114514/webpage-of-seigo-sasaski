/* No dependencies. Native anchors preserve Tab, Enter, and modifier-click behavior. */
(() => {
  const input = document.querySelector('#search');
  const form = document.querySelector('#link-search');
  const groups = document.querySelector('#link-groups');
  const count = document.querySelector('#result-count');
  const status = document.querySelector('#selection-status');
  const clearButton = document.querySelector('#clear-search');
  const webButton = document.querySelector('#web-search');
  let selectable = [];
  let selectedIndex = 0;
  let resultSummary = '';

  // NFKC also lets full-width Latin characters match normal service names.
  const normalize = value => String(value ?? '').normalize('NFKC').toLocaleLowerCase().trim();
  const data = Array.isArray(window.START_LINKS) ? window.START_LINKS : [];

  function safeURL(value) {
    if (!value || !String(value).trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function select(index, scroll = false) {
    selectedIndex = index;
    selectable.forEach((link, i) => link.classList.toggle('is-selected', i === index));
    const selected = selectable[index];
    status.textContent = selected
      ? `${resultSummary}。選択中：${selected.dataset.name}。${index + 1} / ${selectable.length}。検索欄でEnterを押すと開きます。`
      : `${resultSummary}。開けるリンクがありません。`;
    if (scroll && selected) selected.scrollIntoView({ block: 'nearest' });
  }

  function render() {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    const fragment = document.createDocumentFragment();
    selectable = [];
    let pendingCount = 0;
    let matchCount = 0;

    data.forEach((group, groupIndex) => {
      const matches = group.links.filter(link => {
        const haystack = normalize([group.name, link.name, link.description, ...(link.keywords || [])].join(' '));
        return terms.every(term => haystack.includes(term));
      });
      if (terms.length && !matches.length) return;
      const section = element('section', 'link-group');
      const heading = element('h2', '', group.name);
      heading.id = `group-${groupIndex}`;
      section.setAttribute('aria-labelledby', heading.id);
      const available = matches.filter(link => safeURL(link.url));
      heading.append(element('span', '', String(available.length).padStart(2, '0')));
      section.append(heading);
      const list = element('ul');

      matches.forEach(link => {
        matchCount++;
        const item = element('li');
        const href = safeURL(link.url);
        if (href) {
          const anchor = element('a', 'launch-link');
          anchor.href = href;
          anchor.dataset.name = link.name;
          const label = element('span');
          label.append(element('span', 'link-name', link.name));
          if (link.description) label.append(element('span', 'link-description', link.description));
          const arrow = element('span', 'launch-arrow', '↗');
          arrow.setAttribute('aria-hidden', 'true');
          anchor.append(label, arrow);
          const index = selectable.length;
          anchor.addEventListener('focus', () => select(index));
          selectable.push(anchor);
          item.append(anchor);
        } else {
          pendingCount++;
          item.className = 'pending-link';
          item.append(element('span', '', link.name), element('span', '', '未設定'));
        }
        list.append(item);
      });
      section.append(list);
      if (!matches.length) section.append(element('p', 'group-empty', 'リンクはまだ登録されていません。'));
      fragment.append(section);
    });

    groups.replaceChildren(fragment);
    const noResults = terms.length > 0 && matchCount === 0;
    document.querySelector('#no-results').hidden = !noResults;
    groups.hidden = noResults;
    resultSummary = `${selectable.length}件のリンク${pendingCount ? ` · ${pendingCount}件未設定` : ''}`;
    count.textContent = resultSummary;
    clearButton.hidden = input.value.length === 0;
    webButton.disabled = !input.value.trim();
    select(0);
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', event => {
    // Safari can emit keyCode 229 on the Enter used to confirm Japanese input.
    if (event.isComposing || event.keyCode === 229) return;
    if (['ArrowDown', 'ArrowUp'].includes(event.key) && selectable.length) {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      select((selectedIndex + step + selectable.length) % selectable.length, true);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      input.value = '';
      render();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectable[selectedIndex]?.click();
    }
  });
  // Never implicitly run a web search, including when there are no matches.
  form.addEventListener('submit', event => event.preventDefault());
  clearButton.addEventListener('click', () => {
    input.value = '';
    render();
    input.focus();
  });
  webButton.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) window.location.assign(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  });
  document.addEventListener('keydown', event => {
    const editing = event.target.closest('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !editing && !event.isComposing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      input.focus();
    }
  });

  render();
  // Desktop: ready to type immediately. Touch devices: avoid opening the keyboard on arrival.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) input.focus({ preventScroll: true });
})();
