const Unit = require("./unit");
const TankWeapon = require('./weapons/tank-weapon');

const sprites = {
    up: [61, 71],
    down: [60, 70],
    left: [62, 72],
    right: [63, 73],
    upMove: [61, 71],
    downMove: [60, 70],
    leftMove: [62, 72],
    rightMove: [63, 73],
};

module.exports = class TankUnit extends Unit {
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
        super(
            game,
            x,
            y,
            direction,
            1,
            xVelocity,
            yVelocity,
            team,
        );
        this.weapon = new TankWeapon(this.game, this);
        this.health = 100;
        this.collisionRadius = 80;
        this.type = 'Unit';
        this.subType = 'TankUnit';
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);
    }

    updateSprite(sprites) {
        if (this.direction >= 181) {
            this.sprite = sprites.up[this.team.id];
        } else {
            this.sprite = sprites.down[this.team.id];
        }
    }
}
