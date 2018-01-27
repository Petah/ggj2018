const PowerUp = require('./power-up');

module.exports = class SpeedPowerUp extends PowerUp {
    constructor(
        game,
        x,
        y,
    ) {
        super(game, x, y, 0, 100, 20);
        this.duration = 5;
        this.speedIncrease = 5;
        this.timeElapsed = 0;
        this.isActive = false;
        this.type = 'SpeedPowerUp';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);

        const collisions = this.game.collisions[this.id];
        let c = collisions.length;
        while (c--) {
            if (collisions[c].type === 'Unit') {
                this.game.removeGameObject(this);
            }
        }
    }

    onCollisionWithUnit(unit) {
        if (!this.isActive) {
            this.isActive = true;
            this.unit = unit;
            this.unit.xVelocity += this.speedIncrease;
            this.unit.yVelocity += this.speedIncrease;
        }
        //destroy()?? dont wanna render anymore
    }
}