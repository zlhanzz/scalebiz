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

async function testBingDork() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const targets = [
    "Burks basement waterproofing Buffalo NY",
    "Elite Concrete Buffalo NY",
    "Total Fence Buffalo NY",
    "Ace Of Fades Barbershop Buffalo NY"
  ];

  for (const t of targets) {
    const q = `${t} (facebook OR instagram OR yelp)`;
    console.log(`\nQuerying Bing: ${q}`);
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(q)}&setmkt=en-US&setlang=en-US`;
    await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 12000 });

    const results = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('#b_results .b_algo').forEach(b => {
        const a = b.querySelector('h2 a');
        const p = b.querySelector('.b_caption p, .b_snippet, p');
        if (a) {
          items.push({
            title: a.innerText || '',
            url: a.href || '',
            snippet: p ? p.innerText : ''
          });
        }
      });
      return items;
    });

    console.log(`Found ${results.length} items:`);
    results.forEach(r => {
      const dec = decodeBingUrl(r.url);
      if (!dec.includes('bing.com')) {
        console.log(' -> Title:', r.title.slice(0, 50));
        console.log('    URL  :', dec);
        console.log('    Snip :', r.snippet.slice(0, 80));
      }
    });
  }

  await browser.close();
}

testBingDork();
