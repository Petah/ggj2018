const PowerUp = require('./power-up');

module.exports = class SpeedPowerUp extends PowerUp {
    constructor(
        game,
        x,
        y,
    ) {
        super(game, x, y, 0, 100, 10);
        this.duration = 5;
        this.speedMultiplier = 2;
        this.type = 'SpeedPowerUp';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);

        const collisions = this.game.collisions[this.id];
        let c = collisions.length;
        while (c--) {
            if (collisions[c].type === 'Unit') {
                if (!collisions[c].powerUp) {
                    const oldMaxSpeed = collisions[c].maxSpeed;
                    collisions[c].maxSpeed = collisions[c].maxSpeed * this.speedMultiplier;
                    collisions[c].powerUpTime = this.duration;
                    collisions[c].powerUp = () => {
                        collisions[c].maxSpeed = oldMaxSpeed;
                    };
                    this.game.removeGameObject(this);
                    return;
                }
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