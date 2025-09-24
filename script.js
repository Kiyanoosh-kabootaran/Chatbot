const API_KEY = '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';

const sendButton = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');

sendButton.addEventListener('click', ()=> handleSendMessage());

chatInput.addEventListener('keypress' , event =>{
    if(event.key === 'Enter'){
      handleSendMessage();
    }
  })

function handleSendMessage(){
  const question = chatInput.value.trim();
  console.log(question);
}

const fetchData = fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "deepseek/deepseek-r1-distill-llama-70b:free",
    "messages": [
      {
        "role": "user",
        "content": "what is javascript"
      }
    ]
  })
});

//fetchData.then(response => response.json())
 // .then(data => console.log(data.choices[0].message.content));