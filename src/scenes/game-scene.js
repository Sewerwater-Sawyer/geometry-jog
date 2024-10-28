export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: "game" });
    }

    prelode() {}
    
    create() {
        this.cameras.main.setBackgroundColor(0x87ceeb);
    }
}
