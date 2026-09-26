const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testYP() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const biz = "Cousin's Cafe";
  const url = `https://www.yellowpages.com/lockport-ny/mip/cousins-cafe-456070659`;
  console.log(`Checking YP for: ${biz}`);
  
  try {
    const searchUrl = `https://www.yellowpages.com/search?search_terms=${encodeURIComponent(biz)}&geo_location_terms=Lockport%2C+NY`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 12000 });
    const info = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('.result, .v-card').forEach(el => {
        const title = el.querySelector('.business-name');
        const phone = el.querySelector('.phone');
        const street = el.querySelector('.street-address');
        const website = el.querySelector('a.track-visit-website');
        const links = Array.from(el.querySelectorAll('a[href]')).map(a => a.href);
        if (title) {
          results.push({
            title: title.innerText,
            phone: phone ? phone.innerText : '',
            street: street ? street.innerText : '',
            website: website ? website.href : '',
            links
          });
        }
      });
      return results;
    });

    console.log('YP Results:', info);
  } catch(e) {
    console.log('YP error:', e.message);
  }

  await browser.close();
}

testYP();
