const one = 'Habit\nBushy';
const two = 'Hardiness\n\nH1C';

let [characteristicTitle, ...description] = one.split('\n');
// description = description.filter(value => value);
console.log(characteristicTitle, description.join(''));
