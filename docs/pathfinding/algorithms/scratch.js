let obj = [
  { name: "Big Al", age: 24, fav_color: "blue" },
  { name: "Johnny", age: 23, fav_color: "blue" },
  { name: "Cogs", age: 22, fav_color: "green" },
  { name: "Danny", age: 24, fav_color: "red" }
];

function f(array, prop) {
  for (let o of array) {
    console.log(`${index} ${o[prop]}`);
  }
  console.log();
}

f(obj, "age");
f(obj, "name");
f(obj, "fav_color");
