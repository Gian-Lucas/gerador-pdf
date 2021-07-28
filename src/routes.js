const express = require("express");
const fs = require("fs");
const route = express.Router();

const PdfPrinter = require("pdfmake");

const list = [
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

  const bodyList = [];

  list.forEach((rep) => {
    const rows = [];
    rows.push(rep.name);
    rows.push(rep.age + "\n\n");
    bodyList.push(rows);
  });

  const docDefinition = {
    content: [bodyList],
    defaultStyle: {
      font: "Helvetica",
      fontSize: 15,
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
