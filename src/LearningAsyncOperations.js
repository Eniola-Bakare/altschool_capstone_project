// console.log(1);
// console.log(2);

// setTimeout(() => {
//   console.log("outer later");
// }, 3000);

// let data = "";
// fetch("https://jsonplaceholder.typicode.com/users/3")
//   .then((response) => response.json())
//   .then((data) => {
//     return (data = ("Data received:", data));
//   })
//   .catch(console.error());

// setTimeout(() => {
//   console.log(data);
// }, 3000);
// console.log(3);
// console.log(4);

// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     // fetch('https://jsonplaceholder.typicode.com/users/4')

//     let amount;
//     amount = "2023333";
//     resolve(amount);
//     reject("Invalid price ");
//   });
// };

// fetchData().then(
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.error(err);
//   }
// );

// const getTodos = new Promise((resolve, reject) => {
//   fetch("https://jsonplaceholder.typicode.com/todos/4")
//     .then((data) => resolve(data.json()))
//     // .then((da) => resolve(da))
//     .catch((err) => reject(err));
// });

// getTodos.then((data) => console.error(data)).catch((err) => console.error(err));
// console.log(typeof getTodos);

// const getUsers = async ()=>{
//     const response = await fetch('https://jsonplaceholder.typicode.com/users/3')
//     const data = await response.json()

//     console.log(data)
// }

// getUsers()

// console.log("one");
// console.log("one");
// const getUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users/3");
//   const data = await response.json();

// //   console.log(data);
//   return data;
// };

// getUsers().then((data) => console.log(data));
// console.log("two");
// console.log("two");
