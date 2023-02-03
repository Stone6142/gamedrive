// the used sounds
var sounds = [
  "openthenoor.mp3",
  "openthenoor.mp3",
  "openthenoor.mp3",
  "microsoftteam.mp3",
  "microsoftteam.mp3",
  "microsoftteam.mp3",
  "microsoftteam.mp3",
  "Krustykrabpizza.mp3",
  "Krustykrabpizza.mp3",
  "magic.mp3",
  "magic.mp3",
  "hub.mp3",
  "dontgeta.mp3",
  "Allah.mp3"
];
window.addEventListener("load", afterLoaded, false);
function afterLoaded() {
  var randIdx = Math.random() * sounds.length;
  randIdx = parseInt(randIdx, 10);
  var sound = './sound/' + sounds[randIdx];
  new Audio(sound).play();
}