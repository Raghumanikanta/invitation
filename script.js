AOS.init();

const targetDate = new Date("May 3, 2026 07:38:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((diff / (1000 * 60 * 60)) % 24);

  document.getElementById("minutes").innerText =
    Math.floor((diff / (1000 * 60)) % 60);

}, 1000);

const music = document.getElementById("music");

function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}
