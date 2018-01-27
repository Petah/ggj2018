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
        super(
            game,
            x,
            y,
            direction,
            120,
            collisionRadius,
        );

        this.team = team;
        this.layer = 'map';
    }
}