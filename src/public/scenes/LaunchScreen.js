export default class LaunchScreen extends Phaser.Scene {
    constructor() {
        super("LaunchScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.squid = this.add.image(this.screenCenterX / 2, this.screenCenterY, "squid-idle-blue").setOrigin(0.5);
        this.circle = this.add.circle(this.cameras.main.width, this.screenCenterY, this.cameras.main.width / 2, Color.white);
        this.fightButton = this.add.image(this.cameras.main.width, 0, "fight").setScale(0.4).setOrigin(1, 0).setInteractive();
        this.settingsButton = this.add.image(this.cameras.main.width, this.cameras.main.height, "fight").setOrigin(1, 1).setScale(0.4).setInteractive();
    
        this.touchInput = (this.sys.game.device.os.desktop == false) ? true : false;
        this.selectedButton = 0;
        this.buttons = [this.fightButton, this.settingsButton];
    }
    create() {
        this.refreshPositions();

        if(this.touchInput){
            this.fightButton.on("pointerover", () => {
                this.highlightButton(this.fightButton);
            })
            this.fightButton.on("pointerdown", () => {
                this.highlightButton(this.fightButton);
            })
            this.fightButton.on("pointerout", () => {
                this.unhighlightButton(this.fightButton);
            })
            this.fightButton.on("pointerup", () => {
                this.clickFightButton();
            });

            this.settingsButton.on("pointerover", () => {
                this.highlightButton(this.settingsButton);
            })
            this.settingsButton.on("pointerdown", () => {
                this.highlightButton(this.settingsButton);
            })
            this.settingsButton.on("pointerout", () => {
                this.unhighlightButton(this.settingsButton);
            })
        }

        this.cameras.main.setBackgroundColor(Color.blue);
        this.cameras.main.fadeIn(300);
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
    clickFightButton(){
        this.cameras.main.fadeOut(100, 0, 0, 0, this.switchScene, this);
    }
    switchScene(camera, completion){
        if(completion == 1){
            this.scene.start("FightScreen")
        }
    }
    refreshPositions(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.squid.setPosition(this.screenCenterX / 2, this.screenCenterY);
        this.circle.setPosition(this.cameras.main.width, this.screenCenterY).setRadius(this.cameras.main.width / 2);
        this.fightButton.setPosition(this.cameras.main.width, 0);
        this.settingsButton.setPosition(this.cameras.main.width, this.cameras.main.height);
    }
}