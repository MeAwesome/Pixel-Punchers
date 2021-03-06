export default class MenuButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.setScale(0.4);
        this.setInteractive();

        this.on("pointerover", () => {
            this.highlight();
        });
        this.on("pointermove", () => {
            this.highlight();
        });
        this.on("pointerdown", () => {
            this.highlight();
        });
        this.on("pointerout", () => {
            this.unhighlight();
        });
        this.on("pointerup", () => {
            this.unhighlight();
        });

        scene.add.existing(this);
    }
    highlight() {
        this.setScale(0.5);
    }
    unhighlight() {
        this.setScale(0.4);
    }
}