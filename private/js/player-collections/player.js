const Unit = require("./unit-classes/unit");
const KamikazeUnit = require("./unit-classes/kamikaze-unit");
const Team = require("./team");

class Player {
    constructor(unitArray, team) {
        this.unitArray = unitArray;
        this.team = team;
    }

    initializeUnit() {
        // This is a temp unit

        let singleUnit = new KamikazeUnit(
            this.team.xSpawnLocation,
            this.team.ySpawnLocation,
            this.team.spawnDirection,
            0,
            0,
            this.team,
            this.team.getTeamColor()
            );

        this.unitArray.add(singleUnit);
    }

}