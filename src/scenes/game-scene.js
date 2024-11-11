import { Player } from "../game-objects/player";
import { Generator } from "../generator";
import { WIDTH, HEIGHT } from "../constants";


export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: "game" });

        this.obstacles;
    }

    prelode() {}
    
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
    }

    update () {
        this.player.update();
    }

    hitObstacle (player, obstacle) {
        console.log ("player hit")
    }
}
