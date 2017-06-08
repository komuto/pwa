
#  Komuto PWA
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)


## :arrow_forward: How to Clone App

1. cd to the repo
2. Run `yarn install` or `npm install`
3. Start coding

## :arrow_forward: How to Run App

1. cd to the repo
2. Run `node server.js`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

**IDE Recommendation**

Use [Atom](https://atom.io) with [Nuclide](https://nuclide.io)
Directions [here](https://egghead.io/lessons/react-setup-nuclide-to-use-flow-and-eslint-mac)

Or `whatever` you really like

**How to make Autocomplete on Flow works**

insert `@flow` comment at the top of your js files

## :penguin: How to Debug

Use `console.log('VALUE_YOU_WANT_TO_DEBUG')`
## :open_file_folder: Directory Structure
```

src/
   ├── Components/
   ├── Config/
   ├── Containers/
   ├── Layout/
   ├── Redux/
   ├── Sagas/
   ├── Services/
   ├── Themes/
   ├── Utils/
   └── Validations/
```

`/src/Components` Pure React Components

`/src/Config` App Config

`/src/Containers` React Redux Components

`/src/Layout` Predefined Layout

`/src/Redux` Redux Files (Reducer, Action, Types)

`/src/Sagas` Redux Side Effects

`/src/Services` Services

`/src/Themes` Themes Const

`/src/Utils` Utils Helpers

`/src/Validations` Validate.js Constraints

## :closed_lock_with_key: Secrets

```

The `.env` file is ignored by git keeping those secrets out of your repo.
