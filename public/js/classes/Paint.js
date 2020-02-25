function Paint(id){
  this.canvas = document.createElement("canvas");
  this.canvas.id = id;
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = true;
  document.body.appendChild(this.canvas);

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

  this.copyData = function(paint, x, y, w, h){
    this.context.drawImage(paint.canvas, 0, 0, paint.canvas.width, paint.canvas.height, x, y, w, h);
  }

  this._fillColor = function(color){
    this.context.fillStyle = color;
  }

  this._fillRect = function(x, y, w, h){
    this.context.fillRect(x, y, w, h);
  }

  this._saveValues = function(){
		this.context.save();
	}

	this._restoreValues = function(){
		this.context.restore();
	}
}
