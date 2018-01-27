const Unit = require("./unit");
const KamikazeProjectile = require("./weapons/projectiles/kamikaze-projectile");
const MissileWeapon = require("./weapons/missile-weapon");

const sprites = {
    up: [41, 51],
    down: [40, 50],
    left: [42, 52],
    right: [43, 53],
    upMove: [],
    downMove: [],
    leftMove: [],
    rightMove: [],
};

module.exports = class MissileUnit extends Unit {
    constructor(
        game,
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team
    ) {
        super(
            game,
            x,
            y,
            direction,
            sprites.up[team.id],
            xVelocity,
            yVelocity,
            team
        );
        this.weapon = new MissileWeapon(this.game, this);
        this.health = 10;
        this.collisionRadius = 80;
        this.type = 'Unit';
        this.subType = 'MissileUnit';
    }

    attack(direction) {
        this.weapon.attack(direction);
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);
    }
}
