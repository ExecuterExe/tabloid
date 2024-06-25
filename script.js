document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper');
    const originalContent = wrapper.innerHTML;
    let flightTimes = [];

    const motivationalPhrases = [
        "Когда кажется, что весь мир настроен против Вас, — помните, что самолет взлетает против ветра",
        "Пусть ваша карьера взмоет ввысь, как самолет в безоблачном небе",
        "Покоряйте свои вершины, как самолет покоряет небо!",
        "Взлетайте на крыльях своих знаний и покоряйте новые вершины в профессиональной сфере.",
        "Диплом Финуниверситета - пропуск на борт самолета успеха. Взлетайте смело!",
        "Вы преодолели турбулентность студенческой жизни. Теперь вас ждет полет к мечте.",
        "Крылья знаний окрепли. Пора совершить смелый взлет к мечте!",
        "Взлетайте без страха, ваши умения - это надежный штурвал!",
        "Сегодня вы покидаете учебный аэродром. Взлетайте в большое карьерное небо, оно ждет смелых пилотов!",
        "Жажда новых свершений - лучшее авиатопливо для карьерного взлета.",
        "Займите место в кабине авиалайнера карьеры и взмывайте ввысь!",
        "Садитесь за штурвал авиалайнера успеха и взлетайте!",
        "Финуниверситет => Финансовая элита будущего"
    ];

    function getRandomPhrase() {
        return motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    }

    function updateTime() {
        const timeElement = document.querySelector('.time');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    function generateFlightTimes() {
        const now = new Date();
        const gridItems = document.querySelectorAll('.grid_tabloid .item.time_rais');
        flightTimes = Array.from(gridItems).map(item => {
            if (item.classList.contains('head_tablo')) return '';

            const flightTime = new Date(now.getTime() + (2 * 60 + Math.floor(Math.random() * 60)) * 60 * 1000);
            const flightHours = flightTime.getHours().toString().padStart(2, '0');
            const flightMinutes = flightTime.getMinutes().toString().padStart(2, '0');
            return `${flightHours}:${flightMinutes}`;
        });
    }

    function displayFlightTimes() {
        const gridItems = document.querySelectorAll('.grid_tabloid .item.time_rais');
        gridItems.forEach((item, index) => {
            if (!item.classList.contains('head_tablo')) {
                item.textContent = flightTimes[index];
            }
        });
    }

    function showMotivationScreen() {
        const randomPhrase = getRandomPhrase();
        wrapper.innerHTML = `
            <div class="motivation-screen">
                <div class="motivation-text">${randomPhrase}</div>
            </div>
        `;
    }

    function showOriginalScreen() {
        wrapper.innerHTML = originalContent;
        updateTime();
        displayFlightTimes();
    }

    // Инициализация
    updateTime();
    generateFlightTimes();
    displayFlightTimes();

    // Обновлять время каждую минуту
    setInterval(updateTime, 60000);

    function cycleScreens() {
        setTimeout(showMotivationScreen, 10000);
        setTimeout(() => {
            showOriginalScreen();
            cycleScreens(); // Повторяем цикл
        }, 5000);
    }

    cycleScreens();
});