const { PDFDocument } = require('pdf-lib');
const PDFKitDocument = require('pdfkit');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');


function createTitlePage() {
    const doc = new PDFKitDocument();

    const continued = { continued: true };

    // can pipe to any stream!
    const stream = fs.createWriteStream('output.pdf');
    doc.pipe(stream);

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

    // add the actual document

    // Finalize PDF file
    doc.end();
}

async function createDoc() {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit)

    // const jpgImage = await pdfDoc.embedJpg(fs.readFileSync('images/nature.jpg'));
    // const jpgDims = jpgImage.scale(0.25)
    // const page = pdfDoc.addPage()
    // page.drawImage(jpgImage, {
    //     x: 20,
    //     y: page.getHeight() / 2 - jpgDims.height / 2,
    //     width: jpgDims.width,
    //     height: jpgDims.height,
    // });

    // createTitlePage();
    const titlePage = await PDFDocument.load(fs.readFileSync('output.pdf'));
    const titlePages = await pdfDoc.copyPages(titlePage, titlePage.getPageIndices());
    for (const page of titlePages) {
        pdfDoc.addPage(page);
    }

    const paper = await PDFDocument.load(fs.readFileSync('papers/gcnn.pdf'));
    const contentPages = await pdfDoc.copyPages(paper, paper.getPageIndices());
    for (const page of contentPages) {
        pdfDoc.addPage(page);
    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('output-merged.pdf', pdfBytes)
}

// createTitlePage();
while (true) {
    try {
        createDoc();
        break;
    } catch(e) {}
}