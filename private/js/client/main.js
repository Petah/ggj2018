
console.log('Main');

class Client {
    connect() {
        // Create WebSocket connection.
        this.socket = new WebSocket('ws://127.0.0.1:8081');

        // Connection opened
        this.socket.addEventListener('open', (event) => {
            this.socket.send(JSON.stringify({
                type: 'view',
                data: {
                    x: 0,
                    y: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
            }));
        });


        var gameContainer = document.getElementById('game');
        var renderer = new Renderer();
        gameContainer.appendChild(renderer.getView());

        // Add bunny
        const bunny = renderer.addSprite(1, '/images/bunny.png', 400, 300);

        // Listen for messages
        this.socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'update': {
                    console.log('Update', message.data);
                    bunny.x = message.data[0][0];
                    bunny.y = message.data[0][1];
                    console.log(message.data[0][0], message.data[0][1]);
                }
            }
        });
    }
}
