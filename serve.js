// Zero-dependency static server with clean URLs: node serve.js [port]
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = +(process.env.PORT || process.argv[2] || 4175);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.md':'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  let file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (!path.extname(file) && fs.existsSync(file + '.html')) file += '.html';
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'}); res.end(data);
  });
}).listen(port, () => console.log(`Friedman tribute at http://localhost:${port}`));
