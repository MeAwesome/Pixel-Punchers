function onLoad(){
  fullscreen = false;
  noSleep = new NoSleep();
  game = new Paint("game");
  gameDisplay = new PaintDisplay("gameDisplay", game);
  theme = new Howl({
    src:["/public/sounds/Pixel_Punchers_Theme.mp3"],
    loop:true
  });
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
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setDisplayMode("fit");
  title_intro_screen = new PaintScreen("title intro", Color.grey, titleIntroScreen);
  title_screen = new PaintScreen("title", Color.blue, titleScreen);
  game.setScreen("title intro");
}

function titleIntroScreen(){
  if(title_intro_screen.getTicks() == 0){
    title_intro_screen.setBackground(Color.grey);
    title_intro_screen.setMaxTicks(400, game, "title");
  }
  if(title_intro_screen.getTicks() == 50){
    pixel = new PaintText("PIXEL", 400, 200, Color.white, "Play", 200);
    title_intro_screen.addObject(pixel);
  }
  if(title_intro_screen.getTicks() == 100){
    punchers = new PaintText("PUNCHERS", 150, 500, Color.white, "Play", 200);
    title_intro_screen.addObject(punchers);
  }
  if(title_intro_screen.getTicks() == 200){
    image = new PaintImage(squid.photo("squid-idle-blue"), 0, 720, 320, 320);
    title_intro_screen.addObject(image);
  }
  if(title_intro_screen.getTicks() >= 200){
    image.x +=5;
    image.y -= 5;
  }
}

function titleScreen(){
  if(title_screen.getTicks() == 0){
    title_screen.setBackground(Color.blue);
    title = new PaintText("PIXEL PUNCHERS", 50, 100, Color.white, "Play", 150);
    image = new PaintImage(squid.photo("squid-idle-blue"), 800, 225, 320, 320);
    test = new PaintCircularTrigger(300, 300, 100, gameDisplay);
    title_screen.addObjects([title, image, test]);
    theme.play();
  }
  if(test.isActive(gameDisplay)){
    title_screen.setBackground(Color.orange);
  } else {
    title_screen.setBackground(Color.blue);
  }
}

function bindSocketEvents(){
  socket.on("CONNETED_TO_SERVER", () => {
    setup();
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
  console.log(e);
  gameDisplay.convertTouches(e);
  enterFullscreen();
  e.preventDefault();
}, {passive:false});
window.addEventListener("touchmove", (e) => {
  gameDisplay.convertTouches(e);
	e.preventDefault();
}, {passive:false});
window.addEventListener("touchend", (e) => {
  gameDisplay.convertTouches(e);
	e.preventDefault();
}, {passive:false});
window.addEventListener("touchcancel", (e) => {
  gameDisplay.convertTouches(e);
	e.preventDefault();
}, {passive:false});
