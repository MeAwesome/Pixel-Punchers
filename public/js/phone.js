async function onLoad(){
  touches = [];
  me = new Player();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
  keyboard = new Controller("keyboard");
  input_box = new Controller("rectangle-button");
  left_joystick = new Controller("joystick");
  button_a = new Controller("circle-button");
  button_b = new Controller("circle-button");
  button_y = new Controller("circle-button");
  button_x = new Controller("circle-button");
  squid = new Album();
  squid.addImages("/public/characters/squid/images/", [
    "idle-front.png",
    "idle-left-0.png",
    "idle-right-0.png"
  ]);
  socket = io();
  bindSocketEvents();
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  keyboard.setKeyData(Color.white);
  keyboard.setKeyLabelColor(Color.black);
  keyboard.setKeyHoldColors(Color.blue, Color.white);
  input_box.setData("textbox", 0, 0, 0, 0, Color.white);
  input_box.setLabel("textbox", 0, "Play", Color.lightgrey, "centered");
  input_box.setHoldColors(Color.white, Color.black);
  left_joystick.setData("LS", 320, 360, 200, 150, Color.white, Color.black);
  button_a.setData("btn_a", 1140, 360, 100, Color.white);
  button_a.setLabel("A", 100, "Arial", Color.black);
  button_a.setHoldColors(Color.green, Color.white);
  button_b.setData("btn_b", 980, 560, 100, Color.white);
  button_b.setLabel("B", 100, "Arial", Color.black);
  button_b.setHoldColors(Color.red, Color.white);
  button_y.setData("btn_y", 820, 360, 100, Color.white);
  button_y.setLabel("Y", 100, "Arial", Color.black);
  button_y.setHoldColors(Color.yellow, Color.white);
  button_x.setData("btn_x", 980, 160, 100, Color.white);
  button_x.setLabel("X", 100, "Arial", Color.black);
  button_x.setHoldColors(Color.blue, Color.white);
  game.setVisibility(false);
  gameDisplay.setSize(window.innerWidth, window.innerHeight);
  gameDisplay.setVisibility(true);
  tickCount = 0;
  me.setCurrentScreen("room code");
  runner();
}

function runner(){
  switch(me.showingScreen){
    case "room code":
      roomCodeScreen();
      break;
    case "character selection":
      selectCharacter();
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
  keyboard.draw(game);
  me.showingKeyboard = true;
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
        if(keyboard.shifting){
          me.code = me.code.replace("_", key.id.toUpperCase());
        } else {
          me.code = me.code.replace("_", key.id);
        }
      }
    }
  });
}

function selectCharacter(){
  game.fill(Color.black);
  input_box.setPosition(20, 20);
  input_box.setDimensions(400, 100);
  input_box.setLabelSize(60);
  if(me.nickname == ""){
    input_box.setLabelColor(Color.lightgrey);
    input_box.setLabelText("Nickname");
  } else {
    input_box.setLabelColor(Color.black);
    input_box.setLabelText(me.nickname);
  }
  input_box.draw(game);
  game.polygon([
    [355, 360],
    [510, 20],
    [765, 20],
    [925, 360],
    [765,700],
    [510,700]
  ], Color.blue);
  game.polygon([
    [370, 360],
    [520, 35],
    [755, 35],
    [910, 360],
    [755,685],
    [520,685]
  ], Color.white);
  game.image(squid.photo("idle-front"), 640, 360, "centered");
  if(input_box.pressed()){
    me.showingKeyboard = true;
  }
  if(me.showingKeyboard == true){
    keyboard.draw(game);
    keyboard.keys.forEach((key) => {
      if(key.pressed()){
        if(key.id == "backspace"){
          me.nickname = me.nickname.substring(0, me.nickname.length - 1);
        } else if(key.id == "shift"){
          return;
        } else if(key.id == "space"){
          me.nickname += " ";
          if(game.textWidth(me.nickname, input_box.labelSize, input_box.labelFont) >= input_box.w){
            me.nickname = me.nickname.substring(0, me.nickname.length - 1);
          }
        } else if(key.id == "enter"){
          me.showingKeyboard = false;
          keyboard.reset(game);
          socket.emit("player_update", {
            nickname:me.nickname
          });
        } else {
          if(keyboard.shifting){
            me.nickname += key.id.toUpperCase();
          } else {
            me.nickname += key.id;
          }
          if(game.textWidth(me.nickname, input_box.labelSize, input_box.labelFont) >= input_box.w){
            me.nickname = me.nickname.substring(0, me.nickname.length - 1);
          }
        }
      }
    });
    if(keyboard.dismissed(game)){
      me.showingKeyboard = false;
      socket.emit("player_update", {
        nickname:me.nickname
      });
    }
  }
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
}

function bindSocketEvents(){
  socket.on("connected_to_server", () => {
    setup();
  });

  socket.on("connected_to_room", () => {
    me.showingKeyboard = false;
    keyboard.reset(game);
    me.setCurrentScreen("character selection");
  });

  socket.on("invalid_room", () => {
    me.code = "Invalid";
    setTimeout(() => {
      me.code = "_ _ _ _";
    }, 1000);
  });

  socket.on("disconnect", () => {

  });
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
