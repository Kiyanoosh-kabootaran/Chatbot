const API_KEY = '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';

const content = document.getElementById('content');
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
  addQuestionSection(question);
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
 function addQuestionSection(message){
  //create section element
  const sectionElement = document.createElement('section');
  sectionElement.className = 'question-section';
  sectionElement.textContent = message;

  content.appendChild(sectionElement);
  //Add answer section after added question section
  addAnswerSection(message);
 }

 function addAnswerSection(message){
  //create an empty answer section with a loading animation
  const sectionElement = document.createElement('section');
  sectionElement.className = 'answer-section';
  sectionElement.innerHTML = getloadingSvg();

  content.appendChild(sectionElement);
 }

 function getloadingSvg(){
  return '<svg style="height: 25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
 }