module.exports = class Player {
    constructor(game, id) {
        this.game = game;
        this.id = id;
        this.unit = null;

        // const unit = new MissileUnit(this.game, 500, 500, 0, 2, 0, 0);
        // this.units.push(unit);
        // this.game.gameObjects.push(unit);
    }
}
