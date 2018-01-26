
console.log('Main');

class Client {
    connect() {
        this.socketReady = false;
        this.upDown = false;
        this.downDown = false;
        this.leftDown = false;
        this.rightDown = false;

        this.bind();

        // Create WebSocket connection.
        this.socket = new WebSocket('ws://' + location.hostname + ':8081');

        const gameContainer = document.getElementById('game');
        const renderer = new Renderer();
        gameContainer.appendChild(renderer.getView());

        // Connection opened
        this.socket.addEventListener('open', (event) => {
            this.socketReady = true;
            this.send('view', {
                x: 0,
                y: 0,
                width: renderer.width,
                height: renderer.height,
            });
        });

        // Listen for messages
        this.socket.addEventListener('message', (event) => {
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    case 'update': {
                        let i = message.data.length;
                        while (i--) {
                            renderer.moveSprite(...message.data[i]);
                        }
                    }
                }
            } catch (e) {
                console.log('Invalid message', event.data);
            }
        });
    }

    send(type, data) {
        if (this.socketReady) {
            this.socket.send(JSON.stringify({
                type: type,
                data: data,
            }));
        }
    }

    move() {
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
        this.send('move', move);
    }

    bind() {
        document.addEventListener('keydown', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.upDown = true;
                    break;
                }
                case 40: { // Down
                    this.downDown = true;
                    break;
                }
                case 37: { // Left
                    this.leftDown = true;
                    break;
                }
                case 39: { // Right
                    this.rightDown = true;
                    break;
                }
            }
            this.move();
            // console.log(event.which);
        });

        document.addEventListener('keyup', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.upDown = false;
                    break;
                }
                case 40: { // Down
                    this.downDown = false;
                    break;
                }
                case 37: { // Left
                    this.leftDown = false;
                    break;
                }
                case 39: { // Right
                    this.rightDown = false;
                    break;
                }
            }
            this.move();
            // console.log(event.which);
        });
    }
}
