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
        this.pushBackForce = 20;
        this.type = 'Collidiable'
        this.collisionRadius = 100;
    }

    loop(deltaTime, currentTime){
        const collisions = this.game.collisions[this.id];
        let i = collisions.length;
        while(i--){
            if(collisions[i].type == 'Unit'){
                 console.log('collided with a unit');
                 const direction = math.pointDirection(this.x,this.y,collisions[i].x,collisions[i].y);
                 collisions[i].accelerate(math.lengthDirX(1,direction),math.lengthDirY(1,direction));
            }
        }
    }
    
}
