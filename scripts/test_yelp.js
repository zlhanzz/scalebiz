const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testYelpDirect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const names = ["Trendy Nail Spa", "Sandy's Barber Stylist", "Cousin's Cafe", "Dee's Sugar Shack"];

  for (const n of names) {
    console.log(`\n=== Yelp Search: ${n} ===`);
    const url = `https://www.yelp.com/search?find_desc=${encodeURIComponent(n)}&find_loc=Lockport%2C+NY`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const results = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('div[data-testid="serp-ia-card"], li.y-css-1iyddjv').forEach(el => {
          const a = el.querySelector('a[href*="/biz/"]');
          const title = a ? a.innerText : '';
          if (a && title && !title.includes('Yelp') && !items.some(i => i.href === a.href)) {
            items.push({
              title,
              href: a.href.split('?')[0]
            });
          }
        });
        return items;
      });
      console.log(`Found ${results.length} on Yelp:`);
      results.slice(0, 3).forEach(r => console.log(' ->', r.title, '|', r.href));
    } catch(e) {
      console.log('Error:', e.message);
    }
  }

  await browser.close();
}

testYelpDirect();
