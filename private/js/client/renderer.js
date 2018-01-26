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

    addSprite(id, assetPath, xPos = 0, yPos = 0, anchor = 0.5, layer = 'foreground') {
        this.sprites[id] = PIXI.Sprite.fromImage(assetPath);
        this.sprites[id].anchor.set(0.5);
        this.sprites[id].x = xPos;
        this.sprites[id].y = yPos;

        switch (layer) {
            case 'background': {
                this.getBackground().addChild(this.sprites[id]);
            }
            case 'foreground': {
                this.getForeground().addChild(this.sprites[id]);
            }
        }

        return this.sprites[id];
    }

    updateSprite(id, xPos, yPos) {
        let sprite = this.getSprite(id);
        if (!sprite) {
            return null;
        }

        sprite.x = xPos;
        sprite.y = yPos;
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