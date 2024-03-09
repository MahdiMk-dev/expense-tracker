document.addEventListener('DOMContentLoaded', function() {
    displayTransactions();
  
    function displayTransactions(filteredTransactions) {
      const transactions = filteredTransactions || JSON.parse(localStorage.getItem('transactions')) || [];
//adding data in table form.
      const table = document.createElement('table');
      table.classList.add('transaction-table');
  
      const headerRow = table.insertRow();
      Object.keys(transactions[0] || {}).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
      });
//delete button for each transaction is included in table for easy access
      const deleteTh = document.createElement('th');
      deleteTh.textContent = 'Actions';
      headerRow.appendChild(deleteTh);
  
      transactions.forEach(transaction => {
        const row = table.insertRow();
        Object.values(transaction).forEach(value => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
  
        // Add delete button as mentioned
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          deleteTransaction(transactions.indexOf(transaction));
        });
        deleteCell.appendChild(deleteButton);
      });
  
      // Append the table to the container
      const tableContainer = document.getElementById('transaction-table');
      tableContainer.innerHTML = ''; // reset
      tableContainer.appendChild(table);
    }
  
    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get filter values
      const filterType = document.getElementById('transactionType').value;
      const minAmount = parseFloat(document.getElementById('minAmount').value) || 0;
      const maxAmount = parseFloat(document.getElementById('maxAmount').value) || Infinity;
      const selectedCurrency = document.getElementById('currencyFilterForm').value;
  
      const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
      // Apply filters on data in local storage
      const filteredTransactions = allTransactions.filter(transaction => {
        const typeCondition = filterType === 'all' || transaction.type === filterType;
        const amountCondition = transaction.amount >= minAmount && transaction.amount <= maxAmount;
        const currencyCondition = selectedCurrency === 'all' || transaction.currency === selectedCurrency;
  
        return typeCondition && amountCondition && currencyCondition;
      });
  
      displayTransactions(filteredTransactions);
    });
  
    const form = document.getElementById('add-form');
    form.addEventListener('submit', handleFormSubmit);
  
    function handleFormSubmit(event) {
      event.preventDefault(); 
  
      // Get form values
      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const description = document.getElementById('description').value;
      const currency = document.getElementById('currency').value;
  
      // Validate form values 
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
      }
  
      const transaction = {
        type: type,
        amount: amount,
        description: description,
        currency: currency
      };
  
      const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
      existingTransactions.push(transaction);
  
      localStorage.setItem('transactions', JSON.stringify(existingTransactions));
  
      alert('Transaction added successfully!');
  
      // Clear the form for the next entry
      form.reset();
      displayTransactions(); // Display all transactions after adding a new one
    }
  
    function deleteTransaction(index) {
      const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
      existingTransactions.splice(index, 1);
  
      localStorage.setItem('transactions', JSON.stringify(existingTransactions));
  
      displayTransactions(existingTransactions);
    }
  
    function fetchCurrencies() {

    }
  
    const addTransactionBtn = document.getElementById('addTransaction');
    addTransactionBtn.addEventListener('click', addTransaction);
  });
  