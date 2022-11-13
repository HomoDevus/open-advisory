# Открытие инвестиции advisory сервис

## Запустить приложения

1. Установите пакеты с помощью команды `npm install`
2. Запустите локальный сервер командой `npm start`. Либо соберите продакшн код командой `npm run build`.

## Использование

1. При первом запуск приложения появиться окно авторизации. Здесь нужно ввести логин и пароль.
2. После успешной авторизации вы попадёте на страницу с чатом. Здесь вы можете общаться с клиентом

## О приложении

Веб версия чата. Веб версия предназначена для брокеров, а мобильная версия для клиента.

На данном этапе реализованна авторизация и чат.

Что мы хотели-бы реализовать:

* Виджет с рекомендациями по инвестициям. Который интегрирован с ботом. Бот проводит опрос клиента и рекомендует
  портфель на основании ответов на опрос.
* Личный кабинет брокера с возможностью изменения данных об аккаунте.
* Бот с запрограммированными сценариями ответов.

## Используемые библиотеки

`react@18`

`react-redux` - используется вместе с `@reduxjs/toolkit` для управления состоянием.

`ant-design@4` - используется в качестве фреймворка компонентов. Этот фреймворк, был выбран так как он поддерживает tree
shaking (что важно для небольших проектов) и он имеет понятную документацию, что сильно ускорило процесс разработки.

`react-scripts` - для запуска локального сервер и создания бандла.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.