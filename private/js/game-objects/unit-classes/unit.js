const MovableGameObject = require("../movable-game-object")
const Team = require("../../player-collections/team");

module.exports = class Unit extends MovableGameObject {
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
        super(game, x, y, direction, sprite, xVelocity, yVelocity);
        this.type = 'Unit';
        this.team = team;
    }

    attack(direction) {
    }

    getHurt(projectile) {
        this.health -= projectile.damage;
        if (this.health < 1) {
            this.onDie();
        }
    }

    onDie() {
        this.showDeathAnimation();
    }

    showDeathAnimation() {

    }
}
