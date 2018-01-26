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

    cameraZoomAbsolute(zoom) {
        // if (!zoom) {
        //     return null;
        // }

        // this.renderer.stage.setTransform(this.renderer.stage.x, this.renderer.stage.y, zoom, zoom);
    }

    cameraZoomRelative(zoomFactor) {
        // if (!zoomFactor) {
        //     return null;
        // }

        // let zoomX = this.renderer.stage.scale.x + zoomFactor;
        // let zoomY = this.renderer.stage.scale.y + zoomFactor;
        // this.renderer.stage.setTransform(this.renderer.stage.x, this.renderer.stage.y, zoomX, zoomY);
    }

    cameraPanAbsolute(x, y) {
        // this.layers.foreground.setTransform(x, y);
        // this.layers.background.setTransform(0, 0);
        // this.layers.background.setTransform(-x, -y);
    }

    // cameraPanRelative(xPos, yPos) {
    //     if (!xPos || !yPos) {
    //         return null;
    //     }

    //     this.layers.foreground.setTransform((this.layers.foreground.x + xPos), (this.layers.foreground.y + yPos));
    //     this.layers.background.setTransform((this.layers.background.x + (xPos * 0.1)), (this.layers.background.y + (yPos * 0.1)));
    // }

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
                this.layers.background.addChild(sprite);
                break;
            }
            case 'foreground': {
                this.layers.foreground.addChild(sprite);
                break;
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
            this.sprites.background = new PIXI.extras.TilingSprite(texture, 7680, 4896);
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
