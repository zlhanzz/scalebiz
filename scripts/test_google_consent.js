const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testGoogleWithCookies() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  
  // Set Google Consent cookie
  await page.setCookie(
    { name: 'SOCS', value: 'CAESHAgCEhJnd3NfMjAyNDA0MTUtMF9SQzIaAmVuIAEaBgiA_LmvBg', domain: '.google.com', path: '/' },
    { name: 'CONSENT', value: 'PENDING+999', domain: '.google.com', path: '/' }
  );

  const query = `"Burks basement waterproofing" Buffalo NY`;
  console.log('Searching Google for:', query);

  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=us`, { waitUntil: 'domcontentloaded', timeout: 15000 });

  const title = await page.title();
  console.log('Page Title:', title);

  const results = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('div.g, div[data-hveid]').forEach(div => {
      const a = div.querySelector('a[href]');
      const h3 = div.querySelector('h3');
      const snippet = div.querySelector('.VwiC3b, .yXK7lf, span');
      if (a && h3 && a.href.startsWith('http') && !a.href.includes('google.com')) {
        list.push({
          title: h3.innerText.trim(),
          url: a.href,
          snippet: snippet ? snippet.innerText.trim() : ''
        });
      }
    });
    return list;
  });

  console.log(`Found ${results.length} Google results:`);
  results.slice(0, 10).forEach(r => {
    console.log(' - Title:', r.title);
    console.log('   URL  :', r.url);
    console.log('   Text :', r.snippet.slice(0, 100));
  });

  await browser.close();
}

testGoogleWithCookies();
