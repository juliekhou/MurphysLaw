class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        // load audio

        // load background
        this.load.image('background', './assets/background.png');
        this.load.image('title', './assets/title.png');
        this.load.image('tutorial', './assets/tutorial.png');
        this.load.image('play', './assets/play.png');
    }

    create() {
        // add background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        //width: 800 px
        this.title = this.add.sprite(240, 100, 'title').setOrigin(0, 0);

        //height: 60 px
        this.tutorial = this.physics.add.sprite(452, 400, 'tutorial').setOrigin(0, 0).setInteractive();
        this.play = this.physics.add.sprite(542, 500, 'play').setOrigin(0, 0).setInteractive();

        this.tutorial.on('pointerdown', ()=> {this.scene.start('Tutorial');});
        this.play.on('pointerdown', ()=> {this.scene.start('Play');});
        
    }


    update() {

    }
}