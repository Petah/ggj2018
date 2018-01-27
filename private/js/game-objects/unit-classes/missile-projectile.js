const MovableGameObject = require("../movable-game-object")

const sprites = [
    [300, 310],
    [301, 311],
    [302, 312],
    [303, 313],
];

module.exports = class MissileProjectile extends MovableGameObject {
    constructor(game,
                x,
                y,
                xVelocity,
                yVelocity,
                unit) {
        super(game, x, y, 0, sprites[Math.floor(Math.random() * 4)][unit.team.id]);
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

        const collisions = this.game.collisions[this.id];
        let i = collisions.length;

        while (i--) {
            if (collisions[i].type === 'Unit' && collisions[i].team.id !== this.unit.team.id) {
                collisions[i].getHurt(this, Math.random());
                this.game.removeGameObject(this);
            } else if (collisions[i].type === 'Unit' && collisions[i].team.id === this.unit.team.id && collisions[i].id !== this.unit.id) {
                collisions[i].getHurt(this, -(Math.random() / 2));
                this.game.removeGameObject(this);
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
