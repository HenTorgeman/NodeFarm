const { BADFLAGS } = require("dns");
const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require('./starter/modules/replaceTemplate');

//--------------------Reading from file to json
const tempOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');

//Jason Arr of products
const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const productData = JSON.parse(data);



//--------------------Server

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    //-----------------Overview Page
    if (pathname == "/" || pathname == "/Home") {
        res.writeHead(200, { 'Contect-type': 'text/html' });
        const cardHtml = productData.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);


        res.end(output);
    }
    //-----------------Product
    else if (pathname == "/product") {
        res.writeHead(200, { 'Contect-type': 'text/html' });
        const product = productData[query.id]
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    }
    //-----------------Product
    else if (pathname == "/Api") {

        res.writeHead(200, { 'Contect-type': 'application/json' });
        res.end(data);

    }

    else {
        res.writeHead(404, {
            'Contect-type': 'text/html',
            'my-own-header': 'HelloWorld',

        }); //Errors in Inspect
        res.end('<h1>Page not found</h1>');

    }
});
server.listen(8000, '127.0.0.1', () => {

    console.log("Listining for requet....");
});