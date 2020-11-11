import MenuButton from "../objects/MenuButton.js";

export default class ControllerScreen extends Phaser.Scene {
    constructor() {
        super("ControllerScreen");
    }
    init() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.leftButton = new MenuButton(this, 100, this.screenCenterY, "fight");
        this.rightButton = new MenuButton(this, this.cameras.main.width - 100, this.screenCenterY, "fight");
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.grey);
        this.cameras.main.fadeIn(300);
    }
    update() {
        if(this.leftButton.isActive){
            this.game.socket.emit("left");
        } else if(this.rightButton.isActive){
            this.game.socket.emit("right");
        }
    }
    resize() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }
}