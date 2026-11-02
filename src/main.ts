import './style.css';
import { church } from './church';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const externalArrow = '<svg class="external-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const sprout = '<svg viewBox="0 0 48 56" fill="none" aria-hidden="true"><path d="M24 49V9m0 25C5 35 6 15 6 15s18-1 18 19Zm0 10c19 1 18-19 18-19S24 24 24 44Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const book = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 13c-5-4-12-5-19-3v27c7-2 14-1 19 3 5-4 12-5 19-3V10c-7-2-14-1-19 3Zm0 0v27M11 17c3-.3 5 .3 7 1m-7 6c3-.3 5 .3 7 1m12-7c2-.7 4-1.3 7-1m-7 8c2-.7 4-1.3 7-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const people = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="15" r="6" stroke="currentColor" stroke-width="1.6"/><path d="M13 39v-4a11 11 0 0 1 22 0v4M9 13a5 5 0 0 0 0 10M39 13a5 5 0 0 1 0 10M4 37v-4a8 8 0 0 1 7-8m33 12v-4a8 8 0 0 0-7-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#" aria-label="The Grove Baptist Church home">
        <span class="brand-mark">${sprout}</span>
        <span class="brand-name">THE GROVE<span>BAPTIST CHURCH</span></span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false"><span></span><span></span></button>
      <nav id="navigation" aria-label="Main navigation">
        <a href="#about">Our heart</a>
        <a href="#watch">Watch online</a>
        <a href="#visit">Visit us</a>
        <a class="button button-small" href="#visit">Plan your visit ${arrow}</a>
      </nav>
    </div>
  </header>
  <main id="main">
    <section class="hero container" aria-labelledby="hero-heading">
      <div class="hero-copy">
        <div class="eyebrow"><span class="small-line"></span> ROOTED IN FAITH. GROWING IN LOVE.</div>
        <h1 id="hero-heading">A place to belong.<br>A faith to <em>grow.</em></h1>
        <p class="hero-description">There’s room for you here. Discover a community centered on Jesus, grounded in His Word, and growing together in love.</p>
        <div class="hero-actions"><a class="button" href="#visit">Come as you are ${arrow}</a><a class="text-link" href="https://www.facebook.com/ingrovechurch">Watch online ${externalArrow}</a></div>
        <div class="hero-note"><span class="note-sun" aria-hidden="true">✳</span><span id="hero-service-times">A new beginning. A deeper connection.<br><strong>A place to call your church home.</strong></span></div>
      </div>
      <div class="hero-art">
        <div class="art-frame"><img src="/grove-landscape.svg" alt="An illustration of a white church nestled among green trees and rolling hills in the warm sunlight" width="1200" height="1050" fetchpriority="high"><div class="art-caption"><span class="caption-dot"></span> FAITH. FAMILY. COMMUNITY.</div></div>
        <div class="verse-tag"><span class="tiny-leaf">${sprout}</span><span>“I am the vine,<br>you are the branches.”<small>JOHN 15:5</small></span></div>
        <span class="art-coordinate">A LITTLE FAITH. DEEP ROOTS.</span>
      </div>
    </section>
    <section class="welcome-band" aria-label="Welcome"><div class="container welcome-inner"><p>Different stories. <em>One family.</em></p><span>Wherever you are in your walk with God,<br>you’re welcome to take your next step with us.</span><span class="welcome-flower" aria-hidden="true">✳</span></div></section>
    <section id="about" class="section container about-section" aria-labelledby="about-heading">
      <div class="section-intro"><div><p class="eyebrow">THE HEART OF THE GROVE</p><h2 id="about-heading">Deep roots.<br><em>Open hearts.</em></h2></div><p>Church is more than a place we go. It’s a people we become. At The Grove, our heart is to know Jesus, make Him known, and live out His love in the everyday.</p></div>
      <div class="values-grid">
        <article class="value-card"><div class="card-top"><span class="value-icon">${book}</span><span class="card-number">01</span></div><h3>Rooted in the Word</h3><p>We turn to the Bible for truth, hope, and wisdom that shapes the way we live.</p><span class="card-label">A FAITH WITH A FOUNDATION</span></article>
        <article class="value-card"><div class="card-top"><span class="value-icon">${people}</span><span class="card-number">02</span></div><h3>Growing together</h3><p>Faith grows in community. We’re here to encourage one another and walk through life together.</p><span class="card-label">LIFE IS BETTER TOGETHER</span></article>
        <article class="value-card"><div class="card-top"><span class="value-icon">${sprout}</span><span class="card-number">03</span></div><h3>Living out His love</h3><p>We believe small acts of kindness can reflect a great love. It starts with loving our neighbors.</p><span class="card-label">LOVE THAT REACHES OUT</span></article>
      </div>
    </section>
    <section id="life" class="life-section" aria-labelledby="life-heading"><div class="container life-inner">
      <div class="life-quote"><span class="quote-decoration" aria-hidden="true">“</span><blockquote>Let all that you do<br>be done in <em>love.</em></blockquote><p>1 CORINTHIANS 16:14</p><span class="quote-branch" aria-hidden="true">${sprout}</span></div>
      <div class="life-copy"><p class="eyebrow">LIFE AT THE GROVE</p><h2 id="life-heading">Find connection.<br><em>Grow with purpose.</em></h2><p>A Sunday gathering is a beginning. Following Jesus is a way of life, built through worship, meaningful relationships, and everyday opportunities to serve.</p><div class="life-list"><div><span>01</span><p><strong>Worship together</strong>Make room to pause, pray, and turn your heart toward God.</p></div><div><span>02</span><p><strong>Walk alongside one another</strong>Share your questions, your joys, and the moments in between.</p></div><div><span>03</span><p><strong>Make a difference</strong>Carry the love of Jesus into your home and your community.</p></div></div><a class="text-link" href="#visit">There’s a place for you here ${arrow}</a></div>
    </div></section>
    <section id="watch" class="container watch-section" aria-labelledby="watch-heading"><div><p class="eyebrow">A CONNECTION BEYOND SUNDAY</p><h2 id="watch-heading">Worship with us,<br><em>wherever you are.</em></h2><p>Whether you’re getting to know The Grove or joining us from home, there’s a way to stay connected.</p><span class="watch-time">SUNDAY WORSHIP · 10:30 AM EASTERN</span></div><div class="watch-links"><a class="watch-link" href="https://www.facebook.com/ingrovechurch"><span class="play-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 11 7-11 7V5Z" fill="currentColor"/></svg></span><span><strong>Watch our services</strong><small>Watch with us on Facebook</small></span>${externalArrow}</a><a class="watch-link" href="https://www.facebook.com/ingrovechurch"><span class="facebook-icon" aria-hidden="true">f</span><span><strong>Find us on Facebook</strong><small>Services, updates & community</small></span>${externalArrow}</a></div></section>
    <section id="visit" class="section container visit-section" aria-labelledby="visit-heading">
      <div class="visit-copy"><p class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2 id="visit-heading">We’d love to<br><em>meet you.</em></h2><p>New to church? Coming back after a while? Simply curious? You don’t have to have it all figured out to take the first step.</p><button class="button" type="button" data-open-guide>A little help for your first visit ${arrow}</button></div>
      <div class="visit-details"><div class="visit-detail"><span class="detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg></span><div><h3>Gather with us</h3><p id="service-times">Service times will be shared here once confirmed.</p></div></div><div class="visit-detail"><span class="detail-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><div><h3>Find The Grove</h3><p id="church-address">Our location details are being confirmed. Please check back before making a trip.</p><a id="directions-link" class="text-link" hidden>Get directions ${arrow}</a></div></div><div class="visit-detail contact-detail" hidden><span class="detail-icon" aria-hidden="true">${people}</span><div><h3>Say hello</h3><div id="contact-links"></div></div></div><div class="visit-footnote"><span class="caption-dot"></span><p>A warm welcome starts with good information.<br>Visit details will be updated here as they’re confirmed.</p></div></div>
    </section>
    <section class="faq-section container" aria-labelledby="faq-heading"><div><p class="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p><h2 id="faq-heading">You’re not the only<br>one with <em>questions.</em></h2></div><div class="faq-list"><details><summary>Do I need to know much about the Bible?<span aria-hidden="true">+</span></summary><p>No. Whether you’re opening a Bible for the first time or have been reading for years, there’s always room to learn and grow.</p></details><details><summary>Can I come if I’m exploring faith?<span aria-hidden="true">+</span></summary><p>Yes. Bring your curiosity and your questions. You don’t need to have everything figured out to begin exploring who Jesus is.</p></details><details><summary>How can I plan a visit?<span aria-hidden="true">+</span></summary><p>Check the visit section above for confirmed service times and location details. Please wait for those details before making a trip.</p></details></div></section>
    <section class="closing-banner"><div class="container"><span aria-hidden="true">${sprout}</span><p>Put down roots.<br><em>See what grows.</em></p><a class="button button-light" href="#visit">Find your place at The Grove ${arrow}</a></div></section>
  </main>
  <footer class="site-footer container"><a class="brand" href="#" aria-label="The Grove Baptist Church home"><span class="brand-mark">${sprout}</span><span class="brand-name">THE GROVE<span>BAPTIST CHURCH</span></span></a><p>Rooted in faith. Growing in love.</p><span>© ${new Date().getFullYear()} The Grove Baptist Church</span></footer>
  <dialog class="visit-dialog" aria-labelledby="guide-heading"><div class="dialog-inner"><button class="dialog-close" type="button" aria-label="Close visit guide">×</button><span class="guide-sprout" aria-hidden="true">${sprout}</span><p class="eyebrow">A SIMPLE FIRST STEP</p><h2 id="guide-heading">Your first visit,<br><em>a little easier.</em></h2><p>You’re welcome to explore faith with us, just as you are.</p><ol><li><strong>Check the details.</strong><span id="guide-details">Service times and our location are still being confirmed. Please check this site again before you travel.</span></li><li><strong>Bring your questions.</strong><span>You don’t need to know all the answers to start a conversation about faith.</span></li><li><strong>Take it at your pace.</strong><span>Getting connected is a journey. Start by getting to know the heart of The Grove.</span></li></ol><button class="button guide-done" type="button">Back to the website ${arrow}</button></div></dialog>
