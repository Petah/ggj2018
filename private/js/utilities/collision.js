const math = require('./math');


module.exports = {
    getCollisions: (game, x, y, collisionRadius) => {
        const result = [];
        let i = game.gameObjects.length;
        while (i--) {
            const distance = math.pointDistance(x, y, game.gameObjects[i].x, game.gameObjects[i].y);
            if (distance < collisionRadius + game.gameObjects[i].collisionRadius) {
                result.push(game.gameObjects[i]);
            }
        }
        return result;
    },
};
