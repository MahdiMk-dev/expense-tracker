
    console.log('fetchCurrencies.js is loaded');

  
    function fetchCurrencies() {
      console.log('Fetching currencies...');
        // Fetch currencies from the API
        return fetch('https://rich-erin-angler-hem.cyclic.app/students/available')
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch currencies.');
            }
            return response.json();
          })
          .then(data => {
            console.log('API Response:', data);
            return data;
          })
          .catch(error => {
            console.error('Error fetching currencies:', error);
            return null;
          });
    }
    function addCurrenciesToForm(currencies, formId) {
      if (!currencies || currencies.length === 0) {
        console.error('Invalid data structure. Currencies not available.');
        return;
      }

      // Get the form element by ID
      const form = document.getElementById(formId);
      if (!form) {
        console.error('Form not found.');
        return;
      }

      const currencySelect = form.querySelector('select[name="currency"]');
      if (!currencySelect) {
        console.error('Currency select element not found in the form.');
        return;
      }

      currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency.code;
        option.textContent = currency.name + ' (' + currency.code + ')';

        currencySelect.appendChild(option);
      });

    }
