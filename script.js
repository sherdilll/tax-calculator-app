document.addEventListener("DOMContentLoaded", function () {
  // Error icon elements
  const incomeError = document.getElementById('incomeError');
  const extraIncomeError = document.getElementById('extraIncomeError');
  const deductionsError = document.getElementById('deductionsError');
  const ageError = document.getElementById('ageError');

  // Input elements
  const incomeInput = document.getElementById('income');
  const extraIncomeInput = document.getElementById('extraIncome');
  const deductionsInput = document.getElementById('deductions');
  const ageSelect = document.getElementById('age');

  // Modal elements
  const modal = document.getElementById('resultModal');

  // Tooltip elements
const tooltipContainers = document.querySelectorAll('.tooltip-container');

// Function to show tooltip text
function showTooltipText(event) {
  const tooltipText = event.currentTarget.querySelector('.tooltip-text');
  tooltipText.style.visibility = 'visible';
  tooltipText.style.opacity = '1';
}

function hideTooltipText(event) {
  const tooltipText = event.currentTarget.querySelector('.tooltip-text');
  if (tooltipText) {
      tooltipText.style.visibility = 'hidden';
      tooltipText.style.opacity = '0';
  }
}

// Event listeners for tooltip containers
tooltipContainers.forEach(container => {
  container.addEventListener('mouseenter', showTooltipText);
  container.addEventListener('mouseleave', hideTooltipText);
});


  // Function to show error icon and tooltip
  function showErrorIcon(element, message) {
      element.style.display = 'block';
      element.innerHTML = `<span class="error-message">${message}</span>!`;
  }

  // Function to hide all error icons
  function hideErrorIcons() {
      incomeError.style.display = 'none';
      extraIncomeError.style.display = 'none';
      deductionsError.style.display = 'none';
      ageError.style.display = 'none';
  }
  hideErrorIcons();

  // Function to validate numbers
  function isValidNumber(input) {
      return !isNaN(parseFloat(input)) && isFinite(input);
  }

  // Function to calculate tax
  function calculateTax() {

      const income = parseFloat(incomeInput.value);
      const extraIncome = parseFloat(extraIncomeInput.value);
      const deductions = parseFloat(deductionsInput.value);
      const age = ageSelect.value;

      let hasError = false; 

     
              
      // Validate inputs
      if (age === "") {
          showErrorIcon(ageError, 'Age is required');
          hasError = true;
      }
      if(!incomeInput.value.trim()){
          showErrorIcon(incomeError, 'The fields cannot be empty');
          hasError = true;
      } else if(incomeInput.value.trim()){
          if ( !isValidNumber(income) || income <= 0) {
              showErrorIcon(incomeError, 'Income must be a valid number greater than 0');
              hasError = true;
          }
      } else if(incomeInput.value.trim() && isValidNumber(income)|| income > 0){
          hasError = false;
          incomeError.style.display = 'none';
      }

      if (!extraIncomeInput.value.trim()){
          showErrorIcon(extraIncomeError, 'The fields cannot be empty');
          hasError = true;
      } else if(extraIncomeInput.value.trim()){
          if ( !isValidNumber(extraIncome) || extraIncome <= 0) {
              showErrorIcon(extraIncomeError, 'Extra Income must be a valid number greater than 0');
              hasError = true;
          }
      } else if (extraIncomeInput.value.trim() && isValidNumber(extraIncome) || extraIncome > 0){
          hasError = false;
          extraIncomeError.style.display = 'none';
      }

      if (!deductionsInput.value.trim()){
          showErrorIcon(deductionsError, 'The fields cannot be empty');
          hasError = true;
      } else if(deductionsInput.value.trim()){
          if ( !isValidNumber(deductions) || deductions <= 0) {
              showErrorIcon(deductionsError, 'Deductions must be a valid number greater than 0');
              hasError = true;
          }
      } else if (deductionsInput.value.trim() && isValidNumber(deductions) || deductions > 0){
          hasError = false;
          deductionsError.style.display = 'none';
      }

      
      if (hasError) {
          return;
      }

      // Perform tax calculation
      let taxableIncome = income + extraIncome - deductions;
      let tax = 0;

      if (taxableIncome > 800000) {
          if (age === "<40") {
              tax = 0.3 * (taxableIncome - 800000);
          } else if (age === ">=40&<60") {
              tax = 0.4 * (taxableIncome - 800000);
          } else {
              tax = 0.1 * (taxableIncome - 800000);
          }
      }

     // Display result in modal
     modalIncome.textContent = `₹ ${tax.toFixed(2)}`;
     modal.style.display = 'block';
 }
  // Event listener for Calculate Tax button
  document.getElementById('calculateBtn').addEventListener('click', calculateTax);

  // Event listener for closing the modal (close button)
  closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
  });


  // Close the modal when clicking outside of it
  window.onclick = function (event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  }
});