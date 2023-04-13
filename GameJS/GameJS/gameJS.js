const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
 
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: ' Ai sinh ngày 24 tháng 6??',
    answers: [
      { text: 'Messi', correct: true },
      { text: 'Pogpa', correct: false },
      { text: 'Neymar JR', correct: false },
      { text: 'Suarez', correct: false }
    ]
  },
  {
    question: 'Ai là vua phá lưới năm 2021 ở ngoại hạng anh? ',
    answers: [
      { text: 'Romelu Lukaku', correct: false },
      { text: 'N’golo Kanté', correct: false },
      { text: 'Harry Kane', correct: true },
      { text: 'Cristiano Ronaldo', correct: false }
    ]
  },
  {
    question: 'Ai đạt quả bóng vàng FIFA 2015?',
    answers: [
      { text: 'Robert Lewandoski', correct: false },
      { text: 'Jadon Sancho', correct: false },
      { text: 'Lionel Messi ', correct: true }
    ]
  },
  {
    question: 'Đội tuyển nào có 3 lần vào chung kết, nhưng đều thất bại?',
    answers: [
      { text: ' Đức', correct: false },
      { text: ' Hà Lan ', correct: true },
      { text: 'Brazil ', correct: false },
      { text: 'Argentina', correct: false }
    ]
  },
  {
    question: 'Có 3 cầu thủ cùng nắm giữ thành tích nhận thẻ đỏ nhiều nhất (8 lần). Họ là ai?',
    answers: [
      { text: 'Patrick Vieira ', correct: false },
      { text: 'Tất cả các câu trên', correct: true },
      { text: 'Duncan Ferguson', correct: false },
      { text: ' Richard Dunne ', correct: false }
    ]
  }
];