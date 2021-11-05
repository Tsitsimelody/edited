const myWorker = new Worker('/worker.js');

/// === set initail state;
const state = new Map();
state.set('coffee', 6);
state.set('temp', 22.5);
state.set('fridge', 8);

const getMood = (num, checks) => {
    return num === checks[0]
        ? 'lightning'
        : num <= checks[1]
        ? 'umbrellaRain'
        : num <= checks[2]
        ? 'umbrella'
        : num <= checks[3]
        ? 'cloud'
        : 'sunny';
};

const stateChecker = {
    coffee: (num) => getMood(num, [1, 5, 10, 15]),
    temp: (num) => getMood(num, [5, 10, 15, 20]),
    fridge: (num) => getMood(num, [1, 5, 10, 15]),
    mood: (num) => getMood(num, [10, 25, 50, 75]),
};

const moodSymbols = {
    sunny: '&#9788;',
    umbrella: '&#9730;',
    umbrellaRain: '&#9748;',
    cloud: '&#9729;',
    lightning: '&#9889;',
};

// ======================== Dom manipulators

const updateDom = (id, value) => {
    const domNode = document.getElementById(id);
    const contentNode = domNode.getElementsByClassName('content')[0];
    const content = stateChecker[id](value);
    contentNode.innerHTML = moodSymbols[content];
};

const updateMoodDom = (moodState) => {
    // update content
    for (const [key, value] of moodState) {
        updateDom(key, value);
    }

    // update office mood
    const value = Array.from(state.values()).reduce((acc, pre) => acc + pre, 0);
    updateDom('mood', value);
};

updateMoodDom(state);

//-------------------------- listen and react to server events
myWorker.onmessage = function (oEvent) {
    const updaters = {
        put: (num) => num + 10,
        take: (num) => num - 1,
        drink: (num) => num - 1,
        buy: (num) => num + 10,
        up: (num) => num + 10,
        down: (num) => num - 15,
    };

    const event = oEvent.data.split(':');
    const newValue = updaters[event[1]](state.get(event[0]));
    state.set(event[0], newValue);
    updateMoodDom(state);
};
