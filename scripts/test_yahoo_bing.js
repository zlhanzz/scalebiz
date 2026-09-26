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

async function testYahooAndBingUS() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const business = "Sandy's Barber Stylist For Men";
  const query = `"${business}" Lockport NY`;

  // 1. Test Yahoo
  console.log(`\nTesting Yahoo: ${query}`);
  try {
    const yahooUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
    await page.goto(yahooUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const yahooLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors.map(a => a.href).filter(h => h.startsWith('http') && !h.includes('yahoo.com'));
    });
    console.log('Yahoo Links found:', yahooLinks.length);
    yahooLinks.slice(0, 10).forEach(l => console.log('Yahoo:', l));
  } catch (e) {
    console.log('Yahoo error:', e.message);
  }

  // 2. Test Bing with market en-US
  console.log(`\nTesting Bing en-US: ${query}`);
  try {
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}&setmkt=en-US&setlang=en-US`;
    await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const bingLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('#b_results h2 a, #b_results .b_algo a'));
      return anchors.map(a => a.href);
    });
    const decoded = bingLinks.map(decodeBingUrl).filter(u => !u.includes('bing.com'));
    console.log('Bing en-US Links found:', decoded.length);
    decoded.slice(0, 10).forEach(l => console.log('Bing:', l));
  } catch (e) {
    console.log('Bing error:', e.message);
  }

  await browser.close();
}

testYahooAndBingUS();
