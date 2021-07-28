const express = require("express");
const fs = require("fs");
const route = express.Router();

const PdfPrinter = require("pdfmake");

list = [
  {
    name: "Gian",
    age: 15,
  },
  {
    name: "José",
    age: 45,
  },
  {
    name: "Maria",
    age: 33,
  },
];

route.get("/list", (req, res) => {
  return res.json({ list });
});

route.get("/list/pdf", (req, res) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: ["Olá, salve pdfMake"],
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  //   pdfDoc.pipe(fs.createWriteStream("document.pdf"));

  const chunks = [];

  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    res.end(result);
  });

});

module.exports = route;
