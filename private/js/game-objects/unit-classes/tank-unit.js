const Unit = require("./unit");
const math = require('../../utilities/math');

const sprites = {
    up: [61, 71],
    down: [60, 70],
    left: [63, 73],
    right: [62, 72],
    upMove: [61, 71],
    downMove: [60, 70],
    leftMove: [63, 73],
    rightMove: [62, 72],
};

module.exports = class TankUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team,
    ) {
        super(
            game,
            x,
            y,
            direction,
            1,
            xVelocity,
            yVelocity,
            team,
        );
        this.health = 100;
        this.maxHealth = 100;
        this.maxSpeed = 110;
        this.collisionRadius = 80;
        this.type = 'Unit';
        this.subType = 'TankUnit';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        if (this.shooting) {
            const collisions = this.game.collisions[this.id];
            let c = collisions.length;
            while (c--) {
                if (collisions[c].type === 'Unit' && collisions[c].team.id !== this.team.id) {
                    const direction = math.pointDirection(this.x, this.y, collisions[c].x, collisions[c].y);
                    collisions[c].accelerate(math.lengthDirX(1000, direction), math.lengthDirY(1000, direction));
                    collisions[c].getHurt(this, Math.random());

                    this.game.server.send('blood', {
                        x: collisions[c].x,
                        y: collisions[c].y,
                    });
                }
            }
        }
    }

    ai() {
        const target = this.findTarget();
        if (target) {
            const direction = math.pointDirection(this.x, this.y, target.x, target.y);
            const distance = math.pointDistance(this.x, this.y, target.x, target.y);
            if (distance < 100) {
                this.shooting = true;
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
