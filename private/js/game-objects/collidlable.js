const GameObject = require('./game-object');
const math = require('../utilities/math');

module.exports = class Collidable extends GameObject {
    constructor(
        game,
        x,
        y,
        sprite
    ) {
        super(game, x, y, 0, sprite);
        this.pushBackForce = 1;
        this.type = 'Collidable'
        this.collisionRadius = 20;
    }

    loop(deltaTime, currentTime){
        const collisions = this.game.collisions[this.id];
        let i = collisions.length;
        while(i--){
            if(collisions[i].type === 'Unit'){
                 const direction = math.pointDirection(this.x,this.y,collisions[i].x,collisions[i].y);
                 collisions[i].accelerate(math.lengthDirX(this.pushBackForce,direction),math.lengthDirY(this.pushBackForce,direction));
            }
        }
    }

}
