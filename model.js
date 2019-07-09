const globState = {};
const listeners = [];
const commits = [];

function subscribe(listener) {
    listeners.push(listener);
}

function logCommits() {
    console.info('[COMMITS]: %s', commits.length);
    commits.forEach((commit, index) => console.info(`[${index}]: ${JSON.stringify(commit)}`));
}

const model = (commit, { key, initialState}) => {
    globState[key] = initialState;
    return proposal => {
        const stateCommit = commit(globState[key], proposal);
        if (stateCommit === globState[key]) {
            return;
        }
        globState[key] = { ...globState[key], ...stateCommit };
        listeners.forEach(listener => listener(globState, stateCommit));
        commits.push(stateCommit);
    };
}

module.exports = {
    model,
    subscribe,
    logCommits,
}
