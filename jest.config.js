module.exports = {
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            babelConfig: true,
            tsconfig: 'tsconfig.json'
        }],
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.scss$': 'jest-css-modules-transform'
    },
    moduleNameMapper: {
        "/\.(css|less|scss|sass)$/": "identity-obj-proxy"
    },
    resolver: undefined,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    testEnvironment: 'jsdom',
};
// module.exports = {
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest', // or 'babel-jest' if you're using Babel
//         '^.+\\.scss$': 'jest-css-modules-transform',
//     },
//     moduleNameMapper: {
//         '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     },
// };