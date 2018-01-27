class Keyboard {
    constructor(game, player, gamepadIndex) {
        this.game = game;
        this.player = player;
        this.gamepadIndex = gamepadIndex;
    }

    loop(deltaTime, currentTime) {
        let verticalAxis = 0;
        let horizontalAxis = 0;
        if (Keyboard.buttons[38]) { // Up
            verticalAxis = -1;
        } else if (Keyboard.buttons[40]) { // Down
            verticalAxis = 1;
        }
        if (Keyboard.buttons[37]) { // Left
            horizontalAxis = -1;
        } else if (Keyboard.buttons[39]) { // Right
            horizontalAxis = 1;
        }

        // Tab
        let switchUnit = false;
        if (Keyboard.buttons[9]) {
            switchUnit = true;
        }

        this.game.client.send('updateInput', {
            id: this.player.id,
            move: {
                x: horizontalAxis,
                y: verticalAxis,
            },
            shoot: Keyboard.buttons[32],
            switchUnit: switchUnit,
        });
    }
}

Keyboard.buttons = {};

document.addEventListener('keydown', (event) => {
    Keyboard.buttons[event.which] = true;
    if (!event.ctrlKey) {
        event.preventDefault();
    }
});

document.addEventListener('keyup', (event) => {
    Keyboard.buttons[event.which] = false;
    if (!event.ctrlKey) {
        event.preventDefault();
    }
});
