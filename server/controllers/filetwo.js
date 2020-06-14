var pdf = require("pdf-creator-node");
var fs = require('fs');
 
// Read HTML Template
var html = fs.readFileSync('./index.html', 'utf8');

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    "footer": {
        "height": "28mm",
        "contents": {
        first: 'Cover page',
      //  2: 'Second page', // Any page number is working. 1-based index
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: 'Last Page'
    }
}
};


module.exports = {

    createPdf (req, res) {
        var document = {
            html: html,
            data: {
                users: req.body
            },
            path: "./output.pdf"
        };
        pdf.create(document, options)
    .then(result => {
        console.log(result)
        return res.status(200).send('Все отлично! Файл создан!')
    })
    .catch(error => {
        console.error(error)
        return res.status(400).send('Что-то с файлом не так...')
      //  res.send(Promise.reject());
    });
    },

    fetchPdf (req, res) {
        res.sendFile(`${__dirname}/result.pdf`)
    }

}

