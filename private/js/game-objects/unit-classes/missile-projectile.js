const MovableGameObject = require("../movable-game-object")

module.exports = class MissileProjectile extends MovableGameObject {
    constructor(game,
                x,
                y,
                xVelocity,
                yVelocity,
                unit) {
        super(game, x, y, 0, 4);
        this.type = 'MissileProjectile';
        this.unit = unit;
        this.damage = 2;
        this.maxSpeed = 1000;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.friction = 0;
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        console.log(this.xVelocity, this.yVelocity);

        const collisions = this.game.collisions[this.id];
        let i = collisions.length;

        console.log(collisions);

        while (i--) {
            if (collisions[i].type === 'Unit' && collisions[i].team.id !== this.unit.team.id) {
                collisions[i].getHurt(this, 1);
            } else if (collisions[i].type === 'Collidable') {
                this.game.removeGameObject(this);
            } else if (collisions[i].type === 'MissileProjectile') {
                this.game.removeGameObject(collisions[i]);
                this.game.removeGameObject(this);
            }
        }

        if (this.x === 0 ||
            this.y === 0 ||
            this.x === this.game.mapWidth ||
            this.y === this.game.mapHeight) {
            this.game.removeGameObject(this)
        }
    }
}
