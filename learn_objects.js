// const key1 = "name";
// const key2 = "age";

// const obj = {
//   [key1]: "fındık",
//   [key2]: 7,
// };

//************* */

// let obj = { name: "fındık" };

// obj = { ...obj, age: 6, type: "cat" };

//********** */

// const obj = {};

// Object.assign(obj, {
//   name: " fındık",
//   age: 6,
// });

//*** */

// const obj = {};

// (obj.name = "fındık"), (obj.age = 7);

// //*** */

// const obj = {
//   name: "fındık",
//   age: 7,
// };

//****** */

// const obj = {};

// const key1 = " name";
// const value1 = "fındık";

// const key2 = " age";
// const value2 = 7;

// obj[key1] = value1;
// obj[key2] = value2;

// console.log(obj);

//..............

//Getting value form an object

// const person = {
//   name: "fındık",
//   age: 7,
//   country: "Türkiye",
// };

// //3 ways to get value of country
// console.log(person.country);
// console.log(person["country"]);

// const key = "country";
// console.log(person[key]);

// ....................
// const student = {
//   name: "Elif",
//   grade: "A",
//   age: 21,
// };

// for (let property in student) {
//   console.log(student[property] + ": " + property);
// }

// .......................

// const user = { username: "john", email: "john@example.com" };
// const field = prompt("Which field do you want? username or email?");

// console.log(user.field);
// console.log(user[field]);
//..........................

// let obj = {};

// let key1 = "key1";
// obj[key1] = "Value1";

// let value2 = "Value2";
// obj["key2"] = value2;

// let value3 = "Value 3";
// let key3 = "key3";
// obj[key3] = value3;

// console.log(obj);

//..........................

// const cars = {
//   car1: "red",
//   car2: "blue",
//   car3: " yellow",
//   car4: "black",
// };

// let object = {};

// Object.keys(cars).forEach((key) => {
//   object[key] = cars[key];
// });

// console.log(object);

//.............................

const cars = {
  car1: "red",
  car2: "blue",
  car3: " yellow",
  car4: {
    wheel: 4,
    doors: 5,
  },
};

let object = {};

Object.keys(cars.car4).forEach((key) => {
  object[key] = cars.car4[key];
});

console.log(object);
