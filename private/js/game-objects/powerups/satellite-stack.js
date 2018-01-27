const GameObject = require('../game-object');
const Satellite = require('./satellite');

const sprites = {
    antenna: 200,
    dish: 201,
    frame: 202,

    antennaPlaced: 203,
    dishPlaced: 204,
    framePlaced: 205,

    antennaDishPlaced: 206,
    antennaFramePlaced: 207,
    dishFramePlaced: 208,

    complete: 209,
};


class SatelliteStack extends GameObject {
    constructor(
        game,
        x,
        y,
        team,
    ) {
        super(game, x, y, 0, 2, 5);
        this.team = team;
        this.currentSize = 0;
        this.maxSize = Satellite.REQUIRED_PARTS;
        this.type = 'SatelliteStack';
        this.layer = 'map';
        this.parts = {};
    }

    addPart(sprite) {
        this.parts[sprite] = true;
        this.updateSprite();

        // if (this.currentSize++ === this.maxSize) {
        //     this.game.gameObjects.push(new Satellite(this.game,
        //         this.x,
        //         this.y,
        //         this.direction,
        //         'satellite-sprite-path',
        //         this.collisionRadius,
        //         team));
        // } else {
        //     this.sprite++;
        // }
    }

    removePart(sprite) {
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', sprite);
        this.parts[sprite] = false;
        console.log(this.parts[sprites.antenna] , this.parts[sprites.dish] , this.parts[sprites.frame]);
        if (!this.parts[sprites.antenna] && !this.parts[sprites.dish] && !this.parts[sprites.frame]) {
            this.game.removeGameObject(this);
            return;
        }
        this.updateSprite();
    }

    updateSprite() {
        if (this.parts[sprites.antenna] && this.parts[sprites.dish] && this.parts[sprites.frame]) {
            this.sprite = sprites.complete;
        } else if (this.parts[sprites.antenna] && this.parts[sprites.dish]) {
            this.sprite = sprites.antennaDishPlaced;
        } else if (this.parts[sprites.antenna] && this.parts[sprites.frame]) {
            this.sprite = sprites.antennaFramePlaced;
        } else if (this.parts[sprites.dish] && this.parts[sprites.frame]) {
            this.sprite = sprites.dishFramePlaced;
        } else if (this.parts[sprites.antenna]) {
            this.sprite = sprites.antennaPlaced;
        } else if (this.parts[sprites.dish]) {
            this.sprite = sprites.dishPlaced;
        } else if (this.parts[sprites.frame]) {
            this.sprite = sprites.framePlaced;
        }
        console.log('#############', this.sprite);
    }
}

SatelliteStack.sprites = sprites;

module.exports = SatelliteStack;
