# Calculator

Calculator — это простой и удобный калькулятор, разработанный для выполнения основных арифметических операций. Проект написан на React и предназначен для использования в браузере.

## Установка

Для установки проекта выполните следующие шаги:

1. Клонируйте репозиторий:
```bash
git clone https://github.com/ваш_username/Calculator.git
```

2. Перейдите в директорию проекта:
```bash
cd Calculator
```

3. Установите зависимости:
```bash
npm install
```


## Использование

### Разработка

Для запуска проекта в режиме разработки используйте:
```bash
npm run start
```
После запуска проект будет доступен в браузере по адресу http://localhost:3000.

### Сборка

Для сборки проекта в режиме production используйте:
```bash
npm run build
```
Собранные файлы будут находиться в директории dist.

### Тестирование

Для запуска тестов используйте:
```bash
npm run test
```
Для тестирования используется Jest и React Testing Library .

## Структура проекта

- **public** - статичные файлы, такие как index.html, иконки и другие ресурсы.
- **test** - тесты для компонентов и функций проекта. Тестирование разделено на 2 части:
    - **App** - отвечает за функционирование приложения (отображение, рендер, события).
    - **Calculator** - за движок (матеметические вычисления).
- **src** - основная директория проекта, включает:
    - **components** - компоненты, которые могут использоваться во всем проекте.
    - **utils** - утилыты проекта.
    - **context** - сервисы, вызываемые в контексте приложения.
    - **lib** - библиотека вспомогательных данных, таких как вспомогательные функции и константы.
    - **pages** - компоненты страниц, связанные с роутингом.
    - **plugins** - API для возможности расширения функционала приложения.


## Расширение функционала приложения

Для добавления новых возможностей в калькулятор реализовано простое API в виде плагина к приложению, которое не затрагивает основной код. Чтобы добавить новые операции в калькулятор, перейдите в директорию **plugins**. В файле **extensionOfCalculator** к массиву **newOperations** необходимо добавить объект с нужным вам функционалом.

Пример добавления новой операции:
```{
    symbol: '^',
    precedence: 4,
    evaluate: (stack) => {
        let b = stack.pop() ?? 0;
        let a = stack.pop() ?? 0;
        stack.push(Math.pow(a, b));
        return stack;
    }
}```