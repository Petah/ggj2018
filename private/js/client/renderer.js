const assets = {
    1: '/images/bunny.png',
    2: '/images/ship.png',
    3: '/images/background_nebula.jpg',
    4: '/images/projectile.png',
    5: '/images/collector-front-1.png',
    6: '/images/collector-back-1.png',
    7: '/images/collector-left-1.png',
    8: '/images/collector-right-1.png',
    9: '/images/collector-front-2.png',
    10: '/images/collector-back-2.png',
    11: '/images/collector-left-2.png',
    12: '/images/collector-right-2.png',
    700: '/images/bg-tiled-bacteria.jpg',
    700: '/images/sand.png',
    800: '/images/bg-tiled-stones.jpg',
};

const animations = {
    5: [
        '/animations/collector-front-0.png',
        '/animations/collector-front-1.png',
        '/animations/collector-front-2.png',
        '/animations/collector-front-3.png',
        '/animations/collector-front-4.png',
        '/animations/collector-front-5.png',
        '/animations/collector-front-6.png',
        '/animations/collector-front-7.png',
        '/animations/collector-front-8.png',
        '/animations/collector-front-9.png',
    ]
};

class Renderer {
    constructor(width = null, height = null, options = {}) {
        this.sprites = {};
        this.layers = {};
        this.width = width || document.body.clientWidth;
        this.height = height || document.body.clientHeight;
        this.options = options;

        this.textures = {};
        for (let key in assets) {
            this.textures[key] = PIXI.Texture.fromImage(assets[key]);
        }

        this.animations = {};
        for (let key in animations) {
            animations[key].map((frame) => {
                if (!this.animations[key]) {
                    this.animations[key] = [];
                }
                this.animations[key].push(PIXI.Texture.fromImage(frame));
            });
        }
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
        this.layers.foreground.setTransform(-x, -y);
        this.layers.background.setTransform(-x, -y);
    }

    // cameraPanRelative(x, y) {
    //     if (!x || !y) {
    //         return null;
    //     }

    //     this.layers.foreground.setTransform((this.layers.foreground.x + x), (this.layers.foreground.y + y));
    //     this.layers.background.setTransform((this.layers.background.x + (x * 0.1)), (this.layers.background.y + (y * 0.1)));
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

    createSprite(id, spriteAsset, x = 0, y = 0, anchor = 0.5, layer = 'foreground') {
        const sprite = new PIXI.extras.AnimatedSprite(this.animations[spriteAsset] || [this.textures[spriteAsset]]);

        sprite.anchor.set(0.5);
        sprite.animationId = null;
        sprite.animationSpeed = 0.25;
        sprite.x = x;
        sprite.y = y;

        if (this.animations[spriteAsset]) {
            sprite.animationId = spriteAsset;
            sprite.play();
        }

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
            this.sprites[id] = this.createSprite(id, spriteAsset, x, y);
            return;
        }

        this.sprites[id].x = x;
        this.sprites[id].y = y;
        this.sprites[id].rotation = direction * Math.PI / 180;

        let currentAnimationId = this.sprites[id].animationId;
        if (this.animations[spriteAsset]) {
            if (currentAnimationId === spriteAsset) {
                return null;
            }

            this.sprites[id].textures = this.animations[spriteAsset];
            this.sprites[id].animationId = spriteAsset;
            this.sprites[id].play();
        } else {
            this.sprites[id].textures = [this.textures[spriteAsset]];
            this.sprites[id].animationId = null;
        }
    }

    cullSprites(gameObjects) {
        for (let id in this.sprites) {
            let found = false;
            let i = gameObjects.length;
            while (i--) {
                if (gameObjects[i][0] == id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log('Removing sprite', id);
                this.layers.foreground.removeChild(this.sprites[id]);
                delete this.sprites[id];
            }
        }
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
            let texture = PIXI.Texture.fromImage(assets[700]);
            this.sprites.background = new PIXI.extras.TilingSprite(texture, 9600, 3240);
            this.sprites.background.setTransform(-4800, -1620);
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
