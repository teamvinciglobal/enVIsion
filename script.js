const button = document.querySelector("#sound-btn");
const icon = document.querySelector("#sound-btn > i");
const audio = document.querySelector("audio");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.2;
    audio.play();
    icon.classList.add('fa-volume-up');
    icon.classList.remove('fa-volume-mute');
    
  } else {
    audio.pause();
    icon.classList.add('fa-volume-mute');
    icon.classList.remove('fa-volume-up');
  }
  button.classList.add("fade");
});

/** JS FOR TEST.CSS */

const question = [
  {
    question: "Your Aptitude Test starts right here. Choose one of the following items to enter the next chapter.",
    answer: [
      {text: "Bucket Hat", faction:"Abnegation"},
      {text: "Sunset", faction:"Amity"},
      {text: "Dark Coffee", faction:"Dauntless"},
      {text: "Instax Film", faction:"Candor"},
      {text: "iPad", faction:"Erudite"},
    ]
  },
  {
    question: "You see a furious dog in front of you, and a young girl. There are two bowls, one with a slice of meat and another with a knife. You...",
    answer: [
      {text: "Throw yourself onto the girl to protect her from the dog.", faction:"Abnegation"},
      {text: "Hug the dog to somehow calm it.", faction:"Amity"},
      {text: "Defend the girl from the dog with a knife.", faction:"Dauntless"},
      {text: "Try to command the dog and tell the girl to escape.", faction:"Candor"},
      {text: "Throw the meat to the dog as a distraction.", faction:"Erudite"},
    ]
  },
  {
    question: "Which of VINCI's performances sparks joy for you the most?",
    answer: [
      {text: "Take My Hand", faction:"Abnegation"},
      {text: "Awitin Mo At Isasayaw Ko", faction:"Amity"},
      {text: "Odd Eye", faction:"Dauntless"},
      {text: "De Javu", faction:"Candor"},
      {text: "Amazon", faction:"Erudite"},
    ]
  },
  {
    question: "What do you mostly rely on when making tough decisions? ",
    answer: [
      {text: "I trust others, so that's the best approach.", faction:"Abnegation"},
      {text: "I learn from my experiences so I go with my experience.", faction:"Amity"},
      {text: "I always rely on my gut and luck.", faction:"Dauntless"},
      {text: "I learn from my experiences so I go with my experience.", faction:"Candor"},
      {text: "I go with my intelligence.", faction:"Erudite"},
    ]
  },
  {
    question: "What VINCI playlist describes your mood today?",
    answer: [
      {text: "au revoir", faction:"Abnegation"},
      {text: "dozZzze off", faction:"Amity"},
      {text: "ritch bich", faction:"Dauntless"},
      {text: "mornings & afternoons", faction:"Candor"},
      {text: "waking up in a coming of age film", faction:"Erudite"},
    ]
  },
  {
    question: "What irritates you the most?",
    answer: [
      {text: "Those who can’t live a full life of fun and danger.", faction:"Dauntless"},
      {text: "Those who see violence as the solution to every conflict.", faction:"Amity"},
      {text: "Those who ignore and do not observe around them.", faction:"Erudite"},
      {text: "Those who always want more for themselves.", faction:"Abnegation"},
      {text: "Those who use white lies as an excuse to lie.", faction:"Candor"},
    ]
  },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let abnegation = 0;
let amity = 0;
let candor = 0;
let dauntless = 0;
let erudite = 0;

var factions = {abnegation, amity, candor, dauntless, erudite}

function startTest() {
  currentQuestionIndex = 0;
  abnegation = 0;
  amity = 0;
  candor = 0;
  dauntless = 0;
  erudite = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState()
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("ansbtn");
    answerButtons.appendChild(button);
    if(answer.faction){
      button.dataset.faction = answer.faction;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e){
  const selectedBtn = e.target;
  const chosenFaction = selectedBtn.dataset.faction;
  if(chosenFaction === "Abnegation"){
    selectedBtn.classList.add("Abnegation");
    abnegation++;
  }else if(chosenFaction === "Amity"){
    selectedBtn.classList.add("Amity");
    amity++;
  }else if(chosenFaction === "Dauntless"){
    selectedBtn.classList.add("Dauntless");
    dauntless++;
  }else if(chosenFaction === "Candor"){
    selectedBtn.classList.add("Candor");
    candor++;
  }else if(chosenFaction === "Erudite"){
    selectedBtn.classList.add("Erudite");
    erudite++;
  }

  Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showResult(){
  resetState();
  const maxVal = Math.max(...Object.values(factions))
  const key = Object.keys(factions).find(key => factions[key] === maxVal)
  questionElement.innerHTML = `You belong to the ${key} Faction!`
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex <question.length){
    showQuestion();
  }else{
    showResult();
  }
}

nextButton.addEventListener("click", ()=>{
  if (currentQuestionIndex < question.length){
    handleNextButton();
  }
  else {
    startTest();
  }
});
startTest();