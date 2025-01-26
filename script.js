const quizData = [{
  question: "What does HTML stand for?",
  a: "Home Tool Markup Language",
  b: " Hyperlinks and Text Markup Language",
  c: "Hyper Text Markup Language",
  d: " Hyper Tool Markup Language",
  correct: "c",
},
{
  question: "What does CSS stand for?",
  a: "Central StyleSheets",
  b: "Cascading Style Sheets",
  c: "Cascading Simple Sheets",
  d: "Cars SUVs Sailboats",
  correct: "b",
},
{
  question: "The correct place to refer to an external style sheet in html file?",
  a: "In <body> tag",
  b: "In <head> tag",
  c: "In the end of document",
  d: "None",
  correct: "b",
},
{
  question: "Which HTML tag is used to define an internal style sheet?",
  a: "<script> tag",
  b: "<style> tag",
  c: "<css>",
  d: "None",
  correct: "b",
},
{
  question: "Which built-in method reverses the order of the elements of an array?",
  a: "changeOrder(order)",
  b: "reverse()",
  c: "sort(order)",
  d: "None of the above",
  correct: "b",
}
];

const userSelected = {}

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const labelEls = document.querySelectorAll('.op_label');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const submitBtn = document.getElementById('submit');
const reloadBtn = document.getElementById('reload');
const scoreEle = document.getElementById('score');
const resultEle = document.getElementById('result');
let currentQtn = 0;
let score = 0;
let submitted = false;

loadQtn();

function loadQtn() {
  const currentQtnData = quizData[currentQtn];
  questionEl.innerText = currentQtnData.question;
  a_text.innerText = currentQtnData.a;
  b_text.innerText = currentQtnData.b;
  c_text.innerText = currentQtnData.c;
  d_text.innerText = currentQtnData.d;
  if (submitted) {
    let actualAns = currentQtnData.correct;
    let userAns = userSelected[currentQtn];
    labelEls.forEach(labelEl => {
      labelEl.classList.remove("correct");
      labelEl.classList.remove("wrong");


    });
    if (actualAns == userAns) {
      let correct = actualAns + "_text";
      document.getElementById(correct).classList.add("correct")

    }
    else {
      let correct = actualAns + "_text";
      let wrong = userAns + "_text";

      document.getElementById(correct).classList.add("correct")

      document.getElementById(wrong).classList.add("wrong")

    }
  }
  else {
    deselectAnswer();
  }
  if (currentQtn == quizData.length - 1) {
    nextBtn.style.display = "none";
    if (submitted) {
      reloadBtn.style.display = "block";
      submitBtn.style.display = "none";
    }
    else {
      reloadBtn.style.display = "none";
      submitBtn.style.display = "block";


    }
  }
  if (userSelected[currentQtn]) {
    let selected = userSelected[currentQtn];
    document.getElementById(selected).checked = true
  }

}

function deselectAnswer() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
      userSelected[currentQtn] = answer

    }
  });

  return answer;
}
prevBtn.addEventListener('click', () => {
  getSelected()
  if (currentQtn > 0) {
    currentQtn--;
    if (currentQtn == 0) {
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled')
    }
    loadQtn();
  }


})

nextBtn.addEventListener('click', () => {
  const answer = getSelected();
  if (!submitted) {
    if (answer) {
      if (answer === quizData[currentQtn].correct) {
        score++;
      }
      currentQtn++;
      if (currentQtn < quizData.length) {
        loadQtn();
        prevBtn.disabled = false;
        prevBtn.classList.remove('disabled')
      }
    }
  }
  else {
    currentQtn++;
    loadQtn()
  }
})
submitBtn.addEventListener('click', () => {
  if (getSelected()) {
    submitted = true
    quiz.style.display = "none";
    resultEle.style.display = "block";
    scoreEle.innerHTML = `${score}/${quizData.length} questions answered correctly`


  }


})

function loadAnswers() {
  currentQtn = 0
  quiz.style.display = "block";
  resultEle.style.display = "none";
  answerEls.forEach(answerEl => {
    answerEl.disabled = true;

  });
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
  loadQtn();

}