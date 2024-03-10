document.addEventListener('DOMContentLoaded', function () {
    let users=[]
    const signInForm = document.querySelector('.form-container.sign-in form');
    const adminCheckbox = document.getElementById('adminCheckbox');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUsername = document.querySelector('.form-container.sign-in input[type="text"]').value;
        const enteredPassword = document.querySelector('.form-container.sign-in input[type="password"]').value;

            // Regular user login
function loadUsers() {
  const storedUsers = localStorage.getItem('user');
  if (storedUsers) {
    users = JSON.parse(storedUsers);

    console.log(users)
  }
}

loadUsers();
console.log(enteredUsername)
user=users.find(user => user.username === enteredUsername)
console.log(user)

            if (users && enteredUsername === user.username && enteredPassword === user.password) {
                alert('Login successful!');
                localStorage.setItem('sessionToken', user.id);
                window.location.href = "./index.html";
            } else {
                alert('Invalid username or password. Please try again.');
            }
        
    });
});
