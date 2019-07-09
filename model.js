const globState = {};
const listeners = [];
const commits = {};

function subscribe(listener) {
    listeners.push(listener);
}

function logCommits(key) {
    console.info('[COMMITS]: <%s>: %s', key, commits[key].length);
    commits[key].forEach((commit, index) => console.info(`[${index}]: ${JSON.stringify(commit)}`));
}

function getCommits(key) {
    return commits[key].slice();
}

function applyCommit(key, commit) {
    globState[key] = { ...globState[key], ...commit };
    listeners.forEach(listener => listener(globState, commit));
    commits[key].push(commit);
}

function cleanUp(key) {
    delete globState[key];
}

function initStore(key, initialState) {
    globState[key] = initialState;
    commits[key] = [];
}

const model = (commit, { key, initialState}) => {
    initStore(key, initialState);
    return proposal => {
        const stateCommit = commit(globState[key], proposal);
        if (stateCommit === globState[key]) {
            return;
        }
        return applyCommit(key, stateCommit);
    };
}

module.exports = {
    model,
    subscribe,
    logCommits,
    applyCommit,
    cleanUp,
    getCommits,
    initStore,
};
