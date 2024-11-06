import { Player } from "../game-objects/player";
import { Generator } from "../generator";
import { WIDTH, HEIGHT } from "../constants";


export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: "game" });
    }

    prelode() {}
    
    create() {
        
        this.cameras.main.setBackgroundColor(0x222222);

        this.Generator = new Generator (this);

        this.player = new Player (this, WIDTH / 2, HEIGHT / 2);
    }

    update () {
        this.player.update();
    }
}
