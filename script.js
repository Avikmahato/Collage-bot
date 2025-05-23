const response = async (user_message, divcontent) => {
  const TOGETHER_API_KEY =
    "b010618a539a18f839ad5e895c22c81355bef2e1a27fca653f2802d62d9b9bf5";
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        {
          role: "user",
          content: user_message,
        },
      ],
    }),
  });
  let resultResponce = await response.json();
  console.log(resultResponce);
  divcontent.classList.remove("bot");
  divcontent.classList.add("bot");
  divcontent.innerHTML = `
        <img src="robot.png" class="bot-icon" alt="">
        <p class="m-0"></p>
  `;
  divcontent.querySelector("p").textContent =
    resultResponce.choices[0].message.content;
  let messg = document.getElementById("messages");
  messg.scrollTo({ top: messg.scrollHeight, behavior: "smooth" });
};
const imagecreation = async (user_message, thinking) => {
  const TOGETHER_API_KEY =
    "b010618a539a18f839ad5e895c22c81355bef2e1a27fca653f2802d62d9b9bf5";
  const imageGen = await fetch("https://api.together.xyz/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "black-forest-labs/FLUX.1-dev",
      "prompt":user_message,
      "steps":10,
      "n":1,
    }),
  });
  let image = await imageGen.json();
  console.log(image.data[0].url);
  thinking.style.display = "none";
  let imagecontent = document.createElement("div");
  imagecontent.innerHTML = `
                <a class='img' href="${image.data[0].url}" download>
                    <p class='bot'>${user_message}</p>
                    <img src="${image.data[0].url}" alt="" id="Generatedimage">
                </a>
            `;
  document.getElementById("messages").appendChild(imagecontent);
  let messg = document.getElementById("messages");
  messg.scrollTo({ top: messg.scrollHeight, behavior: "smooth" });
};
document.getElementById("messg").addEventListener("keydown", (e) => {
  let message = e.target.value.trim();
  if (e.key === "Enter" && message) {
    let content = document.createElement("div");
    content.classList.add("user");
    content.innerHTML = `
    <p class="m-0">
    
    </p>
    `;
    content.querySelector("p").textContent = message;
    document.getElementById("messages").appendChild(content);
    let messg = document.getElementById("messages");
    messg.scrollTo({ top: messg.scrollHeight, behavior: "smooth" });
    e.target.value = "";
    setTimeout(() => {
      let thinking = document.createElement("div");
      thinking.classList.add("bot");
      thinking.innerHTML = `
              <img src="robot.png" class="bot-icon" alt="">
              <div class="processing">
                    <div></div>
                    <div></div>
                    <div></div>
              </div>`;
      document.getElementById("messages").appendChild(thinking);
      console.log(document.getElementById("choose").value);
      if (document.getElementById("choose").value == "Text") {
        response(message, thinking);
      } else if (document.getElementById("choose").value == "Image") {
        imagecreation(message, thinking);
      }
    }, 200);
  }
});
document.getElementById("send").addEventListener("click", () => {
  let message = document.getElementById("messg").value;
  let content = document.createElement("div");
  content.classList.add("user");
  content.innerHTML = `
               <p class="m-0">
               </p>
          `;
  content.querySelector("p").textContent = message;
  document.getElementById("messages").appendChild(content);
  let messg = document.getElementById("messages");
  messg.scrollTo({ top: messg.scrollHeight, behavior: "smooth" });
  message.textContent = "";
  setTimeout(() => {
    let thinking = document.createElement("div");
    thinking.classList.add("bot");
    thinking.innerHTML = `
              <img src="robot.png" class="bot-icon" alt="">
              <div class="processing">
                    <div></div>
                    <div></div>
                    <div></div>
              </div>`;
    document.getElementById("messages").appendChild(thinking);
    if (document.getElementById("choose").value == "Text") {
      response(message, thinking);
    } else if (document.getElementById("choose").value == "Image") {
      imagecreation(message, thinking);
    }
  }, 200);
});
showDial = () => {};
