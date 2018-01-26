class Player {
    constructor(game) {
        this.game = game;

        this.id = genUid();

        this.upDown = false;
        this.downDown = false;
        this.leftDown = false;
        this.rightDown = false;
        this.shootDown = false;

        this.input = new Controller(this);

        this.game.client.send('createPlayer', {
            id: this.id,
        });
    }

    loop(deltaTime, currentTime) {
        let horizontalAxis = this.game.gamepads[this.gamepadIndex].axes[0];
        if (Math.abs(horizontalAxis) < 0.3) {
            horizontalAxis = 0;
        }
        let verticalAxis = this.game.gamepads[this.gamepadIndex].axes[1];
        if (Math.abs(verticalAxis) < 0.3) {
            verticalAxis = 0;
        }
        this.game.client.send('updateInput', {
            id: this.id,
            move: {
                x: horizontalAxis,
                y: verticalAxis,
            },
            shoot: this.game.gamepads[this.gamepadIndex].buttons[0].pressed,
        });
    }
}
