import { createNewPoll, getPolls } from './fetch-utils.js';
import { renderPoll } from './render-utils.js';

const pollForm = document.getElementById('poll-form');
const voteA = document.getElementById('vote-a');
const voteB = document.getElementById('vote-b');
const publishPoll = document.getElementById('publish-poll');

let question = '';
let optionA = '';
let optionB = '';
let optionAVotes = 0;
let optionBVotes = 0;

pollForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollForm);

    question = data.get('question');
    optionA = data.get('option-a');
    optionB = data.get('option-b');

    displayCurrentPollEl();
});

function displayCurrentPollEl() {
    const questionEl = document.getElementById('question');
    questionEl.textContent = question;
    
    const optionAEl = document.getElementById('option-a');
    optionAEl.textContent = optionA;

    const optionBEl = document. getElementById('option-b');
    optionBEl.textContent = optionB;

    voteA.textContent = optionAVotes;
    voteB.textContent = optionBVotes;
}

voteA.addEventListener('click', () => {
    optionAVotes++;
    voteA.textContent = optionAVotes;
});

voteB.addEventListener('click', () => {
    optionBVotes++;
    voteB.textContent = optionBVotes;
})

publishPoll.addEventListener('click', async () => {

    const data = {
        question,
        option_a: optionA,
        option_b: optionB,
        option_a_votes: optionAVotes,
        option_b_votes: optionBVotes,
    };

    const resp = await createNewPoll(data);
    question = '';
    optionA = '';
    optionB = '';
    optionAVotes = 0;
    optionBVotes = 0;

    displayAllPolls();

    return resp.data;
});

async function displayAllPolls() {
    const pollList = document.getElementById('poll-list');

    pollList.textContent = '';

    const polls = await getPolls();

    for (let poll of polls) {
        const div = renderPoll(poll);
        pollList.append(div);
    }
}

displayAllPolls();


