const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testDirectories() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const biz = "Romeo's Superior Home Improvement";
  console.log(`\n=== Testing BBB for: ${biz} ===`);
  const bbbUrl = `https://www.bbb.org/search?find_text=${encodeURIComponent(biz)}&find_loc=Buffalo%2C+NY`;
  await page.goto(bbbUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  const bbbData = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]')).map(a => ({ href: a.href, text: a.innerText.trim() }));
  });
  const bbbBiz = bbbData.filter(b => b.href.includes('/profile/'));
  console.log(`BBB found ${bbbBiz.length} profiles:`);
  bbbBiz.slice(0, 3).forEach(b => console.log(' ->', b.href, '|', b.text));

  if (bbbBiz.length > 0) {
    console.log(`\nOpening BBB Profile: ${bbbBiz[0].href}`);
    await page.goto(bbbBiz[0].href, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const profileDetails = await page.evaluate(() => {
      const body = document.body.innerText;
      const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.href);
      return { body: body.slice(0, 1000), links };
    });
    console.log('BBB Profile links:', profileDetails.links.filter(l => l.includes('facebook') || l.includes('instagram') || l.includes('mailto')));
  }

  await browser.close();
}

testDirectories();
