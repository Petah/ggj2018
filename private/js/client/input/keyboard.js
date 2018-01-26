class Keyboard {
    bind() {
        document.addEventListener('keydown', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.upDown = true;
                    break;
                }
                case 40: { // Down
                    this.downDown = true;
                    break;
                }
                case 37: { // Left
                    this.leftDown = true;
                    break;
                }
                case 39: { // Right
                    this.rightDown = true;
                    break;
                }
                case 32: { // Space
                    this.shootDown = true;
                    break;
                }
            }
            this.updateInput();
            // console.log(event.which);
        });

        document.addEventListener('keyup', (event) => {
            // event.ctrlKey
            switch (event.which) {
                case 38: { // Up
                    this.upDown = false;
                    break;
                }
                case 40: { // Down
                    this.downDown = false;
                    break;
                }
                case 37: { // Left
                    this.leftDown = false;
                    break;
                }
                case 39: { // Right
                    this.rightDown = false;
                    break;
                }
                case 32: { // Space
                    this.shootDown = false;
                    break;
                }
            }
            this.updateInput();
            // console.log(event.which);
        });
    }
}
