const memes = [
    'url("https://i.imgur.com/2vA6Wjd.jpg")',
    'url("https://i.imgur.com/Z8XhAoj.jpg")',
    'url("https://i.imgur.com/B5TcfhP.jpg")',
    'url("https://i.imgur.com/soxIWe9.jpg")',
    'url("https://i.imgur.com/xCIT9ob.jpg")'
];

function changeMeme() {
    const memeContainer = document.getElementById("meme");
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    memeContainer.style.backgroundImage = randomMeme;
}

// Изменяем мемы каждую секунду
setInterval(changeMeme, 1000);
// Данные по предметам
const subjects = [
    { name: "Математика", homework: "не задано" },
    { 
        name: "Литература", 
        homework: ""
    },
    { 
        name: "ОДНКНР", 
        homework: "" 
    },
    { 
        name: "История", 
        homework: "Поменять учебник" 
    }
];


let currentIndex = 0;

// Элементы DOM
const subjectTitle = document.getElementById("subject-title");
const homeworkContent = document.getElementById("homework-content");
const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");
const gdzPanel = document.getElementById("gdz-panel");

// Обновление панели с анимацией
// Обновление панели с анимацией
function updatePanel(direction) {
    const animationOut = direction === "left" ? "slide-out-left" : "slide-out-right";
    const animationIn = direction === "left" ? "slide-in-right" : "slide-in-left";

    gdzPanel.classList.add(animationOut);

    setTimeout(() => {
        currentIndex = (currentIndex + (direction === "left" ? -1 : 1) + subjects.length) % subjects.length;
        const currentSubject = subjects[currentIndex];

        // Обновляем текст
        subjectTitle.textContent = currentSubject.name;
        homeworkContent.textContent = currentSubject.homework;

        // Проверяем, если текущий предмет — "Литература"
        const actionButton = document.getElementById("action-button");
        const actionButton2 = document.getElementById("action-button-2"); // Для второй кнопки
        if (currentSubject.name === "Литература") {
            actionButton.remove();
            actionButton2.remove();
            if (!actionButton) {
                // Создаем кнопку для Литературы, если её нет
                const button = document.createElement("button");
                button.id = "action-button";
                button.textContent = "Установить файлик с ответом";
                button.className = "action-button"; // Добавляем класс для стилей
                homeworkContent.textContent = null;
                button.addEventListener("click", () => {
                    window.open("https://us.femboypig.ru/txt.txt", "_blank"); // Открываем ссылку в новом окне
                });
                gdzPanel.appendChild(button);
            }
        } else if (currentSubject.name === "ОДНКНР") {
            actionButton.remove();
            actionButton2.remove();
            if (!actionButton2) {
                // Создаем кнопку для ОДНКНР, если её нет
                const button2 = document.createElement("button");
                button2.id = "action-button-2";
                button2.textContent = "Установить файлик с ответом";
                homeworkContent.textContent = null;
                button2.className = "action-button"; // Добавляем класс для стилей
                button2.addEventListener("click", () => {
                    window.open("https://us.femboypig.ru/txt2.txt", "_blank"); // Открываем ту же ссылку для ОДНКНР
                });
                gdzPanel.appendChild(button2);
            }
        } else {
            // Удаляем кнопки, если они существуют
            if (actionButton) {
                actionButton.remove();
            }
            if (actionButton2) {
                actionButton2.remove();
            }
        }
        

        gdzPanel.classList.remove(animationOut);
        gdzPanel.classList.add(animationIn);
    }, 400);

    setTimeout(() => {
        gdzPanel.classList.remove(animationIn);
    }, 800);
}


// Обработчики событий
prevArrow.addEventListener("click", () => updatePanel("left"));
nextArrow.addEventListener("click", () => updatePanel("right"));
