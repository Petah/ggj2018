const Unit = require("./unit");
const MissileProjectile = require('./missile-projectile');
const math = require('../../utilities/math');

const sprites = {
    up: [41, 51],
    down: [40, 50],
    left: [42, 52],
    right: [43, 53],
    upMove: [],
    downMove: [],
    leftMove: [],
    rightMove: [],
};

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
        this.health = 10;
        this.maxHealth = 10;
        this.collisionRadius = 80;
        this.type = 'Unit';
        this.subType = 'MissileUnit';
        this.shootingCooldown = 0;
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        if (this.shooting) {
            if (this.shootingCooldown <= 0) {
                this.game.gameObjects.push(new MissileProjectile(this.game, this.x, this.y, math.lengthDirX(1000, this.direction), math.lengthDirY(1000, this.direction), this));
                this.shootingCooldown = 0.05;
            }
        }
        this.shootingCooldown -= deltaTime;
    }
}
