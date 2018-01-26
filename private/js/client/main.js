
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

        // Listen for messages
        this.socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'update': {
                    console.log('Update', message.data);
                }
            }
        });
    }
}
