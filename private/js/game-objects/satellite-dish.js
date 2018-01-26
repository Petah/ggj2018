const GameObject = require('./game-object');
const collision = require("./../utilities/collision");

class Satellite extends GameObject{
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
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprite = sprite;
        this.collisionRadius = collisionRadius;
        this.owningTeam = owningTeam;

        this.timeToSteal = 5000;
        this.timeToHold = 30000;
        this.holdId = 0;
        this.hold(this.owningTeam);
    }

    loop(deltaTime, currentTime) {

    }

    onCollisionWithUnit(unit) {
        if (unit.team !== this.owningTeam) {
            console.log('Stealing satellite!');
            clearTimeout(this.holdId);
            setTimeout(() => {
                this.owningTeam = unit.team;
                this.hold(this.owningTeam);
            }, this.timeToSteal);
        }
    }

    hold(team) {
        this.holdId = setTimeout(() => {
            if (team === this.owningTeam) {
                this.explode();
            }
        }, this.timeToHold)
    }

    explode() {
        launchNuclearMissileFromUSAUsingDonaldTrumpsCreds();
    }
}