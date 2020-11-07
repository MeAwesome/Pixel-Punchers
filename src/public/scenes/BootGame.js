export default class BootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload(){
        this.add.text(20, 20, "Loading game...");

        this.add.circle(300, 300, 500, Color.red);

        new NoSleep();

        var images = ["squid-idle-blue", "squid-idle-red", "squid-idle-green", "squid-idle-yellow", "squid-idle-orange", "squid-idle-pink", "squid-idle-purple", "squid-idle-grey"]
        images.forEach(img => {
            this.load.image(img, `src/public/assets/img/squid/${img}.png`)
        })
    }
    create() {
        this.scene.start("LaunchScreen");
    }
}