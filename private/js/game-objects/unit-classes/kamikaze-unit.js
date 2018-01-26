const Unit = require("./unit");

module.export = class KamikazeUnit extends Unit {
    constructor(
        x,
        y,
        direction,
        xVelocity,
        yVelocity,
        team,
        teamColor) {
            let weaponArray = new Weapon[];


            super(x, 
                y, 
                direction, 
                sprite, 
                xVelocity, 
                yVelocity, 
                team, 
                teamColor,);

    }
    
    
    
    attack() {
        
    }

    onDie() {
        this.attack();
    }
}