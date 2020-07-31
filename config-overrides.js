const { override, addBabelPlugin } = require('customize-cra');
module.exports = override(
    addBabelPlugin([
        'emotion',
        {
            sourceMap: true,
            autoLabel: true,
        },
    ]),
);
