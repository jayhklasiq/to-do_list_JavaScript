const username = document.getElementById('username');
const password = document.getElementById('password');
let userInfo = []
const signUpButton = document.getElementById('signUpBtn');
const signInButton = document.getElementById('signInBtn');

fetch('users.json')
  .then(response => response.json())
  .then(data => {
    // Use the loaded JSON data
    userInfo = data;
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch operation
    console.error('Error loading JSON file:', error);
  });





