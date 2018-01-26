
console.log('Main');

class Client {
    connect() {
        // Create WebSocket connection.
        this.socket = new WebSocket('ws://127.0.0.1:8081');

        const gameContainer = document.getElementById('game');
        const renderer = new Renderer();
        gameContainer.appendChild(renderer.getView());

        // Connection opened
        this.socket.addEventListener('open', (event) => {
            this.socket.send(JSON.stringify({
                type: 'view',
                data: {
                    x: 0,
                    y: 0,
                    width: renderer.width,
                    height: renderer.height,
                },
            }));
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
}
