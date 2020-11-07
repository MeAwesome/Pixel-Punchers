export default class LaunchScreen extends Phaser.Scene {
    constructor() {
        super("LaunchScreen");
    }
    create() {
        this.add.text(20, 20, "Playing game...");
        this.add.image(500, 500, "squid-idle-blue");
    }
}