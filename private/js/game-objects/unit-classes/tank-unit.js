const Unit = require("./unit");

module.exports = class TankUnit extends Unit {
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
            1,
            xVelocity,
            yVelocity,
            player,
        );
        // this.weapon = new TankWeapon(this.game, this);
        this.health = 100;
    }
}
