import { Player } from "../game-objects/player";

export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: "game" });
    }

    prelode() {}
    
    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.cameras.main.setBackgroundColor(0x000000);

        this.player = new Player (this, this.width / 2, this.height / 2);
    }

    update () {
        this.player.update();
    }
}
