//Developed By: Isaac Robbins

class Paint{
  constructor(id){
    this.id = id;
    this.screen = undefined;
    this.fadingToScreen = false;
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
    this.touches = [];
    this.imageData = {
      x:0,
      y:0,
      w:this.paint.getWidth(),
      h:this.paint.getHeight(),
      r:undefined
    };
    this.paint.setVisibility(true);
    this.paint.canvas.style.position = "absolute";
    this.paint.canvas.addEventListener("touchstart", (e) => {
      this.convertTouches(e);
      e.preventDefault();
    }, {passive:false});
    this.paint.canvas.addEventListener("touchmove", (e) => {
      this.convertTouches(e);
    	e.preventDefault();
    }, {passive:false});
    this.paint.canvas.addEventListener("touchend", (e) => {
      this.convertTouches(e);
    	e.preventDefault();
    }, {passive:false});
    this.paint.canvas.addEventListener("touchcancel", (e) => {
      this.convertTouches(e);
    	e.preventDefault();
    }, {passive:false});
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
  setZIndex(z){
    this.paint.canvas.style.zIndex = z;
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
  touched(){
    if(this.touches.length > 0){
      return true;
    }
    return false;
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



class PaintRectangle{
  constructor(x, y, w, h, c){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = c;
    this.transparency = 1.0;
  }
  setTransparency(t){
    this.transparency = t;
  }
  draw(p){
    p.saveContext();
    p.setColor(this.color);
    p.context.globalAlpha = this.transparency;
    p.context.fillRect(this.x, this.y, this.w, this.h);
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
  setColor(c){
    this.color = c;
  }
  draw(p){
    p.saveContext();
    p.context.font = this.size + "px " + this.font;
    p.context.fillStyle = this.color;
    if(this.alignment == "normal"){
      p.context.textAlign = "start";
      p.context.textBaseline = "alphabetic";
    } else if(this.alignment == "center xy"){
      p.context.textAlign = "center";
      p.context.textBaseline = "middle";
    }
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
  constructor(x, y, r, c){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
  }
  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
  setColor(c){
    this.color = c;
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
  containsPoints(points){
    var ps = [];
    for(var coord = 0; coord < points.length; coord++){
      if(this.containsPoint(points[coord][0], points[coord][1])){
        ps.push([points[coord][0], points[coord][1]]);
      }
    }
    return ps;
  }
  isActive(p){
    return this.containsAPoint(p.touches);
  }
  activePoints(p){
    return this.containsPoints(p.touches);
  }
  draw(p){
    var me = new PaintCircle(this.x, this.y, this.radius, this.color);
    me.draw(p);
  }
}



class PaintPolygonalTrigger{
  constructor(points, c){
    this.points = points;
    this.color = c;
  }
  setColor(c){
    this.color = c;
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
    var me = new PaintPolygon(this.points, this.color);
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
