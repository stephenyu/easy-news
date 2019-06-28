const availableAudio = {
  bbc:
    "//open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/w1msh27cqrdrcj4.mp3",
  cbc: "http://podcast.cbc.ca/mp3/hourlynews.mp3",
  wsj:
    "https://dcs.megaphone.fm/WSJ4093146914.mp3?key=a1119b23405fefa16c564ad6ac2f3262"
};

const loadAndPlay = (element, src) => {
  element.src = src;

  const handler = element.addEventListener("loadeddata", () => {
    element.play();
    element.removeEventListener("loadeddata", handler, false);
  });
};

document.getElementById("start-button").addEventListener("click", () => {
  const checkboxesChecked = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  const playlist = [];

  checkboxesChecked.forEach(ele => playlist.push(availableAudio[ele.id]));

  if (playlist.length > 0) {
    let currentIndex = 0;

    const audioPlayerEl = document.getElementById("audioplayer");
    loadAndPlay(audioPlayerEl, playlist[currentIndex++]);

    audioPlayerEl.addEventListener("ended", () =>
      loadAndPlay(audioPlayerEl, playlist[currentIndex++])
    );
  }
});
