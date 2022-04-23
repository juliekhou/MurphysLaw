// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    jumps: 2
}

let gameOver = false;

// window.onload = function() {

//     // object containing configuration options
//     let gameConfig = {
//         type: Phaser.AUTO,
//         width: 1334,
//         height: 750,
//         scene: playGame,
//         backgroundColor: 0x444444,

//         // physics settings
//         physics: {
//             default: "arcade"
//         }
//     }
//     game = new Phaser.Game(gameConfig);
//     window.focus();
//     resize();
//     window.addEventListener("resize", resize, false);
// }

// playGame scene
class Play extends Phaser.Scene{
    constructor(){
        super("Play");
    }
    preload(){
        this.load.image("platform", "./assets/platform.png");
        this.load.image("player", "./assets/player.png");
        this.load.image("background", "./assets/background.png");
    }
    create(){

        gameOver = false;

        // background
        this.background = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);

        // group with all active platforms.
        this.platformGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });

        // pool
        this.platformPool = this.add.group({

            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        // number of consecutive jumps made by the player (for double jump)
        this.playerJumps = 0;

        // adding a platform to the game, the arguments are platform width and x position
        // this.addPlatform(game.config.width, game.config.width / 2);
        this.platformWidth = 105;
        this.platformHeight = 960 - 77;
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
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "player");
        this.player.setGravityY(gameOptions.playerGravity);

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        // flower pot stuff
        // this.pot1 = new FlowerPot(this, 500, 0, 'player', 0).setOrigin(0,0);
        // this.pot1.setGravityY(250);
        // this.pot1.setInteractive();
        // this.pot1.on('pointerdown', (pointer)=> {this.clickPot(this.pot1, pointer)});
        // this.physics.add.overlap(this.player, this.pot1, this.hitPot);

        this.drop = 3000;
        this.pot1;
        this.potClock = this.time.addEvent({
            delay: this.drop,
            callback: () => {
                    this.pot1 = new FlowerPot(this, 500, 0, 'player', 0).setOrigin(0,0);
                    this.pot1.setGravityY(250);
                    this.pot1.setVelocityX(-125);
                    this.pot1.setInteractive();
                    this.pot1.on('pointerdown', (pointer)=> {this.clickPot(this.pot1, pointer)});
                    this.physics.add.overlap(this.player, this.pot1, this.hitPot);
                },
            callbackScope: this,
            loop: true
        });

        // checking for input
        this.input.on("pointerdown", this.jump, this);

        //initialize score
        this.p1Score = 0;
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
        this.scoreLeft = this.add.text(0, 100, "Days Survived: " + this.p1Score, scoreConfig);
        
        // days survived clock
        this.day = 30000;
        this.clock = this.time.addEvent({delay: this.day, callback: () => {this.p1Score += 1;}, callbackScope: this, loop: true});
    }

    // the core of the script: platform are added from the pool or created on the fly
    // addPlatform(platformWidth, posX){
    //     let platform;
    //     if(this.platformPool.getLength()){
    //         platform = this.platformPool.getFirst();
    //         platform.x = posX;
    //         platform.active = true;
    //         platform.visible = true;
    //         this.platformPool.remove(platform);
    //     }
    //     else{
    //         platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
    //         platform.setImmovable(true);
    //         platform.setVelocityX(gameOptions.platformStartSpeed * -1);
    //         this.platformGroup.add(platform);
    //     }
    //     platform.displayWidth = platformWidth;
    //     this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    // }

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump(){
        // if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
        //     if(this.player.body.touching.down){
        //         this.playerJumps = 0;
        //     }
        //     this.player.setVelocityY(gameOptions.jumpForce * -1);
        //     this.playerJumps ++;
        // }
    }

    clickPot(pot, pointer){
        console.log("hit");
        pot.destroy();
    }

    hitPot(){
        gameOver = true;
    }


    update(){

        // move background
        this.background.tilePositionX += 2;

        // if (this.timeR%3 == 0){
        //     this.p1Score += 1;
            this.scoreLeft.text = "Days Survived: " + this.p1Score;
        // }

        // game over
        if(gameOver){
            this.scene.start("Play");
        }
        // if(this.player.y > game.config.height){
        //     this.scene.start("Play");
        // }

        this.player.x = gameOptions.playerStartPosition;

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

        // this.pot1.update();

        // recycling platforms
        // let minDistance = game.config.width;
        // this.platformGroup.getChildren().forEach(function(platform){
        //     let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
        //     minDistance = Math.min(minDistance, platformDistance);
        //     if(platform.x < - platform.displayWidth / 2){
        //         this.platformGroup.killAndHide(platform);
        //         this.platformGroup.remove(platform);
        //     }
        // }, this);

        // // adding new platforms
        // if(minDistance > this.nextPlatformDistance){
        //     var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
        //     this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        // }
    }
};
// function resize(){
//     let canvas = document.querySelector("canvas");
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;
//     let windowRatio = windowWidth / windowHeight;
//     let gameRatio = game.config.width / game.config.height;
//     if(windowRatio < gameRatio){
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else{
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }
