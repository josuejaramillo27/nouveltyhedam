/**
 * HEDAMPRO - Novedades y Anuncios
 * Archivo de lógica pura estándar JavaScript (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
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
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(255, 30, 39, 0.1); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: var(--accent-red);">
            📢
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
        <div class="card" style="cursor: pointer; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;" onclick="window.hedamApp.openModal('${announcement.id}')">
          ${index === 0 ? `
            <div style="position: absolute; top: 14px; right: 14px; background: var(--accent-red); color: white; font-size: 0.68rem; font-weight: 800; padding: 3px 9px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
              Destacado
            </div>` : ''}

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px; font-weight: 600;">
              ${formattedDate}
            </div>
            <h3 style="font-size: 1.22rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; line-height: 1.3;">
              ${escapeHTML(announcement.title)}
            </h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; white-space: pre-line; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 18px; line-height: 1.5;">
              ${escapeHTML(announcement.content)}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 14px; font-size: 0.84rem; color: var(--text-muted);">
            <span style="display: flex; align-items: center; gap: 5px;">
              💬 ${commentsCount} comentarios
            </span>
            <span style="color: var(--accent-red); font-weight: 700; display: flex; align-items: center; gap: 4px;">
              Ver detalle →
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
    modalCommentsToggleBtn.textContent = '💬 COMENTAR NOVEDAD';

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
            <span class="checklist-icon">✔</span>
            <span class="checklist-text">${text}</span>
          </div>`;
        return;
      }

      // Advertencias
      if (trimmed.startsWith('⚠️') || trimmed.toLowerCase().startsWith('así evitamos')) {
        const text = trimmed.replace(/^⚠️\s*/, '');
        output += `
          <div class="alert-warning">
            <span style="font-size: 1.1rem;">⚠️</span>
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
        modalCommentsToggleBtn.textContent = '💬 OCULTAR CHAT';
      } else {
        modalCommentsDrawer.classList.add('view-hidden');
        modalCommentsToggleBtn.textContent = '💬 COMENTAR NOVEDAD';
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
          <td colspan="6" style="padding: 36px; text-align: center; color: var(--text-muted);">
            No hay novedades publicadas aún. Haz clic en <strong>"➕ Nueva Novedad"</strong> para publicar la primera.
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
              <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: 400;">${dateStr}</div>
            </td>
            <td>
              <span style="padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: ${a.status === 'published' ? 'rgba(22, 201, 70, 0.15)' : 'rgba(255, 255, 255, 0.08)'}; color: ${a.status === 'published' ? 'var(--accent-green)' : 'var(--text-muted)'};">
                ${a.status.toUpperCase()}
              </span>
            </td>
            <td>
              👁️ ${a.views || 0}
            </td>
            <td>
              🖱️ ${a.clicks || 0}
            </td>
            <td>
              <button class="btn-outline" style="padding: 4px 10px; font-size: 0.8rem;" onclick="window.hedamApp.openModeration('${a.id}')">
                💬 ${itemComments.length} mensajes
              </button>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <button style="background: none; color: var(--accent-red); font-weight: 700; font-size: 0.85rem;" onclick="window.hedamApp.openModeration('${a.id}')">
                  Moderar Chat →
                </button>
                <button title="Eliminar novedad" style="background: none; color: var(--text-muted); font-size: 1rem;" onclick="window.hedamApp.deleteAnnouncement('${a.id}')" onmouseenter="this.style.color='#ff4d4d'" onmouseleave="this.style.color='var(--text-muted)'">
                  🗑️
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
              <strong style="font-size: 0.88rem; color: ${isOfficial ? 'var(--accent-red)' : 'var(--text-main)'};">
                ${escapeHTML(c.userName)}
              </strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${timeStr}</span>
            </div>
            <p style="margin: 0; font-size: 0.92rem;">${escapeHTML(c.content)}</p>
          </div>
          <button title="Eliminar comentario" style="background: none; color: var(--text-muted); font-size: 0.9rem;" onclick="window.hedamApp.deleteComment('${c.id}')" onmouseenter="this.style.color='#ff4d4d'" onmouseleave="this.style.color='var(--text-muted)'">
            🗑️
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
        userName: '🛡️ Soporte HedamPro (Admin)',
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
