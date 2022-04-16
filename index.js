// 1. Решите задачу по выводу данных в консоль.
// console.log('Record 1');
// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
// console.log('Record 5');
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));


// Вывод: 1, 5, 6, 2, 3, 4


// 2. Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в
// формате «час-день-месяц-год». Задача программы — создавать для каждого аргумента
// таймер с обратным отсчётом: по секундный вывод в терминал состояния таймеров (сколько
// осталось). По истечении какого-либо таймера, вместо сообщения о том, сколько осталось,
// требуется показать сообщение о завершении его работы. Важно, чтобы работа программы
// основывалась на событиях.

// date format hh-DD-MM-YYYY

const moment = require('moment');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const [inputDate] = process.argv.slice(2);

const prepareDate = (value) => {
    const date = value.split('-');

    date.forEach(val => {
        if (isNaN(val)) {
            return console.log("Некорректное значение")
        }
    })

    const [hour, day, month, year] = date;

    return new Date(Date.UTC(year, month - 1, day, hour));
};

const getDateDiff = (date) => {
    const now = moment(new Date())
    const future = moment(date)
    if (now >= future) { // неявно приводим к числу (миллисекунды) и сравниваем
        emitter.emit('stopTick');
        return
    }
    const diff = moment.duration(future.diff(now))._data
    console.log(`${diff.seconds} seconds ${diff.minutes} minutes ${diff.hours} hours ${diff.days} days ${diff.months} months ${diff.years} years`)
}

const futureDate = prepareDate(inputDate)
const timer = setInterval(() => {
    emitter.emit('nextTick', futureDate);
}, 1000)

emitter.on('nextTick', getDateDiff);
emitter.on('stopTick', () => {
    clearInterval(timer);
    console.log('Таймер истек');
});
