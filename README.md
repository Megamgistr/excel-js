# Excel Clone

A web-based Excel clone application built with vanilla JavaScript.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [License](#license)

## Technologies Used

- JavaScript (ES6+)
- HTML5
- SASS/SCSS
- Webpack
- Babel
- ESLint
- Jest

## Features

- **Dynamic Tables**: Create and manage multiple spreadsheets.
- **Formula Support**: A formula bar for entering and evaluating formulas.
- **Rich Text Formatting**: A toolbar with options for bold, italic, underline, and alignment.
- **Cell Selection**: Select and interact with cells in the table.
- **State Management**: Application state is managed and saved to local storage.
- **Routing**: A simple client-side router to navigate between the dashboard and spreadsheets.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Megamgistr/excel-js.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Running the Application

```sh
npm start
```

This will open the application in your browser at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run lint`: Lints the source code in the `src` directory.

## Project Structure

The project has a component-based architecture. The main directories are:

- `src/components`: Contains the individual components of the application (Header, Toolbar, Formula, Table).
- `src/core`: Contains the core framework of the application, including the DOM manipulation logic, router, and state management.
- `src/pages`: Contains the main pages of the application (Dashboard and Excel).
- `src/scss`: Contains the SASS files for styling.
- `src/store`: Contains the Redux-like store for state management.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
