const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function decodeBingUrl(url) {
  try {
    const match = url.match(/[?&]u=a1([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      let b64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      return Buffer.from(b64, 'base64').toString('utf8');
    }
  } catch (e) {}
  return url;
}

async function testSocialDork() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const testCases = [
    "Sandy's Barber Stylist For Men",
    "Trendy Nail Spa",
    "DiPaolo's Barber Shop",
    "Cousin's Cafe",
    "Dee's Sugar Shack"
  ];

  for (const biz of testCases) {
    console.log(`\n=== Testing for: ${biz} ===`);
    // Query Bing for social profiles
    const query = `"${biz}" Lockport NY (facebook OR instagram OR yelp OR linkedin)`;
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}&setmkt=en-US&setlang=en-US`;
    
    await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const results = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('#b_results .b_algo').forEach(el => {
        const a = el.querySelector('h2 a');
        const p = el.querySelector('.b_caption p, .b_snippet');
        if (a) {
          items.push({
            href: a.href,
            title: a.innerText,
            snippet: p ? p.innerText : ''
          });
        }
      });
      return items;
    });

    results.forEach(r => {
      const decoded = decodeBingUrl(r.href);
      if (decoded.includes('facebook.com')) console.log('  [FB]:', decoded);
      if (decoded.includes('instagram.com')) console.log('  [IG]:', decoded);
      if (decoded.includes('yelp.com')) console.log('  [Yelp]:', decoded);
      if (decoded.includes('linkedin.com')) console.log('  [LinkedIn]:', decoded);
    });
  }

  await browser.close();
}

testSocialDork();
