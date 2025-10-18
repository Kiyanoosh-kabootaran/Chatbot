const API_KEY = 'YOUR_API_KEY-HERE';

const content = document.getElementById('content');
const sendButton = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');
const API_URL = `https://openrouter.ai/api/v1/chat/completions`;

let isAnswerLoading = false;
let answersectionId = 0;

sendButton.addEventListener('click', ()=> handleSendMessage());

chatInput.addEventListener('keypress' , event =>{
    if(event.key === 'Enter'){
      handleSendMessage();
    }
  })

function handleSendMessage(){
  //get user input and remove leading/tariling space
  const question = chatInput.value.trim();

  //prevent sending empty message
  if(!question || isAnswerLoading) return;
    
  //Disable UI send button
  sendButton.classList.add('send-button-noneactive');
  
  addQuestionSection(question);
  chatInput.value = '';
}

async function getAnswer(question){
  const requestOptions = {
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
        "content": question,
      }
    ]
  })
}

  try{
    const fetchData =await fetch(API_URL , requestOptions );
    if(!fetchData.ok) throw new Error('could not fetch data');

    const response = await fetchData.json();
    const resultData = response.choices[0].message.content;

    isAnswerLoading = false;
    addAnswerSection(resultData);

  } 
  
  catch(error){
    console.error(error);
    displayError(error.message);
  }
  
  finally{
    scrollBotton();
    sendButton.classList.remove('send-button-noneactive');
  }

    }


 function addQuestionSection(message){
  isAnswerLoading = true;
  //create section element
  const sectionElement = document.createElement('section');
  sectionElement.className = 'question-section';
  sectionElement.textContent = message;

  content.appendChild(sectionElement);
  //Add answer section after added question section
  addAnswerSection(message);
  scrollBotton();
 }

 function addAnswerSection(message){
  if(isAnswerLoading){
    //increment section ID for tracking
    answersectionId++;
    //create an empty answer section with a loading animation
    const sectionElement = document.createElement('section');
    sectionElement.className = 'answer-section';
    sectionElement.innerHTML = getloadingSvg();
    sectionElement.id = answersectionId;

    content.appendChild(sectionElement);
    getAnswer(message);
  } else{
    //Fill in the answer once it's received
    const answerSectionElement = document.getElementById(answersectionId);
    answerSectionElement.textContent = message;
  }
 }

 function getloadingSvg(){
  return '<svg style="height: 25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
 }

 function displayError(errorMessage){
  document.getElementById(answersectionId).style.display = 'none';
  const sectionElement = document.createElement('section');
  sectionElement.className = 'error-section';
  sectionElement.innerHTML = errorMessage;
  content.appendChild(sectionElement);
 }

 function scrollBotton() {
  content.scrollTo({
    top: content.scrollHeight,
    behavior: 'smooth'
  })
 }