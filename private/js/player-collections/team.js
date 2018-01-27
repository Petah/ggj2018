const CollectorUnit = require("../game-objects/unit-classes/collector-unit");
const MissileUnit = require("../game-objects/unit-classes/missile-unit");
const KamikazeUnit = require("../game-objects/unit-classes/kamikaze-unit");
const TankUnit = require("../game-objects/unit-classes/tank-unit");

module.exports = class Team {
    constructor(
        game,
        id,
        color,
        playerArray,
        xSpawnLocation,
        ySpawnLocation,
        spawnDirection,
    ) {
        this.game = game;
        this.id = id;
        this.color = color;
        this.players = [];
        this.xSpawnLocation = xSpawnLocation;
        this.ySpawnLocation = ySpawnLocation;
        this.spawnDirection = spawnDirection;
        this.satelliteParts = 0;
        this.units = [];

        this.createUnit(new CollectorUnit(this.game, 500, 500, 0, 2, 0, 0));
        this.createUnit(new MissileUnit(this.game, 500, 600, 0, 2, 0, 0));
        this.createUnit(new KamikazeUnit(this.game, 500, 700, 0, 2, 0, 0));
        this.createUnit(new TankUnit(this.game, 500, 800, 0, 2, 0, 0));
    }

    createUnit(unit) {
        this.units.push(unit);
        this.game.gameObjects.push(unit);
    }

    addPlayer(player) {
        this.players.push(player);
        player.unit = this.units[0];
    }
}
