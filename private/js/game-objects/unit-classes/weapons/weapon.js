module.exports = class Weapon {
    constructor(
        fireRate
        , projectile) {
            this.fireRate = fireRate;
            this.projectile = projectile;
            this.lastShotTime = 0;
    }

    fire(currentX, currentY, destinationX, destinationY, currentTime) {

    }
}