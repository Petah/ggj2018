class GameUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('game');
        this.hud = document.getElementById('hud');
        this.data = {};
    }

    render() {
        if (this.data.canPickUp) {
            this.hud.innerHTML = `Press [A] or [Space] to pick up part`;
        }

        if (this.data.isStealing) {
            this.hud.innerHTML= `Stealing ${this.data.stealType}!`;
        }

        if (this.data.hasPart) {
            this.hud.innerHTML = `Carrying part`;
        }

        if (this.data.gameOver) {
            this.hud.innerHTML = `Game over: ${this.hud.winningTeam} wins!`;
        }
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
