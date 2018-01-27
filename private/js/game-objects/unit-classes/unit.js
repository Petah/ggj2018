const MovableGameObject = require("../movable-game-object")
const Team = require("../../player-collections/team");
const collision = require("../../utilities/collision");

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
        // this.health -= projectile.damage;
        // if (this.health < 1) {
        //     this.onDie();
        // }
        console.log('Hit by ' + projectile.type + ' ' + projectile.subType);
    }

    onDie() {
        this.showDeathAnimation();
    }

    showDeathAnimation() {

    }

    loop(deltaTime, currentTime){
        super.loop(deltaTime, currentTime);
        const collisions = collision.getCollisions(this.game, this.x, this.y, this.collisionRadius);
        let i = collisions.length;
        while(i--){
            if(collisions[i].id == this.id || (collisions[i].unit && (collisions[i].unit.id == this.id))){
                continue;
            }
            if(collisions[i].type == 'projectile'){
                this.getHurt(collisions[i]);
            }
        }
    }
}
