const Unit = require("./unit-classes/unit");
const KamikazeUnit = require("./unit-classes/kamikaze-unit");
const Team = require("./team");

class Player {
    constructor(unitArray, team) {
        this.unitArray = unitArray;
        this.team = team;
    }

    initializeUnit() {
        let singleUnit = new KamikazeUnit(
            this.team.xSpawnLocation,
            this.team.ySpawnLocation,
            this.team.spawnDirection,
            );
        thsi.unitArray.add()
    }
}