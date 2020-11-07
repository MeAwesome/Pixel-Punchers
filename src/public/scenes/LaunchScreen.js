export default class LaunchScreen extends Phaser.Scene {
    constructor() {
        super("LaunchScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }
    create() {
        this.add.image(300, this.screenCenterY, "squid-idle-blue").setOrigin(0.5);

        this.fightButton = this.add.image(this.cameras.main.width - 800, this.screenCenterY - 200, "fight").setOrigin(0.5).setScale(0.4).setInteractive();
        this.fightButton.on("pointerover", () => {
            this.highlightButton(this.fightButton);
        })
        this.fightButton.on("pointerdown", () => {
            this.highlightButton(this.fightButton);
        })
        this.fightButton.on("pointerout", () => {
            this.unhighlightButton(this.fightButton);
        })
        this.fightButton.on("pointerup", this.clickButton);
        this.cameras.main.setBackgroundColor(Color.blue)
        this.cameras.main.fadeIn()
    }
    update(){

    }
    highlightButton(button){
        button.setScale(0.5);
    }
    unhighlightButton(button) {
        button.setScale(0.4);
    }
    clickButton(){
        console.log("press");
    }
}