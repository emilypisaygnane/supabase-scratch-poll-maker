

const pollForm = document.getElementById('poll-form');
const currentQuestion = document.getElementById('live-question');
const currentOptionA = document.getElementById('live-option-a');
const currentOptionB = document.getElementById('live-option-b');
const optionAUp = document.getElementById('option-a-like');
const optionADown = document.getElementById('option-a-dislike');
const optionBUp = document.getElementById('option-b-like');
const optionBDown = document.getElementById('option-b-dislike');
const publishButtonEl = document.getElementById('publish-button');
const pastPollsDisplay = document.getElementById('past-polls');
const scoreA = document.getElementById('option-a-score');
const scoreB = document.getElementById('option-b-score');


let question = '';
let optionA = '';
let optionB = '';
let optionACount = 0;
let optionBCount = 0;

let pastPolls = [];

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollForm);

    const userQuestion = data.get('question');
    const userOptionA = data.get('input-a');
    const userOptionB = data.get('input-b');

    question = userQuestion;
    optionA = userOptionA;
    optionB = userOptionB;

    displayCurrentPoll();
    pollForm.reset();

});

optionAUp.addEventListener('click', () => {
    optionACount++;
    scoreA.textContent = optionACount;
});

optionADown.addEventListener('click', () => {
    optionACount--;
    scoreA.textContent = optionACount;
});

optionBUp.addEventListener('click', () => {
    optionBCount++;
    scoreB.textContent = optionBCount;
});

optionBDown.addEventListener('click', () => {
    optionBCount--;
    scoreB.textContent = optionBCount;
});

publishButtonEl.addEventListener('click', async () => {

    const data = {
        question: question,
        optionA: optionA,
        optionB: optionB,
        optionACount: optionACount,
        optionBCount: optionBCount,
    };

    const resp = await createNewPoll(data);
    question = '';
    optionA = '';
    optionB = '';
    optionACount = 0;
    optionBCount = 0;

    displayAllPolls();

    pollReset();
});

async function displayAllPolls() {
    pastPollsDisplay.textContent = '';

    const pastPolls = await getPolls();
    for (let pastPoll of pastPolls) {
        const pastPOllEl = renderPoll(pastPoll);
        pastPollsDisplay.append(pastPOllEl);
    }
    
}

function displayCurrentPoll() {
    currentQuestion.textContent = question;
    currentOptionA.textContent = optionA;
    currentOptionB.textContent = optionB;
    scoreA.textContent = optionACount;
    scoreB.textContent = optionBCount;

}

function pollReset() {
    currentQuestion.textContent = '';
    currentOptionA.textContent = '';
    currentOptionB.textContent = '';
    scoreA.textContent = 0;
    scoreB.textContent = 0;
    question = '';
    optionA = '';
    optionB = '';
    optionACount = 0;
    optionBCount = 0;
}