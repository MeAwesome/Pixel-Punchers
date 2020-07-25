//Developed By: Isaac Robbins

class Paint{
  constructor(id){
    this.id = id;
    this.screen = undefined;
    this.backgroundColor = Color.black;
    this.canvas = document.createElement("canvas");
    this.canvas.id = id;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = true;
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.setVisibility(false);
    document.body.appendChild(this.canvas);
    paintings.addPainting(this);
  }
  setSize(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
  }
  getWidth(){
    return this.canvas.width;
  }
  getHeight(){
    return this.canvas.height;
  }
  setVisibility(bool){
    if(bool == true){
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }
  clear(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  background(c){
    this.saveContext();
    this.context.fillStyle = c;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.restoreContext();
    this.backgroundColor = c;
  }
  setColor(c){
    this.context.fillStyle = c;
  }
  setScreen(id){
    this.screen = id;
    screens.getScreen(id).resetScreen();
    screens.drawScreen(this, id);
  }
  copyPaintImage(p, x, y, w, h){
    this.context.drawImage(p.canvas, 0, 0, p.getWidth(), p.getHeight(), x, y, w, h);
  }
  saveContext(){
		this.context.save();
	}
	restoreContext(){
		this.context.restore();
	}
}



class PaintDisplay{
  constructor(id, p){
    this.paint = new Paint(id);
    this.id = id;
    this.displaying = p;
    this.dynamic = true;
    this.displayMode = "fill";
    this.imageData = {
      x:0,
      y:0,
      w:this.paint.getWidth(),
      h:this.paint.getHeight(),
      r:undefined
    };
    this.touches = [];
    this.paint.setVisibility(true);
    this.refresh();
  }
  setDisplay(p){
    this.displaying = p;
    this.refresh();
  }
  setSize(w, h){
    this.paint.setSize(w, h);
  }
  setVisibility(bool){
    this.paint.setVisibility(bool);
  }
  setDynamic(bool){
    if(bool == true){
      this.dynamic = true;
      this.refresh();
    } else {
      this.dynamic = false;
    }
  }
  setDisplayMode(type){
    if(type == "fill"){
      this.displayMode = "fill";
    } else {
      this.displayMode = "fit";
    }
  }
  convertTouches(e){
    this.touches = [];
    var x = this.imageData.x;
    var y = this.imageData.y;
    var w = this.imageData.w;
    var h = this.imageData.h;
    var dw = this.displaying.getWidth();
    var dh = this.displaying.getHeight();
    var rw = dw / w;
    var rh = dh / h;
    for(var coord = 0; coord < e.touches.length; coord++){
      if(e.touches[coord].clientX >= x && e.touches[coord].clientX <= (x + w)){
        if(e.touches[coord].clientY >= y && e.touches[coord].clientY <= (y + h)){
          this.touches.push([(e.touches[coord].clientX - x) * rw, (e.touches[coord].clientY - y) * rh]);
        }
      }
    }
  }
  refresh(){
    if(this.dynamic){
      this.paint.clear();
      if(this.displayMode == "fill"){
        var w = this.displaying.getWidth();
        var h = this.displaying.getHeight();
        var maxW = this.paint.getWidth();
        var maxH = this.paint.getHeight();
        if(maxW > maxH){
          r = h / w;
        } else {
          r = w / h;
        }
        this.imageData = {
          x:0,
          y:0,
          w:this.paint.getWidth(),
          h:this.paint.getHeight(),
          r:r
        };
      } else if(this.displayMode == "fit"){
        var x = 0;
        var y = 0;
        var r = 0;
        var w = this.displaying.getWidth();
        var h = this.displaying.getHeight();
        var maxW = this.paint.getWidth();
        var maxH = this.paint.getHeight();
        if(maxW > maxH){
          r = h / w;
          w = maxH / r;
          h = maxH;
          x = (maxW - w) / 2;
        } else {
          r = w / h;
          h = maxW / r;
          w = maxW;
          y = (maxH - h) / 2;
        }
        this.imageData = {
          x:x,
          y:y,
          w:w,
          h:h,
          r:r
        };
        this.paint.background(this.displaying.backgroundColor);
      }
      this.paint.copyPaintImage(this.displaying, this.imageData.x, this.imageData.y, this.imageData.w, this.imageData.h);
      window.requestAnimationFrame(() => {
        this.refresh();
      });
    }
  }
}



class PaintCircle{
  constructor(x, y, r, c){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
  }
  draw(p){
    p.saveContext();
    p.setColor(this.color);
    p.context.beginPath();
    p.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    p.context.fill();
    p.restoreContext();
  }
}



class PaintPolygon{
  constructor(points, c){
    this.points = points;
    this.color = c;
  }
  draw(p){
    p.saveContext();
    p.setColor(this.color);
    p.context.beginPath();
    p.context.moveTo(this.points[0][0], this.points[0][1]);
    for(var coord = 1; coord < this.points.length; coord++){
      p.context.lineTo(this.points[coord][0], this.points[coord][1]);
    }
    p.context.lineTo(this.points[0][0], this.points[0][1]);
    p.context.fill();
    p.restoreContext();
  }
}



class PaintText{
  constructor(text, x, y, color, font, size, alignment, rotation){
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.size = size;
    this.alignment = alignment || "normal";
    this.rotation = rotation || 0;
  }
  draw(p){
    p.saveContext();
    p.context.font = this.size + "px " + this.font;
    p.context.fillStyle = this.color;
    p.context.fillText(this.text, this.x, this.y);
    p.restoreContext();
  }
}



class PaintImage{
  constructor(photo, x, y, w, h){
    this.photo = photo;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(p){
    p.saveContext();
    p.context.drawImage(this.photo.img, this.x, this.y, this.w, this.h);
    p.restoreContext();
  }
}



class PaintCircularTrigger{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.radius = r;
  }
  containsPoint(x, y){
    var distancesquared = (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y);
    return distancesquared <= this.radius * this.radius;
  }
  containsAPoint(points){
    for(var coord = 0; coord < points.length; coord++){
      if(this.containsPoint(points[coord][0], points[coord][1])){
        return true;
      }
    }
    return false;
  }
  isActive(p){
    return this.containsAPoint(p.touches);
  }
  draw(p){
    var me = new PaintCircle(this.x, this.y, this.radius, Color.white);
    me.draw(p);
  }
}



class PaintPolygonalTrigger{
  constructor(points){
    this.points = points;
  }
  containsPoint(x, y){
    var inside = false;
    var intersections = 0;
    var ss;
    for(var i = 0, j = this.points.length - 1; i < this.points.length; j = i++){
      var xi = this.points[i][0], yi = this.points[i][1];
      var xj = this.points[j][0], yj = this.points[j][1];
      if (yj == yi && yj == y && x > Math.min(xj, xi) && x < Math.max(xj, xi)) {
        return true;
      }
      if (y > Math.min(yj, yi) && y <= Math.max(yj, yi) && x <= Math.max(xj, xi) && yj != yi) {
        ss = (y - yj) * (xi - xj) / (yi - yj) + xj;
        if (ss == x) {
          return true;
        }
        if (xj == xi || x <= ss) {
          intersections++;
        }
      }
    }
    if(intersections % 2 != 0){
      return true;
    } else {
      return false;
    }
  }
  containsAPoint(points){
    for(var coord = 0; coord < points.length; coord++){
      if(this.containsPoint(points[coord][0], points[coord][1])){
        return true;
      }
    }
    return false;
  }
  isActive(p){
    return this.containsAPoint(p.touches);
  }
  draw(p){
    var me = new PaintPolygon(this.points, Color.white);
    me.draw(p);
  }
}



class PaintScreen{
  constructor(id, b, f){
    this.id = id;
    this.function = f;
    this.background = b || undefined;
    this.objects = [];
    this.animated = true;
    this.windowAnimationFrameRunner = undefined;
    this.maxTicks = undefined;
    this.ticks = 0;
    this.afterTicksPaint = undefined;
    this.afterTicksScreen = undefined;
    screens.addScreen(this);
  }
  setBackground(background){
    this.background = background;
  }
  addObject(o){
    this.objects.push(o);
  }
  addObjects(objects){
    for(var o = 0; o < objects.length; o++){
      this.addObject(objects[o]);
    }
  }
  resetScreen(){
    window.cancelAnimationFrame(this.windowAnimationFrameRunner);
    this.objects = [];
    this.ticks = 0;
  }
  toggleAnimation(bool){
    if(bool == true){
      this.animated = true;
    } else {
      this.animated = false;
    }
  }
  setMaxTicks(t, p, s){
    this.maxTicks = t;
    this.afterTicksPaint = p;
    this.afterTicksScreen = s;
  }
  getTicks(){
    return this.ticks;
  }
  drawOn(p){
    p.clear();
    if(this.background != undefined){
      p.background(this.background);
    } else {
      p.background(Color.black);
    }
    if(this.function != undefined){
      this.function();
    }
    for(var o = 0; o < this.objects.length; o++){
      this.objects[o].draw(p);
    }
    this.ticks++;
    if(this.ticks >= this.maxTicks){
      this.ticks = 0;
      this.afterTicksPaint.setScreen(this.afterTicksScreen);
    }
  }
}



class Paintings{
  constructor(){
    this.paintings = {};
  }
  addPainting(p){
    this.paintings[p.id] = p;
  }
  getPainting(id){
    return this.paintings[id];
  }
}



class PaintScreens{
  constructor(){
    this.screens = {};
  }
  addScreen(s){
    this.screens[s.id] = s;
  }
  getScreen(id){
    return this.screens[id];
  }
  drawScreen(p, id){
    if(p.screen == id){
      screens.screens[id].drawOn(p);
      if(screens.screens[id].animated){
        screens.screens[id].windowAnimationFrameRunner = window.requestAnimationFrame(() => {
          screens.drawScreen(p, id);
        });
      }
    }
  }
}

const paintings = new Paintings();
const screens = new PaintScreens();
/*const paintingss = [];

function Paint2(id){
  this.canvas = document.createElement("canvas");
  this.canvas.id = id;
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = true;
  this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  document.body.appendChild(this.canvas);

  this.isBuffer = false;
  this.isBufferFor = undefined;
  this.hasBuffer = false;
  this.myBuffer = undefined;
  this.trackingAreas = [];

  this.setSize = function(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
  }

  this.setVisibility = function(bool){
    if(bool == true){
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }

  this.makeBuffer = function(paint){
    this.isBuffer = true;
    this.isBufferFor = paint;
    paint.hasBuffer = true;
    paint.myBuffer = this;
  }

  this.getButtonState = function(id){
    for(var t = 0; t < this.trackingAreas.length; t++){
      if(this.trackingAreas[t].id == id){
        return this.trackingAreas[t].active;
      }
    }
    return false;
  }

  this.getButtonTouches = function(id){
    for(var t = 0; t < this.trackingAreas.length; t++){
      if(this.trackingAreas[t].id == id){
        return this.trackingAreas[t].touchNums;
      }
    }
  }

  this.clear = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.fill = function(color){
    this._saveValues();
    this._fillColor(color);
    this._fillRect(0, 0, this.canvas.width, this.canvas.height);
    this._restoreValues();
  }

  this.box = function(x, y, w, h, color){
    this._saveValues();
    this._fillColor(color);
    this._fillRect(x, y, w, h);
    this._restoreValues();
  }

  this.circle = function(x, y, r, color){
    this._saveValues();
    this._fillColor(color);
    this._fillCirc(x, y, r);
    this._restoreValues();
  }

  this.polygon = function(points, color){
    this._saveValues();
    this._fillColor(color);
    this._fillPoly(points);
    this._restoreValues();
  }

  this.text = function(text, x, y, color, size, font, alignment){
    this._saveValues();
    this._fillColor(color);
    this._fillText(text, x, y, size, font, alignment);
    this._restoreValues();
  }

  this.image = function(photo, x, y, width, height, alignment){
    this._saveValues();
    if(height == undefined){
      alignment = width;
      width = photo.width;
      height = photo.height;
    } else if(typeof(height) == "string"){
      alignment = height;
      height = photo.height * width;
      width = photo.width * width;
    }
    this._drawImage(photo.image(), x, y, width, height, alignment);
    this._restoreValues();
  }

  this.rectButton = function(id, x, y, w, h, color){
    this.box(x, y, w, h, color);
    this.addTrackingArea({
      id:id,
      type:"rectangle",
      active:false,
      canHold:false,
      touchNums:[],
      region:{
        x:x,
        y:y,
        width:w,
        height:h
      }
    });
  }

  this.circButton = function(id, x, y, r, color){
    this.circle(x, y, r, color);
    this.addTrackingArea({
      id:id,
      type:"circle",
      active:false,
      canHold:false,
      touchNums:[],
      region:{
        x:x,
        y:y,
        radius:r
      }
    });
  }

  this.copyData = function(paint, x, y, w, h){
    this.context.drawImage(paint.canvas, 0, 0, paint.canvas.width, paint.canvas.height, x, y, w, h);
  }

  this.textWidth = function(text, size, font){
    this._saveValues();
    this.context.font = size + "px " + font;
    var width = this.context.measureText(text).width;
    this._restoreValues();
    return width;
  }

  this.addTrackingArea = function(data){
    for(var t = 0; t < this.trackingAreas.length; t++){
      if(this.trackingAreas[t].id == data.id){
        this.trackingAreas[t].region = data.region;
        this.trackingAreas[t].canHold = data.canHold;
        return;
      }
    }
    this.trackingAreas.push(data);
  }

  this.removeTrackingArea = function(id){
    for(var t = 0; t < this.trackingAreas.length; t++){
      if(this.trackingAreas[t].id == id){
        this.trackingAreas.splice(t, 1);
      }
    }
  }

  this.removeTrackingAreas = function(){
    this.trackingAreas = [];
  }

  this._fillColor = function(color){
    this.context.fillStyle = color;
  }

  this._fillRect = function(x, y, w, h){
    this.context.fillRect(x, y, w, h);
  }

  this._fillCirc = function(x, y, r){
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI);
    this.context.fill();
  }

  this._fillPoly = function(points){
    this.context.beginPath();
    this.context.moveTo(points[0][0], points[0][1]);
    for(var p = 1; p < points.length; p++){
      this.context.lineTo(points[p][0], points[p][1]);
    }
    this.context.lineTo(points[0][0], points[0][1]);
    this.context.fill();
  }

  this._fillText = function(text, x, y, size, font, alignment){
    this.context.font = size + "px " + font;
    switch(alignment){
      case "centered":
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        break;
      case "top-left":
        this.context.textBaseline = "top";
        break;
      default:
        break;
    }
    this.context.fillText(text, x, y);
  }

  this._drawImage = function(image, x, y, width, height, alignment){
    switch(alignment){
      case "centered":
        x -= (width / 2);
        y -= (height / 2);
        break;
      default:
        break;
    }
    this.context.drawImage(image, x, y, width, height);
  }

  this._testButtonClicks = function(e){
    for(var b = 0; b < this.trackingAreas.length; b++){
      this.trackingAreas[b].active = false;
      this.trackingAreas[b].touchNums = [];
      switch(this.trackingAreas[b].type){
        case "rectangle":
          for(var t = 0; t < e.touches.length; t++){
            var x1 = this.trackingAreas[b].region.x;
            var y1 = this.trackingAreas[b].region.y;
            var x2 = x1 + this.trackingAreas[b].region.width;
            var y2 = y1 + this.trackingAreas[b].region.height;
            var touchX = e.touches[t].clientX;
            var touchY = e.touches[t].clientY;
            var widthRatio = 1;
            var heightRatio = 1;
            if(this.isBuffer){
              widthRatio = this.isBufferFor.canvas.width / this.canvas.width;
              heightRatio = this.isBufferFor.canvas.height / this.canvas.height;
            }
            if(touchX >= x1 * widthRatio && touchX <= x2 * widthRatio && touchY >= y1 * heightRatio && touchY <= y2 * heightRatio){
              this.trackingAreas[b].touchNums.push(t);
              this.trackingAreas[b].active = true;
            }
          }
          break;
        case "circle":
          for(var t = 0; t < e.touches.length; t++){
            var r = this.trackingAreas[b].region.radius;
            var x1 = this.trackingAreas[b].region.x - r;
            var y1 = this.trackingAreas[b].region.y - r;
            var x2 = this.trackingAreas[b].region.x + r;
            var y2 = this.trackingAreas[b].region.y + r;
            var touchX = e.touches[t].clientX;
            var touchY = e.touches[t].clientY;
            var widthRatio = 1;
            var heightRatio = 1;
            if(this.isBuffer){
              widthRatio = this.isBufferFor.canvas.width / this.canvas.width;
              heightRatio = this.isBufferFor.canvas.height / this.canvas.height;
            }
            if(touchX >= x1 * widthRatio && touchX <= x2 * widthRatio && touchY >= y1 * heightRatio && touchY <= y2 * heightRatio){
              this.trackingAreas[b].touchNums.push(t);
              this.trackingAreas[b].active = true;
            }
          }
          break;
        default:
          break;
      }
    }
  }

  this._saveValues = function(){
		this.context.save();
	}

	this._restoreValues = function(){
		this.context.restore();
	}

  paintingss.push(this);
}

function checkPaintTouches(e){
  for(var p = 0; p < paintingss.length; p++){
    paintingss[p]._testButtonClicks(e);
  }
}
*/
