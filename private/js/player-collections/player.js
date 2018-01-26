const KamikazeUnit = require("../game-objects/unit-classes/kamikaze-unit");
const Team = require("./team");

module.exports = class Player {
    constructor(game, playerNumber, team) {
        this.game = game;
        this.playerNumber = playerNumber;
        this.team = team;
        this.unitArray = [];
        this.initializeUnit();
    }

    initializeUnit() {
        // This is a temp unit

        let singleUnit = new KamikazeUnit(
            this.game,
            300,
            100,
            180,
            1,
            2,
            2,
            this.team,
            "red"
            );

        this.unitArray.push(singleUnit);
        this.game.gameObjects.push(singleUnit);
    }

    triggerSpawn(){

    }

}