module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        '@typescript-eslint/tslint',
        'react-hooks',
        'dcr',
    ],
<<<<<<< HEAD
    ignorePatterns: ['build'],
=======
>>>>>>> 61313240e1e64ed741c0ae07b5c19cab80c4d413
    rules: {
         // TODO tackle one at a time.
        'react/jsx-indent': [2, 'tab'],     
        'react/require-default-props': 'off',
        'react/jsx-curly-brace-presence': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prefer-const': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-unneeded-ternary': 'off',
        'prefer-destructuring': 'off',
        'no-alert': 'off',
        'react/jsx-indent-props': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
        'react/jsx-boolean-value': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'react/no-danger': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',   
        'consistent-return': 'off',
        'default-case': 'off',
        
        // Conflicts with code formatting
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-curly-newline': 'off',
<<<<<<< HEAD
=======
        'react/jsx-indent': 'off',
>>>>>>> 61313240e1e64ed741c0ae07b5c19cab80c4d413
    },
};
