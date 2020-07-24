function onLoad(){
  fullscreen = false;
  game = new Paint("game");
  gameDisplay = new PaintDisplay("gameDisplay", game);
  theme = new Wave("/public/sounds/Pixel_Punchers_Theme.mp3");
  squid = new Album();
  squid.addImages("/public/images/squid/", [
    "squid-idle-blue.png",
    "squid-idle-green.png",
    "squid-idle-grey.png",
    "squid-idle-orange.png",
    "squid-idle-pink.png",
    "squid-idle-purple.png",
    "squid-idle-red.png",
    "squid-idle-yellow.png"
  ]);
  socket = io();
  bindSocketEvents();
}

function setup(){
  game.setSize(1280, 720);
  gameDisplay.setSize(window.innerWidth, window.innerHeight); //Future Isaac: keep this full screen and make function to keep proportions and have black bars on sides
  gameDisplay.setDisplayMode("fit");
  title_intro_screen = new PaintScreen("title intro", Color.orange, titleIntroScreen);
  title_screen = new PaintScreen("title", titleScreen);
  poly = new PaintPolygon("polygon", [[0, 0], [100, 0], [0, 100]], Color.white);
  image = new PaintImage(squid.photo("squid-idle-blue"), 100, 100, 320, 320);
  title_intro_screen.addObjects([poly, image]);
  //title_intro_screen.setMaxTicks(3000, game, "title");
  game.setScreen("title intro");
}

function titleIntroScreen(){
  if(title_intro_screen.getTick() == 150){
    title_intro_screen.setBackground(Color.blue);
  }
  poly.points.forEach((coord) => {
    coord[0] += 1;
    coord[1] += 1;
  });
}

function titleScreen(){
  game.fill(Color.grey);
  game.polygon([
    [0, 720],
    [0, 220],
    [200, 520],
    [500, 720]
  ], Color.blue);
  game.polygon([
    [1280, 720],
    [1280, 220],
    [1080, 520],
    [780, 720]
  ], Color.blue);
  game.text("Battle", 640, 100, Color.blue, 150, "Play", "centered");
  game.text("Squids", 640, 250, Color.white, 200, "Play", "centered");
  game.image(squid.photo("idle-front"), 640, 475, 256, 256, "centered");
  game.text("Press Anything", 640, 660 + (Math.sin(tickCount) * 2), Color.white, 50, "Play", "centered");
}

function connectScreen(){
  game.fill(Color.grey);
  game.text("Play On This Display", 640, 100, Color.white, 125, "Play", "centered");
  game.polygon([
    [150, 200],
    [1130, 200],
    [1180, 250],
    [1180, 550],
    [1130, 600],
    [150, 600],
    [100, 550],
    [100, 250]
  ], Color.blue);
  game.text(me.code, 640, 410, Color.white, 300, "Play", "centered");
  game.text("JOIN  >  DISPLAY", 640, 660, Color.white, 50, "Play", "centered");
}

function menuScreen(){
  game.fill(Color.grey);
  var c = ["blue", "red", "yellow", "green"];
  if(me.players.length < 5){
    for(var p = 0; p < me.players.length; p++){
      game.box(p * (game.canvas.width / me.players.length), 0, (game.canvas.width / me.players.length), 480, Color[c[p]]);
      game.box(p * (game.canvas.width / me.players.length) + 15, 15, (game.canvas.width / me.players.length) - 30, 450, Color.grey);
    }
  }
}

function serverDisconnectScreen(){
  game.fill(Color.red);
}

function bindSocketEvents(){
  socket.on("CONNETED_TO_SERVER", () => {
    setup();
  });

  socket.on("room_metadata", (data) => {
    //me.setData(data.code, Object.values(data.players));
  });

  socket.on("first_player_connected", () => {
    //me.setCurrentScreen("main menu");
  });

  socket.on("disconnect", () => {
    //me.setCurrentScreen("server disconnected");
  });
}

function enterFullscreen(){
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  var elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

window.addEventListener("resize", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("orientationchange", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("keydown", (e) => {
  enterFullscreen();
}, {passive:false});
window.addEventListener("mousedown", (e) => {
  enterFullscreen();
  e.preventDefault();
}, {passive:false});
window.addEventListener("touchstart", (e) => {
  enterFullscreen();
  e.preventDefault();
}, {passive:false});
window.addEventListener("touchmove", (e) => {
	e.preventDefault();
}, {passive:false});
window.addEventListener("touchend", (e) => {
	e.preventDefault();
}, {passive:false});
window.addEventListener("touchcancel", (e) => {
	e.preventDefault();
}, {passive:false});
