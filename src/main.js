/**
 * 
 * We used the following tutorial as a basis for our endless runner
 * https://www.emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/
 */

// object containing configuration options
let gameConfig = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scale: {
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Play],
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

game = new Phaser.Game(gameConfig);
// window.focus();
// resize();
// window.addEventListener("resize", resize, false);

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
