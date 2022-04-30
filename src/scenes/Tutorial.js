class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        this.backgroundMusic = this.sound.add('tutorialMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();

        this.play = this.physics.add.sprite(900, 600, 'play').setOrigin(0, 0).setInteractive();
        this.play.on('pointerdown', ()=> {
            this.sound.play('sfx_select');
            this.backgroundMusic.stop();
            this.scene.start('Play');
        })

    }


    update() {
    }
}