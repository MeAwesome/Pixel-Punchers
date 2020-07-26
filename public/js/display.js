function onLoad(){
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
  disconnected_screen = new PaintScreen("disconnected", Color.red, disconnectedScreen);
  game.setScreen("title intro");
}

function titleIntroScreen(){
  if(title_intro_screen.getTicks() == 0){
    title_intro_screen.setBackground(Color.grey);
    title = new PaintText("PIXEL PUNCHERS", 640, 75, Color.white, "Play", 150, "center xy");
    image = new PaintImage(squid.photo("squid-idle-blue"), 480, 160, 320, 320);
    start = new PaintText("CLICK ANYWHERE TO START", 640, 600, Color.white, "Play", 50, "center xy");
    title_intro_screen.addObjects([title, image, start]);
  }
  if(title_intro_screen.getTicks() % 50 >= 25){
    start.setColor(Color.white);
  } else {
    start.setColor(Color.blue);
  }
  if(gameDisplay.touched()){
    game.setScreen("title");
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
    var points = test.activePoints(gameDisplay);
    test.setPosition(points[0][0], points[0][1]);
  } else {
    title_screen.setBackground(Color.blue);
  }
}

function disconnectedScreen(){
  if(disconnected_screen.getTicks() == 0){
    disconnected_screen.setBackground(Color.red);
  }
}

function bindSocketEvents(){
  socket.on("CONNETED_TO_SERVER", () => {
    setup();
  });

  socket.on("disconnect", () => {
    game.setScreen("disconnected");
    socket.disconnect();
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

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange(){
  if(document[hidden]){
    theme.pause();
  } else {
    theme.play();
  }
}

if(typeof document.addEventListener == "undefined" || hidden == undefined){
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
