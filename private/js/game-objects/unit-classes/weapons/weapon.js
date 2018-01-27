module.exports = class Weapon {
    constructor(
        game,
        unit,
    ) {
        this.game = game;
        this.unit = unit;

        this.reloadTime = 0;
        this.fireRate = 1;
        this.shooting = false;
    }
}
