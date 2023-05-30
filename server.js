const http = require('http');
 
const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');

    // set response header
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS'); 
    response.setHeader('X-Made-By', 'Basthian Arisna') 

    const { method, url } = request; // Mengambil properti method, url

    // Melakukan routing
    if(url === '/') { // url = '/' => halaman homepage
        // TODO 2: logika respons bila url bernilai '/'
        if(method === 'GET') {
            response.statusCode = 200; // Berikan status code yang relevan sebelum response.end()
            // response.end('<h1>Ini adalah homepage</h1>');

            // Ubah tipe data menjadi json
            // Ini merupakan body response
            response.end(JSON.stringify({ 
                // JSON.stringify() mengubah objek JSON menjadi string
                // response.end() hanya menerima string atau buffer
                message: 'Ini adalah homepage',
            }));
        } else { // Homepage hanya dapat diakses menggunakan metode GET
            response.statusCode = 400;
            // response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);

            // Ubah tipe data menjadi json
            response.end(JSON.stringify({ 
                // JSON.stringify() mengubah objek JSON menjadi string
                // response.end() hanya menerima string atau buffer
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }
    } else if(url === '/about') {
        // TODO 3: logika respons bila url bernilai '/about'
        if (method === 'GET') {
            response.statusCode = 200;
            // response.end('<h1>Halo! Ini adalah halaman about</h1>')

            // Ubah tipe data menjadi json
            response.end(JSON.stringify({ 
                // JSON.stringify() mengubah objek JSON menjadi string
                // response.end() hanya menerima string atau buffer
                message: 'Halo! Ini adalah halaman about',
            }));
        } else if (method === 'POST') {
            let body = [];
    
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.statusCode = 200;
              // response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);

              // Ubah tipe data menjadi json
              response.end(JSON.stringify({ 
                // JSON.stringify() mengubah objek JSON menjadi string
                // response.end() hanya menerima string atau buffer
                message: `Halo, ${name}! Ini adalah halaman about`,
              }));
            });
        } else { // Halaman about hanya bisa diakses menggunakan method GET dan POST
            response.statusCode = 400; // Bad Request
            // response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);

            // Ubah tipe data menjadi json
            response.end(JSON.stringify({ 
            // JSON.stringify() mengubah objek JSON menjadi string
            // response.end() hanya menerima string atau buffer
                message: `Halaman tidak dapat diakses menggunakan ${method} request`,
            }));
        }
    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        response.statusCode = 404; // Not Found
        // response.end('<h1>Halaman tidak ditemukan!</h1>');

        // Ubah tipe data menjadi json
        response.end(JSON.stringify({ 
            // JSON.stringify() mengubah objek JSON menjadi string
            // response.end() hanya menerima string atau buffer
            message: 'Halaman tidak ditemukan!',
        }));
    }
};
 
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});