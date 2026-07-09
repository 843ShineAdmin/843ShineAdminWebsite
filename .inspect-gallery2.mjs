import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForSelector('.gallery-track');
await page.locator('#gallery').scrollIntoViewIfNeeded();

const data = await page.evaluate(() => {
  const track = document.querySelector('.gallery-track');
  const viewport = document.querySelector('.gallery-viewport');
  const cards = [...document.querySelectorAll('.gallery-card')];

  const trackRules = [...document.styleSheets].flatMap((sheet) => {
    try {
      return [...sheet.cssRules];
    } catch {
      return [];
    }
  }).filter((r) => r.selectorText && r.selectorText.includes('gallery-track'));

  return {
    track: {
      offsetWidth: track?.offsetWidth,
      scrollWidth: track?.scrollWidth,
      clientWidth: track?.clientWidth,
      childElementCount: track?.childElementCount,
      computedWidth: track ? getComputedStyle(track).width : null,
      computedMaxWidth: track ? getComputedStyle(track).maxWidth : null,
      computedMinWidth: track ? getComputedStyle(track).minWidth : null,
      computedDisplay: track ? getComputedStyle(track).display : null,
      inlineStyle: track?.getAttribute('style'),
      className: track?.className,
    },
    viewport: {
      offsetWidth: viewport?.offsetWidth,
      scrollWidth: viewport?.scrollWidth,
      clientWidth: viewport?.clientWidth,
    },
    cards: cards.map((c, i) => ({
      i,
      offsetLeft: c.offsetLeft,
      offsetWidth: c.offsetWidth,
      rect: c.getBoundingClientRect(),
    })),
    cssRulesForTrack: trackRules.map((r) => ({ sel: r.selectorText, cssText: r.style.cssText })),
    imagesLoaded: cards.map((c) => {
      const img = c.querySelector('img');
      return {
        complete: img?.complete,
        naturalWidth: img?.naturalWidth,
        naturalHeight: img?.naturalHeight,
        currentSrc: img?.currentSrc,
      };
    }),
  };
});

// Pause animation to inspect static layout
await page.addStyleTag({ content: '.gallery-track { animation: none !important; transform: none !important; }' });
const paused = await page.evaluate(() => {
  const track = document.querySelector('.gallery-track');
  return {
    offsetWidth: track?.offsetWidth,
    scrollWidth: track?.scrollWidth,
    computedWidth: track ? getComputedStyle(track).width : null,
    cards: [...document.querySelectorAll('.gallery-card')].map((c) => c.offsetLeft),
  };
});

console.log(JSON.stringify({ animated: data, paused }, null, 2));
await browser.close();