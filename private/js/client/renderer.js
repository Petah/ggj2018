const assets = {
    1: '/images/placeholder.png',
    2: '/images/placeholder2.png',
    3: '/images/placeholder3.jpg',
    4: '/images/placeholder4.png',

    5: '/images/collector-front-1.png',
    6: '/images/collector-back-1.png',
    7: '/images/collector-left-1.png',
    8: '/images/collector-right-1.png',

    9: '/images/collector-front-2.png',
    10: '/images/collector-back-2.png',
    11: '/images/collector-left-2.png',
    12: '/images/collector-right-2.png',

    20: '/images/kamikaze-front.png',
    21: '/images/kamikaze-back.png',
    22: '/images/kamikaze-left.png',
    23: '/images/kamikaze-right.png',

    30: '/images/kamikaze2-front.png',
    31: '/images/kamikaze2-back.png',
    32: '/images/kamikaze2-left.png',
    33: '/images/kamikaze2-right.png',

    40: '/images/shooter-front.png',
    41: '/images/shooter-back.png',
    42: '/images/shooter-left.png',
    43: '/images/shooter-right.png',

    50: '/images/shooter2-front.png',
    51: '/images/shooter2-back.png',
    52: '/images/shooter2-left.png',
    53: '/images/shooter2-right.png',

    60: '/images/tank-front-0.png',
    61: '/images/tank-back-0.png',

    70: '/images/tank2-front-0.png',
    71: '/images/tank2-back-0.png',

    100: '/images/power-up-blue.png',
    101: '/images/power-up-yellow.png',
    102: '/images/power-up-blue.png',
    103: '/images/power-up-blue.png',
    104: '/images/power-up-blue.png',
    105: '/images/power-up-yellow.png',
    106: '/images/power-up-yellow.png',
    107: '/images/power-up-yellow.png',
    108: '/images/power-up-yellow.png',

    120: '/images/spawning-pool.png',

    200: '/images/satellite/collect-satellite-antenna.png',
    201: '/images/satellite/collect-satellite-dish.png',
    202: '/images/satellite/collect-satellite-frame.png',

    203: '/images/satellite/satellite-antenna-placed.png',
    204: '/images/satellite/satellite-dish-placed.png',
    205: '/images/satellite/satellite-frame-placed.png',

    206: '/images/satellite/satellite-antenna-frame.png',
    207: '/images/satellite/satellite-dish-frame.png',
    208: '/images/satellite/satellite-dish-antenna.png',

    209: '/images/satellite/satellite-complete.png',

    700: '/images/bg-tiled-stones.jpg',
    710: '/images/bg-tiled-green-1.jpg',
};

const animations = {
    5: [
        '/animations/collector-front-walk-1.png',
        '/animations/collector-front-walk-2.png',
    ],
    6: [
        '/animations/collector-back-0.png',
        '/animations/collector-back-1.png',
    ],
    9: [
        '/animations/collector2-front-0.png',
        '/animations/collector2-front-1.png',
    ],
    10: [
        '/animations/collector2-back-1.png',
        '/animations/collector2-back-2.png',
    ],
    7: [
        '/animations/collector-side-left-0.png',
        '/animations/collector-side-left-1.png',
        '/animations/collector-side-left-2.png',
        '/animations/collector-side-left-3.png',
        '/animations/collector-side-left-4.png',
        '/animations/collector-side-left-5.png',
    ],
    8: [
        '/animations/collector-side-0.png',
        '/animations/collector-side-1.png',
        '/animations/collector-side-2.png',
        '/animations/collector-side-3.png',
        '/animations/collector-side-4.png',
        '/animations/collector-side-5.png',
    ],
    11: [
        '/animations/collector2-side-left-1.png',
        '/animations/collector2-side-left-2.png',
        '/animations/collector2-side-left-3.png',
        '/animations/collector2-side-left-4.png',
        '/animations/collector2-side-left-5.png',
    ],
    12: [
        '/animations/collector2-side-0.png',
        '/animations/collector2-side-1.png',
        '/animations/collector2-side-2.png',
        '/animations/collector2-side-3.png',
        '/animations/collector2-side-4.png',
        '/animations/collector2-side-5.png',
    ],
};

class Renderer {
    constructor(gameContainer) {
        this.sprites = {};
        this.layers = {};
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;

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

        this.renderer = new PIXI.Application({
            width: this.width,
            height: this.height,
            // antialias: false,
            // forceFXAA: false,
        });

        // Init layers
        this.layers.background = new PIXI.Container();
        this.renderer.stage.addChild(this.layers.background);

        this.layers.map = new PIXI.Container();
        this.renderer.stage.addChild(this.layers.map);

        this.layers.foreground = new PIXI.Container();
        this.renderer.stage.addChild(this.layers.foreground);

        // Init background
        const texture = PIXI.Texture.fromImage(assets[700]);
        this.sprites.background = new PIXI.extras.TilingSprite(texture, 2000, 2000);
        this.sprites.background.setTransform(0, 0);
        this.layers.background.addChild(this.sprites.background);

        // Init effects
        const effects = new Effects(this.layers.background);
        effects.spawnRandomOrbs(1, 200, [
            [0x379392, 0.5],
            [0xE8F895, 0.5],
            [0x8BAB78, 0.5],
            [0xFFFFFF, 0.5],
        ]);

        window.addEventListener('resize', this.resizeViewport.bind(this));
        gameContainer.appendChild(this.renderer.view);
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
        this.layers.map.setTransform(-x, -y);
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

    createSprite(id, spriteAsset, x = 0, y = 0, anchor = 0.5, layer = 'foreground') {
        console.log('Create sprite', id, spriteAsset);
        const sprite = new PIXI.extras.AnimatedSprite(this.animations[spriteAsset] || [this.textures[spriteAsset]]);

        sprite.anchor.set(0.5);
        sprite.animationId = null;
        sprite.stillId = null;
        sprite.animationSpeed = 0.25;
        sprite.x = x;
        sprite.y = y;
        sprite.layer = layer;

        if (this.animations[spriteAsset]) {
            sprite.animationId = spriteAsset;
            sprite.play();
        } else {
            sprite.stillId = spriteAsset;
        }
        this.layers[layer].addChild(sprite);

        return sprite;
    }

    moveSprite(id, x, y, layer, spriteAsset, moving) {
        if (!this.sprites[id]) {
            this.sprites[id] = this.createSprite(id, spriteAsset, x, y, 0.5, layer);
            return;
        }

        this.sprites[id].x = x;
        this.sprites[id].y = y;

        let currentAnimationId = this.sprites[id].animationId;
        if (moving && this.animations[spriteAsset]) {
            if (currentAnimationId === spriteAsset) {
                return null;
            }

            this.sprites[id].textures = this.animations[spriteAsset];
            this.sprites[id].animationId = spriteAsset;
            this.sprites[id].stillId = null;
            this.sprites[id].play();
        } else {
            this.sprites[id].textures = [this.textures[spriteAsset]];
            this.sprites[id].animationId = null;
            this.sprites[id].stillId = spriteAsset;
            this.sprites[id].stop();
        }
    }

    sortSprites() {
        this.layers.foreground.children.sort((a, b) => {
            return a.y - b.y;
        })
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
                if (this.sprites[id].layer) {
                    this.layers[this.sprites[id].layer].removeChild(this.sprites[id]);
                    delete this.sprites[id];
                }
            }
        }
    }
}
