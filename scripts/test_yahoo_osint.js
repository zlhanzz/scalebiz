const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testYahooAndGoogle() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const business = "Burks basement waterproofing";
  const query = `"${business}" Buffalo NY`;

  console.log('Testing Yahoo Search...');
  const yahooUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
  await page.goto(yahooUrl, { waitUntil: 'domcontentloaded', timeout: 12000 });

  const yahooResults = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('.algo, .compList li').forEach(el => {
      const a = el.querySelector('h3 a, a.fz-20, a.thmb');
      const snippet = el.querySelector('.compText, p');
      if (a && a.href) {
        list.push({
          title: a.innerText.trim(),
          url: a.href,
          snippet: snippet ? snippet.innerText.trim() : ''
        });
      }
    });
    return list;
  });

  console.log(`Yahoo returned ${yahooResults.length} items:`);
  yahooResults.forEach(r => console.log(' ->', r.title, '|', r.url, '|', r.snippet.slice(0, 80)));

  await browser.close();
}

testYahooAndGoogle();
