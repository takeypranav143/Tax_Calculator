document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  function validateInputs() {
    let isValid = true;
    const inputs = document.querySelectorAll(
      'input[type="text"],input[type="number"]'
    );
    inputs.forEach((input) => {
      if (!input.value.trim() || isNaN(input.value.trim())) {
        isValid = false;
        input.nextElementSibling.style.display = "inline";
      } else {
        input.nextElementSibling.style.display = "none";
      }
    });
    return isValid;
  }

  document.getElementById("submitBtn").addEventListener("click", function () {
    resetErrors();

    const isValid = validateInputs();
    if (isValid) {
      calculateTax();
    }
  });

  function resetErrors() {
    document
      .querySelectorAll(".bi-exclamation-circle")
      .forEach(function (element) {
        element.style.display = "none";
      });
  }

  function calculateTax() {
    const grossIncome = parseFloat(
      document.getElementById("grossincome").value
    );
    const extraIncome = parseFloat(document.getElementById("othincome").value);
    const age = document.getElementById("age").value;
    const deductions = parseFloat(document.getElementById("deduction").value);

    let taxableIncome = grossIncome + extraIncome - deductions;
    let taxRate;
    if (age === "<40") {
      taxRate = 0.3;
    } else if (age === "≥ 40 & < 60") {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }
    let tax = taxableIncome > 800000 ? (taxableIncome - 800000) * taxRate : 0;

    document.querySelector(".modal-title").textContent =
      "Tax Calculation Result";
    document.querySelector(".modal-body").innerHTML =
      "<p>Tax to be paid: " + tax.toFixed(2) + " Lakhs</p>";

    var myModal = new bootstrap.Modal(document.getElementById("modal"));
    myModal.show();
  }
});
