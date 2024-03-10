document.addEventListener('DOMContentLoaded', function() {
       fetchCurrenciesFilter();
    

    function convertCurrencies(fromCurrency,toCurrency,amount) {
  
      // Prepare the data for the API request
      const requestData = {
        from: fromCurrency,
        to: toCurrency,
        amount: amount
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
          return data;
        }).then(convertedAmount => {
          // Use the converted amount data in another function
          updatet(convertedAmount);
        })
        .catch(error => {

          console.error('Error converting currencies:', error);
        });
      }

    const queryString = window.location.search;

    // Create a new URLSearchParams object with the query string
    const searchParams = new URLSearchParams(queryString);
    const id = searchParams.get('id');
    // Retrieve existing transactions from local storage
    let existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
  

      record = existingTransactions.find(transaction => transaction.id == id);
  

  
      // Save the updated array back to local storage
      // set form values
      const type = document.getElementById('type');
      const amount = document.getElementById('amount');
      const description = document.getElementById('description');
      const currency = document.getElementById('currency');
      type.value=record.type;
      amount.value=record.amount;
      description.value=record.description;
      
      function fetchCurrenciesFilter(){
      fetchCurrencies()
      .then(data => {
        if (data) {
          // Add fetched currencies to the specified form
          addCurrenciesToForm(data, 'update-form');
          currency.value=record.currency;
        }
      });
    }
      console.log(currency.value)
  

    const form = document.getElementById('update-form');
    form.addEventListener('submit', UpdateTransaction);
  
    async function UpdateTransaction(event) {
      event.preventDefault(); // Prevent the default form submission
     const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const description = document.getElementById('description').value;
      const currency = document.getElementById('currency').value;
      
  
      // Validate form values (you can add more validation if needed)
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive amount.');
        return;
      }

      if(record.currency!=currency){
        console.log(record)
        convertedAmount= await convertCurrencies(record.currency,currency,amount)
        return;
      }
      else
        updatet(amount)

      // Move to another page
     // 
    }
    function updatet(convertedAmount){
      // Get form values
      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const description = document.getElementById('description').value;
      const currency = document.getElementById('currency').value;

       console.log("Returned Converted Amount is :"+ convertedAmount)
      // Create a transaction object
      const transaction = {
        type: type,
        amount: convertedAmount,
        description: description,
        currency: currency,
        userid: localStorage.getItem('sessionToken'),
        id:id
      };
      console.log("Pushing Transaction of ID :"+id)
      console.log(transaction)
      existingTransactions=existingTransactions.filter(transaction => transaction.id != id);
      console.log(existingTransactions)
      // Add the new transaction to the array
      existingTransactions.push(transaction);
      
      // Save the updated array back to local storage
      localStorage.setItem('transactions', JSON.stringify(existingTransactions));

      // Clear the form for the next entry
      form.reset();
      window.location.href = "./index.html";
    }


  });
  