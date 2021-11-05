const serverEvents = [
    'fridge:put',
    'fridge:take',
    'coffee:drink',
    'coffee:buy',
    'temp:up',
    'temp:down',
];

const sendServerEvent = (event) => {
    console.log('server sending .... ', event);
    postMessage(event);
};

let eventIndex = 0;
const intervalId = setInterval(() => {
    if (eventIndex >= serverEvents.length) {
        clearInterval(intervalId);
    } else {
        sendServerEvent(serverEvents[eventIndex]);
        eventIndex++;
    }
}, 3000);
