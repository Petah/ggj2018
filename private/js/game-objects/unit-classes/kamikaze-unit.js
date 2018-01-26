const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");

module.exports = class KamikazeUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team,
        teamColor) {
            super(
                game,
                x,
                y,
                direction,
                sprite,
                xVelocity,
                yVelocity,
                team,
                teamColor,
                );
        let weaponArray = [];
    }

    attack() {
        this.game.gameObjects.push(new KamikazeProjectile(this.game, this.x, this.y));
    }

    onDie() {
        this.attack();
    }
}