class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('playAgain', './assets/playAgain.png');
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        this.playAgain = this.physics.add.sprite(428.5, 600, 'playAgain').setOrigin(0, 0).setInteractive();

        this.playAgain.on('pointerdown', ()=> {this.scene.start('Menu');});

    }


    update() {
        
    }
}