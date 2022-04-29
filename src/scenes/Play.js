// global game options
// move this to menu.js
let gameOptions = {
    playerGravity: 900,
    playerStartPosition: 200
}

let gameOver = false;


// play game scene
class Play extends Phaser.Scene{
    constructor(){
        super("Play");
    }
    preload(){
        // load images
        this.load.image("platform", "./assets/platform.png");
        this.load.image("pot", "./assets/flowerPot.png");

        this.load.spritesheet('player', './assets/player.png', {frameWidth: 50, frameHeight: 120, startFrame: 0, endFrame: 7});
        this.load.spritesheet('angel', './assets/angel.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});

        //load sounds
    }
    create(){
        // variable for game over state
        gameOver = false;

        // background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        // // group with all active platforms.
        this.platformGroup = this.add.group({});

        // adding a platform to the game, the arguments are platform width and x position
        this.platformWidth = 105;
        this.platformHeight = 720 - 77;
        this.platform1 = new Platform(this, 0, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform1.setImmovable(true);
        this.platform2 = new Platform(this, this.platformWidth, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform2.setImmovable(true);
        this.platform3 = new Platform(this, this.platformWidth*2, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform3.setImmovable(true);
        this.platform4 = new Platform(this, this.platformWidth*3, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform4.setImmovable(true);
        this.platform5 = new Platform(this, this.platformWidth*4, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform5.setImmovable(true);
        this.platform6 = new Platform(this, this.platformWidth*5, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform6.setImmovable(true);
        this.platform7 = new Platform(this, this.platformWidth*6, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform7.setImmovable(true);
        this.platform8 = new Platform(this, this.platformWidth*7, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform8.setImmovable(true);
        this.platform9 = new Platform(this, this.platformWidth*8, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform9.setImmovable(true);
        this.platform10 = new Platform(this, this.platformWidth*9, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform10.setImmovable(true);
        this.platform11 = new Platform(this, this.platformWidth*10, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform11.setImmovable(true);
        this.platform12 = new Platform(this, this.platformWidth*11, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform12.setImmovable(true);
        this.platform13 = new Platform(this, this.platformWidth*12, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform13.setImmovable(true);

        this.platformGroup.add(this.platform1);
        this.platformGroup.add(this.platform2);
        this.platformGroup.add(this.platform3);
        this.platformGroup.add(this.platform4);
        this.platformGroup.add(this.platform5);
        this.platformGroup.add(this.platform6);
        this.platformGroup.add(this.platform7);
        this.platformGroup.add(this.platform8);
        this.platformGroup.add(this.platform9);
        this.platformGroup.add(this.platform10);
        this.platformGroup.add(this.platform11);
        this.platformGroup.add(this.platform12);
        this.platformGroup.add(this.platform13);

        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.platformHeight - 55, "player");
        //this.player.setGravityY(gameOptions.playerGravity);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7, first: 0}),
            frameRate: 10
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('angel', { start: 0, end: 1, first: 0}),
            frameRate: 10
        });

        this.pointerX;
        this.pointerY;

        this.angel = this.physics.add.sprite(400, 300, 'angel');
        this.input.on('pointerdown', (pointer)=> {
                this.physics.moveToObject(this.angel, pointer, 550);
                this.pointerX = pointer.x;
                this.pointerY = pointer.y;
        });


        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9DEF9',
            color: '#EDE7B1',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        // initialize score
        this.day = 0;
        this.scoreLeft = this.add.text(0, 50, "Days Survived: " + this.day, scoreConfig);
        
        // days survived clock
        this.dayLength = 10000;
        this.clock = this.time.addEvent({delay: this.dayLength, callback: () => {this.day += 1;}, callbackScope: this, loop: true});

        // days survived clock
        this.second = 1000;
        this.timer = 0;
        this.spawnRate1 = 3;
        this.lastSpawnTime1 = 0;
        this.spawnRate2 = 10;
        this.lastSpawnTime2 = 0;
        this.spawnRate3 = 15;
        this.lastSpawnTime3 = 0;
        this.clock = this.time.addEvent({delay: this.second, callback: this.spawnPot, callbackScope: this, loop: true});
    }

    update(){
        // this.physics.moveToObject(game.angel, this.pointer, 300);
        // move background
        this.background.tilePositionX += 2;

        this.player.anims.play('walk', true);
        this.angel.anims.play('idle', true);

        // display score
        this.scoreLeft.text = "Days Survived: " + this.day;

        // game over
        if(gameOver){
            this.scene.start('GameOver');
        }

        // NPC's position on the screen
        this.player.x = gameOptions.playerStartPosition;

        // move platforms
        this.platform1.update();
        this.platform2.update();
        this.platform3.update();
        this.platform4.update();
        this.platform5.update();
        this.platform6.update();
        this.platform7.update();
        this.platform8.update();
        this.platform9.update();
        this.platform10.update();
        this.platform11.update();
        this.platform12.update();
        this.platform13.update();

        //  stop moving angel if touching pointer
        if (this.angel.getBounds().contains(this.pointerX, this.pointerY)) {
            this.angel.setVelocity(0, 0);
        }

        if(this.angel.body.velocity.x < 0) {
            this.angel.flipX = true;
        } else {
            this.angel.flipX = false;
        }
    }

    // function for clicking a flower pot
    clickPot(pot, pointer){
        pot.destroy();

        this.physics.moveToObject(this.angel, pointer, 550);
        this.pointerX = pointer.x;
        this.pointerY = pointer.y;
    }

    // function for player collision with flower pot
    hitPot(){
        gameOver = true;
    }

    spawnPot(){
        this.timer += 1;

        // pot 1
        this.spawnRateMax1 = 8;
        this.spawnRateMin1 = 4;

        
        if((this.timer - this.lastSpawnTime1) == this.spawnRate1){
            //height: 120 px
            this.pot1 = new FlowerPot(this, 500, 0, 'pot', 0).setOrigin(0,0);
            //checking for input
            this.pot1.on('pointerdown', (pointer)=> {this.clickPot(this.pot1, pointer)});
            this.physics.add.overlap(this.player, this.pot1, this.hitPot);
            this.pot1.setGravityY(250);
            this.pot1.setVelocityX(-150);
            this.pot1.setInteractive();
            this.lastSpawnTime1 = this.timer;

            if(this.day < 0){
                this.spawnRate1 = 3;
            } else {
                this.pot1Chance =  Math.ceil(Math.random() * this.day);
                this.spawnRate1 = Math.max(this.spawnRateMax1 - this.pot1Chance, this.spawnRateMin1);
            }
        }

        // pot 2
        this.spawnRateMax2 = 6;
        this.spawnRateMin2 = 3;
        
        if((this.timer - this.lastSpawnTime2) == this.spawnRate2){
            this.pot2 = new FlowerPot(this, 800, 0, 'pot', 0).setOrigin(0,0);
            //checking for input
            this.pot2.on('pointerdown', (pointer)=> {this.clickPot(this.pot2, pointer)});
            this.physics.add.overlap(this.player, this.pot2, this.hitPot);
            this.pot2.setGravityY(200);
            this.pot2.setVelocityX(-250);
            this.pot2.setInteractive();
            this.lastSpawnTime2 = this.timer;

            if(this.day > 1){
                this.pot2Chance =  Math.ceil(Math.random() * this.day);
                this.spawnRate2 = Math.max(this.spawnRateMax2 - this.pot2Chance, this.spawnRateMin2);
            }
        }

        // pot 3
        this.spawnRateMax3 = 6;
        this.spawnRateMin3 = 3;
        
        if((this.timer - this.lastSpawnTime3) == this.spawnRate3){
            this.pot3 = new FlowerPot(this, 1200, 0, 'pot', 0).setOrigin(0,0);
            //checking for input
            this.pot3.on('pointerdown', (pointer)=> {this.clickPot(this.pot3, pointer)});
            this.physics.add.overlap(this.player, this.pot3, this.hitPot);
            this.pot3.setGravityY(200);
            this.pot3.setVelocityX(-410);
            this.pot3.setInteractive();
            this.lastSpawnTime3 = this.timer;

            if(this.day > 2){
                this.pot3Chance =  Math.ceil(Math.random() * this.day);
                this.spawnRate3 = Math.max(this.spawnRateMax3 - this.pot3Chance, this.spawnRateMin3);
            }
        }
        
    }
};

