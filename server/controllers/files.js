const pdf = require('html-pdf');
const pdfTemplate = require('./fileconfig');

module.exports = {

    createPdf (req, res) {
        
        pdf.create(pdfTemplate(), {}).toFile('result.pdf', (err) => {
            if(err) {
                res.status(400).send(Promise.reject());
            }
    
            res.status(200).send(Promise.resolve());
        });
    },

    fetchPdf (req, res) {
        res.sendFile(`D:\\Study\\SportLifeServer\\result.pdf`)//${__dirname}/
    }

}