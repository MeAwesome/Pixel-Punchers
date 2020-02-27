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
      this.holdColor = undefined;
      this.holdLabelColor = undefined;
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

      this.setHoldColors = function(c, lc){
        this.holdColor = c;
        this.holdLabelColor = lc;
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
    case "rectangle-button":
      this.x = undefined;
      this.y = undefined;
      this.w = undefined;
      this.h = undefined;
      this.id = undefined;
      this.label = undefined;
      this.labelColor = undefined;
      this.labelSize = undefined;
      this.labelFont = undefined;
      this.color = undefined;
      this.holdColor = undefined;
      this.holdLabelColor = undefined;
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

      this.setDimensions = function(w, h){
        this.w = w;
        this.h = h;
      }

      this.setColor = function(c){
        this.color = c;
      }

      this.setData = function(id, x, y, w, h, c){
        this.setId(id);
        this.setPosition(x, y);
        this.setDimensions(w, h);
        this.setColor(c);
      }

      this.setHoldColors = function(c, lc){
        this.holdColor = c;
        this.holdLabelColor = lc;
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
        if(this.paint.getButtonState(this.id)){
          this.paint.rectButton(this.id, this.x, this.y, this.w, this.h, this.holdColor);
        } else {
          this.paint.rectButton(this.id, this.x, this.y, this.w, this.h, this.color);
        }
        if(this.label != undefined){
          if(this.paint.getButtonState(this.id)){
            this.paint.text(this.label, this.x + (this.w / 2), this.y + (this.h / 2), this.holdLabelColor, this.labelSize, this.labelFont, "centered");
          } else {
            this.paint.text(this.label, this.x + (this.w / 2), this.y + (this.h / 2), this.labelColor, this.labelSize, this.labelFont, "centered");
          }
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
      this.values = {
        xaxis:0,
        yaxis:0
      };

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

      this.setValues = function(xa, ya){
        this.values.xaxis = xa;
        this.values.yaxis = ya;
      }

      this.draw = function(paint){
        this.paint = paint;
        this.paint.circButton(this.id, this.x, this.y, this.outerRadius, this.outerColor);
        if(this.held()){
          var x = touches[this.paint.getButtonTouches(this.id)[0]].x;
          var y = touches[this.paint.getButtonTouches(this.id)[0]].y;
          this.paint.circle(x, y, this.innerRadius, this.innerColor);
          this.setValues(Math.floor(x - this.x), Math.floor(this.y - y));
        } else {
          this.paint.circle(this.x, this.y, this.innerRadius, this.innerColor);
          this.setValues(0, 0);
        }
      }

      this.held = function(){
        return this.paint.getButtonState(this.id);
      }

      this.getValues = function(){
        return this.values;
      }
      break;
  }
}
