export default class PlayScreen extends Phaser.Scene {
    constructor() {
        super("PlayScreen");
    }
    init() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.squidX = this.screenCenterX;
        this.squidY = this.screenCenterY;
        this.squid = this.add.image(this.squidX, this.squidY, "squid-idle-blue").setOrigin(0.5);
        this.box = this.add.image(100, 100, "box").setOrigin(0.5);

        this.game.socket.on("move-left", () => {
            this.squidX -= 5;
        });
        this.game.socket.on("move-right", () => {
            this.squidX += 5;
        });
        this.game.socket.on("move-up", () => {
            this.squidY -= 5;
        });
        this.game.socket.on("move-down", () => {
            this.squidY += 5;
        });
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.white);
        this.cameras.main.fadeIn(300);
    }
    update() {
        this.squid.setPosition(this.squidX, this.squidY);
    }
    resize() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.squid.setPosition(this.squidX, this.squidY);
    }
}