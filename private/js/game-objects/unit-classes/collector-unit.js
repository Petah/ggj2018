const Unit = require("./unit");

module.exports = class CollectorUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        player,
    ) {
        super(
            game,
            x,
            y,
            direction,
            2,
            xVelocity,
            yVelocity,
            player,
        );
        this.health = 10;
    }
}
