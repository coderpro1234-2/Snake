//Variables
let canvas = document.getElementById('favicon');
let ctx = canvas.getContext('2d');
let blocksize = 10
let winscore = Math.floor(((canvas.width/blocksize)*(canvas.height/blocksize))-5)
let counter = 5
let xchange = 1
let ychange = 0
let playerx = 0
let playery = 0
let applex = 1*blocksize
let appley = 1*blocksize
let snakelength = 1
let count = 0
let dir = "r"
const snakex = []
const snakey = []
//Functions
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function change_player(e){
  if ((e == 'ArrowUp' || e == 'w')) {
    if (dir != "d") {
      dir = "u"
      xchange = 0
      ychange = -1
   }
  }
  if ((e == 'ArrowDown' || e == 's')) {
    if (dir != "u") {
      dir = "d"
      xchange = 0
      ychange = 1
   }
  }
  if ((e == 'ArrowLeft' || e == 'a')) {
    if (dir != "r") {
      dir = "l"
      xchange = -1
      ychange = 0
   }
  }
  if ((e == 'ArrowRight' || e == 'd')) {
    if (dir != "l") {
      dir = "r"
      xchange = 1
      ychange = 0
   }
  }
}
function move_player() {
  playerx += xchange*blocksize
  if (playerx < 0) {
    playerx = canvas.width-(1*blocksize)
  }
  if (playerx > canvas.width-(1*blocksize)) {
    playerx = 0
  }
  playery += ychange*blocksize
  if (playery < 0) {
    playery = canvas.height-(1*blocksize)
  }
  if (playery > canvas.height-(1*blocksize)) {
    playery = 0 
  }
}
function snake_tail() {
  snakex.push(playerx)
  snakey.push(playery)
  while ((snakex.length)>snakelength) {
    snakex.splice(0,1)
    snakey.splice(0,1)
  }
}
function apple_check() {
  if (playerx == applex && playery == appley) {
    snakelength += 1
    lenghtsnake.innerHTML = "Length: "+snakelength
    applex = getRndInteger(0, Math.round((canvas.width/blocksize)-1))*blocksize
    appley = getRndInteger(0, Math.round((canvas.height/blocksize)-1))*blocksize
    while (snakex.contains(applex) || snakey.contains(appley)) {
      applex = getRndInteger(0, Math.round((canvas.width/blocksize)-1))*blocksize
      appley = getRndInteger(0, Math.round((canvas.height/blocksize)-1))*blocksize
    }
  }
}
function engine(){
  counter = counter - 1
  if (counter < 1) {
    move_player()
    snake_tail()
    counter = 40
  } 
  draw_game()
  apple_check()
}
function draw_snake() {
  ctx.fillStyle = '#00ff00'
  count = 0
  while (count < (snakex.length)) {
    ctx.fillRect(snakex[count], snakey[count], blocksize, blocksize);
    count += 1
  }
}
function draw_game(){
  canvas.width = canvas.width
  canvas.height = canvas.height
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ff0000'
  ctx.fillRect(applex, appley, blocksize, blocksize);
  draw_snake()
  ctx.stroke()
}
//Game Loop
window.addEventListener("keydown", function(i1) {
  change_player(i1.key)
})
let mainloop = setInterval(function(e){
  engine()
  if (snakelength > (winscore-1)) {
    winscreen.removeAttribute("hidden")
    UI.innerHTML = "<h1>&#8192</h1><h2 id='lenghtsnake'>&#8192</h2>"
    clearInterval(mainloop)
  }
}, 10)
