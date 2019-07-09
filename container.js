const { action } = require('./action.js');
const { model } = require('./model.js');

const ContainerSchema = {
    uri: '',
    name: '',
};

function getContainer() {
    return Object.create(ContainerSchema);
}

const stageUri = event => {
    if (event.uri) {
        return { uri: event.uri };
    }
}

const stageName = event => {
    if (event.name) {
        return { name: event.name };
    }
}

const commitUri = (state, stageUri) => {
    if (!(stageUri.uri && typeof stageUri.uri === 'string')) {
        return state;
    }
    if (stageUri.uri === state.uri) {
        return state;
    }
    return stageUri;
}

const commitName = (state, stageName) => {
    if (!(stageName.name && typeof stageName.name === 'string')) {
        return state;
    }
    if (stageName.name === state.name) {
        return state;
    }
    return stageName;
}

const initialState = getContainer();

module.exports = {
    changeUri: action(stageUri),
    changeName: action(stageName),
    setUri: model(commitUri, { key: 'container', initialState }),
    setName: model(commitName, { key: 'container', initialState }),
};
