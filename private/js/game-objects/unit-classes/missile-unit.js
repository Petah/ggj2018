const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");
const collision = require("../../utilities/collision");
const MissileWeapon = require("./weapons/missile-weapon");

const sprites = {
    up: [6, 10],
    down: [5, 9],
    left: [7, 11],
    right: [8, 12],
}

module.exports = class MissileUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team
    ) {
        super(
            game,
            x,
            y,
            direction,
            sprites.up[team.id],
            xVelocity,
            yVelocity,
            team
        );
        this.weapon = new MissileWeapon(this.game, this);
        this.health = 10;
    }

    attack(direction) {
        this.weapon.attack(direction);
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        if (this.direction >= 230 && this.direction <= 320) {
            this.sprite = sprites.up[this.team.id];
        } else if (this.direction >= 140 && this.direction <= 230) {
            this.sprite = sprites.left[this.team.id];
        } else if (this.direction >= 50 && this.direction <= 140) {
            this.sprite = sprites.down[this.team.id];
        } else {
            this.sprite = sprites.right[this.team.id];
        }

        // const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        // let i = collisions.length;
        // while (i--) {
        //     if (collisions[i].id != this.id) {
        //         // collision
        //     }
        // }
    }
}
