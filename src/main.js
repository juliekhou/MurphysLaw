/**
 * Collaborator Names: Anika Mahajan, Julie Khou, Justin Beedle
 * Game Title: Murphy’s Law
 * Date Completed: May 1st 2022
 * 
 * Creative Tilt Justification:
 *  - Technically Interesting
 *      - Made angel follow mouse movement using physics.moveToObject() 
 *      - Stopped the angel if it hits the cursor and flip the angel based on what direction it’s moving
 *      - Created random spawning intervals for the flower pots between three different spawning points for flower pots
 *  - Style
 *      - Subversed endless runner genre where players are unable to move the running character to avoid obstacles
 *      - Maintain a consistent visual style with amazing pixel art (thank you Justin!)
 * 
 * We used the following tutorial as a basis for our endless runner
 * https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
 */

// object containing game configuration options
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
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

// create new game
game = new Phaser.Game(gameConfig);

// player score declaration
let day;
// state variable declaration
let gameOver, playerHit;