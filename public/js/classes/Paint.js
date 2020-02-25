const paintings = [];

function Paint(id){
  this.canvas = document.createElement("canvas");
  this.canvas.id = id;
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = true;
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

  this.text = function(text, x, y, color, size, font, alignment){
    this._saveValues();
    this._fillColor(color);
    this._fillText(text, x, y, size, font, alignment);
    this._restoreValues();
  }

  this.rectButton = function(id, x, y, w, h, color){
    this.box(x, y, w, h, color);
    this.trackingAreas.push({
      id:id,
      type:"rectangle",
      active:false,
      canHold:true,
      pressed:false,
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
    this.trackingAreas.push({
      id:id,
      type:"circle",
      active:false,
      canHold:true,
      pressed:false,
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

  this._fillText = function(text, x, y, size, font, alignment){
    this.context.font = size + "px " + font;
    switch(alignment){
      case "centered":
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
    }
    this.context.fillText(text, x, y);
  }

  this._testButtonClicks = function(e){
    for(var b = 0; b < this.trackingAreas.length; b++){
      this.trackingAreas[b].active = false;
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
              if(this.trackingAreas[b].canHold == true){
                this.trackingAreas[b].active = true;
                this.trackingAreas[b].pressed = true;
              } else {
                if(this.trackingAreas[b].pressed = true){
                  this.trackingAreas[b].active = false;
                } else {
                  this.trackingAreas[b].active = true;
                }
              }
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
            if(this.trackingAreas[b].canHold == true){
              this.trackingAreas[b].active = true;
              this.trackingAreas[b].pressed = true;
            } else {
              if(this.trackingAreas[b].pressed = true){
                this.trackingAreas[b].active = false;
              } else {
                this.trackingAreas[b].active = true;
              }
            }
          }
        }
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

  paintings.push(this);
}

function checkPaintTouches(e){
  for(var p = 0; p < paintings.length; p++){
    paintings[p]._testButtonClicks(e);
  }
}
