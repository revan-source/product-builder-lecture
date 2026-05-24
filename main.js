// Custom Element for Lotto Ball
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number' && oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#fbc400'; // Yellow
        if (num <= 20) return '#69c8f2'; // Blue
        if (num <= 30) return '#ff7272'; // Red
        if (num <= 40) return '#aaa';    // Grey
        return '#b0d840';                // Green
    }

    render() {
        const number = this.getAttribute('number');
        if (!number) return;

        this.shadowRoot.innerHTML = \`
            <style>
                .ball {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                    background-color: \${this.getColor(number)};
                    color: #fff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    margin: 5px;
                }
            </style>
            <div class="ball">\${number}</div>
        \`;
    }
}

// Register Custom Element
if (!customElements.get('lotto-ball')) {
    customElements.define('lotto-ball', LottoBall);
}

// Initialize Application
function init() {
    const generateBtn = document.getElementById('generate-btn');
    const themeBtn = document.getElementById('theme-btn');
    const numbersContainer = document.getElementById('numbers-container');
    const root = document.documentElement;

    if (!generateBtn || !themeBtn || !numbersContainer) {
        console.error('Required elements not found');
        return;
    }

    // Lotto Logic
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
        numbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            numbersContainer.appendChild(lottoBall);
        });
    }

    generateBtn.addEventListener('click', () => {
        const lottoNumbers = generateLottoNumbers();
        displayNumbers(lottoNumbers);
    });

    // Theme Logic
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeBtn.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Initial State
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const initialNumbers = generateLottoNumbers();
    displayNumbers(initialNumbers);
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
