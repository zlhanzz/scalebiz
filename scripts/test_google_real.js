const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testGoogleReal() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  
  const query = `"Dee's Sugar Shack" Lockport NY`;
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  
  const pageInfo = await page.evaluate(() => {
    const title = document.title;
    const allA = Array.from(document.querySelectorAll('a[href]'));
    const urls = [];
    allA.forEach(a => {
      let href = a.href;
      if (href.includes('/url?q=')) {
        const match = href.match(/\/url\?q=([^&]+)/);
        if (match) href = decodeURIComponent(match[1]);
      }
      urls.push({ href, text: a.innerText.trim() });
    });
    return { title, urls: urls.slice(0, 30) };
  });

  console.log('Google Page Title:', pageInfo.title);
  console.log('Extracted URLs:');
  pageInfo.urls.forEach(u => {
    if (u.href.startsWith('http') && !u.href.includes('google.com/search') && !u.href.includes('google.com/preferences')) {
      console.log(' -', u.href.slice(0, 100), '|', u.text.slice(0, 40));
    }
  });

  await browser.close();
}

testGoogleReal();
