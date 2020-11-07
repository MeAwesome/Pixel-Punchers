import "./js/phaser.min.js";
import BootGame from "./scenes/BootGame.js";
import LaunchScreen from "./scenes/LaunchScreen.js";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MAX_WIDTH = DEFAULT_WIDTH * 1.5;
const MAX_HEIGHT = DEFAULT_HEIGHT * 1.5;

var game, socket;

window.addEventListener('load', setup);

function setup(){
  const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#000000',
    parent: 'phaser-game',
    scale: {
      mode: Phaser.Scale.NONE,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    scene: [BootGame, LaunchScreen],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 20 }
      }
    }
  }

  game = new Phaser.Game(config);
  game.scene.start("BootGame");

  socket = io();
  bindSocketEvents();

  window.addEventListener('resize', event => {
    resize();
  })
  resize();
}

function resize(){
  const w = window.innerWidth;
  const h = window.innerHeight;

  let width = DEFAULT_WIDTH;
  let height = DEFAULT_HEIGHT;
  let maxWidth = MAX_WIDTH;
  let maxHeight = MAX_HEIGHT;

  let scale = Math.min(w / width, h / height);
  let newWidth = Math.min(w / scale, maxWidth);
  let newHeight = Math.min(h / scale, maxHeight);

  let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT;
  let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT;
  let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT;

  const maxSmoothScale = 1.15;
  var smooth = 1;
  if (width / height < w / h) {
    smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
  } else {
    smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale;
  }

  game.scale.resize(newWidth * smooth, newHeight * smooth);

  game.canvas.style.width = newWidth * scale + 'px';
  game.canvas.style.height = newHeight * scale + 'px';

  game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`;
  game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`;
}

function normalize(value, min, max){
  return (value - min) / (max - min);
}

function bindSocketEvents() {
  socket.on("CONNETED_TO_SERVER", () => {
    //setup();
  });

  socket.on("disconnect", () => {
    game.setScreen("disconnected");
    socket.disconnect();
  });
}