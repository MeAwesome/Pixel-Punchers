import ControllerButton from "../objects/ControllerButton.js";

export default class ControllerScreen extends Phaser.Scene {
    constructor() {
        super("ControllerScreen");
    }
    init() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.leftButton = new ControllerButton(this, 100, this.screenCenterY, "arrow", "left").setRotation(Math.PI);
        this.upButton = new ControllerButton(this, 275, this.screenCenterY - 150, "arrow", "up").setRotation(3 * Math.PI / 2);
        this.rightButton = new ControllerButton(this, 450, this.screenCenterY, "arrow", "right");
        this.downButton = new ControllerButton(this, 275, this.screenCenterY + 150, "arrow", "down").setRotation(Math.PI / 2);

        this.input.addPointer(2);
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.grey);
        this.cameras.main.fadeIn(300);
    }
    update() {
        
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