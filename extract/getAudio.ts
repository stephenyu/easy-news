const axios = require("axios");
const cheerio = require("cheerio");

interface Response {
  data: any;
}

const start = () => {
  axios
    .get("https://www.bbc.co.uk/programmes/p002vsn1/episodes/player")
    .then((response: Response) => {
      const $ = cheerio.load(response.data);

      const firstProgramme = $("div.br-box-page h2 a");

      getAudioURL(firstProgramme.attr("href"));
    });

  const getAudioURL = async (src: string) => {
    axios.get(src).then((response: Response) => {
      // Load the web page source code into a cheerio instance
      const $ = cheerio.load(response.data);
      const mp3Anchor = $("ul.popup__list li:nth-child(2) a");
      console.log(mp3Anchor.attr("href"));
    });
  };
};

start();
