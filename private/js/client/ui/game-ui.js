class GameUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('game');
        this.hud = document.getElementById('hud');
        this.data = {};
    }

    render() {
        if (this.data.part) {
            this.hud.innerHTML = `Press [A] or [Space] to pick up part`;
        }
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
