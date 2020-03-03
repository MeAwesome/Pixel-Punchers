function onLoad(){
  socket = io();
  bindSocketEvents();
  me = new Host();
  game = new Paint("game");
  theme = new Wave("/public/sounds/Battle_Squids_Theme.mp3");
  gameDisplay = new Paint("gameDisplay");
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  game.setVisibility(false);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tickCount = 0;
  me.setCurrentScreen("title");
  tick();
}

function tick(){
  switch(me.showingScreen){
    case "title":
      theme.play();
      titleScreen();
      break;
    default:
      break;
  }
  gameDisplay.copyData(game, 0, 0, gameDisplay.canvas.width, gameDisplay.canvas.height);
  tickCount = (tickCount + 1) % 60;
  window.requestAnimationFrame(tick);
}

function titleScreen(){
  game.fill(Color.black);
  game.text("Battle Squids", 30, 100, Color.blue, 100, "Play");
  game.text("Room Code", 180, 225, Color.blue, 60, "Play", "centered");
  game.text(me.code, 180, 300, Color.white, 100, "Play", "centered");
  game.polygon([
    [0,720],
    [0, 360],
    [360, 360],
    [900,0],
    [1280,0],
    [1280,720]
  ], Color.blue);
  game.text("Connect To", 30, 510, Color.white, 60, "Play");
  game.text("battlesquids.herokuapp.com", 30, 620, Color.white, 50, "Play");
  game.polygon([
    [700, 700],
    [700, 200],
    [900, 60],
    [1240, 60],
    [1240, 700]
  ], Color.white);
  for(var p = 0; p < me.players.length; p++){
    game.text(me.players[p].nickname, 800, 250 + (p * 50), Color.black, 30, "Play");
  }
}

function bindSocketEvents(){
  socket.on("connected_to_server", () => {
    socket.emit("create_room");
  });

  socket.on("room_metadata", (data) => {
    me.setData(data.code, Object.values(data.players));
    setup();
  });

  socket.on("disconnect", () => {

  });
}

window.addEventListener("resize", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("orientationchange", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("keydown", (e) => {
  try{
    document.body.requestFullscreen().catch(() => {});
    document.body.webkitRequestFullscreen().catch(() => {});
    document.body.mozRequestFullscreen().catch(() => {});
    document.body.msRequestFullscreen().catch(() => {});
  } catch {

  }
}, {passive:false});
window.addEventListener("mousedown", (e) => {
  try{
    document.body.requestFullscreen().catch(() => {});
    document.body.webkitRequestFullscreen().catch(() => {});
    document.body.mozRequestFullscreen().catch(() => {});
    document.body.msRequestFullscreen().catch(() => {});
  } catch {

  }
}, {passive:false});
window.addEventListener("touchstart", (e) => {
  try{
    document.body.requestFullscreen().catch(() => {});
    document.body.webkitRequestFullscreen().catch(() => {});
    document.body.mozRequestFullscreen().catch(() => {});
    document.body.msRequestFullscreen().catch(() => {});
  } catch {

  }
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
