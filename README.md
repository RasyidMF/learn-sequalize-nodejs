# Express JS + Sequalize + JWT

Created by RasyidMF (Learning Sequalize, Express JS, Authentication (JWT) with
Typescript)

# Initialization

## Version : 1.0

```bash
npm init -y
npm i typescript --save-dev

# install Nodejs ambient types for TS
npm install @types/node --save-dev

# create 'tsconfig.json'
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

npm install --save-dev ts-node nodemon
```

## nodemon.json

```json
{
	"watch": ["src"],
	"ext": ".ts,.js",
	"ignore": [],
	"exec": "npx ts-node ./src/index.ts"
}
```

## package.json

```json
{
	"dev": "npx nodemon",
	"start": "npm run build && node build/index.js",
	"build": "rimraf ./build && tsc"
}
```
