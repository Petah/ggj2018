const math = require('./math');

module.exports = (self, others) => {
    // if (self.dead) {
    //     return;
    // }
    for (let i = 0; i < others.length; i++) {
        // if (self.owner && self.owner.id == others[i].id) {
        //     continue;
        // }
        collisionDistance = math.pointDistance(self.x, self.y, others[i].x, others[i].y);
        if (collisionDistance < self.collisionRadius || others[i].collisionRadius) {
            return true;
        }
    }
};