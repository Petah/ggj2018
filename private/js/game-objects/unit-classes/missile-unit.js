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
        this.maxSpeed = 200;
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
                const direction = this.direction + (Math.random() * 20 - 10);
                this.game.gameObjects.push(new MissileProjectile(this.game, this.x, this.y, math.lengthDirX(1000, direction), math.lengthDirY(1000, direction), this));
                this.shootingCooldown = 0.05;
            }
        }
        this.shootingCooldown -= deltaTime;
    }

    ai() {
        this.shooting = false;
        const target = this.findTarget();
        if (target) {
            const direction = math.pointDirection(this.x, this.y, target.x, target.y);
            const distance = math.pointDistance(this.x, this.y, target.x, target.y);
            if (distance < 300) {
                if (Math.abs(direction - this.direction) < 30) {
                    this.shooting = true;
                } else {
                    this.accelerate(math.lengthDirX(1000, -direction), math.lengthDirY(1000, -direction));
                }
            } else {
                this.accelerate(math.lengthDirX(1000, direction), math.lengthDirY(1000, direction));
            }
        }
    }

    findTarget() {
        let targets = [];
        let g = this.game.gameObjects.length;
        while (g--) {
            if (this.game.gameObjects[g].type == 'Unit' && this.game.gameObjects[g].team.id != this.team.id) {
                targets.push(this.game.gameObjects[g]);
            }
        }
        let closestDistance = null;
        let closest = null;
        let c = targets.length;
        while (c--) {
            const distance = math.pointDistance(this.x, this.y, targets[c].x, targets[c].y);
            if (!closest || distance < closestDistance) {
                closest = targets[c];
                closestDistance = distance;
            }
        }
        return closest;
    }
}
