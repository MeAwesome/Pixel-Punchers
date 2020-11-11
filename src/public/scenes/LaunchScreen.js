import MenuButton from "../objects/MenuButton.js";

export default class LaunchScreen extends Phaser.Scene {
    constructor() {
        super("LaunchScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.squid = this.add.image(this.screenCenterX / 2, this.screenCenterY, "squid-idle-blue").setOrigin(0.5);
        this.circle = this.add.circle(this.cameras.main.width, this.screenCenterY, this.cameras.main.width / 2, Color.white);
        this.fightButton = new MenuButton(this, this.cameras.main.width, 0, "fight").setOrigin(1, 0);
        this.settingsButton = new MenuButton(this, this.cameras.main.width, this.cameras.main.height, "fight").setOrigin(1);
    
        this.touchInput = (this.sys.game.device.os.desktop == false) ? true : false;
    }
    create() {
        this.fightButton.on("pointerup", () => {
            this.clickFightButton();
        });

        this.cameras.main.setBackgroundColor(Color.blue);
        this.cameras.main.fadeIn(300);
    }
    update(){
        
    }
    clickFightButton(){
        this.cameras.main.fadeOut(100, 0, 0, 0, this.switchScene, this);
    }
    switchScene(camera, completion){
        if(completion == 1){
            if(this.touchInput){
                this.scene.start("ControllerScreen");
            } else {
                this.scene.start("PlayScreen");
            }
        }
    }
    resize(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.squid.setPosition(this.screenCenterX / 2, this.screenCenterY);
        this.circle.setPosition(this.cameras.main.width, this.screenCenterY).setRadius(this.cameras.main.width / 2);
        this.fightButton.setPosition(this.cameras.main.width, 0);
        this.settingsButton.setPosition(this.cameras.main.width, this.cameras.main.height);
    }
}