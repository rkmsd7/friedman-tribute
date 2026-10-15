(async () => {
  const site = await renderChrome();
  const [tl, images, quotes] = await Promise.all([loadJSON('timeline'), loadJSON('images'), loadJSON('quotes')]);
  const byId = Object.fromEntries(images.map(i=>[i.id,i]));
  const hero = images.find(i=>i.hero) || images[0];
  $('#hero').innerHTML = `<div class="wrap grid"><div>
      <div class="eyebrow">1912 – 2006</div><h1>${esc(site.title.split('·')[0].trim())}</h1>
      <div class="dates">${esc(site.dates)}</div><p class="tagline">${esc(site.tagline)}</p>
      <div class="occasion">${esc(site.occasion)}</div>
      <div class="stats">${site.stats.map(s=>`<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div></div>
    <div class="portrait"><img src="${esc(hero.src)}" alt="${esc(hero.alt||hero.caption)}" fetchpriority="high"></div></div>`;
  $('#eras').innerHTML = tl.eras.map(e=>`<a class="era" href="#${e.id}"><div class="years">${esc(e.years)}</div><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p></a>`).join('');
  const filters = $('#filters');
  filters.innerHTML = `<button class="chip active" data-era="all">All</button>` + tl.eras.map(e=>`<button class="chip" data-era="${e.id}">${esc(e.title)}</button>`).join('');
  const events = [...tl.events].sort((a,b)=>a.date.localeCompare(b.date));
  // attach images to events: explicit media, else first era image not yet used
  const used = new Set([hero.id]);
  events.forEach(ev => {
    if (ev.media && byId[ev.media]) { ev._img = byId[ev.media]; used.add(ev.media); return; }
    const m = images.find(i => !used.has(i.id) && i.event===ev.id);
    if (m) { ev._img = m; used.add(m.id); }
  });
  let qi = 0;
  function render(era) {
    let html = '';
    tl.eras.filter(e=>era==='all'||e.id===era).forEach(e => {
      html += `<div class="era-marker" id="${e.id}"><div class="eyebrow">${esc(e.years)}</div><h2>${esc(e.title)}</h2><p>${esc(e.summary)}</p></div>`;
      events.filter(ev=>ev.era===e.id).forEach((ev,i) => {
        html += `<article class="event ${ev._img?'has-img':''}" id="${ev.id}"><div>
          <div class="date">${esc(fmtDate(ev.date))}</div><h3>${esc(ev.title)}</h3><div class="place">${esc(ev.place||'')}</div>
          <p>${esc(ev.text)}</p><div class="tags">${(ev.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div>
          ${ev._img?imageFigure(ev._img):''}</article>`;
      });
      const q = quotes[qi++ % quotes.length];
      html += `<div class="quote"><p>“${esc(q.text)}”</p><cite>${esc(q.source)}</cite></div>`;
    });
    $('#timeline').innerHTML = html;
  }
  render('all');
  filters.onclick = e => { const b=e.target.closest('.chip'); if(!b) return; $$('.chip',filters).forEach(c=>c.classList.toggle('active',c===b)); render(b.dataset.era); };
  if (location.hash) setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView(),100);
})();
