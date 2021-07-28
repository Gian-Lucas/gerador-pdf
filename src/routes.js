const express = require("express");
const route = express.Router();

list = [
    {
        name: 'Gian',
        age: 15
    },
    {
        name: 'José',
        age: 45
    },
    {
        name: 'Maria',
        age: 33
    },
];

route.get("/list", (req, res) => {
  return res.json({ list });
});

module.exports = route;
