module.exports = class Weapon {
    constructor(
        game,
        unit,
    ) {
        this.game = game;
        this.unit = unit;

        this.reloadTime = 0;
        this.fireRate = 1;
    }

    attack(direction) {
        if (this.reloadTime < this.game.currentTime) {
            this.reloadTime = this.game.currentTime + this.fireRate;
            this.spawnProjectile(this.unit.x, this.unit.y, this.unit.direction);
        }
    }
}
