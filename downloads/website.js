
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    openFullscreen();
    
  }
});
function openFullscreen() {
  document.getElementById('myvideo').style.visibility = 'visible';
  if (document.getElementById('myvideo').requestFullscreen) {
    document.getElementById('myvideo').requestFullscreen();
  } else if (document.getElementById('myvideo').webkitRequestFullscreen) { /* Safari */
    document.getElementById('myvideo').webkitRequestFullscreen();
  } else if (document.getElementById('myvideo').msRequestFullscreen) { /* IE11 */
    document.getElementById('myvideo').msRequestFullscreen();
  }
}
openStuff = function() {
  // get a random number between 0 and the number of links
  var randIdx = Math.random() * links.length;
  // round it, so it can be used as array index
  randIdx = parseInt(randIdx, 10);
  // construct the link to be opened
  var link = links[randIdx];
  // open it in a new window / tab (depends on browser setting)
  window.open(link);
};
function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
var links = [
  //"https://drive.google.com/uc?export=download&id=1-z7MapQtZHBev3ENW5vnU23AMjLIbKoL",
  "../index1.html",
  "https://drive.google.com/uc?export=download&id=1Km5Yz8tmXRAEN-Wo5Gb22rTuDQmDcKRW",
  "https://drive.google.com/uc?export=download&id=1tnqyM-OkQnieH9HhV-G1-9y7ahE5MD2Y",
  "https://drive.google.com/uc?export=download&id=1oK16jduHccoRpxWM740IbUu2oBm8BtGx",
  "https://drive.google.com/uc?export=download&id=1vzVRkZ7qfgFXm32UXcO-Yvf3kC4RzZfB",
  "https://drive.google.com/uc?export=download&id=1qc2M2v-V-vfH8C3BwuLoKzgPeAN6Pemy",
  "https://drive.google.com/uc?export=download&id=1v3oa31_jo-3ceVdpst3lJ0TjKKBW7xdN",
  "https://drive.google.com/uc?export=download&id=1aByjALtZEb99HHM00Z5--EjwtoyQUMyy",
  "https://drive.google.com/uc?export=download&id=1vtfxt7QOzFgah-GU1hf7tfiWeaW4oXJI",
  "https://drive.google.com/uc?export=download&id=160gXkEaqLlW8C86zm4s36n4jPIp_tt3m",
  "https://drive.google.com/uc?export=download&id=1L2Xw6P-bui6C54FQV8CDk6YjY6jecNq7",
  //gta3
  "https://drive.google.com/uc?export=download&id=1n9XZjfbOMaIfx8iyhS1unImzBe_G3pNH",
  //end gta3
  "https://drive.google.com/uc?export=download&id=1lH16nF_kVS836uP7K-SQlHdYSxQVr3Fz", //univ sandbox
  "https://drive.google.com/uc?export=download&id=1JoEPogosMchlBtgHZhXsVeAY7Y82z7Jw",
  "https://drive.google.com/uc?export=download&id=1kJaORhmXpKdkwUKhHewJxTnkEp0eHhdW",
  "https://drive.google.com/uc?export=download&id=1MeoLYfVZ-KY-iAaCYwmqFTFbU0VziwXf",
  "https://drive.google.com/uc?export=download&id=1FoQEp3yQiOsP63HVH5v3xoMh9zlGG_1S",
  "https://drive.google.com/uc?export=download&id=1Di8IvqjDKSWsvr5Vf8HTqN5sEI9tb2ea",
  "https://drive.google.com/uc?export=download&id=1pVqWTv4T5bpiOmlUlAxQ6bEesy0HB36Q",
  // farm sim"https://drive.google.com/uc?export=download&id=1ug5ecrvcGGZu8K3pYSGydwUW7exHy-FQ",
  "https://drive.google.com/uc?export=download&id=1zffWNqWydk-BtcPs9TIlSfo1GF_PohZ6",
  "../null/",
  "../null/",
  "../null/",
  "../null/",
  "https://drive.google.com/uc?export=download&id=1BR2uTJDHvL9K1RlFcWCPcPjM-Wj-wqyF",
  "https://drive.google.com/uc?export=download&id=1HxXGDOrwPKxBms-kdWUkwaOOkHbctAhz",
  "https://drive.google.com/uc?export=download&id=1ZnWlBJo8-DQ6qK6qgpXaglldY8Fus1bY",
  "https://drive.google.com/uc?export=download&id=1aByjALtZEb99HHM00Z5--EjwtoyQUMyy",
  "https://drive.google.com/uc?export=download&id=10Auc0y5XeUNYlEPncQbyOkbVrnCgW953",
  "https://drive.google.com/uc?export=download&id=1ygHqf7ErMTSog84GeQHtylo4mmJMHJw8",
  "https://drive.google.com/uc?export=download&id=1c1OJTpu1KXWIEbjHP-6lnbGbLHkXX8zK",
  "https://drive.google.com/uc?export=download&id=1TX72Pef00amrFfuEoAo7FmX2CSITlBef",
  "https://drive.google.com/uc?export=download&id=1jhpMgjbELtZ96o70K5C2L2EnpSw4YNyF",
  "https://drive.google.com/uc?export=download&id=18fUM3GFjxcZL3zoqLD3SjFvEDsS7LZIc",
  "https://drive.google.com/uc?export=download&id=1FvUBNKo8No-Ir5Z8FWkwqkYdRj9QqEWA",
  "https://drive.google.com/uc?export=download&id=1duzd6ntqNh37uk5SfxQYvMSW0B_CVTBe",
  "https://drive.google.com/uc?export=download&id=16zMmM7QwsUNWHEw9HPsUECh01qQGwvh7",
  "https://drive.google.com/uc?export=download&id=1gn9IQIT-O5r8dYW2sMM35W6fg4-pd_-U",
  "https://drive.google.com/uc?export=download&id=1XdxtWgaB5f76KzpURsTmMcAEJmvzyUkT",
  "https://drive.google.com/uc?export=download&id=1FR6V7FvT3yuO9KEYKHVxbtOezYzHJWFv",
  "https://drive.google.com/uc?export=download&id=1dGLRlQQgeuYjbxW-l55JUR3OY4dAGv9H",
  "https://drive.google.com/uc?export=download&id=1loyS95GL8X239SikhMyuC0e7N4G1xrU6",
  "https://drive.google.com/uc?export=download&id=1BI53zCOMN_t8s5JdacjfpN7Ohy3nZGPE",
  "https://drive.google.com/uc?export=download&id=1ZK1iwxx7viGswSDYkkTBXw9UJcul8Iny",
  "https://drive.google.com/uc?export=download&id=1Ho6z_JzjORvA7isqOaGJ8wS2uqEaSEa3",
  "https://drive.google.com/uc?export=download&id=1HyBa4dBB1HxIPlHAM2aM2OJ9dvdYmdp_",
  "https://drive.google.com/uc?export=download&id=1i2SyA6s8kTti-389zazSEFflfZ_tq7br",
  "https://drive.google.com/uc?export=download&id=1OSlG8escz4k02KkTJTOAgnZ1g1YgixhL"
];

