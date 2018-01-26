
console.log('Main');

class Client {
    connect() {
        this.bind();
        this.move = {
            x: 0,
            y: 0,
        }

        // Create WebSocket connection.
        this.socket = new WebSocket('ws://127.0.0.1:8081');

        const gameContainer = document.getElementById('game');
        const renderer = new Renderer();
        gameContainer.appendChild(renderer.getView());

        // Connection opened
        this.socket.addEventListener('open', (event) => {
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
        this.socket.send(JSON.stringify({
            type: type,
            data: data,
        }));
    }

    bind() {
        document.addEventListener('keydown', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.move.y = -1;
                    this.send('move', this.move);
                    break;
                }
                case 40: { // Down
                    this.move.y = 1;
                    this.send('move', this.move);
                    break;
                }
                case 37: { // Left
                    this.move.x = -1;
                    this.send('move', this.move);
                    break;
                }
                case 39: { // Right
                    this.move.x = 1;
                    this.send('move', this.move);
                    break;
                }
            }
            // console.log(event.which);
        });

        document.addEventListener('keyup', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.move.y = 0;
                    this.send('move', this.move);
                    break;
                }
                case 40: { // Down
                    this.move.y = 0;
                    this.send('move', this.move);
                    break;
                }
                case 37: { // Left
                    this.move.x = 0;
                    this.send('move', this.move);
                    break;
                }
                case 39: { // Right
                    this.move.x = 0;
                    this.send('move', this.move);
                    break;
                }
            }
            // console.log(event.which);
        });
    }
}
