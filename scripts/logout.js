document.getElementById('logoutButton').addEventListener('click', function() {
  // Perform logout action (e.g., clear session, revoke token)

  // Simulate logout by removing session token from localStorage
  localStorage.removeItem('sessionToken');

  // Redirect the user to the login page
  window.location.href = './login.html'; // Replace with the URL of your login page
});