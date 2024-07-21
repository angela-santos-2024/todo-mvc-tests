### Prerequisites

Make sure you have the following installed on your machine:

Node.js (version 20.15.1)
Java (version 8 or higher)

### Install dependencies

To install the dependencies run these commands:

```
npm i
npx playwright install --with-deps
```

### Run tests

To run the test in chromium in headless mode run:

```
npm test
```

To run the test in all the browsers in headless mode run:

```
npm run test:all
```

To run the test in chromium in debug mode (headed + inspector) run:

```
npm run test:debug
```

### Report

To get the report after running the tests:

```
npm run report
```
