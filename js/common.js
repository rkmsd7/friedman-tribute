const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function fmtDate(iso, {yearOnly=false}={}) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (yearOnly || !m) return String(y);
  if (!d || iso.endsWith('-01-01') && yearOnly) return `${MONTHS[m-1]} ${y}`;
  return `${d} ${MONTHS[m-1]} ${y}`;
}
async function loadJSON(name) { const r = await fetch(`/data/${name}.json`); if (!r.ok) throw new Error(name); return r.json(); }
const CHAKRA = `<svg class="chakra" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="20" y="26" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="16" fill="currentColor">MF</text></svg>`;
async function renderChrome() {
  const site = await loadJSON('site');
  document.title = ($('main')?.dataset.title ? `${$('main').dataset.title} · ` : '') + site.title;
  const path = location.pathname.replace(/\.html$/, '').replace(/\/index$/, '/') || '/';
  $('#site-header').innerHTML = `<div class="wrap">
    <a class="brand" href="/">${CHAKRA}<span>${esc(site.name)}</span></a>
    <button class="navtoggle" aria-label="Menu" aria-expanded="false">☰</button>
    <nav class="main" aria-label="Main">${site.nav.map(n=>`<a href="${n.href}" ${n.href===path?'class="active" aria-current="page"':''}>${esc(n.label)}</a>`).join('')}
      <button class="themebtn" title="Toggle theme" aria-label="Toggle dark mode">◐</button></nav></div>`;
  $('#site-footer').innerHTML = `<div class="wrap">
    <div><strong class="serif" style="color:var(--ink)">Milton Friedman</strong><br>${esc(site.dates)}<br><br>${esc(site.occasion)}</div>
    <div>Text on this site is released under CC BY-SA 4.0. Photographs are from Wikimedia Commons and carry their own licences, shown with each image. Videos are embedded from their publishers' YouTube channels and remain their copyright. Chronology follows the Nobel Foundation biographical note, the Hoover Institution's Collected Works of Milton Friedman, Milton and Rose Friedman's <em>Two Lucky People</em> (1998) and Jennifer Burns's <em>Milton Friedman: The Last Conservative</em> (2023).<br><br><a href="https://github.com/rkmsd7/friedman-tribute">Source on GitHub</a></div></div>`;
  $('.navtoggle').onclick = e => { const n=$('nav.main'); n.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', n.classList.contains('open')); };
  $('.themebtn').onclick = () => { const r=document.documentElement; const dark = r.dataset.theme ? r.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches; r.dataset.theme = dark?'light':'dark'; try{localStorage.setItem('theme', r.dataset.theme)}catch{} };
  return site;
}
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch {}
function imageFigure(img, {small=false}={}) {
  if (!img) return '';
  return `<figure><img src="${esc(img.src)}" alt="${esc(img.alt||img.caption)}" decoding="async"><figcaption>${esc(img.caption)}${small?'':` <span class="cred">${esc(img.author||'')} · ${esc(img.license)}</span>`}</figcaption></figure>`;
}
