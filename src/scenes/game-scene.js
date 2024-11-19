import { HEIGHT, WIDTH } from "../constants";
import { Player } from "../game-objects/player";
import { Generator } from "../generator";

export class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "game" });

		this.obstacles;
		this.score = 0;
	}

	preload() {
		// this will get called by phaser
		// automatically when the scene loads

		this.score = 0;
		this.registry.set("score", "0");

		// load font
		this.load.bitmapFont(
			"arcade",
			"/assets/fonts/arcade.png",
			"/assets/fonts/arcade.xml"
		);

		this.load.audio("jump", "/assets/sounds/jump.mp3");

		this.load.spritesheet("coin", "/assets/images/coin.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
	}

	create() {
		// set background color
		this.cameras.main.setBackgroundColor(0x222222);

		this.obstacles = this.add.group();
		this.coins = this.add.group();
		this.generator = new Generator(this);

		this.player = new Player(this, WIDTH / 4, HEIGHT / 2);

		const coinAnim = this.anims.create({
			key: "coin",
			frames: this.anims.generateFrameNumbers("coin", {
				start: 0,
				end: 7,
			}),
			frameRate: 8,
		});

		this.physics.add.collider(
			this.player,
			this.obstacles,
			this.hitObstacle,
			() => {
				return true;
			},
			this
		);

		this.physics.add.overlap(
			this.player,
			this.coins,
			this.hitCoin,
			() => {
				return true;
			},
			this
		);

		this.scoreText = this.add.bitmapText(
			WIDTH / 2,
			10,
			"arcade",
			this.score,
			20
		);

		this.scoreUpdateEvent = this.time.addEvent({
			delay: 500,
			callback: () => this.updateScore(),
			callbackScope: this,
			loop: true,
		});
	}

	update() {
		this.player.update();
	}

	hitObstacle(player, obstacle) {
		console.log("player hit");
		this.scene.start("gameover");
	}

	hitCoin(player, coin) {
		this.updateScore(10);
		coin.destroy();
	}

	updateScore(points = 1) {
		this.score += points;
		this.registry.set("score", this.score);
		this.scoreText.setText(this.score);
	}
}