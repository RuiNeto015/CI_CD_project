module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "roots": [
        "<rootDir>/src"
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "outputPath": "./unit_tests_artifacts/test_report.html"
        }]
    ],
};