let pos = 0;
let correct = 0;
let questNumb = 0;

function renderQuizStart() {
    $('#test').html(`<div class='start'>
    <h1>Race Through Your Automotive Knowledge!</h1>
    <h2>On Your Mark!</h2>
    <h2>Get Set!</h2>
    <button id='js-next-button'>GO!!!</button>
    </div>`);
}

function renderQuestionNumber() {
    questNumb = pos + 1;
}

function renderStatusBar() {
    $('#test-status').html(`<ul class='status'>
    <li>Question: ${questNumb}/${questions.length}</li>
    <li>Score:${correct}/${questions.length}</li>
    </ul>`);
}

function renderQuestion() {
    if (pos < questions.length) {
        const questionsString = questions[pos].choices.map((value) => {
            return `<input type='radio' name='choices' id='${value}' value='${value}' required>   
            <label for='${value}'>${value}</label><br>`;
        }).join('');
        $('#test').html(`
        <div class=questionText>${questions[pos].question}</div>
        <form class='answers' id='answers'>
        <fieldset>
        ${questionsString}
        <button id='submitButton'>Submit</button>
        </fieldset>
        </form>`);
    } else {
        resultsPage();
        $('.status').remove();
    }
}

function checkAnswer() {
    const choice = $('[name=choices]:checked').val();
    if (!choice) return;
    if (choice == questions[pos].correctAnswer) {
        correct++;
        pos++;
        correctAnswer();
    } else {
        pos++;
        incorrectAnswer();
    };
    renderStatusBar();
}

function correctAnswer() {
    $('#test').html(`<section class="feedbackPage" id='correct' role="main">
    <h2>Correct!</h2>
    <button id="js-next-button">Next</button>
    </section>`)
}

function incorrectAnswer() {
    $('#test').html(`<section class="feedbackPage" id='incorrect' role="main">
    <h2>Incorrect!</h2>
    <h3>The correct answer was ${questions[pos - 1].correctAnswer}</h3>
    <button id="js-next-button">Next</button>
    </section>`)
}

function resultsPage() {
    $('#test').html(`<section class='resultsWrapper'>
    <h1>Test Completed!</h1>
    <h2>You got ${correct} of ${questions.length} questions correct</h2><br><br>
    <button id="js-restart-button">Restart</button>
    </section>`);
}

function handleRestartQuiz() {
    $('#test').on('click', '#js-restart-button', function () {
        pos = 0;
        correct = 0;
        renderQuizStart();
    });
}

function handleNext() {
    $('#test').on('click', '#js-next-button', function () {
        renderQuestionNumber();
        renderStatusBar();
        renderQuestion();
    });
}

function handleAnswerSubmit() {
    $('#test').on('submit', '#answers', function (event) {
        event.preventDefault();
        checkAnswer();
    });
}

function attachEventListeners() {
    handleAnswerSubmit();
    handleNext();
    handleRestartQuiz();
}

function initializeQuiz() {
    attachEventListeners();
    renderQuizStart();
}

$(initializeQuiz);