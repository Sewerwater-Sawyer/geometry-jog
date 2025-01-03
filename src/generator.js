import { Cloud } from "./game-objects/cloud";
import { Obstacle } from "./game-objects/obstacle";
import { Coin } from "./game-objects/coin";

export class Generator {
	constructor(scene) {
		this.scene = scene;

		// call the init method after 2 seconds
		this.scene.time.delayedCall(2000, () => this.init(), undefined, this);
	}

	init() {
		console.log("Generator init");
		this.generateCloud();
		this.generateObstacle();
		this.generateCoin();
	}

	generateCloud() {
		new Cloud(this.scene);
		this.scene.time.delayedCall(
			Phaser.Math.Between(2000, 3000),
			() => this.generateCloud(),
			undefined,
			this
		);
	}

	generateObstacle() {
		this.scene.obstacles.add(new Obstacle(this.scene));

		this.scene.time.delayedCall(
			Phaser.Math.Between(1500, 2500),
			() => this.generateObstacle(),
			undefined,
			this
		);
	}

	generateCoin() {
		this.scene.coins.add(new Coin(this.scene));

		this.scene.time.delayedCall(
			Phaser.Math.Between(1500, 2500),
			() => this.generateCoin(),
			undefined,
			this
		);
	}
}