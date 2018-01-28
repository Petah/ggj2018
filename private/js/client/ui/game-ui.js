class GameUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('game');
        this.hud = document.getElementById('hud');
        this.data = {};
    }

    render() {
        let text = '';
        for (let id in this.data.collectState) {
            if (this.data.collectState[id] !== null) {
                text += `Team ${id} is ${this.data.collectState[id]}<br>`;
            }
        }
        console.log(text);
        this.hud.innerHTML = text;
    }

    show() {
        this.element.style.display = 'block';
        this.hud.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
