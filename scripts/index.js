document.addEventListener('DOMContentLoaded', function() {
    // Ensure the DOM is fully loaded before accessing elements
    isLoggedIn();
    displayTransactions();
    
    function displayTransactions(filteredTransactions) {
      // If filteredTransactions is not provided, retrieve transactions from local storage
      const alltransactions = filteredTransactions || JSON.parse(localStorage.getItem('transactions')) || [];
      console.log(alltransactions)
      userid=localStorage.getItem('sessionToken');
      transactions=alltransactions.filter(transaction => transaction.userid == userid)
      console.log(userid)
      console.log(transactions)
      if (!Array.isArray(transactions)) {
        transactions=[transactions]
      }
      // Create an HTML table
      const table = document.createElement('table');
      table.classList.add('transaction-table');
  
      // Create table header
      const headerRow = table.insertRow();
      Object.keys(transactions[0] || {}).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
      });
      // Add an additional column for the delete button
      const deleteTh = document.createElement('th');
      deleteTh.textContent = 'Actions';
      headerRow.appendChild(deleteTh);
  
      // Create table rows with transaction data
      transactions.forEach(transaction => {
        const row = table.insertRow();
        row.setAttribute('id',transaction.id);
        Object.values(transaction).forEach(value => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
  
        // Add delete button to each row
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
          deleteTransaction(row.getAttribute('id'));
        });
        deleteCell.appendChild(deleteButton);


        const updateButton = document.createElement('button');
        updateButton.textContent = 'Edit';
        updateButton.classList.add('edit-button');
        updateButton.addEventListener('click', function() {
          UpdateTransaction(row.getAttribute('id'));
        });
        deleteCell.appendChild(updateButton);
      });
  
      // Append the table to the container
      const tableContainer = document.getElementById('transaction-table');
      tableContainer.innerHTML = ''; // Clear previous content
      tableContainer.appendChild(table);
      TotalUSD(filteredTransactions);
    }
  
    const filterForm = document.getElementById('filter-form');
    filterForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get filter values
      const filterType = document.getElementById('transactionType').value;
      const minAmount = parseFloat(document.getElementById('minAmount').value) || 0;
      const maxAmount = parseFloat(document.getElementById('maxAmount').value) || Infinity;
      const selectedCurrency = document.getElementById('currencyFilterForm').value;
  
      // Retrieve transactions from local storage
      const allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      userid=localStorage.getItem('sessionToken');
  
      // Apply filters
      const filteredTransactions = allTransactions.filter(transaction => {
        const typeCondition = filterType === 'all' || transaction.type === filterType;
        const amountCondition = transaction.amount >= minAmount && transaction.amount <= maxAmount;
        const currencyCondition = selectedCurrency === 'all' || transaction.currency === selectedCurrency;
        const userCondition = transaction.userid==userid
        return typeCondition && amountCondition && currencyCondition && userCondition;
      });
      console.log("filter")
      console.log(filteredTransactions);
  
      displayTransactions(filteredTransactions);
    });
  

    function deleteTransaction(id) {
      // Retrieve existing transactions from local storage
      console.log(id)
      const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions = existingTransactions.filter(transaction => transaction.id != id);
      console.log(transactions)

  
      // Save the updated array back to local storage
      localStorage.setItem('transactions', JSON.stringify(transactions));
      TotalUSD();
      // Display the updated transactions
      displayTransactions();
    }
    function UpdateTransaction(index) {
      // Retrieve existing transactions from local storage
      window.location.href = "./update_transaction.html?id="+index;
    }


  
    function TotalUSD(filteredTransactions) {
      console.log("totsl")
        let total=0;
        const myDiv = document.getElementById('total');
                myDiv.innerHTML = 'Total in USD: '+total+' $';
      // If filteredTransactions is not provided, retrieve transactions from local storage
      const transactions = filteredTransactions || JSON.parse(localStorage.getItem('transactions')).filter(transaction => transaction.userid == userid)  || [];
      console.log(transactions)
      transactions.forEach(transaction => {

      // Prepare the data for the API request
      const requestData = {
        from: transaction.currency,
        to: "USD",
        amount: transaction.amount
      };
  
      // Fetch conversion rates from the API
      fetch('https://rich-erin-angler-hem.cyclic.app/students/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => {
          console.log(response)
          // Check if the response is successful (status code in the range 200-299)
          if (response.ok) {

               console.log('ok') // Parse the JSON response
               return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log('converted amount is : '+data)
          // Display the converted amount
          if(transaction.type=='income')
            total+=data;
          else 
            total-=data;
          console.log("------"+total)
                const myDiv = document.getElementById('total');
                myDiv.innerHTML = 'Total in USD: '+total+' $';
        })
        .catch(error => {

          console.error('Error converting currencies:', error);
        });
       
      });

      
    }
    // Function to check if the user is logged in
    function isLoggedIn() {
      // Check if the session token is present in localStorage
      userid=localStorage.getItem('sessionToken');
      console.log(userid)
      const storedUsers = localStorage.getItem('user');
      if (storedUsers) {
        users = JSON.parse(storedUsers);

        console.log(users)
      }

      if(storedUsers && users.find(user => user.id == userid)){
        console.log('yes')
        return true;
      }
      else
         window.location.href = "./login.html";

    }


    fetchCurrenciesFilter();
    function fetchCurrenciesFilter(){
      fetchCurrencies()
      .then(data => {
        if (data) {
          // Add fetched currencies to the specified form
          addCurrenciesToForm(data, 'filter-form');
        }
      });
    }
  });
  