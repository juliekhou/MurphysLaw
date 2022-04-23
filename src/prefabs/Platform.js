// Platform prefab
class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this); // add this line
        scene.add.existing(this);   // add to existing scene
        // this.points = pointValue;   // store pointValue
        // this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        this.moveSpeed = 2;         // pixels per frame
    }

    update() {
        // move platform left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}