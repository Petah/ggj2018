class Particle {
    constructor(x, y, xVelocity, yVelocity, textures, container) {
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;

        this.sprite = new PIXI.AnimatedSprite(textures);
        this.sprite.play();

        this.container = container;
        this.container.addChild(this.sprite);
    }

    updatePosition(x, y, xVelocity, yVelocity) {
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    updateTextures(textures) {
        this.sprite.textures = textures;
    }
}
