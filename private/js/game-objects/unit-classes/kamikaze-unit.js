const Unit = require("./unit");

module.export = class KamikazeUnit extends Unit {
    
    attack() {
        
    }

    onDie() {
        this.attack();
    }
}