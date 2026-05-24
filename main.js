function init() {
    const generateBtn = document.getElementById('generate-btn');
    const themeBtn = document.getElementById('theme-btn');
    const resultContainer = document.getElementById('result');
    const root = document.documentElement;

    if (!generateBtn || !themeBtn || !resultContainer) return;

    // Lotto Logic
    function generateOneSet() {
        const numbers = [];
        while (numbers.length < 6) {
            const random = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(random)) {
                numbers.push(random);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    function getColorClass(num) {
        if (num <= 10) return "yellow";
        if (num <= 20) return "blue";
        if (num <= 30) return "red";
        if (num <= 40) return "gray";
        return "green";
    }

    function generateLottoSets() {
        resultContainer.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            const set = generateOneSet();
            const setDiv = document.createElement("div");
            setDiv.className = "set";

            const title = document.createElement("div");
            title.className = "set-title";
            title.textContent = \`🎟 \${i}번 세트\`;

            const numbersDiv = document.createElement("div");
            numbersDiv.className = "numbers";

            set.forEach(num => {
                const ball = document.createElement("div");
                ball.className = \`ball \${getColorClass(num)}\`;
                ball.textContent = num;
                numbersDiv.appendChild(ball);
            });

            setDiv.appendChild(title);
            setDiv.appendChild(numbersDiv);
            resultContainer.appendChild(setDiv);
        }
    }

    generateBtn.addEventListener('click', generateLottoSets);

    // Theme Logic
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeBtn.textContent = theme === 'dark' ? '☀️ 라이트 모드로 전환' : '🌙 다크 모드로 전환';
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Initial State
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Initial generation
    generateLottoSets();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
