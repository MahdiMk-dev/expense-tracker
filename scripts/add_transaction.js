document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-form');
    form.addEventListener('submit', handleFormSubmit);
  
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get form values
      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const description = document.getElementById('description').value;
      const currency = document.getElementById('currency').value;
  
      // Validate form values (you can add more validation if needed)
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
      }
  



  
      // Retrieve existing transactions from local storage
      const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      // Create a transaction object
      const transaction = {
        type: type,
        amount: amount,
        description: description,
        currency: currency,
        userid :  localStorage.getItem('sessionToken'),
        id: existingTransactions.length + 1,
      };
  
      // Add the new transaction to the array
      existingTransactions.push(transaction);
  
      // Save the updated array back to local storage
      localStorage.setItem('transactions', JSON.stringify(existingTransactions));
  
      // Optionally, you can display a success message or update the UI here
      alert('Transaction added successfully!');
  
      // Clear the form for the next entry
      form.reset();
      // Move to another page
      window.location.href = "./index.html";
    }

    const addTransactionBtn = document.getElementById('addTransaction');
    addTransactionBtn.addEventListener('click', addTransaction);
    fetchCurrenciesAdd();
    function fetchCurrenciesAdd(){
      fetchCurrencies()
      .then(data => {
        if (data) {
          // Add fetched currencies to the specified form
          addCurrenciesToForm(data, 'add-form');
        }
      });
    }
  })