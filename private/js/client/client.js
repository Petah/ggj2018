
console.log('Main');

class Client {
    constructor(game) {
        this.game = game;
    }

    connect() {
        this.socketReady = false;
        // this.bind();

        // Create WebSocket connection.
        this.socket = new WebSocket('ws://' + location.hostname + ':8081');

        // Init renderer
        const gameContainer = document.getElementById('game');
        const renderer = new Renderer(gameContainer);

        // Init audio
        var audio = new Audio();
        audio.init();
        audio.play('ambient-1', 'background');

        // Connection opened
        this.socket.addEventListener('open', (event) => {
            this.socketReady = true;
            this.send('reset', {
            });
            this.send('view', {
                x: 0,
                y: 0,
                width: renderer.width,
                height: renderer.height,
            });
        });

        // Listen for messages
        this.socket.addEventListener('message', (event) => {
            let message;
            try {
                message = JSON.parse(event.data);
            } catch (e) {
                console.log('Invalid message', event.data);
                return;
            }
            switch (message.type) {
                case 'update': {
                    let i = message.data.updates.length;
                    while (i--) {
                        renderer.moveSprite(...message.data.updates[i]);
                    }
                    renderer.cullSprites(message.data.updates);
                    renderer.sortSprites();

                    if (message.data.renderer) {
                        renderer.cameraPanAbsolute(message.data.renderer.x, message.data.renderer.y);
                        renderer.cameraZoomAbsolute(message.data.renderer.zoom);
                    }
                    break;
                }

                case 'hud': {
                    this.game.gameUi.data = message.data;
                    break;
                }

                case 'playAudioAtPoint': {
                    if (message.data.audioClip) {
                        // @Todo
                        // Check if object inside viewport
                        console.log(`Playing audioClip: ${message.data.audioClip}`);
                        audio.play(message.data.audioClip);
                    }
                    break;
                }

                case 'win': {
                    this.gameUI.hide();
                    this.winUI.show();
                }
            }
        });
    }

    send(type, data) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: type,
                data: data,
            }));
        }
    }

    updateInput() {
        const move = {
            x: 0,
            y: 0,
        };
        if (this.upDown) {
            move.y = -1;
        } else if (this.downDown) {
            move.y = 1;
        }
        if (this.leftDown) {
            move.x = -1;
        } else if (this.rightDown) {
            move.x = 1;
        }
        this.send('updateInput', {
            move: move,
            shoot: this.shootDown,
        });
    }
}
