import ControllerButton from "../objects/ControllerButton.js";

export default class ControllerScreen extends Phaser.Scene {
    constructor() {
        super("ControllerScreen");
    }
    init() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.leftButton = new ControllerButton(this, 100, this.screenCenterY, "arrow").setRotation(Math.PI);
        this.upButton = new ControllerButton(this, 275, this.screenCenterY - 150, "arrow").setRotation(3 * Math.PI / 2);
        this.rightButton = new ControllerButton(this, 450, this.screenCenterY, "arrow");
        this.downButton = new ControllerButton(this, 275, this.screenCenterY + 150, "arrow").setRotation(Math.PI / 2);

        this.input.addPointer(2);
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.grey);
        this.cameras.main.fadeIn(300);
    }
    update() {
        if (this.leftButton.isActive) {
            this.game.socket.emit("left");
        }
        if (this.rightButton.isActive) {
            this.game.socket.emit("right");
        }
        if (this.upButton.isActive) {
            this.game.socket.emit("up");
        }
        if (this.downButton.isActive) {
            this.game.socket.emit("down");
        }
    }
    resize() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.leftButton.setPosition(100, this.screenCenterY);
        this.upButton.setPosition(275, this.screenCenterY - 150);
        this.rightButton.setPosition(450, this.screenCenterY);
        this.downButton.setPosition(275, this.screenCenterY + 150);
    }
}