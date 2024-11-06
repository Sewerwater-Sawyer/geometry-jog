// //@ts-check
export class Player extends Phaser.GameObjects.Rectangle {
  constructor(gameScene, x, y) {
    super(gameScene, x, y, 32, 32, 0x00ff00);

    this.setOrigin(0.5);

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this);

    this.body.collideWorldBounds = true;

    this.setScale(1);

    this.scene.input.on("pointerdown", () => this.jump(), this);

    this.space = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.jumpTween = this.scene.tweens.add({
      targets: this,
      duration: 1000,
      repeat: -1,
      angle: { from: 0, to: 360 },
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.jump();
    } else if (this.body.blocked.down) {
      this.jumpTween.restart();
      this.rotation = 0;
    }
  }

  jump() {
    if (!this.body.blocked.down) {
      return;
    }

    this.body.setVelocityY(-350);
    this.jumpTween.restart();
  }
}
