const gamepads = [];

window.addEventListener("gamepadconnected", (event) => {
    gamepads.push({
        gamepad: event.gamepad,
    });
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        event.gamepad.index, event.gamepad.id,
        event.gamepad.buttons.length, event.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected from index %d: %s",
        event.gamepad.index, event.gamepad.id);
});

class Controller {
    constructor() {
        this.gamepad = null;
    }
}
