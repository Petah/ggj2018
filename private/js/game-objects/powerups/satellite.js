const GameObject = require('../game-object');

Satellite = class extends GameObject{
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        owningTeam
    ) {
        super(game, x, y, direction, sprite, collisionRadius);
        this.owningTeam = owningTeam;
        this.winningTeam = null;
        this.timeToSteal = 5000;
        this.timeToHold = 30000;
        this.timeElapsed = 0;
        this.isHolding = true;
        this.isStealing = false;
        this.type = 'Satellite';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        const collisions = this.game.collisions[this.id];

        let i = collisions.length;
        let noCollisions = true;
        let unit;

        while (i--) {
            if (collisions[i].id !== this.id) {
                switch (collisions[i].subType) {
                    case 'collector':
                        noCollisions = false;
                        unit = collisions[i];
                        this.onCollisionWithUnit(unit);
                        break;
                }
            }
        }

        if (noCollisions) {
            this.isStealing = false;
            this.isHolding = false;
            this.timeElapsed = 0;
        }

        if (this.isStealing) {
            this.timeElapsed += deltaTime;
            if (this.timeElapsed >= this.timeToSteal) {
                this.owningTeam = unit.team;
                this.timeElapsed = 0;
                this.isStealing = false;

            }
        }

        if (this.isHolding) {
            this.timeElapsed += deltaTime;
            if (this.timeElapsed >= this.timeToHold) {
                this.winningTeam = this.owningTeam;

                setTimeout(() => {
                    this.game.reset();
                }, 5000);

                this.timeElapsed = 0;
                this.isHolding = false;
            }
        }
    }


    onCollisionWithUnit(unit) {
        if (unit.team !== this.owningTeam) {
            this.isStealing = true;
            this.isHolding = false;
        } else {
            this.isStealing = false;
            this.isHolding = true;
        }
    }

    destroyNearestEnemy() {
        //var runinsOfNorthKorea = launchNuclearMissileFromUSAUsingDonaldTrumpsCreds();
    }
};

Satellite.REQUIRED_PARTS = 3;

module.exports = Satellite;