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
        this.game.client.send('updateInput', {
            id: this.player.id,
            move: {
                x: horizontalAxis,
                y: verticalAxis,
            },
            shoot: Keyboard.buttons[32],
        });
    }
}

Keyboard.buttons = {};

document.addEventListener('keydown', (event) => {
    // event.ctrlKey
    Keyboard.buttons[event.which] = true;
    // switch (event.which) {
    //     case 38: { // Up
    //         this.upDown = true;
    //         break;
    //     }
    //     case 40: { // Down
    //         this.downDown = true;
    //         break;
    //     }
    //     case 37: { // Left
    //         this.leftDown = true;
    //         break;
    //     }
    //     case 39: { // Right
    //         this.rightDown = true;
    //         break;
    //     }
    //     case 32: { // Space
    //         this.shootDown = true;
    //         break;
    //     }
    // }
    // this.updateInput();
    // console.log(event.which);
});

document.addEventListener('keyup', (event) => {
    // event.ctrlKey
    Keyboard.buttons[event.which] = false;
    // switch (event.which) {
    //     case 38: { // Up
    //         this.upDown = false;
    //         break;
    //     }
    //     case 40: { // Down
    //         this.downDown = false;
    //         break;
    //     }
    //     case 37: { // Left
    //         this.leftDown = false;
    //         break;
    //     }
    //     case 39: { // Right
    //         this.rightDown = false;
    //         break;
    //     }
    //     case 32: { // Space
    //         this.shootDown = false;
    //         break;
    //     }
    // }
    // this.updateInput();
    // console.log(event.which);
});
