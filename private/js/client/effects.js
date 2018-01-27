class Effects {
    constructor(renderer, container) {
        this.renderer = renderer;
        this.container = container;
        this.groups = {};
    }

    spawnRandomCircles(effectId, assetId, maxCount, colors = []) {
        this.groups[effectId] = {};
        this.groups[effectId].particles = new PIXI.particles.ParticleContainer(maxCount, {
            scale: true,
            position: true,
            uvs: true,
            alpha: true,
        });

        this.container.addChild(this.groups[effectId].particles);

        let circles = [];
        let radiusGroups = [
            [0.5, 1.5, 50],
            [0.25, 0.5, 250],
        ];

        radiusGroups.map((group) => {
            for (let i = 0; i < group[2]; i++) {
                let circle = PIXI.Sprite.fromImage(assetId);
                
                circle.scaleMin = group[0];
                circle.scaleMax = group[0];

                circle.x = Math.random() * 2000;
                circle.y = Math.random() * 2000;
                circle.anchor.set(0.5);
                circle.scale.set(this.getRandomBetweenLimit(circle.scaleMin, circle.scaleMax));

                circle.tint = colors[Math.floor(Math.random() * colors.length)];

                circle.direction = Math.random() * Math.PI * 2;
                circle.turningSpeed = Math.random() - 0.8;
                circle.speed = (2 + Math.random() * 2) * 0.2;
                circle.offset = Math.random() * 500;

                circles.push(circle);
                this.groups[effectId].particles.addChild(circle);
            }
        });

        let tick = 0;
        this.renderer.ticker.add(() => {
            for (let i = 0; i < circles.length; i++) {
                console.log('Animating', circles[i]);
                // circles[i].scale.set(0.95 + Math.sin(tick + circles[i].offset) * 0.05);
                circles[i].direction += circles[i].turningSpeed * 0.01;
                circles[i].x += Math.sin(circles[i].direction) * (circles[i].speed * circles[i].scale.y);
                circles[i].y += Math.cos(circles[i].direction) * (circles[i].speed * circles[i].scale.y);
                circles[i].rotation = -circles[i].direction + Math.PI;
            }

            tick += 0.1;
        });
    }

    getEffect(effectId) {
        return this.groups[effectId];
    }

    getRandomBetweenLimit(min, max) {
        return Math.random() * (max - min) + min;
    }
}
