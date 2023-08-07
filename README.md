# rps-app

## Abstract:

This app represents a rock, paper, scissors game with both an easy and hard mode.

## Installation Instructions:

Option 1:

1. Navigate to [rps-app link](https://loganpaulmatheny.github.io/rps-app/) and play!

Option 2:

1. Download a zip file
2. Navigate to the correct directory in your terminal and use the command `open index.html` to load the application into your default browser.

Option 3:

1. Fork the repository
2. Clone the repository using git clone `<copy github repository information - found by clicking green code button>`
3. Run the application from terminal with `open index.html`

## Preview:

![](https://github.com/loganpaulmatheny/rps-app/blob/main/assets/rps_short.gif)

## Overview:

### Contributors

[Logan Matheny](https://github.com/loganpaulmatheny)

### Learning Goals

- Solidify and demonstrate your understanding of:
  - DRY JavaScript
  - event delegation to handle similar event listeners
- Understand the difference between the data model and how the data is displayed on the DOM
- Use your problem solving process to break down large problems, solve things step by step, and trust yourself to not rely on an outside “answer” to a logical challenge

### Wins

- Finished project ahead of schedule and spent additional time refactoring as well as updating CSS layout
- Minimized repetitive code and nested if statements
- Used minimal global variables representing the data model

### Challenges

- Attempts to 'stop' function calls until prior function is complete (JS is an asynchronous language and this is not possible) were unsuccessful - instead a simple setTimeout method were used
- Added 'draw' criteria for game logic beyond if two selections are the same for additional challenge (e.g. rock vs. barbie or indian jones)
- Changed background and styling when 'hard mode' is selected
