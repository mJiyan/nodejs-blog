# NodeJS Blog

You can use it as a basic project for Authentication/Authorization and CRUD operations. 

Before you begin, do not forget create an .env file, such as an .env.example file. 


## Table of Contents

- [Installation](#installation)
- [Test](#test)
- [Documentation](#documentation)
- [Structure](#structure)
- [Support](#support)
- [Contributing](#contributing)

## Installation
### with Docker
```sh
git clone https://github.com/mJiyan/nodejs-blog.git
cd nodejs-blog
docker-compose up --build
```

### manually
```sh
git clone https://github.com/mJiyan/nodejs-blog.git
cd nodejs-blog
yarn

## Prepare your environment variables with generating .env file like in the .env.example file
yarn start
```

## Test
```sh
git clone https://github.com/mJiyan/nodejs-blog.git
cd nodejs-blog
yarn

## Prepare your environment variables with generating .env file like in the .env.example file
yarn test
```


## Documentation
```sh
git clone https://github.com/mJiyan/nodejs-blog.git
cd nodejs-blog
yarn

## Prepare your environment variables with generating .env file like in the .env.example file
yarn start

## Then open the: http://localhost:8081/api-docs
```


## Structure
```

├─ src
│  ├─ api
│  │  ├─ controllers
│  │  │  ├─ authControllers.js
│  │  │  ├─ blogController.js
│  │  │  └─ userController.js
│  │  ├─ routes
│  │  │  ├─ authRoutes.js
│  │  │  ├─ blogRoutes.js
│  │  │  ├─ routeManager.js
│  │  │  └─ userRoutes.js
│  │  ├─ swagger
│  │  │  └─ swagger.yaml
│  │  └─ validators
│  │     └─ user.validator.js
│  ├─ config
│  │  ├─ index.js
│  │  ├─ logger.config.js
│  │  └─ swagger.config.js
│  ├─ loaders
│  │  ├─ express.js
│  │  ├─ index.js
│  │  └─ mongoose.js
│  ├─ models
│  │  ├─ blogModel.js
│  │  ├─ index.js
│  │  └─ userModel.js
│  ├─ utils
│  │  ├─ index.js
│  │  └─ util.js
│  └─ app.js
├─ test
│  └─ api
│     ├─ controllers
│     │  ├─ auth.test.js
│     │  ├─ blog.test.js
│     │  ├─ index.test.js
│     │  └─ user.test.js
│     └─ helpers
│        └─ test.model.json
├─ .dockerignore
├─ .env
├─ .gitignore
├─ docker-compose.yaml
├─ Dockerfile
├─ LICENSE
└─ package.json
```

## Support

Please [open an issue](https://github.com/mJiyan/nodejs-blog/issues) for support & suggestions.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/mJiyan/nodejs-blog/compare).




