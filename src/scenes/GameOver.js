class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        // load sprite sheet
        this.load.spritesheet('playAgain', './assets/playAgain.png', {frameWidth: 550, frameHeight: 110, startFrame: 0, endFrame: 4});
        
        // load image
        this.load.image('gameOverBackground', './assets/gameOverBackground.png');
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, 0, 1280, 960, 'gameOverBackground').setOrigin(0, 0);

        // background music
        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();

        // play again button
        this.playAgain = this.physics.add.sprite(380, 575, 'playAgain').setOrigin(0, 0).setInteractive();
        // adding animations
        this.anims.create({
            key: 'playAgainAnimation',
            frames: this.anims.generateFrameNumbers('playAgain', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        // adding interactibility
        this.playAgain.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Menu');
        });

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
        this.score = this.add.text(575, 390,  day, scoreConfig);
    }


    update() {
        // play again animation
        this.playAgain.anims.play('playAgainAnimation', true);
    }
}