class Player {
    constructor(game, input) {
        this.game = game;

        this.id = genUid();

        this.upDown = false;
        this.downDown = false;
        this.leftDown = false;
        this.rightDown = false;
        this.shootDown = false;

        this.input = null;

        this.game.client.send('createPlayer', {
            id: this.id,
        });
    }

    loop(deltaTime, currentTime) {
        this.input.loop(deltaTime, currentTime);
    }
}
