class Audio {
    constructor() {
        this.clips = {
            shoot: '../public/sounds/shoot.wav',
            //die: '../public/sounds/die.wav'
        };

        this.sources = {};
        this.context = null;
        this.bufferLoader = null;
    }

    init() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();

        try {
            this.bufferLoader = new BufferLoader(
                this.context,
                this.clips.values(),
                this.finishedLoading
            );

            this.bufferLoader.load();
        } catch (e) {
            alert('Web Audio API unsupported');
        }

        console.log('Audio loaded')
    }

    finishedLoading(bufferList) {
        let i = 0;
        while (i < bufferList.length) {
            let source = this.context.createBufferSource();
            source.buffer = bufferList[i];
            source.connect(context.destination);
            this.sources[this.clips.keys()[i]] = source;

            console.log('Loaded clip:' + this.clips.keys()[i]);
        }

        this.play('shoot');
    }

    play(name) {
        let source = this.sources[name];
        source.start(0);

        console.log('Played clip:' + name);
    }
}

class BufferLoader {
    constructor(context, urlList, callback) {
        this.context = context;
        this.urlList = urlList;
        this.onload = callback;
        this.bufferList = [];
        this.loadCount = 0;
    }

    loadBuffer(url, index) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        let loader = this;

        request.onload = function () {
            loader.context.decodeAudioData(
                request.response,
                function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;
                    if (++loader.loadCount === loader.urlList.length)
                        loader.onload(loader.bufferList);
                },
                function (error) {
                    console.error('decodeAudioData error', error);
                }
            );
        };

        request.onerror = function () {
            alert('BufferLoader: XHR error');
        };

        request.send();
    };

    load() {
        for (let i = 0; i < this.urlList.length; ++i)
            this.loadBuffer(this.urlList[i], i);
    }
}
