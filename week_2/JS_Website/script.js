function showAlert() {
    alert("Hello ApexaiQ Team ! Welcome to your website ");
}

function changeColor() {
    document.body.style.backgroundColor = "lightgreen";
}

let currentTime = new Date();
document.getElementById("time").innerText = 
    "Current Time: " + currentTime.toLocaleTimeString();