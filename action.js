const action = stage => present => event => {
    const proposal = stage(event);

    return present(proposal);
}

module.exports = {
    action,
};

