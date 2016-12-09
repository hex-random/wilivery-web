module.exports = {
    'plugins': ['node'],
    'env': { 'es6': true, 'node': true, 'jquery': true },
    'extends': ['eslint:recommended', 'plugin:node/recommended'],
    'rules': {
        'indent': ['error', 4 ],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': 'off',
        'eqeqeq': ['error', 'always'],
        'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
        'node/exports-style': ['error', 'module.exports']
    }
};
