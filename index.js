const MODULE_KEY = 'secrets_revelations_tracker';
// ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА ВАШУ RAW ССЫЛКУ С GITHUB
const RAW_GITHUB_URL = 'https://github.com/chuchu228/SillyTavern_Headcanons

jQuery(() => {
    initExtension();
});

function initExtension() {
    const wait = setInterval(() => {
        const sendForm = document.querySelector('#send_form');
        if (!sendForm || !document.body) return;
        clearInterval(wait);
        injectSendButton();
        createPopup();
        console.log('[SRT] Headcanons extension initialized.');
    }, 250);
}

function injectSendButton() {
    const bar = document.querySelector('#send_form');
    if (!bar || document.getElementById('srt-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'srt-btn';
    btn.innerText = '✨'; 
    btn.title = 'Headcanons Generator';

    Object.assign(btn.style, {
        width: '32px', height: '32px', marginLeft: '6px',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '18px', userSelect: 'none', zIndex: '101'
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        togglePopup();
    });
    bar.appendChild(btn);
}

function createPopup() {
    if (document.getElementById('srt-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'srt-popup';
    Object.assign(popup.style, {
        position: 'fixed', right: '20px', bottom: '120px', width: '300px',
        maxHeight: '400px', background: '#1e1e1e', color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
        zIndex: '99999', display: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        flexDirection: 'column', overflow: 'hidden'
    });

    popup.innerHTML = `
      <div style="display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1)">
        <strong>Headcanons Themes</strong>
        <span id="srt-close" style="cursor:pointer;padding:0 5px;">✕</span>
      </div>
      <div style="padding:10px;display:flex;gap:5px;border-bottom:1px solid rgba(255,255,255,0.05)">
        <button id="srt-scan" class="menu_button" style="flex:1; background:#4a4a4a; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">🎲 Сгенерировать темы</button>
      </div>
      <div id="srt-content" style="padding:10px;font-size:13px;opacity:0.9;overflow-y:auto;flex:1;line-height:1.4;">
        <span style="color:gray;font-style:italic;">Нажмите кнопку выше, чтобы выбрать 10 случайных тем.</span>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('srt-close').addEventListener('click', () => { popup.style.display = 'none'; });
    document.getElementById('srt-scan').addEventListener('click', () => { generateRandomThemes(); });
}

async function generateRandomThemes() {
    const contentDiv = document.getElementById('srt-content');
    if (!contentDiv) return;

    contentDiv.innerHTML = '<i>Загрузка тем с сервера...</i>';

    try {
        const response = await fetch(RAW_GITHUB_URL);
        if (!response.ok) throw new Error('Ошибка сети');
        const themes = await response.json();

        const shuffled = [...themes].sort(() => 0.5 - Math.random());
        const selectedThemes = shuffled.slice(0, 10);

        contentDiv.innerHTML = `
            <div style="font-weight:bold;margin-bottom:8px;color:#ffda6a;">Темы для обсуждения / РП:</div>
            <ol style="margin:0;padding-left:20px;">
                ${selectedThemes.map(theme => `<li style="margin-bottom:6px;">${theme}</li>`).join('')}
            </ol>
        `;
    } catch (error) {
        contentDiv.innerHTML = '<span style="color:#ff6b6b;">Не удалось загрузить темы. Проверьте интернет или URL.</span>';
        console.error(error);
    }
}

function togglePopup() {
    const popup = document.getElementById('srt-popup');
    if (!popup) return;
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'flex' : 'none';
}
