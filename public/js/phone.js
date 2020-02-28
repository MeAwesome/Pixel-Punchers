onLoad();

function onLoad(){
  socket = io();
  bindSocketEvents();
  touches = [];
  me = new Player();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
  keyboard = new Controller("keyboard");
  left_joystick = new Controller("joystick");
  button_a = new Controller("circle-button");
  button_b = new Controller("circle-button");
  button_y = new Controller("circle-button");
  button_x = new Controller("circle-button");
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  keyboard.setKeyData(Color.white);
  keyboard.setKeyLabelColor(Color.black);
  keyboard.setKeyHoldColors(Color.blue, Color.white);
  left_joystick.setData("LS", 320, 360, 200, 150, Color.white, Color.black);
  button_a.setData("btn_a", 1140, 360, 100, Color.white);
  button_a.setLabel("A", 100, "Arial", Color.black);
  button_b.setData("btn_b", 980, 560, 100, Color.white);
  button_b.setLabel("B", 100, "Arial", Color.black);
  button_y.setData("btn_y", 820, 360, 100, Color.white);
  button_y.setLabel("Y", 100, "Arial", Color.black);
  button_x.setData("btn_x", 980, 160, 100, Color.white);
  button_x.setLabel("X", 100, "Arial", Color.black);
  game.setVisibility(false);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tickCount = 0;
  roomCodeScreen();
  me.setCurrentScreen("room code");
  runner();
}

function runner(){
  switch(me.showingScreen){
    case "room code":
      roomCodeScreen();
      break;
    case "controller":
      drawController();
      break;
    default:
      break;
  }
  gameDisplay.copyData(game, 0, 0, gameDisplay.canvas.width, gameDisplay.canvas.height);
  tickCount = (tickCount + 1) % 60;
  window.requestAnimationFrame(runner);
}

function roomCodeScreen(){
  game.fill(Color.blue);
  game.box(200, 50, 880, 200, Color.white);
  game.text(me.code, 640, 150, Color.black, 150, "Arial", "centered");
  game.box(0, 310, 1280, 720, Color.grey);
  keyboard.draw(game);
  keyboard.keys.forEach((key) => {
    if(key.pressed()){
      if(key.id == "backspace"){
        if(me.code.lastIndexOf("_") == -1){
          me.code = me.code.substring(0, me.code.length - 1) + "_";
        } else if(me.code.indexOf("_") > 0){
          me.code = me.code.slice(0, me.code.indexOf("_") - 2) + "_ " + me.code.substring(me.code.indexOf("_"), me.code.length);
        }
      } else if(key.id == "shift" || key.id == "space"){
        return;
      } else if(key.id == "enter"){
        socket.emit("new_controller", me.code.replace(/\s+/g, ""));
      } else {
        if(keyboard.key_shift.held()){
          me.code = me.code.replace("_", key.id.toUpperCase());
        } else {
          me.code = me.code.replace("_", key.id);
        }
      }
    }
  });
}

function drawController(){
  game.fill(Color.black);
  left_joystick.draw(game);
  button_a.draw(game);
  button_b.draw(game);
  button_y.draw(game);
  button_x.draw(game);
  if(button_a.pressed()){
    socket.emit("button_hit", "A");
  }
  if(button_b.pressed()){
    socket.emit("button_hit", "B");
  }
  if(button_y.pressed()){
    socket.emit("button_hit", "Y");
  }
  if(button_x.pressed()){
    socket.emit("button_hit", "X");
  }
  if(left_joystick.held()){
    socket.emit("joystick_moved", left_joystick.getValues());
  }
  if(button_a.held()){
    button_a.setColor(Color.green);
    button_a.setLabelColor(Color.white);
  } else {
    button_a.setColor(Color.white);
    button_a.setLabelColor(Color.black);
  }
  if(button_b.held()){
    button_b.setColor(Color.red);
    button_b.setLabelColor(Color.white);
  } else {
    button_b.setColor(Color.white);
    button_b.setLabelColor(Color.black);
  }
  if(button_y.held()){
    button_y.setColor(Color.yellow);
    button_y.setLabelColor(Color.white);
  } else {
    button_y.setColor(Color.white);
    button_y.setLabelColor(Color.black);
  }
  if(button_x.held()){
    button_x.setColor(Color.blue);
    button_x.setLabelColor(Color.white);
  } else {
    button_x.setColor(Color.white);
    button_x.setLabelColor(Color.black);
  }
}

function bindSocketEvents(){
  socket.on("connected_to_server", () => {
    setup();
  });

  socket.on("connected_to_room", () => {
    me.setCurrentScreen("controller");
  })

  socket.on("invalid_room", () => {
    alert("wrong");
  })
}

function touchesToCoords(e){
  var widthRatio = game.canvas.width / gameDisplay.canvas.width;
  var heightRatio = game.canvas.height / gameDisplay.canvas.height;
  for(var t = 0; t < e.touches.length; t++){
    touches[t] = {
      x:e.touches[t].clientX * widthRatio,
      y:e.touches[t].clientY * heightRatio
    };
  }
}

window.addEventListener("resize", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("orientationchange", () => {
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
}, {passive:false});
window.addEventListener("touchstart", (e) => {
	e.preventDefault();
  touchesToCoords(e);
	checkPaintTouches(e);
}, {passive:false});
window.addEventListener("touchmove", (e) => {
	e.preventDefault();
  touchesToCoords(e);
	checkPaintTouches(e);
}, {passive:false});
window.addEventListener("touchend", (e) => {
	e.preventDefault();
  touchesToCoords(e);
	checkPaintTouches(e);
}, {passive:false});
window.addEventListener("touchcancel", (e) => {
	e.preventDefault();
  touchesToCoords(e);
	checkPaintTouches(e);
}, {passive:false});
