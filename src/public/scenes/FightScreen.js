export default class FightScreen extends Phaser.Scene {
    constructor() {
        super("FightScreen");
    }
    init(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.circle = this.add.circle(this.screenCenterX, this.screenCenterY, 800, Color.white);
    }
    create() {
        this.refreshPositions();

        this.cameras.main.setBackgroundColor(Color.blue);
        this.cameras.main.fadeIn(200);
    }
    update(){
        this.refreshPositions();
    }
    refreshPositions(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.circle.setPosition(this.screenCenterX, this.screenCenterY);
    }
}