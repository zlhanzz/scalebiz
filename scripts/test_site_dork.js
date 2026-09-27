const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testSiteDork() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const biz = "House of Masters Grooming Lounge";

  console.log(`\n=== 1. Yahoo site:facebook.com for ${biz} ===`);
  const qFb = `"${biz}" site:facebook.com`;
  await page.goto(`https://search.yahoo.com/search?p=${encodeURIComponent(qFb)}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
  const fbLinks = await page.evaluate(() => Array.from(document.querySelectorAll('#web ol li a[href]')).map(a => a.href));
  const decodedFb = fbLinks.map(l => {
    const m = l.match(/\/RU=([^/]+)/);
    return m ? decodeURIComponent(m[1]) : l;
  }).filter(l => l.includes('facebook.com'));
  console.log('Decoded FB links:', decodedFb);

  console.log(`\n=== 2. Yahoo site:instagram.com for ${biz} ===`);
  const qIg = `"${biz}" site:instagram.com`;
  await page.goto(`https://search.yahoo.com/search?p=${encodeURIComponent(qIg)}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
  const igLinks = await page.evaluate(() => Array.from(document.querySelectorAll('#web ol li a[href]')).map(a => a.href));
  const decodedIg = igLinks.map(l => {
    const m = l.match(/\/RU=([^/]+)/);
    return m ? decodeURIComponent(m[1]) : l;
  }).filter(l => l.includes('instagram.com'));
  console.log('Decoded IG links:', decodedIg);

  await browser.close();
}

testSiteDork();
