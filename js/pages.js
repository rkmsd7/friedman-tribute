const PAGES = {
  async writings() {
    const w = await loadJSON('writings');
    $('#lead').textContent = w.intro;
    $('#content').innerHTML = w.sections.map(s=>`<section><h2>${esc(s.title)}</h2><div class="list">${s.items.map(i=>`<article class="item"><div class="yr">${i.year}</div><div>
      <div class="kind">${esc(i.kind)}</div><h3>${i.link?`<a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.title)}</a>`:esc(i.title)}</h3><p>${esc(i.summary)}</p>
      ${i.baws?`<div class="meta">Writings and Speeches, ${esc(i.baws)}</div>`:''}</div></article>`).join('')}</div></section>`).join('')
      + `<section><h2>Where to read him</h2><ul>${w.resources.map(r=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a></li>`).join('')}</ul></section>`;
  },
  async speeches() {
    const s = await loadJSON('speeches');
    $('#lead').textContent = s.intro;
    $('#content').innerHTML = `<div class="list">${s.items.map(i=>`<article class="item"><div class="yr">${i.date.slice(0,4)}</div><div>
      <div class="kind">${esc(fmtDate(i.date))} · ${esc(i.venue)}</div><h3>${esc(i.title)}</h3>
      <blockquote class="sp">“${esc(i.quote)}”</blockquote><p>${esc(i.context)}</p>
      <div class="meta">Source: ${i.link?`<a href="${esc(i.link)}" target="_blank" rel="noopener">${esc(i.source)}</a>`:esc(i.source)}</div></div></article>`).join('')}</div>`;
  },
  async gallery() {
    const imgs = await loadJSON('images');
    const eras = (await loadJSON('timeline')).eras;
    const f = $('#filters'); f.innerHTML = `<button class="chip active" data-era="all">All</button>` + eras.map(e=>`<button class="chip" data-era="${e.id}">${esc(e.title)}</button>`).join('');
    const draw = era => { $('#content').innerHTML = `<div class="gallery">${imgs.filter(i=>era==='all'||i.era===era).map(i=>`<figure data-id="${i.id}"><img src="${esc(i.src)}" alt="${esc(i.alt||i.caption)}" decoding="async" width="${i.w||''}" height="${i.h||''}"><figcaption>${esc(i.caption)}${i.date?` <span class="muted">(${esc(i.date)})</span>`:''}<span class="cred">${esc(i.author||'Unknown')} · ${esc(i.license)} · <a href="${esc(i.source)}" target="_blank" rel="noopener">Commons</a></span></figcaption></figure>`).join('')}</div>`; };
    draw('all');
    f.onclick = e => { const b=e.target.closest('.chip'); if(!b) return; $$('.chip',f).forEach(c=>c.classList.toggle('active',c===b)); draw(b.dataset.era); };
    const lb = document.createElement('div'); lb.className='lightbox'; lb.innerHTML='<button aria-label="Close">✕</button><img alt=""><p></p>'; document.body.appendChild(lb);
    $('#content').addEventListener('click', e => { const fig=e.target.closest('figure'); if(!fig) return; const i=imgs.find(x=>x.id===fig.dataset.id); $('img',lb).src=i.full||i.src; $('img',lb).alt=i.alt||i.caption; $('p',lb).textContent=`${i.caption} — ${i.author||''} · ${i.license}`; lb.classList.add('open'); });
    lb.onclick = () => lb.classList.remove('open'); document.addEventListener('keydown', e=>{ if(e.key==='Escape') lb.classList.remove('open'); });
  },
  async videos() {
    const v = await loadJSON('videos');
    $('#content').innerHTML = `<div class="videos">${v.map(x=>`<article class="video"><div class="frame"><button aria-label="Play ${esc(x.title)}" data-yt="${esc(x.youtube)}" style="background-image:url(https://i.ytimg.com/vi/${esc(x.youtube)}/hqdefault.jpg)"></button></div>
      <div class="body"><h3>${esc(x.title)}</h3><p>${esc(x.channel)}${x.note?` · ${esc(x.note)}`:''}</p></div></article>`).join('')}</div>`;
    $('#content').addEventListener('click', e => { const b=e.target.closest('button[data-yt]'); if(!b) return; b.parentElement.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; });
  },
  async appearances() {
    const a = await loadJSON('appearances');
    $('#lead').textContent = a.intro;
    $('#content').innerHTML = `<div class="card" style="padding:4px 12px"><table><thead><tr><th>Date</th><th>Event</th><th>Place</th><th>Role</th></tr></thead><tbody>${a.items.map(i=>`<tr><td class="d">${esc(fmtDate(i.date))}</td><td>${esc(i.title)}</td><td>${esc(i.place)}</td><td class="muted">${esc(i.role)}</td></tr>`).join('')}</tbody></table></div>`;
  },
  async ideas() {
    const d = await loadJSON('ideas');
    $('#lead').textContent = d.intro;
    $('#content').innerHTML = `<ol class="ideas">${d.ideas.map(i=>`<li><div class="kind">${esc(i.year)} · ${esc(i.where)}</div><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p><div class="status">${esc(i.status)}</div></li>`).join('')}</ol>`;
  }
};
(async () => { await renderChrome(); await PAGES[$('main').dataset.page](); })();
