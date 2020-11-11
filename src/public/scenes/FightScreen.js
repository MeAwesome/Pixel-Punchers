export default class FightScreen extends Phaser.Scene {
    constructor() {
        super("FightScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.circle = this.add.circle(this.screenCenterX, this.screenCenterY, this.cameras.main.width / 2, Color.white);
    }
    create() {
        this.cameras.main.setBackgroundColor(Color.blue);
        this.cameras.main.fadeIn(100);
    }
    update(){
        
    }
    resize(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.circle.setPosition(this.screenCenterX, this.screenCenterY).setRadius(this.cameras.main.width / 2);
    }
}