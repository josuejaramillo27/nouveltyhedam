document.addEventListener('DOMContentLoaded', () => {
  // ================= SISTEMA DE ICONOS VECTORIALES (LUCIDE MINIMALISTAS) =================
  const ICONS = {
    'megaphone': `<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>`,
    'sparkles': `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>`,
    'check-circle-2': `<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`,
    'check-circle': `<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`,
    'alert-triangle': `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    'external-link': `<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,
    'arrow-right': `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
    'arrow-left': `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`,
    'message-square': `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
    'send': `<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>`,
    'x': `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
    'lock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    'user': `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    'shield-check': `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>`,
    'plus-circle': `<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>`,
    'rotate-ccw': `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>`,
    'eye': `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    'log-out': `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>`,
    'globe': `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
    'mouse-pointer-click': `<path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>`,
    'trending-up': `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`,
    'trash-2': `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>`,
    'calendar': `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>`,
    'link': `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`
  };

  function renderIcon(name, options = {}) {
    const iconPaths = ICONS[name];
    if (!iconPaths) return '';
    const size = options.size || 18;
    const strokeWidth = options.strokeWidth || 2;
    const color = options.color || 'currentColor';
    const className = options.className ? `vector-icon ${options.className}` : 'vector-icon';
    const extraStyle = options.style ? ` style="${options.style}"` : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}"${extraStyle}>${iconPaths}</svg>`;
  }

  // ================= CONFIGURACIÓN OFICIAL DE FIREBASE Y CLOUD FIRESTORE =================
  const firebaseConfig = {
    apiKey: "AIzaSyBmM0YUumjsEo0ApyJ78ah1OQPxcMzFcNY",
    authDomain: "nouveltyhedam.firebaseapp.com",
    projectId: "nouveltyhedam",
    storageBucket: "nouveltyhedam.firebasestorage.app",
    messagingSenderId: "518596302149",
    appId: "1:518596302149:web:10b3e91c765dfc65841a2c"
  };

  // VAPID Key para Web Push FCM:
  const FIREBASE_VAPID_KEY = "BMxvRpCIBzqdlRu_b_MrYv8N17sN4panZD4QD0xaVCSJaQbii9OTb1bPlP2IDHrvgJZoT9joHt8U1sdBPzK13a0";

  let firestoreDb = null;
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      firestoreDb = firebase.firestore();
      console.log('[Firebase] Cloud Firestore inicializado correctamente para nouveltyhedam');
    }
  } catch (err) {
    console.warn('[Firebase] Inicialización de Firestore omitida o pendiente:', err.message);
  }

  // Sincronización en la Nube con Firestore (Con tolerancia a fallos offline y fallback a LocalStorage)
  function syncAnnouncementToFirestore(announcement) {
    if (!firestoreDb) return;
    try {
      firestoreDb.collection('announcements').doc(announcement.id).set(announcement, { merge: true })
        .catch(err => console.warn('[Firestore] Error al sincronizar novedad:', err.message));
    } catch (e) {
      console.warn('[Firestore] Excepción en sincronización:', e);
    }
  }

  function deleteAnnouncementFromFirestore(id) {
    if (!firestoreDb) return;
    try {
      firestoreDb.collection('announcements').doc(id).delete()
        .catch(err => console.warn('[Firestore] Error al eliminar novedad:', err.message));
      // Eliminar también comentarios asociados de esa novedad en la nube
      firestoreDb.collection('comments').where('announcementId', '==', id).get()
        .then(snapshot => {
          snapshot.forEach(doc => doc.ref.delete().catch(() => {}));
        })
        .catch(() => {});
    } catch (e) {
      console.warn('[Firestore] Excepción al borrar novedad:', e);
    }
  }

  function syncCommentToFirestore(comment) {
    if (!firestoreDb) return;
    try {
      firestoreDb.collection('comments').doc(comment.id).set(comment)
        .catch(err => console.warn('[Firestore] Error al sincronizar comentario:', err.message));
    } catch (e) {
      console.warn('[Firestore] Excepción al guardar comentario:', e);
    }
  }

  function deleteCommentFromFirestore(id) {
    if (!firestoreDb) return;
    try {
      firestoreDb.collection('comments').doc(id).delete()
        .catch(err => console.warn('[Firestore] Error al eliminar comentario:', err.message));
    } catch (e) {
      console.warn('[Firestore] Excepción al borrar comentario:', e);
    }
  }

  // ================= CLAVES DE ALMACENAMIENTO =================
  const STORAGE_KEYS = {
    ANNOUNCEMENTS: 'hedam_announcements',
    COMMENTS: 'hedam_comments',
    WEB_VIEWS: 'hedam_web_views',
    THEME: 'hedam_theme',
    ADMIN_AUTH: 'hedam_admin_auth',
    VISITED_SESSION: 'hedam_visited_session',
    POPUP_LAST_SEEN: 'hedam_popup_last_seen',
    POPUP_LAST_ANNOUNCEMENT_ID: 'hedam_popup_last_announcement_id',
    NOTIF_MODAL_SEEN: 'hedam_notif_modal_seen',
    USER_NICKNAME: 'hedam_user_nickname',
    USER_NICKNAME_DATE: 'hedam_user_nickname_date'
  };

  // Novedades iniciales por defecto (vacío para que el administrador publique solo contenido oficial)
  const DEFAULT_ANNOUNCEMENTS = [];

  // Helpers de LocalStorage
  function loadJSON(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      if (data !== null) {
        return JSON.parse(data);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  }

  // ================= ESTADO DE LA APLICACIÓN =================
  let initialAnnouncements = loadJSON(STORAGE_KEYS.ANNOUNCEMENTS, []);
  if (!Array.isArray(initialAnnouncements)) {
    initialAnnouncements = [];
  }
  // Purgar de forma permanente la novedad de ejemplo si existía en la caché local
  initialAnnouncements = initialAnnouncements.filter(a => a.id !== 'ann_oficial_bienvenida');
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));

  let state = {
    announcements: initialAnnouncements,
    comments: loadJSON(STORAGE_KEYS.COMMENTS, []),
    globalWebViews: parseInt(localStorage.getItem(STORAGE_KEYS.WEB_VIEWS) || '0', 10),
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',
    isAuthenticated: sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true',
    selectedAnnouncementId: null,
    activeModalAnnouncement: null,
    selectedModerationId: null,
    showCommentsDrawer: false,
    hasAutoShownModal: false,
    logoClickCount: 0,
    logoClickTimer: null
  };

  function saveAnnouncements() {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(state.announcements));
  }

  function saveComments() {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(state.comments));
  }

  function saveWebViews() {
    localStorage.setItem(STORAGE_KEYS.WEB_VIEWS, state.globalWebViews.toString());
  }

  // ================= REGLA DE IDENTIDAD (BLOQUEO DE 15 DÍAS) =================
  const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000; // 15 días en ms

  function getUserNickname() {
    return localStorage.getItem(STORAGE_KEYS.USER_NICKNAME) || '';
  }

  function getNicknameSetDate() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_NICKNAME_DATE);
    return raw ? parseInt(raw, 10) : 0;
  }

  function canChangeNickname() {
    const setDate = getNicknameSetDate();
    if (!setDate) return true;
    return (Date.now() - setDate) >= FIFTEEN_DAYS_MS;
  }

  function getRemainingDaysForNickname() {
    const setDate = getNicknameSetDate();
    if (!setDate) return 0;
    const diff = FIFTEEN_DAYS_MS - (Date.now() - setDate);
    if (diff <= 0) return 0;
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  function getNextChangeDateString() {
    const setDate = getNicknameSetDate();
    if (!setDate) return '';
    const nextDate = new Date(setDate + FIFTEEN_DAYS_MS);
    return nextDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function getLocalDateTimeString(date = new Date()) {
    const pad = (n) => String(n).padStart(2, '0');
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());
    const h = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${y}-${m}-${d}T${h}:${min}`;
  }

  // ================= CONTROL DE TEMA (CLARO / OSCURO) =================
  function applyTheme(newTheme) {
    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);

    const themeThumb = document.getElementById('theme-thumb');
    if (themeThumb) {
      if (newTheme === 'dark') {
        themeThumb.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      } else {
        themeThumb.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      }
    }
  }

  // Inicializar tema guardado
  applyTheme(state.theme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // ================= MÉTRICAS Y TRACKING =================
  function trackWebView() {
    if (!sessionStorage.getItem(STORAGE_KEYS.VISITED_SESSION)) {
      sessionStorage.setItem(STORAGE_KEYS.VISITED_SESSION, 'true');
      state.globalWebViews += 1;
      saveWebViews();
    }
  }

  // Requisito 2: Se puede ver varias veces, pero solo contabilizar UNA vez en estadísticas del admin
  function trackAnnouncementView(id) {
    const key = `hedam_counted_view_${id}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, 'true');
      const item = state.announcements.find(a => a.id === id);
      if (item) {
        item.views = (item.views || 0) + 1;
        saveAnnouncements();
        syncAnnouncementToFirestore(item);
      }
    }
  }

  function trackAnnouncementClick(id) {
    const item = state.announcements.find(a => a.id === id);
    if (item) {
      item.clicks = (item.clicks || 0) + 1;
      saveAnnouncements();
      syncAnnouncementToFirestore(item);
    }
  }

  // ================= ENRUTAMIENTO Y VISTAS =================
  const clientViewEl = document.getElementById('client-view');
  const adminLoginViewEl = document.getElementById('admin-login-view');
  const adminDashboardViewEl = document.getElementById('admin-dashboard-view');

  function updateView() {
    const hash = window.location.hash;
    const isAdminRoute = hash === '#admin' || hash === '#/admin';

    if (isAdminRoute) {
      clientViewEl.classList.add('view-hidden');
      if (state.isAuthenticated) {
        adminLoginViewEl.classList.add('view-hidden');
        adminDashboardViewEl.classList.remove('view-hidden');
        renderAdminDashboard();
      } else {
        adminDashboardViewEl.classList.add('view-hidden');
        adminLoginViewEl.classList.remove('view-hidden');
      }
    } else {
      adminLoginViewEl.classList.add('view-hidden');
      adminDashboardViewEl.classList.add('view-hidden');
      clientViewEl.classList.remove('view-hidden');
      renderClientView();
      trackWebView();
    }
  }

  window.addEventListener('hashchange', updateView);

  // Atajos secretos para Administrador
  // 1. Cinco clics rápidos en el Logo
  const logoEl = document.getElementById('logo-clickable');
  if (logoEl) {
    logoEl.addEventListener('click', () => {
      state.logoClickCount += 1;
      clearTimeout(state.logoClickTimer);
      state.logoClickTimer = setTimeout(() => {
        state.logoClickCount = 0;
      }, 2500);

      if (state.logoClickCount >= 5) {
        state.logoClickCount = 0;
        window.location.hash = '#admin';
      }
    });
  }

  // 2. Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
      window.location.hash = '#admin';
    }
  });

  // ================= VISTA CLIENTE (FEED Y MODAL) =================
  function getActiveAnnouncements() {
    const now = new Date();
    const active = state.announcements.filter(a => {
      const isPublished = (a.status === 'published' || !a.status);
      const notExpired = !a.expiresAt || new Date(a.expiresAt) > now;
      return isPublished && notExpired;
    });

    // Requisito 4: Ordenar fijados (isPinned === true) de primera, luego por fecha más reciente
    return active.sort((a, b) => {
      const aPinned = a.isPinned === true ? 1 : 0;
      const bPinned = b.isPinned === true ? 1 : 0;
      if (bPinned !== aPinned) {
        return bPinned - aPinned;
      }
      return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
    });
  }

  // Requisito 5: Todos los anuncios en un lateral izquierdo scrollable y resto de pantalla con el anuncio completo
  function renderClientView() {
    const feedContainer = document.getElementById('news-feed-container');
    const openPopupBtnContainer = document.getElementById('open-popup-btn-container');
    const activeList = getActiveAnnouncements();

    if (activeList.length === 0) {
      if (openPopupBtnContainer) openPopupBtnContainer.classList.add('view-hidden');
      feedContainer.innerHTML = `
        <div class="card" style="width: 100%; text-align: center; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255, 30, 39, 0.1); display: flex; align-items: center; justify-content: center; color: var(--accent-red);">
            <span class="vector-icon-wrap anim-shake">
              ${renderIcon('megaphone', { size: 30, color: 'var(--accent-red)' })}
            </span>
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800;">Aún no hay novedades publicadas</h3>
          <p style="color: var(--text-muted); max-width: 450px; font-size: 0.92rem;">
            Cuando el equipo de administración publique una novedad o guía oficial, aparecerá automáticamente aquí en primer plano.
          </p>
        </div>`;
      return;
    }

    if (openPopupBtnContainer) openPopupBtnContainer.classList.remove('view-hidden');
    const openFeaturedBtn = document.getElementById('open-featured-btn');
    if (openFeaturedBtn) {
      openFeaturedBtn.onclick = () => openAnnouncementModal(activeList[0]);
    }

    let cardsHtml = '<div class="novedades-grid">';

    activeList.forEach((item) => {
      const commentsCount = state.comments.filter(c => c.announcementId === item.id).length;
      const itemDate = new Date(item.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
      const itemPinned = item.isPinned === true;
      const rawText = item.content ? item.content.replace(/[\n\r]+/g, ' ') : '';
      const cleanExcerpt = escapeHTML(rawText.substring(0, 150)) + (rawText.length > 150 ? '...' : '');

      cardsHtml += `
        <article class="novedad-card ${itemPinned ? 'pinned-card' : ''}" onclick="window.hedamApp.openModal('${item.id}')" title="Clic para ver novedad completa en pop-up">
          ${item.imageUrl ? `
            <div class="novedad-card-image-wrap">
              <img src="${escapeHTML(item.imageUrl)}" alt="${escapeHTML(item.title)}" class="novedad-card-img" loading="lazy" />
            </div>
          ` : ''}

          <div class="novedad-card-body">
            <div class="novedad-card-top">
              <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                ${renderIcon('calendar', { size: 13, color: 'var(--text-muted)' })}
                <span>${itemDate}</span>
              </span>

              <div style="display: flex; align-items: center; gap: 6px;">
                ${itemPinned ? `
                  <span class="badge-pinned">
                    📌 Fijado
                  </span>
                ` : `
                  <span style="background: rgba(255, 30, 39, 0.08); color: var(--accent-red); font-size: 0.68rem; font-weight: 800; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase;">
                    Oficial
                  </span>
                `}
              </div>
            </div>

            <h3 class="novedad-card-title">
              ${escapeHTML(item.title)}
            </h3>

            <p class="novedad-card-excerpt">
              ${cleanExcerpt}
            </p>

            <div class="novedad-card-footer">
              <div class="novedad-card-stats">
                <span title="Lecturas públicas" style="display: inline-flex; align-items: center; gap: 4px;">
                  ${renderIcon('eye', { size: 14, color: 'var(--accent-red)' })}
                  <span>${item.views || 0}</span>
                </span>
                <span title="Comentarios" style="display: inline-flex; align-items: center; gap: 4px;">
                  ${renderIcon('message-square', { size: 14 })}
                  <span>${commentsCount}</span>
                </span>
              </div>

              <div class="novedad-card-btn">
                <span>Ver Novedad</span>
                <span class="vector-icon-wrap vector-hover-slide">
                  ${renderIcon('arrow-right', { size: 13 })}
                </span>
              </div>
            </div>
          </div>
        </article>
      `;
    });

    cardsHtml += '</div>';

    feedContainer.innerHTML = cardsHtml;

    // Verificar y disparar automáticamente el pop-up de la novedad más reciente si aplica
    checkAndTriggerAutoPopup();
  }

  // Comprobar y disparar la ventana emergente respetando la fecha (ignorando si está fijado)
  function checkAndTriggerAutoPopup() {
    if (state.hasAutoShownModal || state.isAuthenticated) return;
    
    // Obtenemos todos los activos pero los ordenamos ESTRICTAMENTE por fecha (del más nuevo al más viejo)
    const now = new Date();
    const activeByDate = state.announcements.filter(a => {
      const isPublished = (a.status === 'published' || !a.status);
      const notExpired = !a.expiresAt || new Date(a.expiresAt) > now;
      return isPublished && notExpired;
    }).sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

    if (activeByDate.length === 0) return;

    // Tomamos SIEMPRE el más reciente (el que se acaba de publicar)
    const newestAnnouncement = activeByDate[0];
    const notifAlreadyGranted = ('Notification' in window && Notification.permission === 'granted');

    state.hasAutoShownModal = true;

    if (!notifAlreadyGranted) {
      state.pendingAnnouncementToShow = newestAnnouncement;
      setTimeout(() => {
        openNotifTutorialModal();
      }, 450);
      return;
    }

    setTimeout(() => {
      openAnnouncementModal(newestAnnouncement);
      localStorage.setItem(STORAGE_KEYS.POPUP_LAST_SEEN, Date.now().toString());
      localStorage.setItem(STORAGE_KEYS.POPUP_LAST_ANNOUNCEMENT_ID, newestAnnouncement.id);
    }, 450);
  }
  // ================= MODAL DEL ANUNCIO =================
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalImageContainer = document.getElementById('modal-image-container');
  const modalImage = document.getElementById('modal-image');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCtaLink = document.getElementById('modal-cta-link');
  const modalCtaText = document.getElementById('modal-cta-text');
  const modalCommentsToggleBtn = document.getElementById('modal-comments-toggle-btn');
  const modalCommentsDrawer = document.getElementById('modal-comments-drawer');
  const modalCommentsCount = document.getElementById('modal-comments-count');
  const modalCommentsList = document.getElementById('modal-comments-list');
  const modalCommentForm = document.getElementById('modal-comment-form');

  // ================= CONTROL DE BLOQUEO DE SCROLL DE FONDO PARA MODALES (ESPECIALMENTE MÓVIL) =================
  let activeOpenModalsCount = 0;
  let savedScrollY = 0;

  function lockBodyScroll() {
    activeOpenModalsCount++;
    if (activeOpenModalsCount === 1) {
      savedScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      // En dispositivos móviles (pantallas <= 768px), congelar la posición del body para bloquear 100% el scroll trasero
      if (window.innerWidth <= 768) {
        document.body.style.top = `-${savedScrollY}px`;
      }
    }
  }

  function unlockBodyScroll() {
    activeOpenModalsCount = Math.max(0, activeOpenModalsCount - 1);
    if (activeOpenModalsCount === 0) {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');

      if (window.innerWidth <= 768) {
        const top = document.body.style.top;
        document.body.style.top = '';
        if (top) {
          const scrollPos = parseInt(top || '0', 10) * -1;
          window.scrollTo(0, scrollPos || savedScrollY);
        }
      }
    }
  }

  function openAnnouncementModal(announcement) {
    state.activeModalAnnouncement = announcement;
    state.showCommentsDrawer = false;
    trackAnnouncementView(announcement.id);

    modalTitle.textContent = announcement.title;

    // Banner opcional
    if (announcement.imageUrl) {
      modalImage.src = announcement.imageUrl;
      modalImageContainer.classList.remove('view-hidden');
    } else {
      modalImageContainer.classList.add('view-hidden');
    }

    // Formateo del cuerpo con viñetas verdes y advertencias
    modalBodyContent.innerHTML = formatAnnouncementContent(announcement.content);

    // Botón CTA
    if (announcement.ctaUrl) {
      modalCtaLink.href = announcement.ctaUrl;
      modalCtaText.textContent = announcement.ctaText || 'VER AHORA';
      modalCtaLink.style.display = 'inline-flex';
      modalCtaLink.onclick = () => {
        trackAnnouncementClick(announcement.id);
      };
    } else {
      modalCtaLink.style.display = 'none';
    }

    modalCommentsDrawer.classList.add('view-hidden');
    updateModalCommentsToggleBtn(false);

    renderModalComments();
    modalOverlay.classList.remove('view-hidden');
    lockBodyScroll();
  }

  function closeAnnouncementModal() {
    modalOverlay.classList.add('view-hidden');
    state.activeModalAnnouncement = null;
    unlockBodyScroll();
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAnnouncementModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeAnnouncementModal);
  }

  function updateModalCommentsToggleBtn(isOpen) {
    if (!modalCommentsToggleBtn) return;
    modalCommentsToggleBtn.innerHTML = `
      <span class="vector-icon-wrap vector-hover-bounce">
        ${renderIcon('message-square', { size: 16 })}
      </span>
      <span id="modal-comments-toggle-text">${isOpen ? 'OCULTAR CHAT' : 'COMENTAR NOVEDAD'}</span>
    `;
  }

  // Formateador de texto inteligente
  function formatAnnouncementContent(content) {
    const lines = content.split('\n');
    let output = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        output += '<div style="height: 8px;"></div>';
        return;
      }

      // Viñetas o checkmarks
      if (trimmed.startsWith('✅') || trimmed.startsWith('-') || trimmed.startsWith('•')) {
        let text = trimmed.replace(/^[✅\-•]\s*/, '');
        if (text.includes('hedampro.com')) {
          text = text.replace('hedampro.com', '<strong style="color: var(--accent-red); font-weight: 800;">hedampro.com</strong>');
        }
        output += `
          <div class="checklist-item">
            <span class="checklist-icon">
              ${renderIcon('check-circle-2', { size: 18, strokeWidth: 2.5, color: '#11a842' })}
            </span>
            <span class="checklist-text">${text}</span>
          </div>`;
        return;
      }

      // Advertencias
      if (trimmed.startsWith('⚠️') || trimmed.toLowerCase().startsWith('así evitamos')) {
        const text = trimmed.replace(/^⚠️\s*/, '');
        output += `
          <div class="alert-warning">
            <span class="alert-warning-icon anim-pulse">
              ${renderIcon('alert-triangle', { size: 20, strokeWidth: 2.2, color: '#f59e0b' })}
            </span>
            <span>${escapeHTML(text)}</span>
          </div>`;
        return;
      }

      // Párrafos comunes
      output += `<p class="modal-paragraph">${escapeHTML(trimmed)}</p>`;
    });

    return output;
  }

  // Toggle y Render de Comentarios en Modal
  if (modalCommentsToggleBtn) {
    modalCommentsToggleBtn.addEventListener('click', () => {
      state.showCommentsDrawer = !state.showCommentsDrawer;
      if (state.showCommentsDrawer) {
        modalCommentsDrawer.classList.remove('view-hidden');
        updateModalCommentsToggleBtn(true);
        
        // --- CÓDIGO NUEVO PARA HACER SCROLL AUTOMÁTICO ---
        setTimeout(() => {
          const scrollContainer = document.querySelector('.modal-body-scrollable');
          if (scrollContainer) {
            scrollContainer.scrollTo({ 
              top: scrollContainer.scrollHeight, 
              behavior: 'smooth' 
            });
          }
        }, 50); // Un pequeño retraso para asegurar que el drawer ya es visible
        // --------------------------------------------------

      } else {
        modalCommentsDrawer.classList.add('view-hidden');
        updateModalCommentsToggleBtn(false);
      }
    });
  }

  function updateModalCommentFormInputs() {
    const container = document.getElementById('modal-comment-fields-container');
    if (!container) return;
    const currentAlias = getUserNickname();
    if (currentAlias) {
      container.innerHTML = `
        <div class="comment-author-badge" style="flex: 0 0 220px;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Comentando como: <strong>${escapeHTML(currentAlias)}</strong></span>
          <button type="button" class="btn-change-alias" onclick="window.hedamApp.openProfileModal()" title="Gestionar alias de usuario">
            ${renderIcon('user', { size: 12 })} Perfil
          </button>
        </div>
        <input id="comment-text-input" type="text" required placeholder="Escribe una opinión o consulta..." style="flex: 1; min-width: 180px; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #dce2ee; font-size: 0.85rem; outline: none; color: #0e1118; background: #ffffff;" />
        <button type="submit" class="btn-primary" style="padding: 0 20px; border-radius: 10px; box-shadow: none; display: flex; align-items: center; justify-content: center;" title="Enviar">
          <span class="vector-icon-wrap vector-hover-slide">
            ${renderIcon('send', { size: 16 })}
          </span>
        </button>
      `;
    } else {
      container.innerHTML = `
        <input id="comment-author-input" type="text" required placeholder="Tu alias o nombre" style="flex: 0 0 150px; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #dce2ee; font-size: 0.85rem; outline: none; color: #0e1118; background: #ffffff;" />
        <input id="comment-text-input" type="text" required placeholder="Escribe una opinión o consulta..." style="flex: 1; min-width: 180px; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #dce2ee; font-size: 0.85rem; outline: none; color: #0e1118; background: #ffffff;" />
        <button type="submit" class="btn-primary" style="padding: 0 20px; border-radius: 10px; box-shadow: none; display: flex; align-items: center; justify-content: center;" title="Enviar">
          <span class="vector-icon-wrap vector-hover-slide">
            ${renderIcon('send', { size: 16 })}
          </span>
        </button>
      `;
    }
  }

  function renderModalComments() {
    if (!state.activeModalAnnouncement) return;
    updateModalCommentFormInputs();
    const itemComments = state.comments.filter(c => c.announcementId === state.activeModalAnnouncement.id);
    modalCommentsCount.textContent = `${itemComments.length} mensajes`;

    if (itemComments.length === 0) {
      modalCommentsList.innerHTML = `
        <p style="color: #8892a4; font-size: 0.85rem; text-align: center; padding: 12px;">
          Aún no hay comentarios. ¡Sé el primero en participar!
        </p>`;
      return;
    }

    let html = '';
    itemComments.forEach(c => {
      const isOfficial = c.userId === 'admin_official' || (c.userName && c.userName.toLowerCase().includes('soporte'));
      const timeStr = new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      html += `
        <!-- Requisito 1: Fondo 100% sólido y texto oscuro de alto contraste -->
        <div class="${isOfficial ? 'comment-card-admin' : 'comment-card-user'}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            ${isOfficial ? `
              <div style="display: inline-flex; align-items: center; gap: 7px;">
                <img src="assets/mascot-pink.png" alt="Soporte HEDAM" class="admin-comment-mascot" />
                <span style="font-weight: 800; font-size: 0.88rem; color: var(--accent-red);">Soporte HEDAM</span>
              </div>
            ` : `
              <span style="font-weight: 800; font-size: 0.85rem; color: var(--accent-red);">\${escapeHTML(c.userName)}</span>
            `}
            <span style="font-size: 0.74rem; color: #64748b; font-weight: 600;">${timeStr}</span>
          </div>
          <p style="margin: 6px 0 0; font-size: 0.92rem; color: #0f172a; font-weight: 600; line-height: 1.45;">${escapeHTML(c.content)}</p>
        </div>`;
    });
    modalCommentsList.innerHTML = html;
  }

  function submitComment(announcementId, author, content) {
    const newComment = {
      id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      announcementId: announcementId,
      userId: 'client_' + Math.random().toString(36).substring(2, 6),
      userName: author,
      content: content,
      createdAt: new Date().toISOString()
    };

    state.comments.push(newComment);
    saveComments();
    syncCommentToFirestore(newComment);
    renderClientView();
    if (state.activeModalAnnouncement && state.activeModalAnnouncement.id === announcementId) {
      renderModalComments();
    }
    showToast('¡Comentario publicado!', 'message-square');
  }

  // Enviar comentario desde el modal cliente
  if (modalCommentForm) {
    modalCommentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.activeModalAnnouncement) return;

      const textInput = document.getElementById('comment-text-input');
      const content = textInput ? textInput.value.trim() : '';
      if (!content) return;

      const currentAlias = getUserNickname();
      if (currentAlias) {
        submitComment(state.activeModalAnnouncement.id, currentAlias, content);
        if (textInput) textInput.value = '';
      } else {
        const authorInput = document.getElementById('comment-author-input');
        const author = (authorInput && authorInput.value.trim()) || 'Miembro de la Comunidad';
        promptNicknameConfirmation(author, () => {
          localStorage.setItem(STORAGE_KEYS.USER_NICKNAME, author);
          localStorage.setItem(STORAGE_KEYS.USER_NICKNAME_DATE, Date.now().toString());
          submitComment(state.activeModalAnnouncement.id, author, content);
          if (textInput) textInput.value = '';
          showToast(`¡Nombre "${author}" configurado por 15 días!`, 'check');
          renderClientView();
          renderModalComments();
        });
      }
    });
  }

  // ================= AUTENTICACIÓN ADMIN =================
  const adminLoginForm = document.getElementById('admin-login-form');
  const loginUser = document.getElementById('login-user');
  const loginPass = document.getElementById('login-pass');
  const loginErrorBox = document.getElementById('login-error-box');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = loginUser.value.trim().toLowerCase();
      const pass = loginPass.value;

      if (user === 'admin' && pass === 'hedam2026') {
        state.isAuthenticated = true;
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
        loginErrorBox.classList.add('view-hidden');
        loginPass.value = '';
        updateView();
      } else {
        loginErrorBox.classList.remove('view-hidden');
      }
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      state.isAuthenticated = false;
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      window.location.hash = '#/';
      updateView();
    });
  }

  // ================= PANEL DE CONTROL ADMIN (DASHBOARD) =================
  function renderAdminDashboard() {
    // 1. Métricas
    const totalViews = state.announcements.reduce((acc, curr) => acc + (curr.views || 0), 0);
    const totalClicks = state.announcements.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
    const totalComments = state.comments.length;
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';

    document.getElementById('stat-global-views').textContent = state.globalWebViews.toLocaleString();
    document.getElementById('stat-announcement-views').textContent = totalViews.toLocaleString();
    document.getElementById('stat-total-clicks').textContent = totalClicks.toLocaleString();
    document.getElementById('stat-ctr').textContent = `${ctr}%`;
    document.getElementById('stat-total-comments').textContent = totalComments.toLocaleString();

    // 2. Tabla de publicaciones
    const tableBody = document.getElementById('admin-table-body');
    if (state.announcements.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="padding: 42px 20px; text-align: center; color: var(--text-muted);">
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
              <span class="vector-icon-wrap anim-sparkle" style="color: var(--accent-red);">
                ${renderIcon('sparkles', { size: 28 })}
              </span>
              <span>No hay novedades publicadas aún. Haz clic en <strong>"Nueva Novedad"</strong> para publicar la primera.</span>
            </div>
          </td>
        </tr>`;
    } else {
      let rowsHtml = '';
      state.announcements.forEach(a => {
        const itemComments = state.comments.filter(c => c.announcementId === a.id);
        const dateStr = new Date(a.publishedAt).toLocaleDateString();

        rowsHtml += `
          <tr>
            <td data-label="Novedad" style="font-weight: 700;">
              <div>${escapeHTML(a.title)}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 400; display: inline-flex; align-items: center; gap: 5px; margin-top: 3px;">
                ${renderIcon('calendar', { size: 12, color: 'var(--text-muted)' })}
                <span>${dateStr}</span>
              </div>
            </td>
            <td data-label="Estado">
              <span style="padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: ${a.status === 'published' ? 'rgba(22, 201, 70, 0.15)' : 'rgba(255, 255, 255, 0.08)'}; color: ${a.status === 'published' ? 'var(--accent-green)' : 'var(--text-muted)'}; display: inline-flex; align-items: center; gap: 5px;">
                ${a.status === 'published' ? renderIcon('check-circle', { size: 12, color: 'var(--accent-green)' }) : ''}
                ${a.status.toUpperCase()}
              </span>
            </td>
            <!-- Requisito 4: Botón para Fijar/Desfijar de primera en la fila -->
            <td data-label="Prioridad">
              <button type="button" class="btn-outline ${a.isPinned === true ? 'btn-pin-active' : ''}" style="padding: 4px 10px; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 5px;" onclick="window.hedamApp.togglePin('${a.id}')" title="${a.isPinned === true ? 'Desfijar de la primera posición' : 'Fijar de primera en la fila'}">
                <span>${a.isPinned === true ? '📌 Fijado' : '☆ Fijar'}</span>
              </button>
            </td>
            <td data-label="Vistas">
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                ${renderIcon('eye', { size: 15, color: 'var(--accent-red)' })}
                <span>${a.views || 0}</span>
              </span>
            </td>
            <td data-label="Clics CTA">
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                ${renderIcon('mouse-pointer-click', { size: 15, color: 'var(--accent-green)' })}
                <span>${a.clicks || 0}</span>
              </span>
            </td>
            <td data-label="Comunidad">
              <button class="btn-outline" style="padding: 4px 10px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px;" onclick="window.hedamApp.openModeration('${a.id}')">
                ${renderIcon('message-square', { size: 14 })}
                <span>${itemComments.length} mensajes</span>
              </button>
            </td>
            <td data-label="Acciones">
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="action-hover-trigger" style="background: none; border: none; cursor: pointer; color: var(--accent-red); font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 5px;" onclick="window.hedamApp.openModeration('${a.id}')">
                  <span>Moderar</span>
                  <span class="vector-icon-wrap vector-hover-slide">
                    ${renderIcon('arrow-right', { size: 13, color: 'var(--accent-red)' })}
                  </span>
                </button>
                <button class="btn-icon-danger" title="Eliminar novedad" onclick="window.hedamApp.deleteAnnouncement('${a.id}')">
                  ${renderIcon('trash-2', { size: 16 })}
                </button>
              </div>
            </td>
          </tr>`;
      });
      tableBody.innerHTML = rowsHtml;
    }

    // Renderizar drawer de moderación si está abierto
    if (state.selectedModerationId) {
      renderModerationDrawer();
    }
  }

  // Toggle Formulario Crear Novedad
  const toggleFormBtn = document.getElementById('toggle-new-announcement-form-btn');
  const createFormCard = document.getElementById('admin-create-form-card');
  const formCancelBtn = document.getElementById('form-cancel-btn');

  if (toggleFormBtn) {
    toggleFormBtn.addEventListener('click', () => {
      createFormCard.classList.toggle('view-hidden');
      if (!createFormCard.classList.contains('view-hidden')) {
        document.getElementById('form-published-at').value = getLocalDateTimeString();
      }
    });
  }

  if (formCancelBtn) {
    formCancelBtn.addEventListener('click', () => {
      createFormCard.classList.add('view-hidden');
    });
  }

  // Envío Formulario Crear Novedad
  const createAnnouncementForm = document.getElementById('admin-create-announcement-form');
  if (createAnnouncementForm) {
    createAnnouncementForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('form-title').value.trim();
      const content = document.getElementById('form-content').value.trim();
      const imageUrl = document.getElementById('form-image').value.trim();
      const ctaText = document.getElementById('form-cta-text').value.trim();
      const ctaUrl = document.getElementById('form-cta-url').value.trim();
      const publishedAt = document.getElementById('form-published-at').value;
      const expiresAt = document.getElementById('form-expires-at').value;
      const isPinnedCheckbox = document.getElementById('form-is-pinned');
      const isPinned = isPinnedCheckbox ? isPinnedCheckbox.checked : false;

      const pubDate = publishedAt ? new Date(publishedAt) : new Date();

      const newAnnouncement = {
        id: 'ann_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title,
        content,
        imageUrl: imageUrl || '',
        ctaText: ctaText || 'VER OFERTA AHORA',
        ctaUrl: ctaUrl || '',
        publishedAt: isNaN(pubDate.getTime()) ? new Date().toISOString() : pubDate.toISOString(),
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : '',
        isPinned: isPinned,
        views: 0,
        clicks: 0,
        status: 'published'
      };

      // Agregar al inicio del arreglo y seleccionar de inmediato para que aparezca en tiempo real en la vista de usuario
      state.announcements.unshift(newAnnouncement);
      state.selectedAnnouncementId = newAnnouncement.id;
      saveAnnouncements();
      syncAnnouncementToFirestore(newAnnouncement);

      createAnnouncementForm.reset();
      createFormCard.classList.add('view-hidden');
      renderAdminDashboard();
      renderClientView();

      // Disparar Notificación Push automática a toda la comunidad vía Firebase
      triggerNewAnnouncementNotification(title, content);
    });
  }

  // Reiniciar métricas a cero
  const resetMetricsBtn = document.getElementById('reset-metrics-btn');
  if (resetMetricsBtn) {
    resetMetricsBtn.addEventListener('click', () => {
      if (confirm('¿Deseas reiniciar todas las vistas web y clics a cero?')) {
        state.globalWebViews = 0;
        state.announcements.forEach(a => {
          a.views = 0;
          a.clicks = 0;
        });
        saveWebViews();
        saveAnnouncements();
        renderAdminDashboard();
        renderClientView();
      }
    });
  }

  // ================= MODERACIÓN DE CHAT EN ADMIN =================
  const moderationDrawer = document.getElementById('admin-chat-moderation-drawer');
  const moderationTitle = document.getElementById('moderation-announcement-title');
  const moderationCommentsList = document.getElementById('moderation-comments-list');
  const closeModerationBtn = document.getElementById('close-moderation-btn');
  const adminReplyForm = document.getElementById('admin-reply-form');
  const adminReplyInput = document.getElementById('admin-reply-input');

  function openModeration(announcementId) {
    state.selectedModerationId = announcementId;
    moderationDrawer.classList.remove('view-hidden');
    renderModerationDrawer();
  }

  function renderModerationDrawer() {
    const announcement = state.announcements.find(a => a.id === state.selectedModerationId);
    if (!announcement) {
      moderationDrawer.classList.add('view-hidden');
      return;
    }

    moderationTitle.textContent = announcement.title;
    const itemComments = state.comments.filter(c => c.announcementId === announcement.id);

    if (itemComments.length === 0) {
      moderationCommentsList.innerHTML = `
        <p style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 16px;">
          No hay comentarios aún para este anuncio.
        </p>`;
      return;
    }

    let html = '';
    itemComments.forEach(c => {
      const isOfficial = c.userId === 'admin_official' || (c.userName && c.userName.toLowerCase().includes('soporte'));
      const timeStr = new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      html += `
        <div style="padding: 12px 16px; border-radius: 12px; background: ${isOfficial ? 'rgba(255, 30, 39, 0.08)' : 'var(--input-bg)'}; border: ${isOfficial ? '1px solid rgba(255, 30, 39, 0.3)' : '1px solid var(--border-color)'}; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              ${isOfficial ? `
                <strong style="font-size: 0.88rem; color: var(--accent-red); display: inline-flex; align-items: center; gap: 6px;">
                  <!-- Requisito 3: mascot.png y Soporte HEDAM sin emojis -->
                  <img src="assets/mascot-pink.png" alt="Soporte HEDAM" class="admin-comment-mascot" />
                  <span>Soporte HEDAM</span>
                </strong>
              ` : `
                <strong style="font-size: 0.88rem; color: var(--text-main);">
                  \${escapeHTML(c.userName)}
                </strong>
              `}
              <span style="font-size: 0.75rem; color: var(--text-muted);">${timeStr}</span>
            </div>
            <p style="margin: 0; font-size: 0.92rem;">${escapeHTML(c.content)}</p>
          </div>
          <button class="btn-icon-danger" title="Eliminar comentario" onclick="window.hedamApp.deleteComment('${c.id}')">
            ${renderIcon('trash-2', { size: 15 })}
          </button>
        </div>`;
    });
    moderationCommentsList.innerHTML = html;
  }

  if (closeModerationBtn) {
    closeModerationBtn.addEventListener('click', () => {
      state.selectedModerationId = null;
      moderationDrawer.classList.add('view-hidden');
    });
  }

  if (adminReplyForm) {
    adminReplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.selectedModerationId) return;

      const reply = adminReplyInput.value.trim();
      if (!reply) return;

      // Requisito 3: Soporte HEDAM
      const newComment = {
        id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        announcementId: state.selectedModerationId,
        userId: 'admin_official',
        userName: 'Soporte HEDAM',
        content: reply,
        createdAt: new Date().toISOString()
      };

      state.comments.push(newComment);
      saveComments();
      syncCommentToFirestore(newComment);
      adminReplyInput.value = '';
      renderModerationDrawer();
      renderAdminDashboard();
      renderClientView();
    });
  }

  // ================= API GLOBAL PARA HANDLERS HTML =================
  window.hedamApp = {
    // Abrir en Modal Glassmorphism
    openModal: (id) => {
      const item = state.announcements.find(a => a.id === id);
      if (item) openAnnouncementModal(item);
    },
    // Seleccionar anuncio en el lateral izquierdo (Requisito 5)
    selectAnnouncement: (id) => {
      state.selectedAnnouncementId = id;
      trackAnnouncementView(id);
      renderClientView();
    },
    // Enfocar campo de comentarios en el lector
    focusViewerComment: () => {
      const input = document.getElementById('viewer-text-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    // Enviar comentario desde el lector principal
    sendViewerComment: (e, announcementId) => {
      e.preventDefault();
      const textInput = document.getElementById('viewer-text-input');
      const content = textInput ? textInput.value.trim() : '';
      if (!content) return;

      const currentAlias = getUserNickname();
      if (currentAlias) {
        submitComment(announcementId, currentAlias, content);
        if (textInput) textInput.value = '';
      } else {
        const authorInput = document.getElementById('viewer-author-input');
        const author = (authorInput && authorInput.value.trim()) || 'Miembro de la Comunidad';
        promptNicknameConfirmation(author, () => {
          localStorage.setItem(STORAGE_KEYS.USER_NICKNAME, author);
          localStorage.setItem(STORAGE_KEYS.USER_NICKNAME_DATE, Date.now().toString());
          submitComment(announcementId, author, content);
          if (textInput) textInput.value = '';
          showToast(`¡Nombre "${author}" configurado por 15 días!`, 'check');
          renderClientView();
        });
      }
    },
    // Abrir modal de perfil para cambiar o revisar nombre de usuario
    openProfileModal: () => {
      openUserProfileModal();
    },
    // Abrir modal tutorial de activación de notificaciones con la muñeca rosada
    openNotifModal: () => {
      openNotifTutorialModal();
    },
    // Actualizar nombre desde el modal de perfil
    updateProfileNickname: (e) => {
      e.preventDefault();
      const input = document.getElementById('profile-new-name-input');
      const newName = input ? input.value.trim() : '';
      if (!newName) return;

      if (!canChangeNickname()) {
        showToast('Aún no han transcurrido los 15 días reglamentarios.', 'alert-triangle');
        return;
      }

      // Cerrar la ventana de perfil de inmediato para mostrar en primer plano la confirmación
      closeUserProfileModal();

      promptNicknameConfirmation(newName, () => {
        localStorage.setItem(STORAGE_KEYS.USER_NICKNAME, newName);
        localStorage.setItem(STORAGE_KEYS.USER_NICKNAME_DATE, Date.now().toString());
        showToast(`¡Nombre fijado a "${newName}" por 15 días!`, 'check');
        renderUserProfileModal();
        renderClientView();
        if (state.activeModalAnnouncement) renderModalComments();
      }, () => {
        // Si decide corregir o cerrar, reabrir el perfil
        openUserProfileModal();
      });
    },
    // Requisito 4: Fijar/Desfijar anuncio de primera en la fila
    togglePin: (id) => {
      const item = state.announcements.find(a => a.id === id);
      if (item) {
        item.isPinned = item.isPinned === true ? false : true;
        saveAnnouncements();
        syncAnnouncementToFirestore(item);
        renderAdminDashboard();
        renderClientView();
      }
    },
    // Botones de ayuda para que el admin inserte íconos animados interactivos
    insertHelperTag: (tag) => {
      const textarea = document.getElementById('form-content');
      if (textarea) {
        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        const val = textarea.value;
        textarea.value = val.substring(0, start) + tag + val.substring(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + tag.length;
        updateLivePreview();
      }
    },
    trackClick: (id) => {
      trackAnnouncementClick(id);
    },
    openModeration: (id) => {
      openModeration(id);
    },
    deleteAnnouncement: (id) => {
      const item = state.announcements.find(a => a.id === id);
      if (item && confirm(`¿Eliminar la novedad "${item.title}"?`)) {
        state.announcements = state.announcements.filter(a => a.id !== id);
        state.comments = state.comments.filter(c => c.announcementId !== id);
        saveAnnouncements();
        saveComments();
        deleteAnnouncementFromFirestore(id);
        renderAdminDashboard();
        renderClientView();
      }
    },
    deleteComment: (commentId) => {
      if (confirm('¿Eliminar este comentario?')) {
        state.comments = state.comments.filter(c => c.id !== commentId);
        saveComments();
        deleteCommentFromFirestore(commentId);
        renderModerationDrawer();
        renderAdminDashboard();
        renderClientView();
      }
    }
  };

  // Helper para Vista Previa en Vivo en el Panel Admin
  function updateLivePreview() {
    const previewEl = document.getElementById('form-live-preview');
    const textarea = document.getElementById('form-content');
    if (!previewEl || !textarea) return;
    const content = textarea.value.trim();
    if (!content) {
      previewEl.innerHTML = '<span style="color: #94a3b8; font-size: 0.82rem; font-style: italic;">Escribe en el campo superior para probar los íconos animados en tiempo real...</span>';
    } else {
      previewEl.innerHTML = formatAnnouncementContent(content);
    }
  }

  const formContentEl = document.getElementById('form-content');
  if (formContentEl) {
    formContentEl.addEventListener('input', updateLivePreview);
  }

  // Helper Sanitización básica
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ================= SISTEMA PWA, SERVICE WORKER Y NOTIFICACIONES =================
  let deferredPrompt = null;
  const pwaInstallHeaderBtn = document.getElementById('pwa-install-header-btn');
  const pwaInstallAdminBtn = document.getElementById('pwa-install-admin-btn');
  const notificationHeaderBtn = document.getElementById('notification-header-btn');
  const pwaInstallModal = document.getElementById('pwa-install-modal');
  const pwaTriggerInstallBtn = document.getElementById('pwa-trigger-install-btn');
  const pwaModalCloseBtn = document.getElementById('pwa-modal-close-btn');

  // Helper para detectar si la app ya está ejecutándose en modo instalado (Standalone)
  function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }

  // Actualizar visibilidad de botones según el estado de la app y permisos
  function updatePwaButtonVisibility() {
    const installed = isAppInstalled();
    
    // Si ya está instalada, ocultamos los botones de instalación. Si la desinstalan o abren en navegador, reaparecen.
    if (pwaInstallHeaderBtn) {
      pwaInstallHeaderBtn.style.display = installed ? 'none' : 'inline-flex';
    }
    if (pwaInstallAdminBtn) {
      pwaInstallAdminBtn.style.display = installed ? 'none' : 'inline-flex';
    }

    // Botón de notificaciones: si ya otorgó permiso ('granted'), se oculta; si no, queda visible para activarlas
    if (notificationHeaderBtn) {
      if ('Notification' in window && Notification.permission === 'granted') {
        notificationHeaderBtn.style.display = 'none';
      } else {
        notificationHeaderBtn.style.display = 'inline-flex';
      }
    }
  }

  // ================= LISTENERS DE INSTALACIÓN PWA (DESCARGAR APP) =================
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[HEDAM PWA] Evento beforeinstallprompt capturado con éxito');
  });

  window.addEventListener('appinstalled', () => {
    console.log('[HEDAM PWA] Aplicación instalada exitosamente');
    deferredPrompt = null;
    updatePwaButtonVisibility();
    showToast('¡HEDAM Novedades instalada con éxito!', 'check');
    if (pwaInstallModal) pwaInstallModal.classList.add('view-hidden');
  });

  window.matchMedia('(display-mode: standalone)').addEventListener('change', () => {
    updatePwaButtonVisibility();
  });

  async function handlePwaInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        showToast('¡Instalando aplicación...!', 'check');
        updatePwaButtonVisibility();
      }
      deferredPrompt = null;
      if (pwaInstallModal) {
        pwaInstallModal.classList.add('view-hidden');
        unlockBodyScroll();
      }
    } else {
      if (pwaInstallModal) {
        pwaInstallModal.classList.remove('view-hidden');
        lockBodyScroll();
      }
    }
  }

  if (pwaInstallHeaderBtn) {
    pwaInstallHeaderBtn.addEventListener('click', handlePwaInstall);
  }
  if (pwaInstallAdminBtn) {
    pwaInstallAdminBtn.addEventListener('click', handlePwaInstall);
  }
  if (pwaTriggerInstallBtn) {
    pwaTriggerInstallBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          showToast('¡Instalando aplicación...!', 'check');
        }
        deferredPrompt = null;
        if (pwaInstallModal) {
          pwaInstallModal.classList.add('view-hidden');
          unlockBodyScroll();
        }
      } else {
        showToast('En tu navegador pulsa los 3 puntos (⋮) o el icono de compartir y selecciona "Instalar aplicación" o "Agregar a inicio".', 'arrow-right');
      }
    });
  }
  if (pwaModalCloseBtn) {
    pwaModalCloseBtn.addEventListener('click', () => {
      if (pwaInstallModal) {
        pwaInstallModal.classList.add('view-hidden');
        unlockBodyScroll();
      }
    });
  }
  if (pwaInstallModal) {
    pwaInstallModal.addEventListener('click', (e) => {
      if (e.target === pwaInstallModal) {
        pwaInstallModal.classList.add('view-hidden');
        unlockBodyScroll();
      }
    });
  }

  // Helper de Toast Flotante
  function showToast(message, iconName = 'sparkles') {
    const toast = document.getElementById('hedam-toast');
    const toastMsg = document.getElementById('hedam-toast-message');
    const toastIcon = document.getElementById('hedam-toast-icon');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    if (toastIcon) {
      toastIcon.innerHTML = renderIcon(iconName, { size: 16, color: 'var(--accent-red)' });
    }
    toast.classList.remove('view-hidden');

    setTimeout(() => {
      toast.classList.add('view-hidden');
    }, 4000);
  }

  // ================= CONFIGURACIÓN DE FIREBASE MESSAGING (FCM) =================
  let firebaseMessaging = null;
  try {
    if (firebase.messaging.isSupported()) {
      firebaseMessaging = firebase.messaging();
      
      // NUEVO: Escuchar notificaciones cuando la APP ESTÁ ABIERTA en la pantalla
      firebaseMessaging.onMessage((payload) => {
        console.log('[FCM] Notificación recibida con la app ABIERTA:', payload);
        navigator.serviceWorker.ready.then((swReg) => {
          swReg.showNotification(payload.notification.title, {
            body: payload.notification.body,
            icon: 'assets/icon-192.png',
            badge: 'assets/badge-96.png',
            data: { url: './index.html' }
          });
        });
      });
      
    }
  } catch (e) {
    console.warn('[Firebase FCM] No soportado en este entorno.');
  }

  // Guardar el Token en Firebase para que Render lo lea (VERSIÓN RAYOS X)
  async function suscribirUsuarioFCM() {
    if (!firebaseMessaging) {
      console.error('❌ [FCM] El servicio de mensajería no está inicializado.');
      return false;
    }
    try {
      console.log('⏳ [FCM] Verificando permisos de notificación en el navegador...');
      const currentPermission = Notification.permission;
      
      if (currentPermission === 'granted' || (await Notification.requestPermission()) === 'granted') {
        console.log('✅ [FCM] Permisos concedidos. Buscando Service Worker de la PWA...');
        const swReg = await navigator.serviceWorker.ready;
        
        console.log('⚙️ [FCM] Service Worker encontrado. Estado:', swReg.active ? 'Activo' : 'Inactivo');
        
        if (swReg.active) {
            console.log('📡 [FCM] Solicitando token a Google con VAPID KEY...');
            try {
                // Aquí es donde se suele quedar colgado. Si falla, el catch de abajo lo atrapará.
                const token = await firebaseMessaging.getToken({ 
                  vapidKey: FIREBASE_VAPID_KEY, 
                  serviceWorkerRegistration: swReg 
                });
                
                if (token) {
                  console.log('🔑 [FCM] ¡Token obtenido exitosamente! Guardando en Firestore...');
                  
                  await firestoreDb.collection('fcm_tokens').doc(token).set({
                    plataforma: navigator.platform || 'Desconocida',
                    fechaRegistro: new Date().toISOString(),
                    ultimoUso: new Date().toISOString()
                  }, { merge: true });
                  
                  console.log('🎉 [FCM] ¡Token guardado en Firebase Firestore con éxito!');
                  updatePwaButtonVisibility();
                  return true;
                } else {
                  console.warn('⚠️ [FCM] Google no devolvió ningún token.');
                }
            } catch (tokenError) {
                // Si hay problemas de CORS, VAPID Key o Incógnito, saldrá aquí:
                console.error('❌ [FCM] Error EXACTO al pedir el token a Google:', tokenError);
            }
        } else {
            console.warn('⚠️ [FCM] El Service Worker no está completamente activo aún.');
        }
      } else {
          console.warn('⚠️ [FCM] El usuario denegó los permisos de notificación.');
      }
      return false;
    } catch (err) {
      console.error('❌ [FCM] Error general en suscribirUsuarioFCM:', err);
      return false;
    }
  }

  // Ejecución automática al abrir la web
  if ('Notification' in window && Notification.permission === 'granted') {
    setTimeout(() => {
        console.log('🔄 [FCM] Intentando capturar token automáticamente...');
        suscribirUsuarioFCM();
    }, 2000);
  }

  // ================= MODAL TUTORIAL NOTIFICACIONES (MUÑECA ROSADA) =================
  const notifTutorialModal = document.getElementById('notif-tutorial-modal');
  const notifTutorialCloseBtn = document.getElementById('notif-tutorial-close-btn');
  const notifTutorialActivateBtn = document.getElementById('notif-tutorial-activate-btn');
  const notifTutorialSkipBtn = document.getElementById('notif-tutorial-skip-btn');
  const notifBlockedCloseBtn = document.getElementById('notif-blocked-close-btn');

  function showBlockedNotificationGuide() {
    const standardFlow = document.getElementById('notif-standard-flow');
    const blockedGuide = document.getElementById('notif-blocked-guide');
    if (standardFlow) standardFlow.classList.add('view-hidden');
    if (blockedGuide) blockedGuide.classList.remove('view-hidden');
  }

  function showStandardNotificationFlow() {
    const standardFlow = document.getElementById('notif-standard-flow');
    const blockedGuide = document.getElementById('notif-blocked-guide');
    if (standardFlow) standardFlow.classList.remove('view-hidden');
    if (blockedGuide) blockedGuide.classList.add('view-hidden');
  }

  function openNotifTutorialModal() {
    if (!notifTutorialModal) return;

    if ('Notification' in window && Notification.permission === 'denied') {
      showBlockedNotificationGuide();
    } else {
      showStandardNotificationFlow();
    }
    notifTutorialModal.classList.remove('view-hidden');
    lockBodyScroll();
  }

  function closeNotifTutorialModal() {
    if (notifTutorialModal) {
      notifTutorialModal.classList.add('view-hidden');
    }
    unlockBodyScroll();
    localStorage.setItem(STORAGE_KEYS.NOTIF_MODAL_SEEN, Date.now().toString());

    // ORDEN SECUENCIAL ESTRICTO:
    // Al cerrar, activar o saltar el pop-up de notificaciones, se abre de inmediato la última novedad
    if (state.pendingAnnouncementToShow) {
      const pendingItem = state.pendingAnnouncementToShow;
      state.pendingAnnouncementToShow = null;
      setTimeout(() => {
        openAnnouncementModal(pendingItem);
        localStorage.setItem(STORAGE_KEYS.POPUP_LAST_SEEN, Date.now().toString());
        localStorage.setItem(STORAGE_KEYS.POPUP_LAST_ANNOUNCEMENT_ID, pendingItem.id);
      }, 350);
    }
  }

  // Prevenir que en celular se arrastre o scrollee el fondo al tocar fuera del contenido deslizable
  [modalOverlay, notifTutorialModal].forEach((overlay) => {
    if (!overlay) return;
    overlay.addEventListener('touchmove', (e) => {
      if (!e.target.closest('.modal-body-scrollable, #modal-comments-list, .notif-steps-box')) {
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });
  });

  if (notifTutorialCloseBtn) {
    notifTutorialCloseBtn.addEventListener('click', closeNotifTutorialModal);
  }
  if (notifTutorialSkipBtn) {
    notifTutorialSkipBtn.addEventListener('click', closeNotifTutorialModal);
  }
  if (notifBlockedCloseBtn) {
    notifBlockedCloseBtn.addEventListener('click', closeNotifTutorialModal);
  }
  if (notifTutorialModal) {
    notifTutorialModal.addEventListener('click', (e) => {
      if (e.target === notifTutorialModal) closeNotifTutorialModal();
    });
  }

  // Funcionalidad del botón de la muñeca rosada
  if (notifTutorialActivateBtn) {
    notifTutorialActivateBtn.addEventListener('click', async () => {
      if ('Notification' in window && Notification.permission === 'denied') {
        showBlockedNotificationGuide();
        return;
      }
      // Llamamos a la función que guarda el token en la base de datos
      const exito = await suscribirUsuarioFCM();
      if (exito) {
        closeNotifTutorialModal();
      } else if ('Notification' in window && Notification.permission === 'denied') {
        showBlockedNotificationGuide();
      }
    });
  }

  // Botón campana del header abre el tutorial elegante
  if (notificationHeaderBtn) {
    notificationHeaderBtn.addEventListener('click', () => {
      openNotifTutorialModal();
    });
  }

  // ================= MODAL CONFIRMACIÓN DE NOMBRE DE USUARIO (15 DÍAS) =================
  const nicknameConfirmModal = document.getElementById('nickname-confirm-modal');
  const nicknameConfirmPreview = document.getElementById('nickname-confirm-preview');
  const nicknameConfirmSaveBtn = document.getElementById('nickname-confirm-save-btn');
  const nicknameConfirmCancelBtn = document.getElementById('nickname-confirm-cancel-btn');
  let pendingCommentCallback = null;
  let pendingCancelCallback = null;

  function promptNicknameConfirmation(authorName, onConfirm, onCancel = null) {
    if (!nicknameConfirmModal || !nicknameConfirmPreview) return;
    nicknameConfirmPreview.textContent = authorName;
    pendingCommentCallback = onConfirm;
    pendingCancelCallback = onCancel;
    nicknameConfirmModal.classList.remove('view-hidden');
    lockBodyScroll();
  }

  function closeNicknameConfirmModal(didConfirm = false) {
    if (nicknameConfirmModal) nicknameConfirmModal.classList.add('view-hidden');
    const cancelCb = pendingCancelCallback;
    pendingCommentCallback = null;
    pendingCancelCallback = null;
    unlockBodyScroll();
    if (!didConfirm && cancelCb) {
      cancelCb();
    }
  }

  if (nicknameConfirmCancelBtn) {
    nicknameConfirmCancelBtn.addEventListener('click', () => closeNicknameConfirmModal(false));
  }
  if (nicknameConfirmModal) {
    nicknameConfirmModal.addEventListener('click', (e) => {
      if (e.target === nicknameConfirmModal) closeNicknameConfirmModal(false);
    });
  }
  if (nicknameConfirmSaveBtn) {
    nicknameConfirmSaveBtn.addEventListener('click', () => {
      const cb = pendingCommentCallback;
      closeNicknameConfirmModal(true);
      if (cb) cb();
    });
  }

  // ================= MODAL PERFIL DE USUARIO =================
  const userProfileHeaderBtn = document.getElementById('user-profile-header-btn');
  const userProfileModal = document.getElementById('user-profile-modal');
  const userProfileCloseBtn = document.getElementById('user-profile-close-btn');
  const profileContentArea = document.getElementById('profile-content-area');

  function openUserProfileModal() {
    renderUserProfileModal();
    if (userProfileModal) userProfileModal.classList.remove('view-hidden');
    lockBodyScroll();
  }

  function closeUserProfileModal() {
    if (userProfileModal) userProfileModal.classList.add('view-hidden');
    unlockBodyScroll();
  }

  if (userProfileHeaderBtn) {
    userProfileHeaderBtn.addEventListener('click', openUserProfileModal);
  }
  if (userProfileCloseBtn) {
    userProfileCloseBtn.addEventListener('click', closeUserProfileModal);
  }
  if (userProfileModal) {
    userProfileModal.addEventListener('click', (e) => {
      if (e.target === userProfileModal) closeUserProfileModal();
    });
  }

  function renderUserProfileModal() {
    if (!profileContentArea) return;
    const currentName = getUserNickname();
    const canChange = canChangeNickname();
    const daysLeft = getRemainingDaysForNickname();
    const nextDateStr = getNextChangeDateString();

    let html = '';
    if (currentName) {
      html += `
        <div style="background: var(--input-bg); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 18px 20px; margin-bottom: 18px;">
          <div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
            Tu Alias Actual en la Plataforma
          </div>
          <div style="font-size: 1.35rem; font-weight: 900; color: var(--accent-red); word-break: break-all;">
            ${escapeHTML(currentName)}
          </div>
        </div>
      `;

      if (!canChange) {
        html += `
          <div style="background: rgba(245, 158, 11, 0.1); border: 1.5px solid rgba(245, 158, 11, 0.3); border-radius: 16px; padding: 16px 18px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.92rem; color: #d97706; margin-bottom: 6px;">
              <span>🔒 Bloqueo Activo (Regla de 15 Días)</span>
            </div>
            <p style="margin: 0; font-size: 0.84rem; color: var(--text-muted); line-height: 1.45;">
              Configuraste tu nombre recientemente. Podrás cambiarlo nuevamente en <strong>${daysLeft} días</strong> (aproximadamente el <strong>${nextDateStr}</strong>).
            </p>
          </div>
        `;
      } else {
        html += `
          <div style="background: rgba(22, 201, 70, 0.1); border: 1.5px solid rgba(22, 201, 70, 0.3); border-radius: 16px; padding: 14px 16px; margin-bottom: 18px; color: var(--accent-green); font-size: 0.86rem; font-weight: 700;">
            ✅ Han transcurrido los 15 días. ¡Ya puedes cambiar tu nombre!
          </div>

          <form onsubmit="window.hedamApp.updateProfileNickname(event)" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
            <div>
              <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 6px;">Nuevo Nombre o Alias</label>
              <input id="profile-new-name-input" type="text" required placeholder="Escribe tu nuevo nombre..." class="input-field" style="margin-bottom: 4px;" />
              <span style="font-size: 0.74rem; color: var(--text-muted);">Al confirmar, se bloqueará por otros 15 días.</span>
            </div>
            <button type="submit" class="btn-primary" style="padding: 12px; font-size: 0.9rem; justify-content: center;">
              Actualizar Mi Nombre
            </button>
          </form>
        `;
      }
    } else {
      html += `
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
          Aún no has configurado un nombre público en este dispositivo. Configúralo aquí para que aparezca en todos tus comentarios:
        </p>

        <form onsubmit="window.hedamApp.updateProfileNickname(event)" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; margin-bottom: 6px;">Tu Alias Público</label>
            <input id="profile-new-name-input" type="text" required placeholder="ej. CarlosGamer, María, HedamFan..." class="input-field" style="margin-bottom: 4px;" />
            <span style="font-size: 0.74rem; color: var(--text-muted);">⚠️ Podrás cambiarlo únicamente cada 15 días.</span>
          </div>
          <button type="submit" class="btn-primary" style="padding: 12px; font-size: 0.9rem; justify-content: center;">
            Guardar y Fijar Nombre
          </button>
        </form>
      `;
    }

    // Consejo informativo sobre sincronización PC vs Móvil
    html += `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 12px 14px; font-size: 0.78rem; color: var(--text-muted); line-height: 1.45;">
        💡 <strong>Uso en Celular y PC:</strong> Si accedes desde varios dispositivos, puedes usar el mismo alias en ambos para mantener tu identidad uniforme en la comunidad.
      </div>
    `;

    profileContentArea.innerHTML = html;
  }

  // Disparo automático (Llama al servidor de Render)
  async function triggerNewAnnouncementNotification(title, content = '') {
    showToast('¡Novedad publicada! Despertando al servidor...', 'sparkles');
    
    try {
      // Esta es tu URL exacta de Render
      const urlRender = "https://hedam-backend.onrender.com/enviar-notificacion";
      
      const response = await fetch(urlRender, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: title,
          cuerpo: content ? content.substring(0, 140) : 'Revisa la nueva información oficial.'
        })
      });

      const data = await response.json();
      console.log('[Render Backend] Respuesta:', data);
      
      if (data.success) {
         showToast(`¡Notificación enviada a ${data.enviados || 0} dispositivos!`, 'check-circle-2');
      } else {
         showToast('Error en el servidor de envíos.', 'alert-triangle');
      }
    } catch (err) {
      console.warn('[Render Backend] Error de conexión:', err);
      // Si Render estaba dormido profundamente, puede que la primera petición tarde o falle,
      // pero el servidor ya estará despertando para la siguiente.
      showToast('El servidor está despertando, puede tardar hasta 1 minuto...', 'alert-triangle');
    }
  }

  // Sincronización en la nube directa vía REST API (Garantiza carga instantánea en cualquier navegador)
  async function fetchCloudDataREST() {
    try {
      const res = await fetch('https://firestore.googleapis.com/v1/projects/nouveltyhedam/databases/(default)/documents/announcements');
      if (res.ok) {
        const data = await res.json();
        if (data && data.documents && Array.isArray(data.documents)) {
          const cloudList = [];
          data.documents.forEach(doc => {
            const docId = doc.name.split('/').pop();
            if (docId === 'ann_oficial_bienvenida') return;
            const fields = doc.fields || {};
            cloudList.push({
              id: fields.id?.stringValue || docId,
              title: fields.title?.stringValue || '',
              content: fields.content?.stringValue || '',
              imageUrl: fields.imageUrl?.stringValue || '',
              ctaText: fields.ctaText?.stringValue || 'VER AHORA',
              ctaUrl: fields.ctaUrl?.stringValue || '',
              publishedAt: fields.publishedAt?.stringValue || '',
              expiresAt: fields.expiresAt?.stringValue || '',
              isPinned: fields.isPinned?.booleanValue === true,
              views: parseInt(fields.views?.integerValue || '0', 10),
              clicks: parseInt(fields.clicks?.integerValue || '0', 10),
              status: fields.status?.stringValue || 'published'
            });
          });

          if (cloudList.length > 0) {
            cloudList.sort((a, b) => {
              const aPinned = a.isPinned === true ? 1 : 0;
              const bPinned = b.isPinned === true ? 1 : 0;
              if (aPinned !== bPinned) return bPinned - aPinned;
              return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
            });
            state.announcements = cloudList;
            saveAnnouncements();
            renderClientView();
            checkAndTriggerAutoPopup();
          }
        }
      }
    } catch (e) {
      console.warn('[Cloud REST API] Novedades:', e);
    }

    try {
      const commRes = await fetch('https://firestore.googleapis.com/v1/projects/nouveltyhedam/databases/(default)/documents/comments');
      if (commRes.ok) {
        const commData = await commRes.json();
        if (commData && commData.documents && Array.isArray(commData.documents)) {
          const cloudComments = [];
          commData.documents.forEach(doc => {
            const fields = doc.fields || {};
            cloudComments.push({
              id: fields.id?.stringValue || doc.name.split('/').pop(),
              announcementId: fields.announcementId?.stringValue || '',
              userId: fields.userId?.stringValue || '',
              userName: fields.userName?.stringValue || '',
              content: fields.content?.stringValue || '',
              createdAt: fields.createdAt?.stringValue || new Date().toISOString()
            });
          });
          cloudComments.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
          state.comments = cloudComments;
          saveComments();
          renderClientView();
          if (state.activeModalAnnouncement) renderModalComments();
        }
      }
    } catch (e) {
      console.warn('[Cloud REST API] Comentarios:', e);
    }
  }

  // ================= INICIALIZACIÓN DE ESCUCHA EN TIEMPO REAL FIRESTORE =================
  let primeraCargaCompletada = false;

  function initFirestoreListeners() {
    fetchCloudDataREST();
    if (!firestoreDb) return;
    deleteAnnouncementFromFirestore('ann_oficial_bienvenida');

    try {
      firestoreDb.collection('announcements').onSnapshot(async (snapshot) => {
        if (!snapshot.empty) {
          const cloudList = [];

          snapshot.forEach(doc => {
            if (doc.id !== 'ann_oficial_bienvenida') {
              cloudList.push({ id: doc.id, ...doc.data() });
            }
          });
          
          cloudList.sort((a, b) => {
            const aPinned = a.isPinned === true ? 1 : 0;
            const bPinned = b.isPinned === true ? 1 : 0;
            if (aPinned !== bPinned) return bPinned - aPinned;
            return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
          });
          
          state.announcements = cloudList;
          saveAnnouncements();
          
          if (!state.selectedAnnouncementId && state.announcements.length > 0) {
            state.selectedAnnouncementId = state.announcements[0].id;
          }
          
          renderClientView();
          if (state.isAuthenticated) renderAdminDashboard();
          checkAndTriggerAutoPopup();

          primeraCargaCompletada = true;

        } else if (state.isAuthenticated && state.announcements.length > 0) {
          state.announcements.forEach(a => syncAnnouncementToFirestore(a));
        }
      }, (err) => {
        console.warn('[Firestore] Escucha de anuncios en espera:', err.message);
      });
    } catch (e) {
      console.warn('[Firestore] Error al inicializar listener de anuncios:', e);
    }

    try {
      firestoreDb.collection('comments').onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const cloudComments = [];
          snapshot.forEach(doc => {
            cloudComments.push({ id: doc.id, ...doc.data() });
          });
          cloudComments.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
          state.comments = cloudComments;
          saveComments();
          renderClientView();
          if (state.activeModalAnnouncement) renderModalComments();
          if (state.selectedModerationId) renderModerationDrawer();
          if (state.isAuthenticated) renderAdminDashboard();
        }
      });
    } catch (e) {}
  }

  // Exponer helper al objeto de la ventana
  window.hedamTriggerNotification = triggerNewAnnouncementNotification;

  // Actualizar estado inicial de visibilidad de botones
  updatePwaButtonVisibility();

  // ================= ARRANQUE INICIAL =================
  
  // 1. REGISTRAR EL SERVICE WORKER (VITAL PARA PWA Y NOTIFICACIONES)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registrado con éxito. Scope:', registration.scope);
        })
        .catch((error) => {
          console.error('[PWA] Error al registrar el Service Worker:', error);
        });
    });
  } else {
    console.warn('[PWA] Los Service Workers no están soportados en este navegador.');
  }

  // 2. Iniciar la interfaz y los datos
  updateView();
  initFirestoreListeners();
});
