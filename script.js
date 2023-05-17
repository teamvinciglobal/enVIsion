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
const checker = 0;
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
      {text: "I go to whatever makes me happy.", faction:"Amity"},
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
const paragraphElement = document.getElementById("ques-text");
const referenceElement = document.getElementById("ref-text");
const factionButtons = document.getElementById("faction-buttons");
const myImg = document.querySelector("img");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
var abnegation = 0;
var amity = 0;
var candor = 0;
var dauntless = 0;
var erudite = 0;
var key;

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
  paragraphElement.style.display = "none"
  myImg.style.display = "none"
  referenceElement.style.display = "none"
  nextButton.style.display = "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e){
  const selectedBtn = e.target;
  const chosenAbn = selectedBtn.dataset.faction === "Abnegation";
  const chosenAmi = selectedBtn.dataset.faction === "Amity";
  const chosenDau = selectedBtn.dataset.faction === "Dauntless";
  const chosenCan = selectedBtn.dataset.faction === "Candor";
  const chosenEru = selectedBtn.dataset.faction === "Erudite";
  if(chosenAbn){
    selectedBtn.classList.add("Abnegation");
    abnegation++;
  }
  if(chosenAmi){
    selectedBtn.classList.add("Amity");
    amity++;
  }
  if(chosenDau){
    selectedBtn.classList.add("Dauntless");
    dauntless++;
  }
  if(chosenCan){
    selectedBtn.classList.add("Candor");
    candor++;
  }
  if(chosenEru){
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

  const maxVal = Math.max(abnegation, amity, candor, dauntless, erudite);
  var desc;
  if (maxVal==abnegation) {
    myImg["src"] ="./images/abnegation.png";
    key = "ABNEGATION";
    desc = "Working always to slough away the vain and greedy needs of the self, you know the meaning of abnegation. There can be no greater purpose than helping others, and achieving that end means giving up trivial desires. You look for the same quality in others and abhor nothing more than hedonism and greed";
  }
  else if (maxVal==amity) {
    myImg["src"] ="./images/amity.png";
    key = "AMITY";
    desc = "Open and caring, you see the beauty in others easily, and know that's the first step in building a lasting friendship. If everyone could come around to your way of thinking, it would solve a lot of life's big problems. A natural at conflict resolution, you want to make the world a better place for everyone in it.";
  }
  else if (maxVal==candor) {
    myImg["src"] ="./images/candor.png";
    key = "CANDOR";
    desc = "Truth is a shining beacon in the gloom of ignorance, and sometimes it seems like only you can see it. Lying doesn't come easy for you. You wouldn't want it to, and you tend to know when others are being dishonest. Thuth is beauty while deception, no matter how small, can lead to ruin.";
  }
  else if (maxVal==dauntless) {
    myImg["src"] ="./images/dauntless.png";
    key = "DAUNTLESS";
    desc = "You've explored the depths of your inner darkness and come back stronger. You are Dauntless. Unstoppable in the face of danger, you know bravery isn't about being fearless. It's about controlling your fear in a way only a select few can. Now it's up to you to walk the path of hener and reject the ruthless cowards who may tempt you along the way.";
  }
  else if (maxVal==erudite) {
    myImg["src"] = "./images/erudite.png";
    key = "ERUDITE";
    desc = "Knowledge is the first step on your path to prosperity, power, and understanding. A great mind can be a formidable weapon, and you wield yours with skill. Never happier than when you've figured out the solution to a problem, you crave learning. Just be careful where it leads you.";
  }
  
  questionElement.innerHTML = `You belong to the ${key} Faction!`
  paragraphElement.innerHTML = `${desc}`
  paragraphElement.style.display = "block"
  myImg.style.display = "block"
  referenceElement.style.display = "block"
  nextButton.style.display = "block"
}
function abnFaction(){
  location.replace("https://www.twibbonize.com/envisionabnegation");
}

function amiFaction(){
  location.replace("https://www.twibbonize.com/envisionamity");
}
function canFaction(){
  location.replace("https://www.twibbonize.com/envisioncandor");
}
function daunFaction(){
  location.replace("https://www.twibbonize.com/envisiondauntless");
}
function eruFaction(){
  location.replace("https://www.twibbonize.com/envisionerudite");
}

function chooseFaction(){
  resetState();
  /*var btnabn = document.createElement("BUTTON");
  btnabn.innerHTML = "Abnegation";
  btnabn.id = "abnfaction";
  btnabn.onselect = abnFaction();
  btnabn.classList.add("ansbtn");
  answerButtons.appendChild(btnabn);

  var btnami = document.createElement("BUTTON");
  btnami.innerHTML = "Amity";
  btnami.id = "amifaction"
  btnami.classList.add("ansbtn");
  answerButtons.appendChild(btnami);

  var btncan = document.createElement("BUTTON");
  btncan.innerHTML = "Candor";
  btn.id = "canfaction"
  btncan.classList.add("ansbtn");
  answerButtons.appendChild(btncan);

  var btndaun = document.createElement("BUTTON");
  btndaun.innerHTML = "Dauntless";
  btn.id = "daunfaction"
  btndaun.classList.add("ansbtn");
  answerButtons.appendChild(btndaun);

  var btneru = document.createElement("BUTTON");
  btneru.innerHTML = "Erudite";
  btneru.id = "erufaction"
  btneru.classList.add("ansbtn");
  answerButtons.appendChild(btneru);*/

  paragraphElement.innerHTML = "It is time to choose your faction. One click can transform you, BE CAREFUL."
  paragraphElement.style.display = "block";
  factionButtons.style.display = "block"
}



function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
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
    chooseFaction();
  }
  if (checker>0){
    submitFaction();
  }
});
startTest();