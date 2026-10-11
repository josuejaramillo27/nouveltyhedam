/**
 * HEDAMPRO - Novedades y Anuncios
 * Archivo de lógica pura estándar JavaScript (Vanilla JS)
 */

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

  // ================= CLAVES DE ALMACENAMIENTO =================
  const STORAGE_KEYS = {
    ANNOUNCEMENTS: 'hedam_announcements',
    COMMENTS: 'hedam_comments',
    WEB_VIEWS: 'hedam_web_views',
    THEME: 'hedam_theme',
    ADMIN_AUTH: 'hedam_admin_auth',
    VISITED_SESSION: 'hedam_visited_session'
  };

  // ================= ESTADO DE LA APLICACIÓN =================
  let state = {
    announcements: loadJSON(STORAGE_KEYS.ANNOUNCEMENTS, []),
    comments: loadJSON(STORAGE_KEYS.COMMENTS, []),
    globalWebViews: parseInt(localStorage.getItem(STORAGE_KEYS.WEB_VIEWS) || '0', 10),
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',
    isAuthenticated: sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true',
    activeModalAnnouncement: null,
    selectedModerationId: null,
    showCommentsDrawer: false,
    logoClickCount: 0,
    logoClickTimer: null
  };

  // Helpers de LocalStorage
  function loadJSON(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function saveAnnouncements() {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(state.announcements));
  }

  function saveComments() {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(state.comments));
  }

  function saveWebViews() {
    localStorage.setItem(STORAGE_KEYS.WEB_VIEWS, state.globalWebViews.toString());
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

  function trackAnnouncementView(id) {
    const key = `hedam_seen_novelty_${id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      const item = state.announcements.find(a => a.id === id);
      if (item) {
        item.views = (item.views || 0) + 1;
        saveAnnouncements();
      }
    }
  }

  function trackAnnouncementClick(id) {
    const item = state.announcements.find(a => a.id === id);
    if (item) {
      item.clicks = (item.clicks || 0) + 1;
      saveAnnouncements();
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
    return state.announcements.filter(a => {
      const isPublished = a.status === 'published';
      const notExpired = !a.expiresAt || new Date(a.expiresAt) > now;
      return isPublished && notExpired;
    });
  }

  function renderClientView() {
    const feedContainer = document.getElementById('news-feed-container');
    const openPopupBtnContainer = document.getElementById('open-popup-btn-container');
    const activeList = getActiveAnnouncements();

    if (activeList.length === 0) {
      openPopupBtnContainer.classList.add('view-hidden');
      feedContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
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

    openPopupBtnContainer.classList.remove('view-hidden');
    const openFeaturedBtn = document.getElementById('open-featured-btn');
    if (openFeaturedBtn) {
      openFeaturedBtn.onclick = () => openAnnouncementModal(activeList[0]);
    }

    // Renderizar tarjetas del muro
    let html = `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">`;
    activeList.forEach((announcement, index) => {
      const commentsCount = state.comments.filter(c => c.announcementId === announcement.id).length;
      const formattedDate = new Date(announcement.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

      html += `
        <div class="card action-hover-trigger" style="cursor: pointer; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;" onclick="window.hedamApp.openModal('${announcement.id}')">
          ${index === 0 ? `
            <div style="position: absolute; top: 14px; right: 14px; background: var(--accent-red); color: white; font-size: 0.68rem; font-weight: 800; padding: 3px 9px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 4px;">
              <span class="vector-icon-wrap anim-sparkle">
                ${renderIcon('sparkles', { size: 11, color: '#fff' })}
              </span>
              <span>Destacado</span>
            </div>` : ''}

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
              ${renderIcon('calendar', { size: 13, color: 'var(--text-muted)' })}
              <span>${formattedDate}</span>
            </div>
            <h3 style="font-size: 1.22rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; line-height: 1.3;">
              ${escapeHTML(announcement.title)}
            </h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; white-space: pre-line; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 18px; line-height: 1.5;">
              ${escapeHTML(announcement.content)}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px; font-size: 0.84rem; color: var(--text-muted);">
            <span style="display: inline-flex; align-items: center; gap: 6px;">
              ${renderIcon('message-square', { size: 14, className: 'vector-hover-bounce' })}
              <span>${commentsCount} comentarios</span>
            </span>
            <span style="color: var(--accent-red); font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
              <span>Ver detalle</span>
              <span class="vector-icon-wrap vector-hover-slide">
                ${renderIcon('arrow-right', { size: 14, color: 'var(--accent-red)' })}
              </span>
            </span>
          </div>
        </div>`;
    });
    html += `</div>`;
    feedContainer.innerHTML = html;

    // Pop-up automático al entrar si no se ha visto en esta sesión
    const latest = activeList[0];
    if (latest) {
      const seenKey = `seen_${latest.id}`;
      if (!sessionStorage.getItem(seenKey)) {
        sessionStorage.setItem(seenKey, 'true');
        openAnnouncementModal(latest);
      }
    }
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
  }

  function closeAnnouncementModal() {
    modalOverlay.classList.add('view-hidden');
    state.activeModalAnnouncement = null;
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
      output += `<p style="font-size: 0.98rem; color: #2d3342; line-height: 1.5; margin-bottom: 8px; font-weight: 500;">${escapeHTML(trimmed)}</p>`;
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
      } else {
        modalCommentsDrawer.classList.add('view-hidden');
        updateModalCommentsToggleBtn(false);
      }
    });
  }

  function renderModalComments() {
    if (!state.activeModalAnnouncement) return;
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
      const timeStr = new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      html += `
        <div style="background: #f8fafc; padding: 11px 14px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 800; font-size: 0.84rem; color: var(--accent-red);">${escapeHTML(c.userName)}</span>
            <span style="font-size: 0.74rem; color: #8892a4;">${timeStr}</span>
          </div>
          <p style="margin: 0; font-size: 0.9rem; color: #1e293b;">${escapeHTML(c.content)}</p>
        </div>`;
    });
    modalCommentsList.innerHTML = html;
  }

  // Enviar comentario desde el cliente
  if (modalCommentForm) {
    modalCommentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.activeModalAnnouncement) return;

      const authorInput = document.getElementById('comment-author-input');
      const textInput = document.getElementById('comment-text-input');
      const content = textInput.value.trim();
      const author = authorInput.value.trim() || 'Miembro de la Comunidad';

      if (!content) return;

      const newComment = {
        id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        announcementId: state.activeModalAnnouncement.id,
        userId: 'client_' + Math.random().toString(36).substring(2, 6),
        userName: author,
        content: content,
        createdAt: new Date().toISOString()
      };

      state.comments.push(newComment);
      saveComments();
      textInput.value = '';
      renderModalComments();
      renderClientView();
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
          <td colspan="6" style="padding: 42px 20px; text-align: center; color: var(--text-muted);">
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
            <td style="font-weight: 700;">
              <div>${escapeHTML(a.title)}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 400; display: inline-flex; align-items: center; gap: 5px; margin-top: 3px;">
                ${renderIcon('calendar', { size: 12, color: 'var(--text-muted)' })}
                <span>${dateStr}</span>
              </div>
            </td>
            <td>
              <span style="padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: ${a.status === 'published' ? 'rgba(22, 201, 70, 0.15)' : 'rgba(255, 255, 255, 0.08)'}; color: ${a.status === 'published' ? 'var(--accent-green)' : 'var(--text-muted)'}; display: inline-flex; align-items: center; gap: 5px;">
                ${a.status === 'published' ? renderIcon('check-circle', { size: 12, color: 'var(--accent-green)' }) : ''}
                ${a.status.toUpperCase()}
              </span>
            </td>
            <td>
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                ${renderIcon('eye', { size: 15, color: 'var(--accent-red)' })}
                <span>${a.views || 0}</span>
              </span>
            </td>
            <td>
              <span style="display: inline-flex; align-items: center; gap: 6px;">
                ${renderIcon('mouse-pointer-click', { size: 15, color: 'var(--accent-green)' })}
                <span>${a.clicks || 0}</span>
              </span>
            </td>
            <td>
              <button class="btn-outline" style="padding: 4px 10px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px;" onclick="window.hedamApp.openModeration('${a.id}')">
                ${renderIcon('message-square', { size: 14 })}
                <span>${itemComments.length} mensajes</span>
              </button>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="action-hover-trigger" style="background: none; border: none; cursor: pointer; color: var(--accent-red); font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 5px;" onclick="window.hedamApp.openModeration('${a.id}')">
                  <span>Moderar Chat</span>
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
        // Establecer fecha actual por defecto
        document.getElementById('form-published-at').value = new Date().toISOString().slice(0, 16);
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

      const newAnnouncement = {
        id: 'ann_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title,
        content,
        imageUrl: imageUrl || '',
        ctaText: ctaText || 'VER OFERTA AHORA',
        ctaUrl: ctaUrl || '',
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : '',
        views: 0,
        clicks: 0,
        status: 'published'
      };

      state.announcements.unshift(newAnnouncement);
      saveAnnouncements();

      createAnnouncementForm.reset();
      createFormCard.classList.add('view-hidden');
      renderAdminDashboard();
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
      const isOfficial = c.userId === 'admin_official';
      const timeStr = new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      html += `
        <div style="padding: 12px 16px; border-radius: 12px; background: ${isOfficial ? 'rgba(255, 30, 39, 0.08)' : 'var(--input-bg)'}; border: ${isOfficial ? '1px solid rgba(255, 30, 39, 0.3)' : '1px solid var(--border-color)'}; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              ${isOfficial ? `
                <strong style="font-size: 0.88rem; color: var(--accent-red); display: inline-flex; align-items: center; gap: 6px;">
                  <span class="vector-icon-wrap">${renderIcon('shield-check', { size: 14, color: 'var(--accent-red)' })}</span>
                  <span>${escapeHTML(c.userName.replace(/^🛡️\s*/, ''))}</span>
                </strong>
              ` : `
                <strong style="font-size: 0.88rem; color: var(--text-main);">
                  ${escapeHTML(c.userName)}
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

      const newComment = {
        id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        announcementId: state.selectedModerationId,
        userId: 'admin_official',
        userName: 'Soporte HedamPro (Admin)',
        content: reply,
        createdAt: new Date().toISOString()
      };

      state.comments.push(newComment);
      saveComments();
      adminReplyInput.value = '';
      renderModerationDrawer();
      renderAdminDashboard();
    });
  }

  // ================= API GLOBAL PARA HANDLERS HTML =================
  window.hedamApp = {
    openModal: (id) => {
      const item = state.announcements.find(a => a.id === id);
      if (item) openAnnouncementModal(item);
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
        renderAdminDashboard();
        renderClientView();
      }
    },
    deleteComment: (commentId) => {
      if (confirm('¿Eliminar este comentario?')) {
        state.comments = state.comments.filter(c => c.id !== commentId);
        saveComments();
        renderModerationDrawer();
        renderAdminDashboard();
      }
    }
  };

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

  // ================= ARRANQUE INICIAL =================
  updateView();
});
