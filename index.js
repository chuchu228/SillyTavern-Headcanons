/**
 * Secrets & Revelations Tracker (SillyTavern Extension)
 * ST 1.18+ compatible base version
 */

(() => {
  'use strict';

  const MODULE_KEY = 'secrets_revelations_tracker';

  // База из 100 детализированных тем для хедканонов
  const HEADCANON_THEMES = [
    "Как выглядит их идеальное утро", "Порядок или хаос в комнате", "Любимая домашняя одежда", "Умение готовить и коронное блюдо", "Отношение к уборке",
    "Какую температуру в комнате предпочитают для сна", "Что всегда лежит в их холодильнике", "Как ведут себя во время болезни", "Поведение во время внезапного отключения света", "Любимый напиток для расслабления",
    "Отношение к домашним обязанностям", "Как выбирают и покупают мебель", "Типичный завтрак на скорую руку", "Что делают если не могут уснуть среди ночи", "Отношение к глажке одежды",
    "Любимое место в доме или убежище", "Как ведут себя когда приходят нежданные гости", "Что делают первым делом возвращаясь домой", "Любимая кружка и история ее появления", "Отношение к комнатным растениям",
    "О чем думают за 5 минут до того как заснуть", "Привычка от которой они безуспешно пытаются избавиться", "Скрытый страх или фобия о которой никто не знает", "Как реагируют на резкую критику", "Что может заставить их искренне заплакать",
    "Как проявляют искреннюю радость", "Отношение к собственному дню рождения", "Самое уязвимое место в их характере", "Как реагируют на ложь со стороны близких", "Главное сожаление из их прошлого",
    "Склонны ли они к самоанализу и самокритике", "Как ведут себя в состоянии абсолютного стресса", "Что способно мгновенно поднять им настроение", "Скрытый талант который они считают бесполезным", "Верит ли персонаж в приметы или судьбу",
    "Как они реагируют на комплименты", "Что они делают когда им очень скучно", "Главная ложь которую они говорят сами себе", "Как выглядит их ментальное безопасное место", "Их отношение к деньгам и тратам",
    "Пищевые аллергии или непереносимость продуктов", "Сезонные аллергии на пыльцу или шерсть", "Уровень выносливости и физической подготовки", "Чувствительность к боли и болевой порог", "Шрамы или татуировки и история их появления",
    "Как реагируют на недостаток сна", "Особенности метаболизма или диеты", "Проблемы со зрением или другими органами чувств", "Как переносят экстремальную жару или холод", "Частые мелкие травмы синяки и порезы из-за неуклюжести",
    "Отношение к спорту и тренировкам", "Как кашляют или чихают в быту", "Зависимость от кофеина или сахара", "Как реагируют на алкогольное опьянение", "Спят ли они чутко или их не разбудить пушкой",
    "Любимый и самый ненавистный запах", "Любимый цвет и цвета которые они никогда не наденут", "Какая музыка или песня ассоциируется с их душой", "Любимый жанр книг или фильмов", "Любимая погода и время года",
    "Вещь из детства которую они хранят до сих пор", "Ненавистная еда которую они ни за что не станут есть", "Любимая текстура ткань или материал", "Самый раздражающий тип людей для них", "Любимое животное или питомец мечты",
    "Какое зрелище способно заворожить их надолго", "Любимая сладость или десерт", "Вещь которую они всегда носят с собой в кармане", "Самый нелюбимый резкий звук", "Любимый праздник и как его отмечают",
    "Идеальное свидание в их представлении", "Как они проявляют ревность", "Язык любви как показывают привязанность", "Как ведут себя после крупной ссоры", "Их любимое место для поцелуев",
    "Как реагируют на внезапные объятия со спины", "Какую вещь партнера они любят тайно заимствовать", "Как ведут себя если партнер грустит", "Первое на что они обратили внимание в партнере", "Их главный страх в отношениях",
    "Любимая совместная привычка или ритуал с партнером", "Как называют партнера наедине", "Готовы ли они пойти на компромисс ради любимого", "Как выглядит их идеальный ленивый выходной вдвоем", "Как реагируют если... партнер заигрывает с кем-то другим",
    "Уровень либидо и как часто возникает потребность", "Отношение к доминированию и подчинению в постели", "Главный скрытый кинк или фетиш", "Как ведут себя в постели страстно или заботливо", "Отношение к публичным проявлениям страсти",
    "Какое белье или одежда на партнере их мгновенно заводит", "Отношение к грязным разговорам во время интима", "Как реагируют на инициативу со стороны партнера", "Любимое время суток для интима", "Их самая чувствительная эрогенная зона",
    "Как ведут себя сразу после секса", "Отношение к использованию игрушек или девайсов", "Где помимо кровати они хотели бы попробовать это", "Что для них является абсолютным табу в сексе", "Как меняется их голос и взгляд в моменты страсти"
  ];

  // ─────────────────────────────
  // CONTEXT
  // ─────────────────────────────

  function ctx() {
    return SillyTavern?.getContext?.() || window.SillyTavern;
  }

  // ─────────────────────────────
  // INIT
  // ─────────────────────────────

  jQuery(() => {
    initExtension();
  });

  function initExtension() {
    const wait = setInterval(() => {
      const c = ctx();
      const sendForm = document.querySelector('#send_form');

      if (!c || !sendForm || !document.body) return;

      clearInterval(wait);

      injectSendButton();
      createPopup();

      console.log('[SRT] initialized successfully');
    }, 250);
  }

  // ─────────────────────────────
  // UI BUTTON (✨)
  // ─────────────────────────────

  function injectSendButton() {
    const bar = document.querySelector('#send_form');
    if (!bar || document.getElementById('srt-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'srt-btn';
    btn.innerText = '✨'; 
    btn.title = 'Headcanons Generator';

    Object.assign(btn.style, {
      width: '32px',
      height: '32px',
      marginLeft: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      userSelect: 'none'
    });

    btn.onclick = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        togglePopup();
    };

    bar.appendChild(btn);
  }

  // ─────────────────────────────
  // POPUP
  // ─────────────────────────────

  function createPopup() {
    if (document.getElementById('srt-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'srt-popup';

    Object.assign(popup.style, {
      position: 'fixed',
      right: '20px',
      bottom: '120px',
      width: '300px',
      maxHeight: '400px',
      background: '#1e1e1e',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '10px',
      zIndex: '99999',
      display: 'none',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      flexDirection: 'column',
      overflow: 'hidden'
    });

    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1)">
        <strong>Headcanons Themes</strong>
        <span id="srt-close" style="cursor:pointer">✕</span>
      </div>
      <div style="padding:10px;display:flex;gap:5px;">
        <button id="srt-scan" class="menu_button" style="flex:1;">🎲 Сгенерировать темы</button>
      </div>
      <div id="srt-content" style="padding:10px;font-size:13px;opacity:0.9;overflow-y:auto;flex:1;line-height:1.4;">
         <span style="color:gray;font-style:italic;">Нажмите кнопку выше, чтобы выбрать 10 случайных тем.</span>
      </div>
    `;

    document.body.appendChild(popup);

    document.getElementById('srt-close').onclick = (e) => {
        if (e) e.preventDefault();
        closePopup();
    };

    document.getElementById('srt-scan').onclick = (e) => {
        if (e) e.preventDefault();
        generateRandomThemes();
    };
  }

  // ─────────────────────────────
  // ГЕНЕРАЦИЯ И ВСТАВКА В ЧАТ
  // ─────────────────────────────

  function generateRandomThemes() {
    const contentDiv = document.getElementById('srt-content');
    if (!contentDiv) return;

    const shuffled = [...HEADCANON_THEMES].sort(() => 0.5 - Math.random());
    const selectedThemes = shuffled.slice(0, 10);

    contentDiv.innerHTML = `
        <div style="font-weight:bold;margin-bottom:8px;color:#ffda6a;">Темы для обсуждения / РП:</div>
        <ol style="margin:0;padding-left:20px;">
            ${selectedThemes.map(theme => `<li class="srt-theme-item" style="margin-bottom:6px; cursor:pointer; color:#fff;" data-theme="${theme}">${theme}</li>`).join('')}
        </ol>
    `;

    contentDiv.querySelectorAll('.srt-theme-item').forEach(item => {
        item.onclick = (e) => {
            const text = e.target.getAttribute('data-theme');
            insertTextToChat(text);
        };
    });
  }

  function insertTextToChat(text) {
    const textarea = document.querySelector('#send_textarea');
    if (!textarea) return;
    
    if (textarea.value) {
        textarea.value += `\n[Тема хедканона: ${text}] `;
    } else {
        textarea.value = `[Тема хедканона: ${text}] `;
    }
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ─────────────────────────────
  // POPUP CONTROL
  // ─────────────────────────────

  function togglePopup() {
    let popup = document.getElementById('srt-popup');

    if (!popup) {
      createPopup();
      popup = document.getElementById('srt-popup');
    }

    if (popup.style.display === 'none' || popup.style.display === '') {
        popup.style.display = 'flex'; 
    } else {
        popup.style.display = 'none';
    }
  }

  function closePopup() {
    const popup = document.getElementById('srt-popup');
    if (popup) popup.style.display = 'none';
  }

})();
