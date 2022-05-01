class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('playAgain', './assets/playAgain.png');
        this.load.image('gameOverBackground', './assets/gameOverBackground.png');
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, 0, 1280, 960, 'gameOverBackground').setOrigin(0, 0);

        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();

        this.playAgain = this.physics.add.sprite(428.5, 600, 'playAgain').setOrigin(0, 0).setInteractive();

        // display score
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '40px',
            backgroundColor: '#a8a592',
            color: '#262310',
            align: 'right',
            fixedWidth: 0,
            fontStyle: 'bold'
        }
        // initialize score
        this.day = 0;
        this.scoreLeft = this.add.text(575, 390,  day, scoreConfig);

        this.playAgain.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Menu');
        });

    }


    update() {
        
    }
}