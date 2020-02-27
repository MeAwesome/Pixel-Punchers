onLoad();

function onLoad(){
  socket = io();
  bindSocketEvents();
  touches = [];
  me = new Player();
  game = new Paint("game");
  gameDisplay = new Paint("gameDisplay");
  key_1 = new Controller("rectangle-button");
  key_2 = new Controller("rectangle-button");
  key_3 = new Controller("rectangle-button");
  key_4 = new Controller("rectangle-button");
  key_5 = new Controller("rectangle-button");
  key_6 = new Controller("rectangle-button");
  key_7 = new Controller("rectangle-button");
  key_8 = new Controller("rectangle-button");
  key_9 = new Controller("rectangle-button");
  key_0 = new Controller("rectangle-button");
  key_q = new Controller("rectangle-button");
  key_w = new Controller("rectangle-button");
  key_e = new Controller("rectangle-button");
  key_r = new Controller("rectangle-button");
  key_t = new Controller("rectangle-button");
  key_y = new Controller("rectangle-button");
  key_u = new Controller("rectangle-button");
  key_i = new Controller("rectangle-button");
  key_o = new Controller("rectangle-button");
  key_p = new Controller("rectangle-button");
  key_a = new Controller("rectangle-button");
  key_s = new Controller("rectangle-button");
  key_d = new Controller("rectangle-button");
  key_f = new Controller("rectangle-button");
  key_g = new Controller("rectangle-button");
  key_h = new Controller("rectangle-button");
  key_j = new Controller("rectangle-button");
  key_k = new Controller("rectangle-button");
  key_l = new Controller("rectangle-button");
  key_z = new Controller("rectangle-button");
  key_x = new Controller("rectangle-button");
  key_c = new Controller("rectangle-button");
  key_v = new Controller("rectangle-button");
  key_b = new Controller("rectangle-button");
  key_n = new Controller("rectangle-button");
  key_m = new Controller("rectangle-button");
  key_space = new Controller("rectangle-button");
  key_shift = new Controller("rectangle-button");
  key_backspace = new Controller("rectangle-button");
  key_enter = new Controller("rectangle-button");
  left_joystick = new Controller("joystick");
  button_a = new Controller("circle-button");
  button_b = new Controller("circle-button");
  button_y = new Controller("circle-button");
  button_x = new Controller("circle-button");
}

