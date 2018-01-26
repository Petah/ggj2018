module.exports = (name) => {
    return new class {
        log(...args) {
            console.log(name, ...args);
        }
    }
};
