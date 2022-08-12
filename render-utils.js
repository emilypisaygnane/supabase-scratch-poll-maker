export function renderPoll(poll) {
    const container = document.createElement('div');
    container.classList.add('poll-detail');

    const h3 = document.createElement('h3');
    h3.textContent = poll.question;

    const p1 = document.createElement('p');
    p1.textContent = `${poll.option_a}: ${poll.option_a_votes}`;

    const p2 = document.createElement('p');
    p2.textContent = `${poll.option_b}: ${poll.option_b_votes}`;

    container.append(h3, p1, p2);

    return container;
}