const cheerio = require("cheerio");
const axios = require("axios");

axios
  .get("https://www.bbc.co.uk/programmes/p002vsn1/episodes/player")
  .then(response => {
    // Load the web page source code into a cheerio instance
    const $ = cheerio.load(response.data);

    const firstProgramme = $("div.br-box-page h2 a");

    getAudioURL(firstProgramme.attr("href"));
  });

const getAudioURL = async src => {
  axios.get(src).then(response => {
    // Load the web page source code into a cheerio instance
    const $ = cheerio.load(response.data);

    const mp3Anchor = $("ul.popup__list li:nth-child(2) a");
    console.log(mp3Anchor.attr("href"));
  });
};
