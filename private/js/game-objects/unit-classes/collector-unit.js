const logger = require('../../server/logger')(__filename);
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
        this.type = 'Unit';
        this.subType = 'CollectorUnit';
        this.collisionRadius = 40;
        this.attacking = false;
        this.collectState = null;
    }

    attack() {
        this.attacking = true;
        // if (this.canPickUpPart && !this.hasPart) {
        //     this.pickupPart();
        // }  else if (this.canStealFromStack && !this.hasPart) {
        //     this.isStealing = true;
        // } else if (this.hasPart) {
        //     this.placePart();
        // }
    }

    onDie() {
        //
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);


        // let noPartCollision = true;
        // let noStackCollision = true;
        // let stack = null;

        // const collisions = this.game.collisions[this.id];
        // let i = collisions.length;
        // while (i--) {
        //     switch(collisions[i].type) {
        //         case 'SatellitePart':
        //             this.canPickUpPart = true;
        //             this.part = collisions[i];
        //             noPartCollision = false;
        //             break;

        //         case 'SatelliteStack':
        //             stack = collisions[i];
        //             if (collisions[i].team === this.team) {
        //                 this.canAddToStack = true;
        //                 noStackCollision = false;
        //             } else {
        //                 this.canStealFromStack = true;
        //             }
        //             break;
        //     }
        // }

        // if (noPartCollision) {
        //     this.canPickUpPart = false;
        //     this.part = null;
        // }

        // if (noStackCollision) {
        //     this.canAddToStack = false;
        //     this.canStealFromStack = false;
        //     this.isStealing = false;
        //     this.timeElapsed = 0;
        // }

        // if (this.isStealing) {
        //     this.timeElapsed += deltaTime;
        //     if (this.timeElapsed >= this.timeToSteal) {
        //         this.hasPart = true;
        //         if (stack !== null) {
        //             stack.removePart();
        //         }
        //     }
        // }

        if (this.shooting) {
            switch (this.collectState) {
                case 'collecting': {
                    this.accelerate(0, 0);
                    this.collectTime -= deltaTime;
                    if (this.collectTime <= 0) {
                        this.game.removeGameObject(this.collectUnit);
                        this.hasPart = true;
                        this.collectState = null;
                        this.collectUnit = null;
                    }
                    break;
                }
                case 'stealing': {
                    break;
                }
                case 'placing': {
                    this.accelerate(0, 0);
                    this.collectTime -= deltaTime;
                    if (this.collectTime <= 0) {
                        if (this.collectUnit === true) {
                            const stack = new SatelliteStack(
                                this.game,
                                this.x,
                                this.y,
                                this.team,
                            );
                            this.game.gameObjects.push(stack);
                        }

                        this.hasPart = false;
                        this.collectState = null;
                        this.collectUnit = null;
                    }
                    break;
                }
                default: {
                    let collision;
                    if (collision = this.canCollect()) {
                        this.collectState = 'collecting';
                        this.collectTime = 1.5;
                        this.collectUnit = collision;
                    } else if (collision = this.canSteal()) {
                        this.collectState = 'stealing';
                        this.collectTime = 1.5;
                        this.collectUnit = collision;
                    } else if (collision = this.canPlace()) {
                        this.collectState = 'placing';
                        this.collectTime = 1.5;
                        this.collectUnit = collision;
                    }
                }
            }

            // if (this.canPickUpPart && !this.hasPart) {
            //     this.pickupPart();
            // }  else if (this.canStealFromStack && !this.hasPart) {
            //     this.isStealing = true;
            // } else if (this.hasPart) {
            //     this.placePart();
            // }
        }
    }

    canCollect() {
        if (this.hasPart) {
            return null;
        }

        const collisions = this.game.collisions[this.id];
        let i = collisions.length;
        while (i--) {
            if (collisions[i].type == 'SatellitePart') {
                return collisions[i];
            }
        }
        return null;
    }

    canSteal() {
        if (this.hasPart) {
            return null;
        }

        const collisions = this.game.collisions[this.id];
        let i = collisions.length;
        while (i--) {
            if (collisions[i].type == 'SatelliteStack' && collisions[i].team.id !== this.team.id) {
                return collisions[i];
            }
        }
        return null;
    }

    canPlace() {
        if (this.hasPart) {
            return true;
        }
        return false;
    }

    ai() {
        this.accelerate(0, 1);
    }

    pickupPart() {
        if (!this.pickingUp) {

        }
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
            );
            this.game.gameObjects.push(this.team.satelliteStack);
        } else if (this.canAddToStack) {
            this.team.satelliteStack.addPart(this.team);
        }
    }
}
