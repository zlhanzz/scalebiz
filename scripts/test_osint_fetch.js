const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testPuppeteerOsint() {
  console.log('Testing Puppeteer OSINT Search Engine...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const targets = [
    { name: "Burks basement waterproofing", address: "Buffalo, NY" },
    { name: "Elite Concrete", address: "Buffalo, NY" },
    { name: "Divine Esthetics", address: "Buffalo, NY" }
  ];

  for (const t of targets) {
    const q = `"${t.name}" Buffalo NY`;
    console.log(`\n========================================`);
    console.log(`Searching for: ${q}`);

    // Try Bing first
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(q)}&setmkt=en-US&setlang=en-US`;
    try {
      await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const results = await page.evaluate(() => {
        const items = [];
        const blocks = document.querySelectorAll('#b_results .b_algo');
        blocks.forEach(b => {
          const a = b.querySelector('h2 a');
          const p = b.querySelector('.b_caption p, .b_snippet');
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

      console.log(`Bing returned ${results.length} results:`);
      results.slice(0, 5).forEach(r => {
        console.log(` - Title: ${r.title}`);
        console.log(`   URL:   ${r.url}`);
        console.log(`   Snippet: ${r.snippet.slice(0, 100)}...`);
      });
    } catch (e) {
      console.error('Error querying Bing:', e.message);
    }
  }

  await browser.close();
}

testPuppeteerOsint();