function setup(){
  game.makeBuffer(gameDisplay);
  game.setSize(1280, 720);
  key_1.setData("1", 990, 320, 80, 80, Color.white);
  key_1.setLabel("1", 50, "Arial", Color.black);
  key_1.setHoldColors(Color.blue, Color.white);
  key_2.setData("2", 1090, 320, 80, 80, Color.white);
  key_2.setLabel("2", 50, "Arial", Color.black);
  key_2.setHoldColors(Color.blue, Color.white);
  key_3.setData("3", 1190, 320, 80, 80, Color.white);
  key_3.setLabel("3", 50, "Arial", Color.black);
  key_3.setHoldColors(Color.blue, Color.white);
  key_4.setData("4", 990, 420, 80, 80, Color.white);
  key_4.setLabel("4", 50, "Arial", Color.black);
  key_4.setHoldColors(Color.blue, Color.white);
  key_5.setData("5", 1090, 420, 80, 80, Color.white);
  key_5.setLabel("5", 50, "Arial", Color.black);
  key_5.setHoldColors(Color.blue, Color.white);
  key_6.setData("6", 1190, 420, 80, 80, Color.white);
  key_6.setLabel("6", 50, "Arial", Color.black);
  key_6.setHoldColors(Color.blue, Color.white);
  key_7.setData("7", 990, 520, 80, 80, Color.white);
  key_7.setLabel("7", 50, "Arial", Color.black);
  key_7.setHoldColors(Color.blue, Color.white);
  key_8.setData("8", 1090, 520, 80, 80, Color.white);
  key_8.setLabel("8", 50, "Arial", Color.black);
  key_8.setHoldColors(Color.blue, Color.white);
  key_9.setData("9", 1190, 520, 80, 80, Color.white);
  key_9.setLabel("9", 50, "Arial", Color.black);
  key_9.setHoldColors(Color.blue, Color.white);
  key_0.setData("0", 990, 620, 280, 80, Color.white);
  key_0.setLabel("0", 50, "Arial", Color.black);
  key_0.setHoldColors(Color.blue, Color.white);
  key_q.setData("q", 10, 320, 80, 80, Color.white);
  key_q.setLabel("q", 50, "Arial", Color.black);
  key_q.setHoldColors(Color.blue, Color.white);
  key_w.setData("w", 95, 320, 80, 80, Color.white);
  key_w.setLabel("w", 50, "Arial", Color.black);
  key_w.setHoldColors(Color.blue, Color.white);
  key_e.setData("e", 180, 320, 80, 80, Color.white);
  key_e.setLabel("e", 50, "Arial", Color.black);
  key_e.setHoldColors(Color.blue, Color.white);
  key_r.setData("r", 265, 320, 80, 80, Color.white);
  key_r.setLabel("r", 50, "Arial", Color.black);
  key_r.setHoldColors(Color.blue, Color.white);
  key_t.setData("t", 350, 320, 80, 80, Color.white);
  key_t.setLabel("t", 50, "Arial", Color.black);
  key_t.setHoldColors(Color.blue, Color.white);
  key_y.setData("y", 435, 320, 80, 80, Color.white);
  key_y.setLabel("y", 50, "Arial", Color.black);
  key_y.setHoldColors(Color.blue, Color.white);
  key_u.setData("u", 520, 320, 80, 80, Color.white);
  key_u.setLabel("u", 50, "Arial", Color.black);
  key_u.setHoldColors(Color.blue, Color.white);
  key_i.setData("i", 605, 320, 80, 80, Color.white);
  key_i.setLabel("i", 50, "Arial", Color.black);
  key_i.setHoldColors(Color.blue, Color.white);
  key_o.setData("o", 690, 320, 80, 80, Color.white);
  key_o.setLabel("o", 50, "Arial", Color.black);
  key_o.setHoldColors(Color.blue, Color.white);
  key_p.setData("p", 775, 320, 80, 80, Color.white);
  key_p.setLabel("p", 50, "Arial", Color.black);
  key_p.setHoldColors(Color.blue, Color.white);
  key_backspace.setData("backspace", 880, 320, 80, 80, Color.white);
  key_backspace.setLabel("<", 50, "Arial", Color.black);
  key_backspace.setHoldColors(Color.blue, Color.white);
  key_a.setData("a", 10, 420, 80, 80, Color.white);
  key_a.setLabel("a", 50, "Arial", Color.black);
  key_a.setHoldColors(Color.blue, Color.white);
  key_s.setData("s", 95, 420, 80, 80, Color.white);
  key_s.setLabel("s", 50, "Arial", Color.black);
  key_s.setHoldColors(Color.blue, Color.white);
  key_d.setData("d", 180, 420, 80, 80, Color.white);
  key_d.setLabel("d", 50, "Arial", Color.black);
  key_d.setHoldColors(Color.blue, Color.white);
  key_f.setData("f", 265, 420, 80, 80, Color.white);
  key_f.setLabel("f", 50, "Arial", Color.black);
  key_f.setHoldColors(Color.blue, Color.white);
  key_g.setData("g", 350, 420, 80, 80, Color.white);
  key_g.setLabel("g", 50, "Arial", Color.black);
  key_g.setHoldColors(Color.blue, Color.white);
  key_h.setData("h", 435, 420, 80, 80, Color.white);
  key_h.setLabel("h", 50, "Arial", Color.black);
  key_h.setHoldColors(Color.blue, Color.white);
  key_j.setData("j", 520, 420, 80, 80, Color.white);
  key_j.setLabel("j", 50, "Arial", Color.black);
  key_j.setHoldColors(Color.blue, Color.white);
  key_k.setData("k", 605, 420, 80, 80, Color.white);
  key_k.setLabel("k", 50, "Arial", Color.black);
  key_k.setHoldColors(Color.blue, Color.white);
  key_l.setData("l", 690, 420, 80, 80, Color.white);
  key_l.setLabel("l", 50, "Arial", Color.black);
  key_l.setHoldColors(Color.blue, Color.white);
  key_enter.setData("enter", 795, 420, 165, 80, Color.white);
  key_enter.setLabel("Enter", 50, "Arial", Color.black);
  key_enter.setHoldColors(Color.blue, Color.white);
  key_z.setData("z", 10, 520, 80, 80, Color.white);
  key_z.setLabel("z", 50, "Arial", Color.black);
  key_z.setHoldColors(Color.blue, Color.white);
  key_x.setData("x", 95, 520, 80, 80, Color.white);
  key_x.setLabel("x", 50, "Arial", Color.black);
  key_x.setHoldColors(Color.blue, Color.white);
  key_c.setData("c", 180, 520, 80, 80, Color.white);
  key_c.setLabel("c", 50, "Arial", Color.black);
  key_c.setHoldColors(Color.blue, Color.white);
  key_v.setData("v", 265, 520, 80, 80, Color.white);
  key_v.setLabel("v", 50, "Arial", Color.black);
  key_v.setHoldColors(Color.blue, Color.white);
  key_b.setData("b", 350, 520, 80, 80, Color.white);
  key_b.setLabel("b", 50, "Arial", Color.black);
  key_b.setHoldColors(Color.blue, Color.white);
  key_n.setData("n", 435, 520, 80, 80, Color.white);
  key_n.setLabel("n", 50, "Arial", Color.black);
  key_n.setHoldColors(Color.blue, Color.white);
  key_m.setData("m", 520, 520, 80, 80, Color.white);
  key_m.setLabel("m", 50, "Arial", Color.black);
  key_m.setHoldColors(Color.blue, Color.white);
  key_shift.setData("shift", 622, 520, 338, 80, Color.white);
  key_shift.setLabel("Shift", 50, "Arial", Color.black);
  key_shift.setHoldColors(Color.blue, Color.white);
  key_space.setData("space", 10, 620, 950, 80, Color.white);
  key_space.setHoldColors(Color.blue, Color.white);
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
  drawKeyboard();
}

function drawKeyboard(){
  key_1.draw(game);
  key_2.draw(game);
  key_3.draw(game);
  key_4.draw(game);
  key_5.draw(game);
  key_6.draw(game);
  key_7.draw(game);
  key_8.draw(game);
  key_9.draw(game);
  key_0.draw(game);
  key_q.draw(game);
  key_w.draw(game);
  key_e.draw(game);
  key_r.draw(game);
  key_t.draw(game);
  key_y.draw(game);
  key_u.draw(game);
  key_i.draw(game);
  key_o.draw(game);
  key_p.draw(game);
  key_backspace.draw(game);
  key_a.draw(game);
  key_s.draw(game);
  key_d.draw(game);
  key_f.draw(game);
  key_g.draw(game);
  key_h.draw(game);
  key_j.draw(game);
  key_k.draw(game);
  key_l.draw(game);
  key_enter.draw(game);
  key_z.draw(game);
  key_x.draw(game);
  key_c.draw(game);
  key_v.draw(game);
  key_b.draw(game);
  key_n.draw(game);
  key_m.draw(game);
  key_shift.draw(game);
  key_space.draw(game);
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
