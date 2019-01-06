# Tronbet.io Ring Stats

Trying to make stats over time for the ring game on tronbet.io

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

Clone this repository and run :

```sh
npm install
npm run build
```

## Usage

Configure desired options in appSettings.json and run :

```sh
npm start
```

The app will output `nbCycles` JSON files containing `nbRolls` rolls in an `./output` folder.
The rolls are in an array with this format :
```
[
  [roundNumber, roll, hash, timestamp],
  [roundNumber: number, roll: number, hash: string, timestamp: number],
  ...
]
```

This project uses typescript language and compiler.

## Support

Please [open an issue](https://github.com/drumline18/tb-ring-stats/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/drumline18/tb-ring-stats/compare/).