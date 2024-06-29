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
    ];

    const subjectStatusPairs = {
        '22-СП-ЭК01': [
            { subject: 'Философия', status: 'НЕДОПОНЯТА (пока)' },
            { subject: 'Иностранный язык', status: 'Ожидается' },
            { subject: 'Бухгалтерский учет', status: 'ПРИБЫЛ' },
        ],
        '20-1Б-ЭК01': [
            { subject: 'Инвестиционный анализ', status: 'ПРИБЛИЖАЕТСЯ' },
            { subject: 'Оценка имущества и бизнеса', status: 'Уточняется' },
            { subject: 'Физическая культура и спорт', status: 'Вне очереди' },
        ],
        '20-1Б-МН01': [
            { subject: 'Управление денежными потоками', status: 'ОТЛОЖЕНО' },
            { subject: 'Методы принятия финансовых решений', status: 'ВОЗМОЖНО ОЖИДАЕТСЯ' },
            { subject: 'Финансовый менеджмент', status: 'Посадка по расписанию' },
        ]
    };

    function getRandomPhrase() {
        return motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    }
    for (let group in subjectStatusPairs) {
        subjectStatusPairs[group] = subjectStatusPairs[group].map(pair => ({
            ...pair,
            time: generateRandomTime()
        }));
    }

    function generateRandomTime() {
        const now = new Date();
        const flightTime = new Date(now.getTime() + (2 * 60 + Math.floor(Math.random() * 60)) * 60 * 1000);
        const flightHours = flightTime.getHours().toString().padStart(2, '0');
        const flightMinutes = flightTime.getMinutes().toString().padStart(2, '0');
        return `${flightHours}:${flightMinutes}`;
    }

    function updateTime() {
        const timeElement = document.querySelector('.time');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    function updateSubjectsAndStatuses() {
        const rows = document.querySelectorAll('.grid_tabloid .item.group');
        const usedSubjects = new Set();

        rows.forEach(row => {
            const group = row.textContent;
            const subjectElement = row.nextElementSibling;
            const timeElement = subjectElement.nextElementSibling;
            const statusElement = timeElement.nextElementSibling;

            if (subjectStatusPairs[group]) {
                let availablePairs = subjectStatusPairs[group].filter(pair => !usedSubjects.has(pair.subject));

                if (availablePairs.length === 0) {
                    usedSubjects.clear();
                    availablePairs = subjectStatusPairs[group];
                }

                const randomIndex = Math.floor(Math.random() * availablePairs.length);
                const randomPair = availablePairs[randomIndex];

                subjectElement.textContent = randomPair.subject;
                timeElement.textContent = randomPair.time;
                statusElement.textContent = randomPair.status;

                usedSubjects.add(randomPair.subject);
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
        updateSubjectsAndStatuses();
    }

    // Инициализация
    updateTime();
    updateSubjectsAndStatuses();

    // Обновлять время каждую секунду
    setInterval(updateTime, 1000);

    function cycleScreens() {
        setTimeout(showMotivationScreen, 60000);
        setTimeout(() => {
            showOriginalScreen();
            cycleScreens(); // Повторяем цикл
        }, 80000);
    }

    cycleScreens();
});