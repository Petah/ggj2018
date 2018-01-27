class Effects {
    constructor(container) {
        this.container = container;
        this.groups = {};
    }

    spawnRandomOrbs(effectId, maxCount, colors = []) {
        this.groups[effectId] = {};
        this.groups[effectId].particles = new PIXI.Graphics();

        let radiusGroups = [
            // [500, 1000, 50],
            [20, 100, 100],
            [5, 15, 400],
        ];

        radiusGroups.map((group) => {
            for (let i = 0; i < group[2]; i++) {
                let x = Math.random() * 2000;
                let y = Math.random() * 2000;
                let radius = this.getRandomBetweenLimit(group[0], group[1]);
    
                this.groups[effectId].particles.beginFill(...colors[Math.floor(Math.random() * colors.length)]);
                this.groups[effectId].particles.drawCircle(x, y, radius);
                this.groups[effectId].particles.endFill();
            }
        });

        this.container.addChild(this.groups[effectId].particles);
    }

    getEffect(effectId) {
        return this.groups[effectId];
    }

    getRandomBetweenLimit(min, max) {
        return Math.random() * (max - min) + min;
    }
}
