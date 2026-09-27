const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testGoogleOsint() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const targets = [
    "Wishful Inking Tattoos & Piercing Buffalo NY",
    "Total Fence of WNY Inc Buffalo NY",
    "Romeo's Superior Home Improvement Buffalo NY",
    "House of Masters Grooming Lounge Buffalo NY"
  ];

  for (const t of targets) {
    console.log(`\n=== Testing Google Search: ${t} ===`);
    const url = `https://www.google.com/search?q=${encodeURIComponent(t)}&hl=en&gl=us`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });

    const data = await page.evaluate(() => {
      const results = [];
      const links = document.querySelectorAll('a[href]');
      links.forEach(a => {
        let href = a.href;
        if (href.includes('/url?q=')) {
          const match = href.match(/\/url\?q=([^&]+)/);
          if (match) href = decodeURIComponent(match[1]);
        }
        results.push({ href, text: a.innerText });
      });
      const body = document.body.innerText;
      return { links: results, body };
    });

    let fb = null;
    let ig = null;
    let yelp = null;

    data.links.forEach(l => {
      const h = l.href;
      if (h.includes('facebook.com') && !fb && !h.includes('/search') && !h.includes('/login') && !h.includes('/share')) {
        fb = h.split('?')[0];
      }
      if (h.includes('instagram.com') && !ig && !h.includes('/explore') && !h.includes('/p/')) {
        ig = h.split('?')[0];
      }
      if (h.includes('yelp.com/biz') && !yelp) {
        yelp = h.split('?')[0];
      }
    });

    const emailMatch = data.body.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    console.log('📌 FB  :', fb || '-');
    console.log('📌 IG  :', ig || '-');
    console.log('📌 Yelp:', yelp || '-');
    console.log('📌 Mail:', emailMatch ? emailMatch[0] : '-');

    await new Promise(r => setTimeout(r, 1200));
  }

  await browser.close();
}

testGoogleOsint();
