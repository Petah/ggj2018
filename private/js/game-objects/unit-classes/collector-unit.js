const Unit = require("./unit");
const collision = require("../../utilities/collision");

const sprites = {
    up: [6, 10],
    down: [5, 9],
    left: [7, 11],
    right: [8, 12],
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
        this.canPickUpPart = false;
        this.type = 'CollectorUnit'
        this.collisionRadius = 55;
    }

    attack() {
        if (this.canPickUpPart) {
            this.pickupPart();
        }
    }

    onDie() {
        //
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        this.part = null;
        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;

        let noSatelliteParts = true;
        while (i--) {
            if (collisions[i].id !== this.id) {
                switch(collisions[i].type) {
                    case 'SatellitePart':
                        this.canPickUpPart = true;
                        noSatelliteParts = false;
                        break;
                }
            }
        }

        if (noSatelliteParts) {
            this.canPickUpPart = false;
        }
    }

    pickupPart() {
        this.team.hasPart = true;
    }
}
