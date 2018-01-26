const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");
const collision = require("../../utilities/collision");
const MissileWeapon = require("./weapons/missile-weapon");

module.exports = class MissileUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        player,
    ) {
        super(
            game,
            x,
            y,
            direction,
            5,
            xVelocity,
            yVelocity,
            player,
        );
        this.weapon = new MissileWeapon(this.game, this);
    }

    attack(direction) {
        this.weapon.attack(direction);
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        if (this.direction >= 225 && this.direction <= 315) {
            // Up
            this.sprite = 6;
        } else if (this.direction >= 135 && this.direction <= 225) {
            // Left
            this.sprite = 7;
        } else if (this.direction >= 45 && this.direction <= 135) {
            // Down
            this.sprite = 5;
        } else {
            // Right
            this.sprite = 8;
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
