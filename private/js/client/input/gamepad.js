// const gamepads = [];

// window.addEventListener("gamepadconnected", (event) => {
//     gamepads.push({
//         gamepad: event.gamepad,
//     });
//     console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
//         event.gamepad.index, event.gamepad.id,
//         event.gamepad.buttons.length, event.gamepad.axes.length);
// });

// window.addEventListener("gamepaddisconnected", (event) => {
//     console.log("Gamepad disconnected from index %d: %s",
//         event.gamepad.index, event.gamepad.id);
// });

class Gamepad {
    constructor(game, player, gamepadIndex) {
        this.game = game;
        this.player = player;
        this.gamepadIndex = gamepadIndex;
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
            id: this.player.id,
            move: {
                x: horizontalAxis,
                y: verticalAxis,
            },
            shoot: this.game.gamepads[this.gamepadIndex].buttons[0].pressed,
            switchUnit: this.game.gamepads[this.gamepadIndex].buttons[7].pressed,
        });
    }
}
