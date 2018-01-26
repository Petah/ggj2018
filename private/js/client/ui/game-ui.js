class GameUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('game');
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
