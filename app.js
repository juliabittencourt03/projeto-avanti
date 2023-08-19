const http = require('http');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
      // Resposta com status 200 (OK)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, world! =D');
    } else if (req.url === '/not-found') {
      // Resposta com status 404 (Not Found)
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found');
    } else if (req.url === '/server-error') {
      // Resposta com status 500 (Internal Server Error)
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal server error');
    } else {
      // Resposta padrão com status 200 (OK)
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Default response');
    }
  });
  
  const port = 3000;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });