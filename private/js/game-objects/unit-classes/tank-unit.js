const Unit = require("./unit");
const TankWeapon = require('./weapons/tank-weapon');

const sprites = {
    up: [61, 71],
    down: [60, 70],
    left: [62, 72],
    right: [63, 73],
    upMove: [],
    downMove: [],
    leftMove: [],
    rightMove: [],
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
        this.type = 'unit';
        this.subType = 'tank';
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
