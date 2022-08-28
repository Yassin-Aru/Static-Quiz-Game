/*
// * Select Elements
let countSpan = document.querySelector(".count span"),
    quizArea = document.querySelector(".quiz-area"),
    answerArea = document.querySelector(".answers-area"),
    submitBtn = document.querySelector(".submit-button"),
    bullets = document.querySelector(".bullets"),
    resultsContainer = document.querySelector(".results"),
    bulletsSpanContainer = document.querySelector(".bullets .spans"),
    countDownElement = document.querySelector(".countdown");

//Set Options
let curretIndex = 0;
let rightAnswers = 0;
let countDownInterval;

function getQuestions (){

    let myRequest = new XMLHttpRequest();
    
    myRequest.onreadystatechange = function (){

        if (this.readyState === 4 && this.status === 200){

            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            //Create Bullets + Set Questions Count
            createBullets(qCount);

            // Some style for the span counter 
            countSpan.style.fontWeight = "bold";

            //Add Question Data
            addQuestionData(questionsObject[curretIndex], qCount);

            // Click on submit button 
            submitBtn.onclick = () =>{

            // Get right answer
            let theRightAnswer = questionsObject[curretIndex].right_answer;

            // increase The Answer
            curretIndex++;

            //Check the answer
            checkAnswer(theRightAnswer, qCount);

            // Remove The Previous Question
            quizArea.innerHTML = "";

            // Empty the answer area
            answerArea.innerHTML = "";

            //Add the next question after we empty the question and the answer area 
            addQuestionData(questionsObject[curretIndex], qCount);

            // Hndle Bullets Class
            handleBullets();

            // Start the countdown 
            clearInterval(countDownInterval);
            countDown(3, qCount);

            // Show Result
            showResults(qCount);

            }
        }
    };


    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
}
getQuestions();

function createBullets(num){
    countSpan.innerHTML = num;

    // Create spans
    for(let i = 0; i < num; i++){

        //Create span 
        let theBullet = document.createElement('span');

        if (i === 0){

            //Check if its The first span 
            theBullet.className = "on";
        }

        // Append Bullets to main bullet Container
        bulletsSpanContainer.appendChild(theBullet);


    }
}

function addQuestionData(obj, count){
    if  (curretIndex < count){
        //Create H2 Question Title
        let questionTitle = document.createElement("h2");

        // Create question text
        let questionText = document.createTextNode(obj.title);
        
        // Append text to h2
        questionTitle.appendChild(questionText);

        //Append h2 to coantiner
        quizArea.appendChild(questionTitle);

        //Create The Answers
        for(let i = 1; i <= 4; i++){

            // Create Main Answer Div
            let mainDiv = document.createElement("div");

            // Add class to main Div
            mainDiv.className = "answer";

            // Create Radio Input
            let radioInput = document.createElement("input");

            // Add type & Name & Id & Data-attribute
            radioInput.name = "question";
            radioInput.type = "radio";
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make first option selected
            if (i === 1){
                radioInput.checked = true;
            }

            // Create label
            let theLabel = document.createElement("label");

            // Add for attribute
            theLabel.htmlFor = `answer_${i}`

            // Create Label text 
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add the text to the label 
            theLabel.appendChild(theLabelText);

            // Add input + label to main div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);


            // Append all divs to answers area
            answerArea.appendChild(mainDiv);
        }
    }
}


function checkAnswer(rAnswer, count){
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (i = 0; i < answers.length; i++){
        if(answers[i].checked){
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }
    console.log(`the Righ answe is ${rAnswer}`);
    console.log(`the choossen anser ${theChoosenAnswer}`);
    if(rAnswer === theChoosenAnswer){
        rightAnswers++;
    }
}

function handleBullets(){

    let bulletsSpans = document.querySelectorAll(".bullets .spans span"),
        arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) =>{
        if(curretIndex === index){
            span.className = "on";
        }
    });
}

function showResults (count){

    let theResult;

    if (curretIndex === count){
        quizArea.remove();
        answerArea.remove();
        submitBtn.remove();
        bullets.remove();
        if (rightAnswers > count / 2 && rightAnswers < count) {
            theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
        } else if (rightAnswers === count) {
            theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
        } else {
            theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
        }
        resultsContainer.innerHTML = theResult;
        resultsContainer.style.padding = "10px";
        resultsContainer.style.backgroundColor = "white";
        resultsContainer.style.marginTop = "10px";
    }
}

// Coutn Down Function 
function countDown(duration, count){
    if (curretIndex < count){
        let  min, sec;

        countDownInterval = setInterval(function(){
            min = parseInt(duration/60);
            sec = parseInt(duration% 60);

            min = min < 10 ? `0${min}`: min;
            sec = sec < 10 ? `0${sec}`: sec;

            countDownElement.innerHTML = `${min}:${sec}`;

            if (--duration < 0 ){
                clearInterval(countDownInterval);
                submitBtn.click();
            }

        }, 1000)
    }
} */

// !! I still have some trobles with this coode ti is not working nice ly I have the fix it 
 // Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      countdown(3, qCount);

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(3, qCount);

        // Show Results
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
