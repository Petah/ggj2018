const Unit = require("./unit");

const sprites = {
    up: [21, 31],
    down: [20, 30],
    left: [22, 32],
    right: [23, 33],
    upMove: [],
    downMove: [],
    leftMove: [],
    rightMove: [],
};

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
        teamColor
    ) {
        super(
            game,
            x,
            y,
            direction,
            sprites.up[team.id],
            xVelocity,
            yVelocity,
            team,
            teamColor,
        );
        this.type = 'Unit';
        this.subType = 'KamikazeUnit';
        this.health = 10;
        this.maxHealth = 10;
        this.collisionRadius = 80;
        this.timeUntilExplode = 0;
        this.speedIncreased = false;
    }

    loop(deltaTime, currentTime) {
        super.loop(deltaTime, currentTime);
        this.updateSprite(sprites);

        if (this.shooting) {
            if (!this.speedIncreased) {
                this.speedIncreased = true;
                this.timeUntilExplode = 3;
                this.maxSpeed *= 2;
            }
        }

        if (this.speedIncreased) {
            this.timeUntilExplode -= deltaTime;
            if (this.timeUntilExplode <= 0) {
                console.log('called explode');
                this.collisionRadius = 150;
                this.explode();
            }
        }
    }

    explode() {
        const collisions = this.game.collisions[this.id];
        let i = collisions.length;

        if (i === 0) {
            this.game.removeGameObject(this);
        }

        while (i--) {
            if (collisions[i].type === 'Unit' && collisions[i].team.id !== this.team.id) {
                collisions[i].getHurt(this, 9000);
                this.game.removeGameObject(this);
            }
        }
    }
}
