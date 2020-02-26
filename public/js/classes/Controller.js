function Controller(type){
  switch(type){
    case "circle-button":
      this.x = undefined;
      this.y = undefined;
      this.radius = undefined;
      this.id = undefined;
      this.label = undefined;
      this.labelColor = undefined;
      this.labelSize = undefined;
      this.labelFont = undefined;
      this.color = undefined;
      this.type = type;
      this.paint = undefined;
      this.previousValue = false;

      this.setId = function(id){
        this.id = id;
      }

      this.setPosition = function(x, y){
        this.x = x;
        this.y = y;
      }

      this.setRadius = function(r){
        this.radius = r;
      }

      this.setColor = function(c){
        this.color = c;
      }

      this.setData = function(id, x, y, r, c){
        this.setId(id);
        this.setPosition(x, y);
        this.setRadius(r);
        this.setColor(c);
      }

      this.setLabelText = function(text){
        this.label = text;
      }

      this.setLabelSize = function(size){
        this.labelSize = size;
      }

      this.setLabelFont = function(font){
        this.labelFont = font;
      }

      this.setLabelColor = function(color){
        this.labelColor = color;
      }

      this.setLabel = function(text, size, font, color){
        this.setLabelText(text);
        this.setLabelSize(size);
        this.setLabelFont(font);
        this.setLabelColor(color);
      }

      this.draw = function(paint){
        this.paint = paint;
        this.paint.circButton(this.id, this.x, this.y, this.radius, this.color);
        if(this.label != undefined){
          this.paint.text(this.label, this.x, this.y, this.labelColor, this.labelSize, this.labelFont, "centered");
        }
      }

      this.pressed = function(){
        var state = this.paint.getButtonState(this.id);
        if(this.previousValue != state && state == true){
          this.previousValue = state;
          return true;
        } else {
          this.previousValue = state;
          return false;
        }
      }

      this.held = function(){
        this.previousValue = this.paint.getButtonState(this.id);
        return this.paint.getButtonState(this.id);
      }
      break;
    case "joystick":
      this.x = undefined;
      this.y = undefined;
      this.outerRadius = undefined;
      this.innerRadius = undefined;
      this.id = undefined;
      this.outerColor = undefined;
      this.innerColor = undefined;
      this.type = type;
      this.paint = undefined;

      this.setId = function(id){
        this.id = id;
      }

      this.setPosition = function(x, y){
        this.x = x;
        this.y = y;
      }

      this.setOuterRadius = function(r){
        this.outerRadius = r;
      }

      this.setInnerRadius = function(r){
        this.innerRadius = r;
      }

      this.setOuterColor = function(c){
        this.outerColor = c;
      }

      this.setInnerColor = function(c){
        this.innerColor = c;
      }

      this.setData = function(id, x, y, or, ir, oc, ic){
        this.setId(id);
        this.setPosition(x, y);
        this.setOuterRadius(or);
        this.setInnerRadius(ir);
        this.setOuterColor(oc);
        this.setInnerColor(ic);
      }

      this.draw = function(paint){
        this.paint = paint;
        this.paint.circButton(this.id, this.x, this.y, this.outerRadius, this.outerColor);
        if(this.pressed()){
          this.paint.circle(touches[this.paint.getButtonTouches(this.id)].x, touches[this.paint.getButtonTouches(this.id)].y, this.innerRadius, this.innerColor);
        } else {
          this.paint.circle(this.x, this.y, this.innerRadius, this.innerColor);
        }
      }

      this.pressed = function(){
        return this.paint.getButtonState(this.id);
      }
      break;
  }
}
