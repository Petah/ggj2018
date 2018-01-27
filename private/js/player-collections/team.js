const CollectorUnit = require("../game-objects/unit-classes/collector-unit");
const MissileUnit = require("../game-objects/unit-classes/missile-unit");
const KamikazeUnit = require("../game-objects/unit-classes/kamikaze-unit");
const TankUnit = require("../game-objects/unit-classes/tank-unit");

module.exports = class Team {
    constructor(
        game,
        id,
        spawner,
    ) {
        this.game = game;
        this.id = id;
        this.spawner = spawner;
        this.players = [];
        this.satelliteParts = 0;
        this.units = [];
        this.nextUnitIndex = 0;

        this.createUnit(new CollectorUnit(this.game, spawner.x - 100, spawner.y, 0, 2, 0, 0, this));
        this.createUnit(new MissileUnit(this.game, spawner.x + 100, spawner.y, 0, 2, 0, 0, this));
        this.createUnit(new KamikazeUnit(this.game, spawner.x, spawner.y - 100, 0, 2, 0, 0, this));
        this.createUnit(new TankUnit(this.game, spawner.x, spawner.y + 100, 0, 2, 0, 0, this));
        this.satelliteStack = null;
    }

    createUnit(unit) {
        this.units.push(unit);
        this.game.gameObjects.push(unit);
    }

    addPlayer(player) {
        this.players.push(player);
        this.nextUnit(player, true);
    }

    nextUnit(player, force) {
        if (force || player.nextUnitCooldown <= 0) {
            player.nextUnitCooldown = 1;
            player.unit = this.units[this.nextUnitIndex];
            player.unitIndex = this.nextUnitIndex;
            this.nextUnitIndex++;
            if (this.nextUnitIndex >= this.units.length) {
                this.nextUnitIndex = 0;
            }
        }
    }

    loop(deltaTime, currentTime) {
        let p = this.players.length;
        while (p--) {
            this.players[p].loop(deltaTime, currentTime);
        }
    }
}
