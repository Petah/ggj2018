const Projectile = require("./projectile");

module.export = class KamikazeProjectile extends Projectile {
    constructor(
        game,
        x,
        y,
        direction,
        xVelocity,
        yVelocity,
    ) {
        super(game, x, y, direction, this.getSprite, xVelocity, )
    }

    getSprite() {
        return "https://www.stpauls.school.nz/Images/Albums/122/Large/013%20brighter.jpg";
    }
}