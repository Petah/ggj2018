class TitleUi {
    constructor(game) {
        this.game = game;
        this.element = document.getElementById('title');
    }

    render() {
        const players = this.game.players.map((player, i) => {
            return 'Player ' + (i + 1) + ' (' + (player.keyboard ? 'keyboard' : ('gamepad ' + (player.input.gamepadIndex + 1))) + ') joined!';
        });
        this.element.innerHTML = `
            Press [A] or [Space] to join.<br/>
            <br/>
            ${players.join('<br/>')}
            <br/>
            <br/>
            Press [Start] or [Enter] to start game.<br/>
        `;
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
