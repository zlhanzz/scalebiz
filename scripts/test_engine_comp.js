const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testEngineComparison() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  const testCases = [
    { name: "Cousin's Cafe", address: "10 Market St, Lockport, NY" },
    { name: "Dee's Sugar Shack", address: "460 West Ave, Lockport, NY" },
    { name: "Evolution Nails Spa", address: "5714 S Transit Rd, Lockport, NY" }
  ];

  for (const biz of testCases) {
    console.log(`\n================= Checking: ${biz.name} =================`);
    
    // Test Yahoo
    const qYahoo = `"${biz.name}" Lockport NY`;
    try {
      await page.goto(`https://search.yahoo.com/search?p=${encodeURIComponent(qYahoo)}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const yahooLinks = await page.evaluate(() => {
        const res = [];
        document.querySelectorAll('a[href*="/RU="]').forEach(a => {
          const m = a.href.match(/\/RU=([^/]+)/);
          if (m) {
            try {
              res.push(decodeURIComponent(m[1]));
            } catch(e){}
          }
        });
        return [...new Set(res)];
      });
      console.log(`Yahoo found ${yahooLinks.length} links:`);
      yahooLinks.slice(0, 8).forEach(l => console.log('  [Yahoo]:', l));
    } catch(e) {
      console.log('Yahoo error:', e.message);
    }
  }

  await browser.close();
}

testEngineComparison();
