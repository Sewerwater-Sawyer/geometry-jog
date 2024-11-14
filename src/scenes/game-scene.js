import { Player } from "../game-objects/player";
import { Generator } from "../generator";
import { WIDTH, HEIGHT } from "../constants";


export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: "game" });

        this.obstacles;
        this.score = 0;
    }

    preload() {

        this.score = 0;
        this.registry.set ("score", "0");

        this.load.bitmapFont (
            "arcade",
            "/assets/fonts/arcade.png",
            "/assets/fonts/arcade.xml"

        
         );
    }
    
    create() {
        
        this.cameras.main.setBackgroundColor(0x222222);

        this.obstacles = this.add.group();

        this.Generator = new Generator (this);

        this.player = new Player (this, WIDTH / 2, HEIGHT / 2);

        this.physics.add.collider (
            this.player, 
            this.obstacles, 
            this.hitObstacle, 
            () => { return true; },
            this
        );

        this.scoreText = this.add.bitmapText (
            WIDTH / 2,
            0,
            "arcade",
            this.score,
             20
            );

            this.scoreUpdateEvent = this.time.addEvent ({
                delay: 1000,
                callback: () => this.updateScore(),
                callbackScope: this,
                loop: true
            });
    }

    update () {
        this.player.update();
    }

    hitObstacle (player, obstacle) {
        console.log ("player hit");
        this.scene.start("gameover");
    }

    updateScore (points = 1) {
        this.score += points;
        this.registry.set ("score", this.score);
        this.scoreText.setText (this.score);
    }
}
