
  
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
        })
        .catch(error => {

          console.error('Error converting currencies:', error);
        });
      }

  