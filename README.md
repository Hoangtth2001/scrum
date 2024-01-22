## ACECRM STACK TECHNICAL

### FE

- axios
- react
- typescript
- redux

### CI/CD

- docker
- bitbucket pipeline

### Testing

- Jest
- Enzyme
- E2E

### UI Component

- material UI

### Tools

- eslint
- prettier
- husky
- lint-staged

## Config VSCode

### Install extensions

- eslint
- tslint
- prettier
- editorConfig for VSCode

### Edit settings.json file

Windows: Go to File -> Preferences -> Settings or `Ctrl + ,`

Adding in the settings.json file & create .vscode/settings.json in root project

```
{
  "files.associations": {
    "*.jsx": "javascriptreact"
  },
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Installation

```bash
# install node version
Please install at least v15.2.0 version node

# install npm version
Please install at least v7.0.10 version node
```

```bash
# install app's depndencie
$ npm install
$ yarn install
```

## Scripts

```bash
# install typescript
$ npm install -g typescript
```

```bash
# dev server with PORT 3002 at http://localhost:3002/
$ npm start
$ yarn start

# build for production with minify
$ npm run build
$ yarn build

# run `lint` to tell you what is wrong code.
$ npm run lint
$ yarn lint

# run `format` to format all code based on your prettier and linting configuration.
$ yarn format
```

# Directory sturcture

````
├── public/                       #static files
│   ├── assets/                   #assets
|   |    |── images               #images
|   |    |── fonts                #fonts
│   └── index.html                #html template
│
├── src/                          #project root
|   |── assets/                   #assets file
|   |── components/               #common components reuse
│   ├── configs/                  #configs project
│   ├── containers/               #containers source
│   ├── hooks/                    #hooks source
│   ├── libs/                     #third party library config
|   |── navigations/              #common routes
|   |── page/                     #screen source
|   |── redux/                    #redux stores
|   |    |── slice                #redux slice stores
|   |    └── thunk                #redux thunk stores
│   │
│   ├── services/                 #services source
|   |── themes/                   #themes app
│   ├── types/                    #define type
|   |── utils/                    #common function
|   |    └── locales              #multi languages
│   │
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
└── package.json```
````
