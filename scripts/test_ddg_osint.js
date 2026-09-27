const https = require('https');

function searchDuckDuckGo(query) {
  return new Promise((resolve) => {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const links = [];
        const regex = /<a class="result__url" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          let raw = match[1];
          if (raw.includes('uddg=')) {
            const uddg = raw.match(/uddg=([^&]+)/);
            if (uddg) raw = decodeURIComponent(uddg[1]);
          }
          links.push(raw);
        }
        resolve(links);
      });
    });
    req.on('error', () => resolve([]));
  });
}

async function testDDG() {
  const businesses = [
    "Wishful Inking Tattoos Buffalo NY",
    "House of Masters Grooming Lounge Buffalo NY",
    "Total Fence of WNY Inc Buffalo NY",
    "Burks basement waterproofing Buffalo NY"
  ];

  for (const b of businesses) {
    console.log(`\n=== Testing DDG: ${b} ===`);
    const links = await searchDuckDuckGo(b);
    console.log(`Found ${links.length} links`);
    links.slice(0, 8).forEach(l => console.log(' ->', l));
  }
}

testDDG();
