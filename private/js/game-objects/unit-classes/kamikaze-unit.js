const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");
const collision = require("../../utilities/collision");

const sprites = {
    up: [21, 31],
    down: [20, 30],
    left: [22, 32],
    right: [23, 33],
};

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
        teamColor
    ) {
        super(
            game,
            x,
            y,
            direction,
            sprites.up[team.id],
            xVelocity,
            yVelocity,
            team,
            teamColor,
        );
        this.type = 'unit';
        this.subType = 'kamikaze';
        this.health = 10;
        this.collisionRadius = 80;
    }

    attack() {
        this.game.gameObjects.push(new KamikazeProjectile(this.game, this.x, this.y, 0, 1));
    }

    onDie() {
        this.attack();
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;
        while (i--) {
            if (collisions[i].id != this.id) {
                // collision
            }
        }
    }
}
