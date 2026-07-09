import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto('http://localhost:3000/#gallery', { waitUntil: 'networkidle' });
await page.waitForSelector('#gallery');

const desktop = await page.evaluate(() => {
  const section = document.querySelector('#gallery');
  section?.scrollIntoView({ block: 'center' });

  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      sel,
      rect: { w: r.width, h: r.height, x: r.x, y: r.y },
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      display: cs.display,
      position: cs.position,
      transform: cs.transform,
      animationName: cs.animationName,
      animationPlayState: cs.animationPlayState,
      width: cs.width,
      minWidth: cs.minWidth,
      flex: cs.flex,
      aspectRatio: cs.aspectRatio,
    };
  };

  const card = document.querySelector('.gallery-card');
  const cardImg = card?.querySelector('img');
  const cardSpan = card?.querySelector('span');
  const cardFig = card;

  const imgInfo = cardImg ? (() => {
    const r = cardImg.getBoundingClientRect();
    const cs = getComputedStyle(cardImg);
    return {
      rect: { w: r.width, h: r.height },
      objectFit: cs.objectFit,
      position: cs.position,
      width: cs.width,
      height: cs.height,
      maxWidth: cs.maxWidth,
      display: cs.display,
    };
  })() : null;

  const spanInfo = cardSpan ? (() => {
    const r = cardSpan.getBoundingClientRect();
    const cs = getComputedStyle(cardSpan);
    return {
      rect: { w: r.width, h: r.height },
      position: cs.position,
      inset: `${cs.top} ${cs.right} ${cs.bottom} ${cs.left}`,
      display: cs.display,
    };
  })() : null;

  return {
    docScrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    siteShellOverflowX: getComputedStyle(document.querySelector('.site-shell')).overflowX,
    gallery: {
      shell: pick('.gallery-shell'),
      viewport: pick('.gallery-viewport'),
      track: pick('.gallery-track'),
      card: pick('.gallery-card'),
      cardCount: document.querySelectorAll('.gallery-card').length,
      img: imgInfo,
      span: spanInfo,
    },
    sectionRect: section?.getBoundingClientRect(),
    container: pick('#gallery .services-container'),
  };
});

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/#gallery', { waitUntil: 'networkidle' });
await page.waitForSelector('#gallery');

const mobile = await page.evaluate(() => {
  const section = document.querySelector('#gallery');
  section?.scrollIntoView({ block: 'center' });

  const card = document.querySelector('.gallery-card');
  const cardImg = card?.querySelector('img');
  const track = document.querySelector('.gallery-track');

  return {
    docScrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    cardRect: card?.getBoundingClientRect(),
    imgRect: cardImg?.getBoundingClientRect(),
    trackRect: track?.getBoundingClientRect(),
    cardFlexBasis: card ? getComputedStyle(card).flexBasis : null,
    cardHeight: card ? getComputedStyle(card).height : null,
    imgHeight: cardImg ? getComputedStyle(cardImg).height : null,
    imgWidth: cardImg ? getComputedStyle(cardImg).width : null,
    imgObjectFit: cardImg ? getComputedStyle(cardImg).objectFit : null,
  };
});

await page.screenshot({ path: '/Users/bensmyth1/Documents/GitHub/843ShineAdminWebsite/.gallery-desktop.png', fullPage: false });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/#gallery', { waitUntil: 'networkidle' });
await page.waitForSelector('#gallery');
await page.screenshot({ path: '/Users/bensmyth1/Documents/GitHub/843ShineAdminWebsite/.gallery-mobile.png', fullPage: false });

console.log(JSON.stringify({ desktop, mobile }, null, 2));
await browser.close();