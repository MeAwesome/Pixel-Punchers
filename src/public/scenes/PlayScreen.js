export default class PlayScreen extends Phaser.Scene {
    constructor() {
        super("PlayScreen");
    }
    init() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.squidX = 100;
        this.squid = this.add.image(this.squidX, this.screenCenterY, "squid-idle-blue").setOrigin(0.5);

        this.game.socket.on("move-left", () => {
            this.squidX -= 5;
        });
        this.game.socket.on("move-right", () => {
            this.squidX += 5;
        });
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.white);
        this.cameras.main.fadeIn(300);
    }
    update() {
        this.squid.setX(this.squidX);
    }
    resize() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.squid.setPosition(this.squidX, this.screenCenterY);
    }
}