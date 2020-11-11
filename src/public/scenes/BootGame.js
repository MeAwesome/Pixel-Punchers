export default class BootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload(){
        new NoSleep();

        this.text = this.add.text(20, this.cameras.main.height - 20, "Loading...", {
            font: "bold 32px Arial",
            fill: "#fff"
        }).setOrigin(0, 1);

        this.load.setBaseURL(window.origin + "/src/public");

        var images = ["squid-idle-blue", "squid-idle-red", "squid-idle-green", "squid-idle-yellow", "squid-idle-orange", "squid-idle-pink", "squid-idle-purple", "squid-idle-grey"]
        images.forEach(img => {
            this.load.image(img, `assets/img/squid/${img}.png`)
        })

        this.load.image("fight", `assets/img/buttons/fight.png`);
        this.load.image("arrow", `assets/img/buttons/arrow.svg`);
        this.load.image("box", `assets/img/tiles/box.svg`);
    }
    create() {
        this.scene.start("LaunchScreen");
    }
    resize(){
        this.text.setPosition(20, this.cameras.main.height - 20);
    }
}