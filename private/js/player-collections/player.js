const Math = require('../utilities/math');

module.exports = class Player {
    constructor(game, id) {
        this.game = game;
        this.id = id;
        this.unit = null;
    }

    loop(deltaTime, currentTime) {
        this.nextUnitCooldown -= deltaTime;

        if (!this.unit) {
            // console.log('player', null);
            return;
        }
        // console.log('player', this.unit.subType);
        let x = this.unit.x;
        let y = this.unit.y;

        let lowestDistance = 9999999;
        let objectX = 0;
        let objectY = 0;

        let objectsLength = this.game.gameObjects.length;
        while(objectsLength--) {
            let object = this.game.gameObjects[objectsLength];
            if(object.type !== undefined
                && object.type.indexOf("Satellite") !== -1) {
                let objectX = object.x;
                let objectY = object.y;

                let distance = Math.pointDistance(x, y, objectX, objectY);
                if(distance < lowestDistance) {
                    lowestDistance = distance;
                }
            }
        }

        let direction = Math.pointDirection(x, y, objectX, objectY);
    }
}
