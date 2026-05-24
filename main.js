class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');

        const ball = document.createElement('div');
        ball.textContent = number;
        ball.style.width = '50px';
        ball.style.height = '50px';
        ball.style.borderRadius = '50%';
        ball.style.display = 'flex';
        ball.style.justifyContent = 'center';
        ball.style.alignItems = 'center';
        ball.style.fontWeight = 'bold';
        ball.style.fontSize = '1.5rem';
        ball.style.backgroundColor = this.getColor(number);
        ball.style.color = '#fff';

        shadow.appendChild(ball);
    }

    getColor(number) {
        if (number <= 10) return '#fbc400';
        if (number <= 20) return '#69c8f2';
        if (number <= 30) return '#ff7272';
        if (number <= 40) return '#aaa';
        return '#b0d840';
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers-container');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersContainer.innerHTML = '';
    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numbersContainer.appendChild(lottoBall);
    }
}

generateBtn.addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
});

// Initial generation
const initialNumbers = generateLottoNumbers();
displayNumbers(initialNumbers);