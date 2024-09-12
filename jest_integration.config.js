module.exports = {
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testEnvironment": "node",
    "testRegex": "./src/.*\\.(test|spec)?\\.(ts|ts)$",
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
    "roots": [
        "<rootDir>/src"
    ],
    "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "outputPath": "./integration_tests_artifacts/test_report.html"
        }]
    ],
    "coverageReporters": [
        "text",
        "json",
        "html"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 50,
            "functions": 80,
            "statements": 80,
            "lines": 80,
        },
    },
};