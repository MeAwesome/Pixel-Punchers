export default class ControllerButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.setScale(0.2);
        this.setInteractive();

        this.isActive = false;

        this.on("pointerover", () => {
            this.highlight();
            this.isActive = true;
        });
        this.on("pointermove", () => {
            this.highlight();
            this.isActive = true;
        });
        this.on("pointerdown", () => {
            this.highlight();
            this.isActive = true;
        });
        this.on("pointerout", () => {
            this.unhighlight();
            this.isActive = false;
        });
        this.on("pointerup", () => {
            this.unhighlight();
            this.isActive = false;
        });

        scene.add.existing(this);
    }
    highlight() {
        this.setScale(0.3);
    }
    unhighlight() {
        this.setScale(0.2);
    }
}