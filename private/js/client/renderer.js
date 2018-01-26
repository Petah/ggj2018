const assets = {
    1: '/images/bunny.png',
    2: '/images/ship.png',
    3: '/images/background_nebula.jpg',
    4: '/images/projectile.png',
};

class Renderer {
    constructor(width = null, height = null, options = {}) {
        this.sprites = {};
        this.layers = {};
        this.width = width || document.body.clientWidth;
        this.height = height || document.body.clientHeight;
        this.options = options;
    }

    resizeViewport() {
        this.renderer.renderer.resize(document.body.clientWidth, document.body.clientHeight);
    }

    getSprites() {
        return this.sprites;
    }

    setSprites(sprites = {}) {
        this.sprites = sprites;

        return this;
    }

    getSprite(id) {
        return this.sprites[id];
    }

    createSprite(id, assetPath, xPos = 0, yPos = 0, anchor = 0.5, layer = 'foreground') {
        const sprite = PIXI.Sprite.fromImage(assetPath);
        sprite.anchor.set(0.5);
        sprite.x = xPos;
        sprite.y = yPos;

        switch (layer) {
            case 'background': {
                this.getBackground().addChild(sprite);
            }
            case 'foreground': {
                this.getForeground().addChild(sprite);
            }
        }

        return sprite;
    }

    moveSprite(id, x, y, direction, spriteAsset) {
        if (!this.sprites[id]) {
            this.sprites[id] = this.createSprite(id, assets[spriteAsset], x, y);
            return;
        }

        this.sprites[id].x = x;
        this.sprites[id].y = y;
        this.sprites[id].rotation = direction * Math.PI / 180;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width;

        return this;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;

        return this;
    }

    getOptions() {
        return this.options;
    }

    setOptions(options) {
        this.options = options;

        return this;
    }

    getRenderer() {
        if (!this.renderer) {
            this.renderer = new PIXI.Application(this.getWidth(), this.getHeight(), this.getOptions());

            // Init layers
            this.layers.background = new PIXI.Container();
            this.renderer.stage.addChild(this.layers.background);

            this.layers.foreground = new PIXI.Container();
            this.renderer.stage.addChild(this.layers.foreground);

            // Init background
            let texture = PIXI.Texture.fromImage(assets['3']);
            this.sprites.background = new PIXI.extras.TilingSprite(texture, 1920, 1080);
            this.layers.background.addChild(this.sprites.background);

            window.addEventListener('resize', this.resizeViewport.bind(this));
        }

        return this.renderer;
    }

    getView() {
        return this.getRenderer().view;
    }

    getBackground() {
        return this.layers.background;
    }

    getForeground() {
        return this.layers.foreground;
    }
}
