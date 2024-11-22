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
        homework: "1. История любви Маши Троекуровой и Владимира Дубровского:\n- Вступление: Роман А.С. Пушкина «Дубровский» рассказывает о трагической любви Маши и Владимира, на фоне вражды их семей. Разные социальные положения и обстоятельства сделали их любовь невозможной.\n- Основная часть: Владимир и Маша познакомились в имении Троекурова, почувствовали взаимное притяжение, но обстоятельства, включая страх Маши и свадьбу с Верейским, разрушили их чувства.\n- Заключение: История показывает, как семейные конфликты и социальные различия могут стать преградой для любви.\n\n2. Почему Владимир Дубровский стал разбойником:\n- Вступление: Владимир вырос в семье обедневшего дворянина, пока вражда Троекурова не разрушила его судьбу.\n- Основная часть: После смерти отца и разорения имения Владимир стал разбойником, мстя за несправедливость, но сохранил благородство, помогая бедным. Его любовь к Маше добавила глубину его образу.\n- Заключение: Владимир Дубровский — трагический герой, который вызывает сочувствие, так как его поступки диктовались жестокими обстоятельствами."
    },
    { 
        name: "ОДНКНР", 
        homework: "Период детства — это время интенсивного развития, когда формируются основные навыки и способности человека. В этом возрасте дети быстро учат язык, осваивают физические и когнитивные навыки, начинают взаимодействовать с окружающим миром. Эмоциональное восприятие и социальные взаимодействия играют ключевую роль в этом периоде. Детство также характеризуется особым восприятием реальности, где фантазии и воображение часто становятся важной частью повседневной жизни. Важно, чтобы дети в этот период чувствовали заботу и поддержку со стороны взрослых, так как это закладывает основы для их будущего психоэмоционального благополучия и развития." 
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

        if (currentSubject.name === "Литература") {
            if (!actionButton) {
                // Создаем кнопку, если её нет
                const button = document.createElement("button");
                button.id = "action-button";
                button.textContent = "Установить файл с ответом";
                button.className = "action-button"; // Добавляем класс для стилей
                button.addEventListener("click", () => {
                    window.open("https://us.femboypig.ru/txt.txt", "_blank"); // Открываем ссылку в новом окне
                });
                gdzPanel.appendChild(button);
                homeworkContent.textContent = null;
            }
        } else {
            // Удаляем кнопку, если она существует
            if (actionButton) {
                actionButton.remove();
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
