class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        this.play = this.physics.add.sprite(1000, 600, 'play').setOrigin(0, 0).setInteractive();
        this.play.on('pointerdown', ()=> {this.scene.start('Play');})

    }


    update() {
    }
}