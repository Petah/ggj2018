class AudioBuffer {
    constructor(context) {
        this.context = context;
        this.urls = {
            'pickup-1': '/sounds/pickup-1.ogg',
            'pickup-2': '/sounds/pickup-2.ogg',
            'shoot-1': '/sounds/shoot-1.ogg',
            'shoot-1': '/sounds/shoot-2.ogg',
            'button': '/sounds/button.ogg',
        };
        this.buffer = [];
    }

    loadSound(url, index) {
        let request = new XMLHttpRequest();
        let thisBuffer = this;

        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            thisBuffer.context.decodeAudioData(request.response, function (buffer) {
                thisBuffer.buffer[index] = buffer;
            });
        };
        request.send();
    }

    loadAll() {
        for (let key in this.urls) {
            this.loadSound(this.urls[key], key);
        }
    }

    getSoundByIndex(index) {
        console.log(`Getting sound with index "${index}"`);

        return this.buffer[index];
    }

};

class Audio {
    constructor() {
        this.context = null;
        this.buffer = null;
    }

    init() {
        this.getGainNode().connect(this.getContext().destination);
        this.getBuffer().loadAll();
    }

    play(soundId) {
        let bufferedSound = this.getBuffer().getSoundByIndex(soundId);
        if (!bufferedSound) {
            console.error(`Could not find sound with index "${soundId}".`);
            return null;
        }

        this.source = this.getContext().createBufferSource();
        this.source.buffer = bufferedSound;
        this.source.connect(this.getGainNode());
        this.source.start(0);
    }

    stop() {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.getContext().currentTime + 0.5);
        this.source.stop(this.getContext().currentTime + 0.5);
    }

    getGainNode() {
        if (!this.gainNode) {
            this.gainNode = this.getContext().createGain();
        }

        return this.gainNode;
    }

    getContext() {
        if (!this.context) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            
            this.context = new AudioContext();
        }

        return this.context;
    }

    getBuffer() {
        if (!this.buffer) {
            this.buffer = new AudioBuffer(this.getContext());
        }

        return this.buffer;
    }
};