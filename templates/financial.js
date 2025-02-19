document.addEventListener("DOMContentLoaded", function () {
    const financialCalculator = document.querySelector(".financial-calculator");
    const openBtn = document.querySelector("#open-financial-calculator");
    const closeBtn = document.querySelector(".close-btn");
    const switchType = document.querySelector("#switch-type");
    const calcButton = document.querySelector("#calculate-btn");
    const principalInput = document.querySelector("#principal");
    const timeInput = document.querySelector("#time");
    const rateInput = document.querySelector("#rate");
    const output = document.querySelector("#output");
    const annualMonthlySwitch = document.querySelector("#annual-monthly-switch");
    const calcTypeText = document.querySelector("#calc-type");

    // Show the financial calculator smoothly
    openBtn.addEventListener("click", () => {
        financialCalculator.style.right = "0"; // Slide in from right
    });

    // Close the financial calculator smoothly
    closeBtn.addEventListener("click", () => {
        financialCalculator.style.right = "-400px"; // Hide off-screen
    });

    // Update SI/CI type based on switch
    switchType.addEventListener("change", function () {
        calcTypeText.innerText = switchType.checked ? "Compound Interest" : "Simple Interest";
    });

    // Prevent non-numeric input in input fields
    [principalInput, timeInput, rateInput].forEach(input => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9.]/g, ""); // Allow numbers and decimal
        });
    });

    // Perform calculation
    calcButton.addEventListener("click", function () {
        let P = parseFloat(principalInput.value);
        let T = parseFloat(timeInput.value);
        let R = parseFloat(rateInput.value);

        if (isNaN(P) || isNaN(T) || isNaN(R)) {
            output.innerText = "Please enter valid numbers.";
            return;
        }

        // Convert months to years if switch is ON
        if (annualMonthlySwitch.checked) {
            T = T / 12;
        }

        let result;
        if (switchType.checked) {
            // Compound Interest formula: A = P(1 + R/100)^T - P
            result = P * Math.pow(1 + R / 100, T) - P;
            output.innerText = `Compound Interest: ₹${result.toFixed(2)}`;
        } else {
            // Simple Interest formula: SI = (P * T * R) / 100
            result = (P * T * R) / 100;
            output.innerText = `Simple Interest: ₹${result.toFixed(2)}`;
        }
    });
});
