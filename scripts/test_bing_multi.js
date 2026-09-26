const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function decodeBingUrl(url) {
  try {
    const match = url.match(/[?&]u=a1([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      let b64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      return Buffer.from(b64, 'base64').toString('utf8');
    }
  } catch (e) {}
  return url;
}

async function testBingMulti() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const testList = [
    "Sandy's Barber Stylist For Men",
    "Trendy Nail Spa",
    "Cousin's Cafe",
    "Evolution Nails Spa",
    "Ray Brigham Concrete Construction",
    "Reids",
    "DiPaolo's Barber Shop"
  ];

  for (const name of testList) {
    console.log(`\n================ ${name} ================`);
    const q = `${name} Lockport NY`;
    const url = `https://www.bing.com/search?q=${encodeURIComponent(q)}&setmkt=en-US&setlang=en-US`;
    
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
      const rawLinks = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('#b_results h2 a, #b_results .b_algo a, #b_results li a'));
        return anchors.map(a => a.href).filter(h => h && h.startsWith('http'));
      });

      const uniqueDecoded = [...new Set(rawLinks.map(decodeBingUrl))].filter(u => 
        !u.includes('bing.com') && 
        !u.includes('microsoft.com') &&
        !u.includes('msn.com')
      );

      const fb = uniqueDecoded.find(u => u.includes('facebook.com'));
      const ig = uniqueDecoded.find(u => u.includes('instagram.com'));
      const yelp = uniqueDecoded.find(u => u.includes('yelp.com'));
      const li = uniqueDecoded.find(u => u.includes('linkedin.com'));
      const bbb = uniqueDecoded.find(u => u.includes('bbb.org'));
      const chamber = uniqueDecoded.find(u => u.includes('chamberofcommerce.com'));

      console.log('Decoded URLs found:', uniqueDecoded.length);
      if (fb) console.log('  [Facebook]:', fb);
      if (ig) console.log('  [Instagram]:', ig);
      if (yelp) console.log('  [Yelp]:', yelp);
      if (li) console.log('  [LinkedIn]:', li);
      if (bbb) console.log('  [BBB]:', bbb);
      if (chamber) console.log('  [Chamber]:', chamber);

      // Print first 5 generic links
      console.log('  Sample other links:');
      uniqueDecoded.slice(0, 5).forEach(l => console.log('   -', l));

    } catch (err) {
      console.log('Error:', err.message);
    }

    // Small delay between searches
    await new Promise(r => setTimeout(r, 1500));
  }

  await browser.close();
}

testBingMulti();
