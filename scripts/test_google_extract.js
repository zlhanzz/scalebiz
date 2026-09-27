const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testGoogleExtract() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const query = '"Bock & Whitman Construction" Buffalo NY';
  console.log(`Searching Google for: ${query}`);
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`, { waitUntil: 'domcontentloaded', timeout: 15000 });

  const data = await page.evaluate(() => {
    const title = document.title;
    const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
      href: a.href,
      text: a.innerText.trim()
    }));
    return { title, links };
  });

  console.log('Google Title:', data.title);
  console.log('All links count:', data.links.length);
  const external = data.links.filter(l => !l.href.includes('google.com'));
  console.log('External results found:', external.length);
  external.slice(0, 15).forEach((e, idx) => {
    console.log(` [${idx + 1}] ${e.href} | ${e.text.slice(0, 40)}`);
  });

  await browser.close();
}

testGoogleExtract();
