document.addEventListener('DOMContentLoaded', function() {
    console.log('fetchCurrencies.js is loaded');
  
    fetchCurrencies();
  
    function fetchCurrencies() {
      console.log('Fetching currencies...');
      fetch('https://ivory-ostrich-yoke.cyclic.app/students/available')
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);
  
          if (data && data.length > 0) {
            const currencySelectFilterForm = document.getElementById('currencyFilterForm');
            const currencySelectAddForm = document.getElementById('currency');
            
            data.forEach(currency => {
              const option = document.createElement('option');
              option.value = currency.code; 
              option.textContent = currency.name + ' (' + currency.code + ')';
  
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
  