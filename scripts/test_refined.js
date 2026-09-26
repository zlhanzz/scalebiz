const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSimpleQuery() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => { Object.defineProperty(navigator, 'webdriver', { get: () => undefined }); });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const testNames = ["Cousin's Cafe", 'Lockport Seafood Shack', "Dee's Sugar Shack", "DiPaolo's Barber Shop"];

  for (const name of testNames) {
    const q = `${name} Lockport NY`;
    console.log(`\n=== Testing: ${q} ===`);
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en&gl=us`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    
    const items = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('h3').forEach(h => {
        const a = h.closest('a');
        const container = h.closest('div.g') || h.parentElement;
        const text = container ? container.innerText : '';
        if (a) {
          results.push({
            title: h.innerText,
            href: a.href,
            textSnippet: text.replace(/\s+/g, ' ').slice(0, 180)
          });
        }
      });
      return results;
    });

    console.log(`Found ${items.length} items`);
    items.slice(0, 4).forEach((item, idx) => {
      console.log(`[${idx+1}] ${item.title}`);
      console.log(`    Snippet: ${item.textSnippet}`);
    });

    await new Promise(r => setTimeout(r, 1200));
  }

  await browser.close();
}

testSimpleQuery();
