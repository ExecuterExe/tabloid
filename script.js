document.addEventListener('DOMContentLoaded', function () {
    function updateTime() {
        const timeElement = document.querySelector('.time');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    // Обновить время сразу при загрузке страницы
    updateTime();

    // Обновлять время каждую минуту
    setInterval(updateTime, 60000);

    function updateFlightTimes() {
        const now = new Date();
        const gridItems = document.querySelectorAll('.grid_tabloid .item.time_rais');
        gridItems.forEach((item, index) => {
            // Пропустить первую строку (заголовок)
            if (item.classList.contains('head_tablo')) return;

            // Устанавливаем случайное время рейса на минимум 2 часа больше текущего
            const flightTime = new Date(now.getTime() + (2 * 60 + Math.floor(Math.random() * 60)) * 60 * 1000);
            const flightHours = flightTime.getHours().toString().padStart(2, '0');
            const flightMinutes = flightTime.getMinutes().toString().padStart(2, '0');
            item.textContent = `${flightHours}:${flightMinutes}`;
        });
    }

    // Обновляем время рейсов при загрузке страницы
    updateFlightTimes();
});
