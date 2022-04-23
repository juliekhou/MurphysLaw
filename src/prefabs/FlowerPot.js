// Flower Pot Prefab
class FlowerPot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);   // add to existing scene
        // this.points = pointValue;   // store pointValue
        // this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        // this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= 2;
        // wrap around from left edge to right edge
        // if(this.x <= 0 - this.width) {
        //     this.reset();
        // }
    }

    reset(){
        // this.x = game.config.width;
    }
}