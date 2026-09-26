const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testYPMulti() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const sample = [
    { name: "Mia Bella’s Hair Salon", query: "Mia Bella Hair Salon" },
    { name: "Sanitary Barbershop", query: "Sanitary Barbershop" },
    { name: "Haley Automotive Inc", query: "Haley Automotive" },
    { name: "Hunt Automotive", query: "Hunt Automotive" },
    { name: "Powell's Heating & Cooling", query: "Powell Heating Cooling" }
  ];

  for (const item of sample) {
    console.log(`\n=== YP Search: ${item.name} ===`);
    const searchUrl = `https://www.yellowpages.com/search?search_terms=${encodeURIComponent(item.query)}&geo_location_terms=Lockport%2C+NY`;
    try {
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 12000 });
      const results = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('.result').forEach(el => {
          const nameEl = el.querySelector('.business-name');
          const phoneEl = el.querySelector('.phone');
          const addressEl = el.querySelector('.adr');
          const websiteEl = el.querySelector('a.track-visit-website');
          const allLinks = Array.from(el.querySelectorAll('a[href]')).map(a => a.href);
          if (nameEl) {
            out.push({
              name: nameEl.innerText,
              phone: phoneEl ? phoneEl.innerText : '',
              address: addressEl ? addressEl.innerText.replace(/\s+/g, ' ') : '',
              website: websiteEl ? websiteEl.href : '',
              allLinks: allLinks.filter(l => !l.includes('yellowpages.com'))
            });
          }
        });
        return out;
      });

      console.log(`Found ${results.length} results:`);
      results.slice(0, 3).forEach((r, i) => {
        console.log(` [${i+1}] ${r.name} | ${r.phone} | ${r.address}`);
        if (r.website) console.log(`      Website/Social: ${r.website}`);
        if (r.allLinks.length) console.log(`      External links:`, r.allLinks);
      });
    } catch (e) {
      console.log('Error:', e.message);
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
}

testYPMulti();
