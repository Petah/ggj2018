const GameObject = require('./game-object');

module.exports = class Spawner extends GameObject {
    constructor(game,
        x,
        y,
        direction,
        sprite,
        collisionRadius,
        team
        ) {
            super(game,
            x,
            y,
            direction,
            sprite,
            collisionRadius);

        this.team = team;
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);

        let length = this.game.GameObjects.length;

        while(length--) {
            let item = this.game.GameObject[i];
            

            // if(item.type)
        }
    }
}