function Paint(id){
  this.canvas = document.createElement(canvas);
  this.canvas.setAttribute("id", id);
  this.context = this.canvas.getContext("2d");
  this.context.imageSmoothingEnabled = true;

  this.setSize = function(w, h){
    this.canvas.width = w;
    this.canvas.height = h;
  }

  this.setBuffer = function(bool){
    if(bool == true){
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }

  this.fill = function(color){
    this.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
