let AUTH_TOKEN = null;
const WORKER_URL = "https://workerforafriend.micaiahejardin.workers.dev/";

function login() {
    const pw = document.getElementById("password").value;

    // Save password in memory
    AUTH_TOKEN = pw;

    // Try a test request
    fetch(WORKER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AUTH_TOKEN
        },
        body: JSON.stringify({ action: "test" })
    }).then(res => {
        if (res.status === 401) {
            document.getElementById("login-error").innerText = "Wrong password";
        } else {
            document.getElementById("login-screen").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
        }
    });
}

function sendMessage() {
    const channelId = document.getElementById("channelId").value;
    const message = document.getElementById("message").value;

    fetch(WORKER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + AUTH_TOKEN
        },
        body: JSON.stringify({
            action: "sendMessage",
            channelId: channelId,
            message: message
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("response").innerText = "Message sent!";
    })
    .catch(err => {
        document.getElementById("response").innerText = "Error sending message";
    });
}
