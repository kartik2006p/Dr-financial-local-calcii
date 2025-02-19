document.addEventListener("DOMContentLoaded", function () {
    let currentTheme = "theme1.css";

    function appendChar(char) {
        document.getElementById("display").value += char;
    }

    function clearDisplay() {
        document.getElementById("display").value = "";
    }

    function deleteChar() {
        let display = document.getElementById("display");
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        let expression = document.getElementById("display").value;
        fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression })
        })
        .then(response => response.json())
        .then(data => document.getElementById("display").value = data.result)
        .catch(error => console.error("Error:", error));
    }

    function toggleTheme() {
        currentTheme = (currentTheme === "theme1.css") ? "theme2.css" : "theme1.css";
        document.getElementById("theme").setAttribute("href", `/static/${currentTheme}`);
    }

    // **Keyboard support**
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        const display = document.getElementById('display');

        if (/[0-9]/.test(key)) {
            appendChar(key);  // Numbers 0-9
        } else if (['+', '-', '*', '/', '%'].includes(key)) {
            appendChar(key);  // Operators
        } else if (key === '.') {
            appendChar(key);  // Decimal point
        } else if (key === 'Enter') {
            calculate();  // Enter key acts as "="
        } else if (key === 'Backspace') {
            deleteChar();  // Backspace deletes last character
        } else if (key === 'Escape') {
            clearDisplay();  // Escape clears the display
        }
    });

    // Attach functions to window so they work with inline HTML event handlers
    window.appendChar = appendChar;
    window.clearDisplay = clearDisplay;
    window.deleteChar = deleteChar;
    window.calculate = calculate;
    window.toggleTheme = toggleTheme;
});
