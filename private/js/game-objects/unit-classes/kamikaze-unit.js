const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");
const collision = require("../../utilities/collision");

module.exports = class KamikazeUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team,
        teamColor) {
            super(
                game,
                x,
                y,
                direction,
                sprite,
                xVelocity,
                yVelocity,
                team,
                teamColor,
                );
        let weaponArray = [];
    }

    attack() {
        this.game.gameObjects.push(new KamikazeProjectile(this.game, this.x, this.y, 0, 1));
    }

    onDie() {
        this.attack();
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;
        while (i--) {
            if (collisions[i].id != this.id) {
                // collision
            }
        }
    }
}
