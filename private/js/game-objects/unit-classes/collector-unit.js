const Unit = require("./unit");
const SatelliteStack = require('../../game-objects/powerups/satellite-stack')

const sprites = {
    up: [6, 10],
    down: [5, 9],
    left: [7, 11],
    right: [8, 12],
    upMove: [6, 10],
    downMove: [5, 9],
    leftMove: [7, 11],
    rightMove: [8, 12],
};

module.exports = class CollectorUnit extends Unit {
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
            2,
            xVelocity,
            yVelocity,
            team,
        );
        this.health = 10;
        this.hasPart = false;
        this.part = null;
        this.canPickUpPart = false;
        this.canAddToStack = false;
        this.canStealFromStack = false;
        this.timeToSteal = 3000;
        this.timeElapsed = 0;
        this.isStealing = false;
        this.type = 'unit';
        this.subType = 'collector';
        this.collisionRadius = 55;
    }

    attack() {
        if (this.canPickUpPart && !this.hasPart) {
            this.pickupPart();
        }  else if (this.canStealFromStack && !this.hasPart) {
            this.isStealing = true;
        } else if (this.hasPart) {
            this.placePart();
        }
    }

    onDie() {
        //
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        const collisions = this.game.collisions[this.id];
        let i = collisions.length;

        let noPartCollision = true;
        let noStackCollision = true;
        let stack = null;
        while (i--) {
            if (collisions[i].id !== this.id) {
                switch(collisions[i].type) {
                    case 'SatellitePart':
                        this.canPickUpPart = true;
                        this.part = collisions[i];
                        noPartCollision = false;
                    case 'SatelliteStack':
                        stack = collisions[i];
                        if (collisions[i].team === this.team) {
                            this.canAddToStack = true;
                            noStackCollision = false;
                        } else {
                            this.canStealFromStack = true;
                        }
                        break;
                }
            }
        }

        if (noPartCollision) {
            this.canPickUpPart = false;
            this.part = null;
        }

        if (noStackCollision) {
            this.canAddToStack = false;
            this.canStealFromStack = false;
            this.isStealing = false;
            this.timeElapsed = 0;
        }

        if (this.isStealing) {
            this.timeElapsed += deltaTime;
            if (this.timeElapsed >= this.timeToSteal) {
                this.hasPart = true;
                if (stack !== null) {
                    stack.removePart();
                }
            }
        }
    }

    ai() {
        this.accelerate(0, 1);
    }

    pickupPart() {
        this.hasPart = true;
        this.canPickUpPart = false;
        this.game.removeGameObject(this.part);
        this.part = null;
    }

    placePart() {
        if (this.team.satelliteStack === null) {
            this.team.satelliteStack = new SatelliteStack(
                this.game,
                this.x,
                this.y,
                this.direction,
                'satellite-part-spritesprite',
                this.collisionRadius);
        } else if (this.canAddToStack) {
            this.team.satelliteStack.addPart(this.team);
        }
    }
}
