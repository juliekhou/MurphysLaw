class Play extends Phaser.Scene{
    constructor(){
        super("Play");
    }
    preload(){
        // load images
        this.load.image("platform", "./assets/platform.png");
        // this.load.image("pot", "./assets/flowerPot.png");

        // load spritesheets
        this.load.atlas('player_atlas', './assets/player.png', './assets/player.json');
        this.load.spritesheet('angel', './assets/angel.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('poof', './assets/potPoof.png', {frameWidth: 76, frameHeight: 140, startFrame: 0, endFrame: 6});
        this.load.spritesheet('pot', './assets/pot.png', {frameWidth: 64, frameHeight: 128, startFrame: 0, endFrame: 8});
    }
    create(){
        // variable for game over state
        gameOver = false;

        // variable for player being hit state (before game over) (transition state)
        playerHit = false;

        // background
        this.background = this.add.tileSprite(0, -240, 1280, 960, 'background').setOrigin(0, 0);

        // group for platforms
        this.platformGroup = this.add.group({});

        // adding a platform to the game, the arguments are platform width and x position
        this.platformWidth = 1280;
        this.platformHeight = 720 -77;
        this.platform1 = new Platform(this, 0, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform1.setImmovable(true);
        this.platform2 = new Platform(this, this.platformWidth - 10, this.platformHeight, 'platform', 0).setOrigin(0,0);
        this.platform2.setImmovable(true);

        // adding platforms to platform group
        this.platformGroup.add(this.platform1);
        this.platformGroup.add(this.platform2);

        // adding the player
        this.playerStartPosition = 200;
        this.player = this.physics.add.sprite(this.playerStartPosition, this.platformHeight - 55, "player_atlas", "player1");
        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('player_atlas', {      
                prefix: 'player',
                start: 1,
                end: 8,
                suffix: '',
            }), 
            frameRate: 10,
            repeat: -1 
        });
        
        // adding the angel
        this.angel = this.physics.add.sprite(400, 300, 'angel');
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('angel', { start: 0, end: 1, first: 0}),
            frameRate: 10
        });

        // angel to follow pointer when the pointer is clicked
        this.pointerX;
        this.pointerY;
        this.input.on('pointerdown', (pointer)=> {
                this.physics.moveToObject(this.angel, pointer, 550);
                this.pointerX = pointer.x;
                this.pointerY = pointer.y;
        });

        // adding flower pot animations
        this.anims.create({
            key: 'poof',
            frames: this.anims.generateFrameNumbers('poof', { start: 0, end: 6, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'destroy',
            frames: this.anims.generateFrameNumbers('pot', { start: 0, end: 8, first: 0}),
            frameRate: 15
        });

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        // display score
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: 5,
            fixedWidth: 0,
            fontStyle: 'bold'
        }
        // initialize score
        day = 0;
        this.scoreLeft = this.add.text(0, 50, "Days Survived: " + day, scoreConfig);
        
        // days survived clock
        this.dayLength = 10000;
        this.clock = this.time.addEvent({delay: this.dayLength, callback: () => {day += 1;}, callbackScope: this, loop: true});

        // clock to randomly spawn the pots
        this.second = 1000;
        this.timer = 0;
        this.spawnRate1 = 3;
        this.lastSpawnTime1 = 0;
        this.spawnRate2 = 10;
        this.lastSpawnTime2 = 0;
        this.spawnRate3 = 15;
        this.lastSpawnTime3 = 0;
        this.clock = this.time.addEvent({delay: this.second, callback: this.spawnPot, callbackScope: this, loop: true});

        // looping background music
        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.play();
    }

    update(){
        // move background
        this.background.tilePositionX += 2;

        // play animations
        this.player.anims.play('walk', true);
        this.angel.anims.play('idle', true);

        // display score
        this.scoreLeft.text = "Days Survived: " + day;

        // game over
        if(gameOver){
            this.backgroundMusic.stop();
            this.scene.start('GameOver');
        }

        // NPC's position on the screen
        this.player.x = this.playerStartPosition;

        // move platforms
        this.platform1.update();
        this.platform2.update();

        //  stop moving angel if touching pointer
        if (this.angel.getBounds().contains(this.pointerX, this.pointerY)) {
            this.angel.setVelocity(0, 0);
        }

        // if angel is moving to the left, the sprite is flipped
        if(this.angel.body.velocity.x < 0) {
            this.angel.flipX = true;
        } else {
            this.angel.flipX = false;
        }
    }

    // function for clicking a flower pot
    clickPot(pot, pointer){
        // player can click pot if murphy is not hit
        if(!playerHit){

            // play sound
            this.sound.play('clickPot');

            // move angel to where pointer was clicked
            this.physics.moveToObject(this.angel, pointer, 550);
            this.pointerX = pointer.x;
            this.pointerY = pointer.y;

            // destroy pot
            pot.destroy();

            // create poof sprite at pot's position
            let poof = this.add.sprite(pot.x, pot.y, 'poof').setOrigin(0, 0);

            // play poof animation
            poof.anims.play('poof');

            // callback after anim completes            
            poof.on('animationcomplete', () => { 
                // remove poof sprite                    
                poof.destroy();      
                this.clock.paused = false;             
            });
        }
    }

    // function for player collision with flower pot
    hitPot(pot){
        // stops clock & pots from spawning
        this.clock.paused = true;

        // set player hit to true
        playerHit = true;

        // stops pot from continuing to move
        pot.body.stop();
        pot.body.allowGravity = false;

        // play destroy pot animation once
        if (!pot.anims.isPlaying) {
            pot.play("destroy");
        }

        // stops murphy's animation
        this.player.anims.stop();

        // set game over to true & plays sound when animation stops
        pot.on('animationcomplete', () => {       
            this.sound.play('gameOver');           
            gameOver = true;                      
        });
    }

    // function for randomly spawning the pots
    spawnPot(){
        //increase timer
        this.timer += 1;

        // pot 1
        this.spawnRateMax1 = 8;
        this.spawnRateMin1 = 4;

        // check if its time to spawn pot 1
        if((this.timer - this.lastSpawnTime1) == this.spawnRate1){
            // create flower pot 1
            this.pot1 = new FlowerPot(this, 500, 0, 'pot', 0).setOrigin(0,0);

            // add collision b/w player and pot 1
            this.physics.add.overlap(this.player, this.pot1, ()=> {this.hitPot(this.pot1)});

            //checking for input
            this.pot1.on('pointerdown', (pointer)=> {this.clickPot(this.pot1, pointer)});

            // set physics attributes
            this.pot1.setGravityY(250);
            this.pot1.setVelocityX(-175);

            // making pot 1 interactable
            this.pot1.setInteractive();

            // set the last spawn time for pot 1
            this.lastSpawnTime1 = this.timer;

            // setting random spawn rates
            if(day < 0){
                this.spawnRate1 = 3;
            } else {
                this.pot1Chance =  Math.ceil(Math.random() * day);
                this.spawnRate1 = Math.max(this.spawnRateMax1 - this.pot1Chance, this.spawnRateMin1);
            }
        }

        // pot 2 max & min
        this.spawnRateMax2 = 6;
        this.spawnRateMin2 = 3;
        
        // check if its time to spawn pot 2
        if((this.timer - this.lastSpawnTime2) == this.spawnRate2){
            // create flower pot 2
            this.pot2 = new FlowerPot(this, 800, 0, 'pot', 0).setOrigin(0,0);

            //checking for input
            this.pot2.on('pointerdown', (pointer)=> {this.clickPot(this.pot2, pointer)});

            // add collision b/w player and pot 2
            this.physics.add.overlap(this.player, this.pot2, () => {this.hitPot(this.pot2)});

            // set physics attributes
            this.pot2.setGravityY(200);
            this.pot2.setVelocityX(-300);

            // make pot 2 interactive
            this.pot2.setInteractive();

            // set last spawn time for pot 2
            this.lastSpawnTime2 = this.timer;

            // setting random spawn rates for pot 2
            if(day > 1){
                this.pot2Chance =  Math.ceil(Math.random() * day);
                this.spawnRate2 = Math.max(this.spawnRateMax2 - this.pot2Chance, this.spawnRateMin2);
            }
        }

        // pot 3 min & max
        this.spawnRateMax3 = 6;
        this.spawnRateMin3 = 3;
        
        // check if its time to spawn pot 3
        if((this.timer - this.lastSpawnTime3) == this.spawnRate3){
            // create pot 3
            this.pot3 = new FlowerPot(this, 1200, 0, 'pot', 0).setOrigin(0,0);

            //checking for input
            this.pot3.on('pointerdown', (pointer)=> {this.clickPot(this.pot3, pointer)});

            // checking for collision
            this.physics.add.overlap(this.player, this.pot3, () => {this.hitPot(this.pot3)});

            // set physics attributes
            this.pot3.setGravityY(200);
            this.pot3.setVelocityX(-500);

            // make pot 3 interactive
            this.pot3.setInteractive();

            // set last spawn time
            this.lastSpawnTime3 = this.timer;

            // setting random spawn rates
            if(day > 2){
                this.pot3Chance =  Math.ceil(Math.random() * day);
                this.spawnRate3 = Math.max(this.spawnRateMax3 - this.pot3Chance, this.spawnRateMin3);
            }
        } 
    }
};

