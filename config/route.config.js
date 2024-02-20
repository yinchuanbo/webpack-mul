const lanData = require("../src/lan/en.json");

module.exports = [
  {
    path: "index",
    template: "./src/views/index.html",
    filename: "index.html",
    inject: "body",
    chunks: ["index", "common"],
    data: lanData["index"],
  },
  {
    path: "about",
    template: "./src/views/about.html",
    filename: "about.html",
    inject: "body",
    chunks: ["about", "common"],
    data: lanData["about"],
  },
  {
    path: "contact",
    template: "./src/views/contact.html",
    filename: "contact.html",
    inject: "body",
    chunks: ["contact", "common"],
    data: lanData["contact"],
  },
  {
    template: "./src/views/404.html",
    filename: "404.html",
    inject: false,
    data: lanData["404"],
  },
];
