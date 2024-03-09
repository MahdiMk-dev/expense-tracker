// fetchCurrencies.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('fetchCurrencies.js is loaded');
  
    fetchCurrencies();
  
    function fetchCurrencies() {
      console.log('Fetching currencies...');
      // Fetch currencies from the API
      fetch('https://ivory-ostrich-yoke.cyclic.app/students/available')
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);
  
          // Check if data and data.currencies are defined
          if (data && data.length > 0) {
            // Populate the dropdown with currencies in the first form
            const currencySelectFilterForm = document.getElementById('currencyFilterForm');
            const currencySelectAddForm = document.getElementById('currency');
            
            data.forEach(currency => {
              const option = document.createElement('option');
              option.value = currency.code;  // Adjust the value as needed
              option.textContent = currency.name + ' (' + currency.code + ')';
  
              // Add option to the dropdown in the first form
              currencySelectFilterForm.appendChild(option);
              currencySelectAddForm.appendChild(option.cloneNode(true));
            });
          } else {
            console.error('Invalid data structure. Currencies not available.');
          }
        })
        .catch(error => {
          console.error('Error fetching currencies:', error);
        });
    }
  });
  