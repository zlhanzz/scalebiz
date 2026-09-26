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

async function testBingDirect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const business = "Sandy's Barber Stylist For Men";
  // Specific query targeting Lockport NY
  const query = `"${business}" "Lockport"`;
  console.log(`Searching Bing for: ${query}`);

  try {
    await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(query)}&setlang=en-US`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    const bingData = await page.evaluate(() => {
      const rawLinks = Array.from(document.querySelectorAll('#b_results a')).map(a => ({ href: a.href, text: a.innerText }));
      const bodyText = document.body.innerText;
      return { rawLinks, bodyText: bodyText.slice(0, 2000) };
    });

    const decodedUrls = bingData.rawLinks.map(l => ({
      original: l.href,
      decoded: decodeBingUrl(l.href),
      text: l.text
    })).filter(l => !l.decoded.includes('bing.com') && !l.decoded.includes('microsoft.com'));

    console.log('Bing Decoded links found:', decodedUrls.length);
    decodedUrls.slice(0, 15).forEach((item, idx) => {
      console.log(`[${idx + 1}] ${item.decoded}`);
    });

  } catch (e) {
    console.log('Bing error:', e.message);
  }

  await browser.close();
}

testBingDirect();
