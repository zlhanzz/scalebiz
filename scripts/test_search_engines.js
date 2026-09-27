const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testEngines() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const biz = "House of Masters Grooming Lounge";
  const city = "Buffalo NY";

  console.log(`=== Testing for ${biz} ===`);

  // 1. Try Qwant
  try {
    await page.goto(`https://www.qwant.com/?q=${encodeURIComponent('"' + biz + '" ' + city)}&t=web`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    const qwantLinks = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a => a.href));
    console.log('Qwant links count:', qwantLinks.length);
    console.log('Qwant social:', qwantLinks.filter(l => l.includes('facebook') || l.includes('instagram')));
  } catch (e) {
    console.log('Qwant error:', e.message);
  }

  // 2. Try Yahoo with human pause
  try {
    await new Promise(r => setTimeout(r, 3000));
    await page.goto(`https://search.yahoo.com/search?p=${encodeURIComponent('"' + biz + '" ' + city)}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const yahooLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#web ol li a[href]')).map(a => a.href);
    });
    console.log('Yahoo links count:', yahooLinks.length);
    const decodedYahoo = yahooLinks.map(l => {
      const ruMatch = l.match(/\/RU=([^/]+)/);
      return ruMatch ? decodeURIComponent(ruMatch[1]) : l;
    });
    console.log('All non-yahoo links:');
    decodedYahoo.filter(d => !d.includes('yahoo.com')).forEach(d => console.log(' ->', d));

  } catch (e) {
    console.log('Yahoo error:', e.message);
  }

  await browser.close();
}

testEngines();
