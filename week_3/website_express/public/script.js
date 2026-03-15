
const alertBtn = document.getElementById("alertBtn");
const colorBtn = document.getElementById("colorBtn");
const timeBtn = document.getElementById("timeBtn");
const timePara = document.getElementById("time");

alertBtn.addEventListener("click", () => {
    alert("Welcome to ApexaiQ Team ");
});


colorBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === "lightblue"
        ? "white"
        : "lightblue";
});


timeBtn.addEventListener("click", () => {
    fetch("/api/time")
        .then(res => res.json())
        .then(data => {
            timePara.textContent = "Server Time: " + data.time;
        });
});