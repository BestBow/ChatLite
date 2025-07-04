document.getElementById("send-btn").addEventListener("click", handleUserMessage);

const debouncedInput = debounce(() => {
  const input = document.getElementById("user-input").value.trim();
  if (input) handleUserMessage();
}, 500);

document.getElementById("user-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") debouncedInput();
});

async function handleUserMessage() {
  const inputField = document.getElementById("user-input");
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  inputField.value = "";

  const reply = await getAIResponse(message);
  appendMessage(reply, "ai");
}

function appendMessage(msg, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender);
  msgDiv.textContent = msg;
  document.getElementById("messages").appendChild(msgDiv);
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

async function getAIResponse(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("Error getting AI response:", err);
    return "Oops! Something went wrong.";
  }
}
