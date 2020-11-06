function onLoad(){
  noSleep = new NoSleep();
  game = new Paint("game");
  hud = new Paint("hud");
  gameDisplay = new PaintDisplay("gameDisplay", game);
  hudDisplay = new PaintDisplay("hudDisplay", hud);
  theme = new Howl({
    src: ["/src/public/sounds/Pixel_Punchers_Theme.mp3"],
    loop:true
  });
  squid = new Album();
  squid.addImages("/src/public/images/squid/", [
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
  hud.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setDisplayMode("fit");
  gameDisplay.setZIndex(0);
  hudDisplay.setSize(window.innerWidth, window.innerHeight);
  hudDisplay.setZIndex(1);
  hudDisplay.setVisibility(false);
  title_screen = new PaintScreen("title", Color.grey, titleScreen);
  main_menu_screen = new PaintScreen("main menu", Color.grey, mainMenuScreen);
  fight_menu_screen = new PaintScreen("fight menu", Color.grey, fightMenuScreen);
  disconnected_screen = new PaintScreen("disconnected", Color.red, disconnectedScreen);
  game.setScreen("title");
}

function titleScreen(){
  if(title_screen.getTicks() == 0){
    title_screen.setBackground(Color.grey);
    title = new PaintText("PIXEL PUNCHERS", 640, 75, Color.white, "Play", 150, "center xy");
    image = new PaintImage(squid.photo("squid-idle-blue"), 480, 160, 320, 320);
    start = new PaintText("CLICK ANYWHERE TO START", 640, 600, Color.white, "Play", 50, "center xy");
    title_screen.addObjects([title, image, start]);
  }
  if(title_screen.getTicks() % 50 >= 25){
    start.setColor(Color.white);
  } else {
    start.setColor(Color.blue);
  }
  if(gameDisplay.touched()){
    game.setScreen("main menu");
  }
}

function mainMenuScreen(){
  if(main_menu_screen.getTicks() == 0){
    main_menu_screen.setBackground(Color.grey);
    fight_button = new PaintPolygonalTrigger([[100, 50], [600, 100], [600, 250], [100, 300]], Color.red);
    friends_button = new PaintPolygonalTrigger([[100, 420], [600, 470], [600, 620], [100, 670]], Color.green);
    extras_button = new PaintPolygonalTrigger([[1180, 50], [680, 100], [680, 250], [1180, 300]], Color.blue);
    settings_button = new PaintPolygonalTrigger([[1180, 420], [680, 470], [680, 620], [1180, 670]], Color.magenta);
    title = new PaintText("PIXEL PUNCHERS", 640, 360, Color.white, "Play", 75, "center xy");
    main_menu_screen.addObjects([fight_button, friends_button, extras_button, settings_button, title]);
    //theme.play();
  }
  if(fight_button.isActive(gameDisplay)){
    fight_button.setColor(Color.white);
  } else {
    fight_button.setColor(Color.red);
  }
  if(friends_button.isActive(gameDisplay)){
    friends_button.setColor(Color.white);
  } else {
    friends_button.setColor(Color.green);
  }
  if(extras_button.isActive(gameDisplay)){
    extras_button.setColor(Color.white);
  } else {
    extras_button.setColor(Color.blue);
  }
  if(settings_button.isActive(gameDisplay)){
    settings_button.setColor(Color.white);
  } else {
    settings_button.setColor(Color.magenta);
  }
}

function fightMenuScreen(){
  if(fight_menu_screen.getTicks() == 0){
    fight_menu_screen.setBackground(Color.grey);
    join_room_menu_button = new PaintCircularTrigger(320, 360, 140, Color.red);
    create_room_menu_button = new PaintCircularTrigger(960, 360, 140, Color.blue);
    fight_menu_screen.addObjects([join_room_menu_button, create_room_menu_button]);
    //theme.play();
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
  hud.setSize(window.innerWidth, window.innerHeight);
  hudDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("orientationchange", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  hud.setSize(window.innerWidth, window.innerHeight);
  hudDisplay.setSize(window.innerWidth, window.innerHeight);
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
    //theme.pause();
  } else {
    //theme.play();
  }
}

if(typeof document.addEventListener == "undefined" || hidden == undefined){
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
