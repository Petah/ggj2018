class Game {
    constructor() {
        this.client = new Client();
        this.client.connect();

        this.state = 'title';
        this.started = false;

        this.players = [];

        this.titleUi = new TitleUi(this);
        this.gameUi = new GameUi(this);
    }

    start() {
        console.log('Game start');

        this.started = true;

        let lastSecond = 0;
        let previousTime = performance.now() / 1000;
        let updates = 0;
        const gameLoop = () => {
            this.currentTime = performance.now() / 1000;
            const deltaTime = this.currentTime - previousTime;
            previousTime = this.currentTime;
            updates++;

            if (lastSecond <= this.currentTime - 1) {
                lastSecond = this.currentTime;
                console.log('UPS', updates);
                updates = 0;
            }

            this.loop(deltaTime, this.currentTime);

            if (this.started) {
                window.requestAnimationFrame(gameLoop);
            }
        };
        window.requestAnimationFrame(gameLoop);
    }

    stop() {
        console.log('Game stop');

        this.started = false;
    }

    createPlayer(gamepadIndex) {
        let found = false;
        let p = this.players.length;
        while (p--) {
            if (this.players[p].gamepadIndex == gamepadIndex) {
                return;
            }
        }
        console.log('Creating player');
        const player = new Player(this);
        player.gamepadIndex = gamepadIndex;
        this.players.push(player);
    }

    loop(deltaTime, currentTime) {
        this.gamepads = navigator.getGamepads();
        switch (this.state) {
            case 'title': {
                let i = this.gamepads.length;
                while (i--) {
                    if (this.gamepads[i]) {
                        // for (let b = 0; b < this.gamepads[i].buttons.length; b++) {
                        //     if (this.gamepads[i].buttons[b].pressed) {
                        //         console.log(b);
                        //     }
                        // }
                        // console.log(this.gamepads[i].buttons[0].value);
                        // console.log(this.gamepads[i].axes[0]);

                        // A
                        if (this.gamepads[i].buttons[0].pressed) {
                            this.createPlayer(i);
                        }
                        this.titleUi.render();

                        // Start
                        if (this.gamepads[i].buttons[9].pressed) {
                            this.titleUi.hide();
                            this.gameUi.show();
                            this.state = 'game';
                        }
                    }
                }

                break;
            }
            case 'game': {
                let p = this.players.length;
                while (p--) {
                    this.players[p].loop(deltaTime, currentTime);
                }
                break;
            }
        }
    }
}
