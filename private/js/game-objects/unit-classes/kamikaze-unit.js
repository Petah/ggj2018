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
                this.getSprite(), 
                xVelocity, 
                yVelocity, 
                team, 
                teamColor,
                );

    }
    
    attack() {
        
    }

    onDie() {
        this.attack();
    }

    getSprite() {
        return "https://photos-images.active.com/file/1/154/1541810/optimized/653e5de8-d28a-4fe2-921f-e48309bea30c.png";
    }
}