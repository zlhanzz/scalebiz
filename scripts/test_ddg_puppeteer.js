const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testDDGPuppeteer() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const targets = [
    "House of Masters Grooming Lounge Buffalo NY",
    "Wishful Inking Tattoos Buffalo NY",
    "Total Fence of WNY Buffalo NY"
  ];

  for (const t of targets) {
    console.log(`\n=== Testing DDG Puppeteer for: ${t} ===`);
    await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(t)}`, { waitUntil: 'networkidle2', timeout: 15000 });

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[data-testid="result-title-a"], a.result__url, article h2 a')).map(a => ({
        href: a.href,
        text: a.innerText
      }));
    });

    console.log(`DDG found ${links.length} results:`);
    links.slice(0, 8).forEach(l => console.log(' ->', l.href, '|', l.text.slice(0, 30)));
    await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();
}

testDDGPuppeteer();
