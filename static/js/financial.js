document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("openCalculator");
    const closeBtn = document.getElementById("closePopup");
    const popup = document.getElementById("financialPopup");
    const calculateBtn = document.getElementById("calculate");

    openBtn.addEventListener("click", function() {
        popup.classList.add("show");
    });

    closeBtn.addEventListener("click", function() {
        popup.classList.remove("show");
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    });

    calculateBtn.addEventListener("click", function() {
        let type = document.getElementById("calcType").value;
        let principal = parseFloat(document.getElementById("principal").value);
        let time = parseFloat(document.getElementById("time").value);
        let rate = parseFloat(document.getElementById("rate").value);

        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, principal, time, rate })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerHTML = "Result: " + data.result.toFixed(2);
        })
        .catch(error => console.error('Error:', error));
    });
});
