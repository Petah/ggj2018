class WinUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('win');
    }

    render() {
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
