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
let olddir = "r"
let snakecolour = "#00ff00"
const snakex = []
const snakey = []
//Functions
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function change_player(e){
  if (e == '0') {
    snakecolour = "#ff0000"
  }
  if (e == '1') {
    snakecolour = "#ff8800"
  }
  if (e == '2') {
    snakecolour = "#ffff00"
  }
  if (e == '3') {
    snakecolour = "#00ff00"
  }
  if (e == '4') {
    snakecolour = "#00ffff"
  }
  if (e == '5') {
    snakecolour = "#0000ff"
  }
  if (e == '6') {
    snakecolour = "#ff00ff"
  }
  if (e == '7') {
    snakecolour = "#ff0088"
  }
  if (e == '8') {
    snakecolour = "#ffffff"
  }
  if (e == '9') {
    snakecolour = "#050505"
  }
  if (e == 'd') {
    snakecolour = "#00ff00"
  }
  if ((e == 'ArrowUp' || e == 'w')) {
    if (snakelength == 1) {
      dir = "u"
      xchange = 0
      ychange = -1
    }
    else {
      if (olddir != "d")  {
        dir = "u"
        xchange = 0
        ychange = -1
      }
    }
  }
  if ((e == 'ArrowDown' || e == 's')) {
    if (snakelength == 1) {
      dir = "d"
      xchange = 0
      ychange = 1
    }
    else {
      if (olddir != "u")  {
        dir = "d"
        xchange = 0
        ychange = 1
      }
    }
  }
  if ((e == 'ArrowLeft' || e == 'a')) {
    if (snakelength == 1) {
      dir = "l"
      xchange = -1
      ychange = 0
    }
    else {
      if (olddir != "r")  {
        dir = "l"
        xchange = -1
        ychange = 0
      }
    }
  }
  if ((e == 'ArrowRight' || e == 'd')) {
    if (snakelength == 1) {
      dir = "r"
      xchange = 1
      ychange = 0
    }
    else {
      if (olddir != "l")  {
        dir = "r"
        xchange = 1
        ychange = 0
      }
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
  olddir = dir
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
    lengthsnake.innerHTML = "Length: "+snakelength
    applex = getRndInteger(0, Math.round((canvas.width/blocksize)-1))*blocksize
    appley = getRndInteger(0, Math.round((canvas.height/blocksize)-1))*blocksize
    while (snakex.indexOf(applex) > -1 || snakey.indexOf(appley) > -1) {
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
  ctx.fillStyle = snakecolour
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
    lengthsnakefinal.innerHTML = "Final Length: "+snakelength
    UI.innerHTML = "<h1>&#8192</h1><h2 id='lengthsnake'>&#8192</h2>"
    clearInterval(mainloop)
  }
}, 10)
