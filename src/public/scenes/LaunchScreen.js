export default class LaunchScreen extends Phaser.Scene {
    constructor() {
        super("LaunchScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.squid = this.add.image(300, this.screenCenterY, "squid-idle-blue").setOrigin(0.5);
        this.circle = this.add.circle(this.cameras.main.width, this.screenCenterY, 800, Color.white);
        this.fightButton = this.add.image(this.cameras.main.width, this.screenCenterY - 200, "fight").setOrigin(1, 0.5).setScale(0.4).setInteractive();
    }
    create() {
        this.refreshPositions();

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
        this.refreshPositions();
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
    refreshPositions(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.squid.setPosition(300, this.screenCenterY);
        this.circle.setPosition(this.cameras.main.width, this.screenCenterY);
        this.fightButton.setPosition(this.cameras.main.width, this.screenCenterY - 200);
    }
}