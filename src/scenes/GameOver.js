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

        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();

        this.playAgain = this.physics.add.sprite(428.5, 600, 'playAgain').setOrigin(0, 0).setInteractive();

        this.playAgain.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Menu');
        });

    }


    update() {
        
    }
}