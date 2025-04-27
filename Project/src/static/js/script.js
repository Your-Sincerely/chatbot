// Example POST method implementation:
async function postData(url = "", data = {}) { 
  const response = await fetch(url, {
    method: "POST", headers: {
      "Content-Type": "application/json", 
    }, body: JSON.stringify(data),  
  });
  return response.json(); 
}


sendButton.addEventListener("click", async ()=>{ 

  
  // getting input
  questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  
  // Get the question and answer from the API.
  let result = await postData("/api", {"question": questionInput, "value": "title", "parent": "none"});

  // setting display
  window.location.href = "/newChat";
  // location.reload();
})

refreshButton.addEventListener("click", async ()=>{ 

  window.location.replace("/");
  // location.reload();
})

const buttons = document.querySelectorAll(".chat-button");

for (const button of buttons) {
  button.addEventListener("click", async ()=>{
    window.location.href = "/newChat";
  });
}