`;

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 841px)').addEventListener('change', closeMenu);

const dialog = document.querySelector<HTMLDialogElement>('.visit-dialog')!;
document.querySelector('[data-open-guide]')!.addEventListener('click', () => dialog.showModal());
document.querySelectorAll('.dialog-close, .guide-done').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => document.querySelector<HTMLButtonElement>('[data-open-guide]')!.focus({ preventScroll: true }));
dialog.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]'))
    .filter((control) => control.getClientRects().length > 0 && !control.hasAttribute('disabled'));
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
});

if (church.serviceTimes) {
  document.querySelector('#service-times')!.textContent = church.serviceTimes;
  document.querySelector('#hero-service-times')!.textContent = church.serviceTimes;
}
if (church.address) document.querySelector('#church-address')!.textContent = church.address;
if (church.mapsUrl && /^https:\/\//.test(church.mapsUrl)) {
  const link = document.querySelector<HTMLAnchorElement>('#directions-link')!;
  link.href = church.mapsUrl;
  link.hidden = false;
}
if (church.serviceTimes && church.address) {
  document.querySelector('#guide-details')!.textContent = `${church.serviceTimes}\n${church.address}`;
  document.querySelector<HTMLElement>('.visit-footnote')!.hidden = true;
  document.querySelector('.faq-list details:last-child p')!.textContent = `Join us on Sunday: ${church.serviceTimes.replace(/\n/g, '; ')}. You’ll find us at ${church.address.replace(/\n/g, ', ')}. Have a question before you come? Use the contact information above to get in touch.`;
}
if (church.email || church.phone) {
  document.querySelector<HTMLElement>('.contact-detail')!.hidden = false;
  const contactLinks = document.querySelector('#contact-links')!;
  for (const [value, protocol] of [[church.email, 'mailto:'], [church.phone, 'tel:']]) {
    if (value) {
      const link = document.createElement('a');
      link.textContent = value;
      link.href = protocol + (protocol === 'tel:' ? value.replace(/[^+\d]/g, '') : value);
      contactLinks.append(link);
    }
  }
}
