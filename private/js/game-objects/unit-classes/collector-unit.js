const logger = require('../../server/logger')(__filename);
const Unit = require("./unit");
const SatelliteStack = require('../../game-objects/powerups/satellite-stack')
const math = require('../../utilities/math');

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
        this.timeToCollect = 0.5;
    }

    attack() {
        this.shooting = true;
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
                    console.log('collecting', this.collectTime);
                    this.accelerate(0, 0);
                    this.collectTime -= deltaTime;
                    if (this.collectTime <= 0) {
                        this.game.removeGameObject(this.collectUnit);
                        this.hasPart = this.collectUnit.sprite;
                        this.collectState = null;
                        this.collectUnit = null;
                    }
                    break;
                }
                case 'stealing': {
                    console.log('stealing', this.collectTime);
                    this.accelerate(0, 0);
                    this.collectTime -= deltaTime;
                    if (this.collectTime <= 0) {
                        if (this.collectUnit.parts[SatelliteStack.sprites.antenna]) {
                            this.collectUnit.removePart(SatelliteStack.sprites.antenna);
                            this.hasPart = SatelliteStack.sprites.antenna;
                        } else if (this.collectUnit.parts[SatelliteStack.sprites.dish]) {
                            this.collectUnit.removePart(SatelliteStack.sprites.dish);
                            this.hasPart = SatelliteStack.sprites.dish;
                        } else if (this.collectUnit.parts[SatelliteStack.sprites.frame]) {
                            this.collectUnit.removePart(SatelliteStack.sprites.frame);
                            this.hasPart = SatelliteStack.sprites.frame;
                        }
                        this.collectState = null;
                        this.collectUnit = null;
                    }
                    break;
                }
                case 'placing': {
                    console.log('placing', this.collectTime, this.collectUnit);
                    this.accelerate(0, 0);
                    this.collectTime -= deltaTime;
                    if (this.collectTime <= 0) {
                        console.log('place', this.collectUnit);
                        if (this.collectUnit === true) {
                            const stack = new SatelliteStack(
                                this.game,
                                this.x,
                                this.y,
                                this.team,
                            );
                            stack.addPart(this.hasPart);
                            this.game.gameObjects.push(stack);
                        } else {
                            this.collectUnit.addPart(this.hasPart);
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
                        console.log('can collect');
                        this.collectState = 'collecting';
                        this.collectTime = this.timeToCollect;
                        this.collectUnit = collision;
                    } else if (collision = this.canSteal()) {
                        console.log('can steal');
                        this.collectState = 'stealing';
                        this.collectTime = this.timeToCollect;
                        this.collectUnit = collision;
                    } else if (collision = this.canPlace()) {
                        console.log('can place', collision);
                        this.collectState = 'placing';
                        this.collectTime = this.timeToCollect;
                        this.collectUnit = collision;
                    } else {
                        console.log('can nothing');
                    }
                }
            }
        } else {
            this.collectState = null;
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
            if (collisions[i].type == 'SatelliteStack') {
                return collisions[i];
            }
        }
        return null;
    }

    canPlace() {
        if (this.hasPart) {
            const collisions = this.game.collisions[this.id];
            let i = collisions.length;
            while (i--) {
                if (collisions[i].type == 'SatelliteStack' && collisions[i].team.id === this.team.id) {
                    console.log('asdsadasdsadas', collisions[i]);
                    return collisions[i];
                }
            }
            return true;
        }
        return false;
    }

    ai() {
        this.accelerate(0, 1);
        this.findTargets();
    }

    findTargets(){
        let targets = [];
        let i = this.game.gameObjects.length;
        while(i--){
            if(this.game.gameObjects[i].type == 'SatellitePart'){
                targets.push(this.game.gameObjects[i]);
            }
        }
        if(targets.length > 0){
            let target = targets[targets.length - 1];
            let distance = math.pointDistance(this.x,this.y,target.x,target.y);
            i = targets.length;
            while(i--){
                let potentialTarget = targets[i];
                if(math.pointDistance(this.x,this.y,potentialTarget.x,potentialTarget.y) < distance){
                    target = potentialTarget;
                }
            }
            console.log('Aquired Target ' + target);
            return target;
        }
        console.log(targets);
    }

    // pickupPart() {
    //     if (!this.pickingUp) {

    //     }
    //     this.hasPart = true;
    //     this.canPickUpPart = false;
    //     this.game.removeGameObject(this.part);
    //     this.part = null;
    // }

    // placePart() {
    //     if (this.team.satelliteStack === null) {
    //         this.team.satelliteStack = new SatelliteStack(
    //             this.game,
    //             this.x,
    //             this.y,
    //         );
    //         this.game.gameObjects.push(this.team.satelliteStack);
    //     } else if (this.canAddToStack) {
    //         this.team.satelliteStack.sprites.addPart(this.team);
    //     }
    // }
}
