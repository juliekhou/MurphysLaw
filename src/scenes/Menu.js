let backgroundMusic; 

class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/menu.wav');
        this.load.audio('backgroundMusic', './assets/background.wav');
        this.load.audio('clickPot', './assets/break.wav');
        this.load.audio('tutorialMusic', './assets/tutorial.wav');
        this.load.audio('gameOver', './assets/die.wav');

        // load background
        this.load.image('background', './assets/background.png');
        this.load.spritesheet('title', './assets/title.png', {frameWidth: 700, frameHeight: 700, startFrame: 0, endFrame: 5});
        this.load.spritesheet('tutorial', './assets/tutorial.png', {frameWidth: 500, frameHeight: 110, startFrame: 0, endFrame: 5});
        this.load.spritesheet('play', './assets/play.png', {frameWidth: 500, frameHeight: 110, startFrame: 0, endFrame: 5});
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        // title
        this.title = this.add.sprite(290, 20, 'title').setOrigin(0, 0);
        
        // tutorial and play buttons
        this.tutorial = this.physics.add.sprite(390, 450, 'tutorial').setOrigin(0, 0).setInteractive();
        this.play = this.physics.add.sprite(390, 570, 'play').setOrigin(0, 0).setInteractive();

        // adding animations
        this.anims.create({
            key: 'titleAnimation',
            frames: this.anims.generateFrameNumbers('title', { start: 0, end: 5, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'tutorialAnimation',
            frames: this.anims.generateFrameNumbers('tutorial', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'playAnimation',
            frames: this.anims.generateFrameNumbers('play', { start: 0, end: 4, first: 0}),
            frameRate: 6
        });

        // background music
        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();
        

        this.tutorial.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Tutorial');
        });
        this.play.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Play');
        });
        
    }


    update() {
        this.title.anims.play('titleAnimation', true);
        this.tutorial.anims.play('tutorialAnimation', true);
        this.play.anims.play('playAnimation', true);
    }
}