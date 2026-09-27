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

async function testBingClean() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const targets = [
    "Total Fence of WNY",
    "House of Masters Grooming Lounge",
    "Wishful Inking Tattoos & Piercing",
    "Burks basement waterproofing",
    "Salon Of Essence"
  ];

  for (const t of targets) {
    console.log(`\n=== Testing Bing for: ${t} ===`);
    const q = `"${t}" Buffalo NY (facebook OR instagram OR yelp)`;
    const url = `https://www.bing.com/search?q=${encodeURIComponent(q)}&setmkt=en-US&setlang=en-US`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });

    const raw = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#b_results .b_algo')).map(el => {
        const a = el.querySelector('h2 a');
        const p = el.querySelector('.b_caption p, .b_snippet');
        return {
          href: a ? a.href : '',
          title: a ? a.innerText : '',
          snippet: p ? p.innerText : ''
        };
      });
    });

    console.log(`Raw items found: ${raw.length}`);
    if (raw.length > 0) {
      console.log('Sample raw item:', raw[0]);
      console.log('Sample decoded:', decodeBingUrl(raw[0].href));
    }
    let fb = null;

    let ig = null;
    let yelp = null;

    raw.forEach(r => {
      const decoded = decodeBingUrl(r.href);
      if (decoded.includes('facebook.com') && !fb && !decoded.includes('/marketplace') && !decoded.includes('/login')) {
        fb = decoded.split('?')[0];
      }
      if (decoded.includes('instagram.com') && !ig && !decoded.includes('/explore') && !decoded.includes('/p/')) {
        ig = decoded.split('?')[0];
      }
      if (decoded.includes('yelp.com/biz') && !yelp) {
        yelp = decoded.split('?')[0];
      }
    });

    console.log('📌 FB Page   :', fb || '-');
    console.log('📌 IG Profile:', ig || '-');
    console.log('📌 Yelp      :', yelp || '-');
  }

  await browser.close();
}

testBingClean();
