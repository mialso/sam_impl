const { changeUri, changeName, setUri, setName, getContainer } = require('./container.js');
const { subscribe, logCommits, cleanUp, applyCommit, getCommits, initStore } = require('./model.js');

function logger(globalState, commit) {
    console.log('-----------logger------------');
    console.log(`[GLOBAL]: ${JSON.stringify(globalState)}`);
    console.log(`[COMMIT]: ${JSON.stringify(commit)}`);
}

// debugger;
subscribe(logger);

changeUri(setUri)({ uri: 'some uri' });
changeUri(setName)({ uri: 'awesome name' });
changeUri(setUri)({ uri: 'some uri' });
changeName(setName)({ name: 'awesome name' });

logCommits('container');

const previousCommits = getCommits('container');

initStore('cont', getContainer());

previousCommits.forEach(commit => applyCommit('cont', commit));
