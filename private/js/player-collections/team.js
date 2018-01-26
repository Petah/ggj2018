class Team {

    constructor(id,
        color,
        playerArray,
        xSpawnLocation,
        ySpawnLocation,
        spawnDirection,) {
            this.id = id;
            this.color = color;
            this.playerArray = playerArray;
            this.xSpawnLocation = xSpawnLocation;
            this.ySpawnLocation = ySpawnLocation;
            this.spawnDirection = spawnDirection;
    }

    getTeamColor() {
        return this.color;
    }
}