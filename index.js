const HEADCANON_THEMES = [
    "Идеальное утро","Порядок/хаос в комнате","Домашняя одежда","Коронное блюдо","Отношение к уборке",
    "Температура для сна","Что в холодильнике","Поведение при болезни","Внезапная темнота","Любимый напиток",
    "Обязанности по дому","Выбор мебели","Быстрый завтрак","Бессонница среди ночи","Глажка одежды",
    "Убежище в доме","Нежданные гости","Первое дело дома","Любимая кружка","Комнатные растения",
    "Мысли перед сном","Вредная привычка","Скрытый страх/фобия","Реакция на критику","Причина для слез",
    "Искренняя радость","День рождения","Уязвимое место","Реакция на ложь","Главное сожаление",
    "Самокритика","Поведение в стрессе","Что поднимет настроение","Скрытый талант","Вера в приметы",
    "Реакция на комплименты","Что делают от скуки","Ложь самому себе","Безопасное место","Траты и деньги",
    "Пищевая аллергия","Аллергия на пыльцу/шерсть","Выносливость","Болевой порог","Шрамы и татуировки",
    "Недостаток сна","Диета/метаболизм","Проблемы со зрением","Жара или холод","Частые мелкие травмы",
    "Спорт и тренировки","Как кашляют/чихают","Кофеин и сахар","Алкогольное опьянение","Насколько чутко спят",
    "Любимый/ненавистный запах","Любимый цвет","Песня-ассоциация души","Жанр книг/фильмов","Погода и время года",
    "Вещь из детства","Ненавистная еда","Текстура ткани","Что раздражает в людях","Животное мечты",
    "Что завораживает","Любимый десерт","Что всегда в кармане","Нелюбимый резкий звук","Любимый праздник",
    "Идеальное свидание","Проявление ревности","Язык любви","Поведение после ссоры","Место для поцелуев",
    "Объятия со спины","Тайный заем вещей партнера","Если партнер грустит","Что привлекло в партнере","Страх в отношениях",
    "Совместный ритуал","Имя партнера наедине","Готовность к компромиссу","Ленивый выходной вдвоем","Флирт партнера с другими",
    "Уровень либидо","Доминирование/подчинение","Скрытый кинк/фетиш","Страсть или забота в постели","Отношение к PDA",
    "Сексуальное белье","Dirty talk в постели","Реакция на инициативу","Время суток для интима","Эрогенная зона",
    "Сразу после секса","Игрушки и девайсы","Интим вне кровати","Абсолютное табу в сексе","Голос и взгляд при страсти"
];

function initHeadcanons() {
    if (document.getElementById('srt-btn')) return;
    
    // Создаем кнопку-искорку
    const btn = document.createElement('div');
    btn.id = 'srt-btn';
    btn.innerText = '✨';

    Object.assign(btn.style, {
        position: 'fixed', right: '25px', bottom: '75px', width: '42px', height: '42px',
        background: '#2a2a2a', color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '20px', userSelect: 'none', zIndex: '999998',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)', pointerEvents: 'auto'
    });

    // Создаем всплывающее окно
    const popup = document.createElement('div');
    popup.id = 'srt-popup';
    Object.assign(popup.style, {
        position: 'fixed', right: '20px', bottom: '130px', width: '300px', maxHeight: '400px',
        background: '#1e1e1e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px', zIndex: '999999', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        flexDirection: 'column', overflow: 'hidden', display: 'none'
    });

    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1)">
        <strong>Headcanons Themes</strong>
        <span id="srt-close" style="cursor:pointer;padding:0 5px;font-size:16px;">✕</span>
      </div>
      <div style="padding:10px;display:flex;gap:5px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <button id="srt-scan" style="flex:1; background:#4a4a4a; color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;">🎲 Сгенерировать темы</button>
      </div>
      <div id="srt-content" style="padding:10px;font-size:13px;opacity:0.9;overflow-y:auto;flex:1;line-height:1.4;">
        <span style="color:gray;font-style:italic;">Нажмите кнопку выше, чтобы выбрать 10 случайных тем.</span>
      </div>
    `;

    document.body.appendChild(popup);
    document.body.appendChild(btn);

    // Логика кнопки
    const togglePopup = (e) => {
        e.preventDefault();
        e.stopPropagation();
        popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'flex' : 'none';
    };
    btn.addEventListener('click', togglePopup);
    btn.addEventListener('touchend', togglePopup);

    // Логика закрытия
    document.getElementById('srt-close').addEventListener('click', () => { popup.style.display = 'none'; });

    // Логика генерации
    document.getElementById('srt-scan').addEventListener('click', (e) => {
        e.preventDefault();
        const shuffled = [...HEADCANON_THEMES].sort(() => 0.5 - Math.random());
        const selectedThemes = shuffled.slice(0, 10);
        
        const contentDiv = document.getElementById('srt-content');
        contentDiv.innerHTML = `
            <div style="font-weight:bold;margin-bottom:8px;color:#ffda6a;">Темы для обсуждения / РП:</div>
            <ol style="margin:0;padding-left:20px;">
                ${selectedThemes.map(theme => `<li class="srt-theme-item" style="margin-bottom:6px; cursor:pointer; color:#fff;" data-theme="${theme}">${theme}</li>`).join('')}
            </ol>
        `;

        contentDiv.querySelectorAll('.srt-theme-item').forEach(item => {
            item.addEventListener('click', (ev) => {
                const textarea = document.querySelector('#send_textarea');
                if (textarea) {
                    const text = ev.target.getAttribute('data-theme');
                    textarea.value = textarea.value ? `${textarea.value}\n[Тема хедканона: ${text}] ` : `[Тема хедканона: ${text}] `;
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });
    });
}

// Запуск в обход модулей Таверны — жестко по таймеру страницы
const checkST = setInterval(() => {
    if (document.querySelector('#send_form') && document.body) {
        clearInterval(checkST);
        initHeadcanons();
    }
}, 500);

