const { changeUri, changeName, setUri, setName } = require('./container.js');
const { subscribe, logCommits } = require('./model.js');

function logger(globalState, commit) {
    console.log(`[GLOBAL]: ${JSON.stringify(globalState)}`);
    console.log(`[COMMIT]: ${JSON.stringify(commit)}`);
}

// debugger;
subscribe(logger);

changeUri(setUri)({ uri: 'some uri' });
changeUri(setName)({ uri: 'awesome name' });
changeUri(setUri)({ uri: 'some uri' });
changeName(setName)({ name: 'awesome name' });

logCommits();
