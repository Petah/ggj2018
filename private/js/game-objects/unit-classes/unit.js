const MovableGameObject = require("./movable-game-object")
const Weapon = require("./weapon");
const Team = require("./../../team");
const Projectile = require("./../projectile");

module.export = class Unit extends MovableGameObject{

    constructor(
        x,
        y,
        direction,
        sprite,
        xVelocity,
        yVelocity,
        team,
        teamColor,
        weaponArray,
        health) {
        super(x, y, direction, sprite, xVelocity, yVelocity);
        this.team        = team;
        this.teamColor   = teamColor;
        this.weaponArray = weaponArray;
    }

    attack(destinationX, destinationY) {
        let i = this.weaponArray.length;

        while(i--) {
            let weapon = this.weaponArray[i];
            if(weapon.lastShotTime + weapon.fireRate < this.currentTime) {
                weapon.fire(this.x,
                    this.y,
                    destinationX,
                    destinationY,
                    this.currentTime);
            }
        }
    }

    getHurt(projectile) {
        this.health -= projectile.damage;
        if(this.health < 1) {
            this.onDie();
        }
    }

    onDie() {
        this.showDeathAnimation();
    }

    showDeathAnimation() {

    }

    getSprite() {
        console.log("Failed to gather sprite, non-overriden method");
        return null;
    }
}