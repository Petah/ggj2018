const assets = {
    1: '/images/bunny.png',
};

class Renderer {
    constructor(width = 1270, height = 720, options = {}) {
        this.sprites = {};
        this.layers = {};
        this.width = width;
        this.height = height;
        this.options = options;
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
        }

        return this.renderer;
    }

    getView() {
        return this.getRenderer().view;
    }

    getBackground() {
        if (!this.layers.background) {
            this.layers.background = new PIXI.Container();
            this.getRenderer().stage.addChild(this.layers.background);
        }

        return this.layers.background;
    }

    getForeground() {
        if (!this.layers.foreground) {
            this.layers.foreground = new PIXI.Container();
            this.getRenderer().stage.addChild(this.layers.foreground);
        }

        return this.layers.foreground;
    }
}