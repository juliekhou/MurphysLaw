/**
 * TODO
 * We used the following tutorial as a basis for our endless runner
 * https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
 */

// object containing configuration options
let gameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Menu, Tutorial, Play, GameOver],
    backgroundColor: 0x444444,

    // physics settings
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

// create new game
game = new Phaser.Game(gameConfig);
