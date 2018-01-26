class GameUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('game');
        this.hud = document.getElementById('hud');
    }

    render() {
        this.hud.innerHTML = `
            Test
        `;
    }

    show() {
        this.element.style.display = 'block';
        this.hud.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
        this.hud.style.display = 'none';
    }
}
