import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (filename !== root && !filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const body = await readFile(filename);
    const mime = types[path.extname(filename)] || 'application/octet-stream';
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start=Number(range[1]), end=range[2] ? Math.min(Number(range[2]),body.length-1) : body.length-1;
      if(start>end || start>=body.length){res.writeHead(416, {'Content-Range':`bytes */${body.length}`}).end();return;}
      res.writeHead(206, {'Content-Type':mime,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${body.length}`,'Content-Length':end-start+1});
      res.end(body.subarray(start,end+1));
    } else {res.writeHead(200, {'Content-Type':mime,'Content-Length':body.length,'Accept-Ranges':'bytes','Cache-Control':'no-cache'});res.end(body);}
  } catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Page introuvable');}
});
server.listen(4173, '127.0.0.1', () => console.log('HALO — Local: http://127.0.0.1:4173'));
