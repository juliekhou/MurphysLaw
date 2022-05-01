class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        // load sprite sheet
        this.load.spritesheet('tutorialLayout', './assets/tutorialLayout.png', {frameWidth: 1280, frameHeight: 720, startFrame: 0, endFrame: 7});
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);
        this.tutorialLayout = this.add.sprite(0, 0, 'tutorialLayout').setOrigin(0, 0);

        // adding animations
        this.anims.create({
            key: 'layoutAnimation',
            frames: this.anims.generateFrameNumbers('tutorialLayout', { start: 0, end: 7, first: 0}),
            frameRate: 8
        });

        // set title
        this.tutorial = this.physics.add.sprite(-30, 10, 'tutorial').setOrigin(0, 0).setInteractive();
        this.tutorial.setScale(.9);

        // set background music
        this.backgroundMusic = this.sound.add('tutorialMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();

        // set play button
        this.play = this.physics.add.sprite(990, 620, 'play').setOrigin(0, 0).setInteractive();
        this.play.setScale(.8);
        this.play.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Play');
        })

    }


    update() {
        // play animations
        this.tutorialLayout.anims.play('layoutAnimation', true);
        this.tutorial.anims.play('tutorialAnimation', true);
        this.play.anims.play('playAnimation', true);
    }
}