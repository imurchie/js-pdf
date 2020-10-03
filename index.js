const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument;

const continued = { continued: true };

// can pipe to any stream!
doc.pipe(fs.createWriteStream('output.pdf'));

// header image
doc.image('images/nature.jpg', {
    fit: [250, 600],
    align: 'center',
    valign: 'center'
 });

// add the title
doc.font('Times-Roman')
    .fontSize(12)
    .text('Neil, Daniel, et al. ', 340, 325, continued)
    .font('Times-Italic')
    .text('Interpretable Graph Convolutional Neural Networks for Inference on Noisy Knowledge Graphs.', continued)
    .font('Times-Roman')
    .text('Machine Learning for Health, 2018.')

// Interpretable Graph Convolutional Neural Networks for Inference on Noisy Knowledge Graphs

// add the actual document

// Finalize PDF file
doc.end();