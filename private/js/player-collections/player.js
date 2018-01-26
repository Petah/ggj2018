const MissileUnit = require("../game-objects/unit-classes/missile-unit");

module.exports = class Player {
    constructor(game) {
        this.game = game;
        this.units = [];

        const unit = new MissileUnit(this.game, 500, 500, 0, 2, 0, 0);
        this.units.push(unit);
        this.game.gameObjects.push(unit);
    }
}