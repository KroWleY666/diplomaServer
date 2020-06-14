const pdf = require('html-pdf');
const pdfTemplate = require('./fileconfig');

module.exports = {

    createPdf (req, res) {
        
        pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
            if(err) {
                res.send(Promise.reject());
            }
    
            res.send(Promise.resolve());
        });
    },

    fetchPdf (req, res) {
        res.sendFile(`${__dirname}/result.pdf`)
    }

}