const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSearch(businessName) {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const query = `"${businessName}" Lockport NY facebook instagram yelp`;
  console.log(`Searching for: ${query}`);

  // Test DuckDuckGo HTML
  const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    await page.goto(ddgUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const results = await page.evaluate(() => {
      const items = [];
      const links = document.querySelectorAll('a.result__url, a.result__snippet, .result__body a');
      links.forEach(a => {
        if (a.href) items.push(a.href);
      });
      const snippets = Array.from(document.querySelectorAll('.result__snippet')).map(s => s.innerText);
      return { links: items, snippets };
    });
    console.log('DuckDuckGo Found links count:', results.links.length);
    console.log('Sample links:', results.links.slice(0, 10));
    console.log('Sample snippets:', results.snippets.slice(0, 3));
  } catch (err) {
    console.log('DDG error:', err.message);
  }

  // Also test Bing
  const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  try {
    await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const bingResults = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('#b_results h2 a, #b_results .b_algo a')).map(a => a.href);
      const snippets = Array.from(document.querySelectorAll('#b_results .b_caption p, #b_results .b_snippet')).map(p => p.innerText);
      return { links, snippets };
    });
    console.log('\nBing Found links count:', bingResults.links.length);
    console.log('Bing Sample links:', bingResults.links.slice(0, 10));
    console.log('Bing Sample snippets:', bingResults.snippets.slice(0, 3));
  } catch (err) {
    console.log('Bing error:', err.message);
  }

  await browser.close();
}

testSearch("Sandy's Barber Stylist For Men");
