class Particles {
    constructor(renderer, container) {
        // Create a new emitter
        var emitter = new PIXI.particles.Emitter(
            container,

            // The collection of particle images to use
            [renderer.textures[101]],

            // Emitter configuration, edit this to change the look
            // of the emitter
            {
                alpha: {
                    start: 0.8,
                    end: 1
                },
                scale: {
                    start: 1,
                    end: 0.3
                },
                color: {
                    start: "fb1010",
                    end: "f5b830"
                },
                speed: {
                    start: 200,
                    end: 100
                },
                startRotation: {
                    min: 0,
                    max: 360
                },
                rotationSpeed: {
                    min: 0,
                    max: 0
                },
                lifetime: {
                    min: 0.5,
                    max: 0.5
                },
                frequency: 0.008,
                emitterLifetime: 0.31,
                maxParticles: 1000,
                pos: {
                    x: 100,
                    y: 100,
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 10
                }
            }
        );

        // Calculate the current time
        var elapsed = Date.now();

        console.log('updatewwwwwwwwwwwwwww');
        // Update function every frame
        var update = function(){
            console.log('update');

            // Update the next frame
            requestAnimationFrame(update);

            var now = Date.now();

            // The emitter requires the elapsed
            // number of seconds since the last update
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;

            // Should re-render the PIXI Stage
            renderer.renderer.render(renderer.renderer.stage);
        };

        // Start emitting
        emitter.emit = true;

        // Start the update
        update();
    }
}
