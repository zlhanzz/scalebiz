const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testYahooSocial() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const testCases = [
    "Sandy's Barber Stylist For Men",
    "Trendy Nail Spa",
    "DiPaolo's Barber Shop",
    "Cousin's Cafe",
    "Dee's Sugar Shack",
    "Lockport Seafood Shack"
  ];

  for (const biz of testCases) {
    console.log(`\n=================== ${biz} ===================`);
    const query = `"${biz}" Lockport NY`;
    const url = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const data = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('#web ol li, .compList li, .searchCenterMiddle li').forEach(li => {
        const a = li.querySelector('h3 a, a.d-ib, a[href]');
        const snippet = li.querySelector('.compText, p, span.fc-subdued');
        if (a && a.href) {
          items.push({
            href: a.href,
            text: a.innerText,
            snippet: snippet ? snippet.innerText : ''
          });
        }
      });
      return items;
    });

    console.log(`Found ${data.length} results on Yahoo`);
    data.slice(0, 12).forEach((item, idx) => {
      // Decode yahoo redirect if needed (yahoo often uses r.search.yahoo.com/_ylt=.../RU=https%3a%2f%2f...)
      let realUrl = item.href;
      const ruMatch = item.href.match(/\/RU=([^/]+)/);
      if (ruMatch) {
        realUrl = decodeURIComponent(ruMatch[1]);
      }
      console.log(` [${idx + 1}] ${realUrl}`);
      if (item.snippet) console.log(`      Snippet: ${item.snippet.slice(0, 100)}...`);
    });
  }

  await browser.close();
}

testYahooSocial();
