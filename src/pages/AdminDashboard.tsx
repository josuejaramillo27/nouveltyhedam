import { useState } from 'react';
import { useNovedades } from '../context/NovedadesContext';
import { 
  PlusCircle, Eye, MousePointerClick, MessageSquare, 
  Image as ImageIcon, Lock, User, LogOut, CheckCircle, ShieldAlert,
  Send, Sparkles, TrendingUp, Globe, Trash2, RotateCcw
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    announcements, 
    addAnnouncement, 
    deleteAnnouncement,
    comments, 
    addComment, 
    deleteComment,
    globalWebViews,
    resetAllStats
  } = useNovedades();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('hedam_admin_auth') === 'true';
  });
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    ctaText: '',
    ctaUrl: '',
    publishedAt: new Date().toISOString().slice(0, 16),
    expiresAt: '',
    status: 'published' as const
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser.trim().toLowerCase() === 'admin' && loginPass === 'hedam2026') {
      sessionStorage.setItem('hedam_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Verifique usuario y contraseña.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hedam_admin_auth');
    setIsAuthenticated(false);
    setLoginUser('');
    setLoginPass('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      ...formData,
      publishedAt: new Date(formData.publishedAt).toISOString(),
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
    });
    setShowForm(false);
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      ctaText: '',
      ctaUrl: '',
      publishedAt: new Date().toISOString().slice(0, 16),
      expiresAt: '',
      status: 'published'
    });
  };

  const handleAdminReply = (announcementId: string) => {
    if (!adminReplyText.trim()) return;
    addComment({
      announcementId,
      userId: 'admin_official',
      userName: '🛡️ Soporte HedamPro (Admin)',
      content: adminReplyText.trim()
    });
    setAdminReplyText('');
  };

  const handleDeleteAnnouncement = (id: string, title: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la novedad "${title}"?`)) {
      deleteAnnouncement(id);
      if (selectedAnnouncementId === id) {
        setSelectedAnnouncementId(null);
      }
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('¿Eliminar este comentario de la comunidad?')) {
      deleteComment(commentId);
    }
  };

  const handleResetStats = () => {
    if (window.confirm('¿Reiniciar a cero todas las vistas web y clics acumulados?')) {
      resetAllStats();
    }
  };

  // Metrics calculation
  const totalAnnouncementViews = announcements.reduce((acc, curr) => acc + curr.views, 0);
  const totalClicks = announcements.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalCommentsCount = comments.length;
  const ctr = totalAnnouncementViews > 0 ? ((totalClicks / totalAnnouncementViews) * 100).toFixed(1) : '0';

  // If not logged in, render the secure Login View
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '20px'
      }}>
        <div className="card" style={{
          maxWidth: '420px',
          width: '100%',
          padding: '36px',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Red subtle ambient light */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(255, 30, 39, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'rgba(255, 30, 39, 0.1)',
              border: '1px solid rgba(255, 30, 39, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--accent-red)'
            }}>
              <Lock size={30} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '6px' }}>Acceso Administrativo</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Área restringida para moderadores de HedamPro
            </p>
          </div>

          {loginError && (
            <div style={{
              background: 'rgba(255, 30, 39, 0.1)',
              border: '1px solid rgba(255, 30, 39, 0.3)',
              color: '#ff4d4d',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <ShieldAlert size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-muted)' }}>
                Usuario
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  required
                  placeholder="ej. admin"
                  className="input-field"
                  style={{ paddingLeft: '40px', marginBottom: 0 }}
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                />
                <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-muted)' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '40px', marginBottom: 0 }}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                />
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.95rem' }}>
              Ingresar al Panel
            </button>
          </form>

          {/* Discreet Hint */}
          <div style={{
            marginTop: '22px',
            padding: '10px 14px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '10px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            border: '1px dashed var(--border-color)'
          }}>
            🔐 <strong>Credenciales Oficiales:</strong> Usuario: <code style={{ color: 'var(--accent-red)' }}>admin</code> | Clave: <code style={{ color: 'var(--accent-red)' }}>hedam2026</code>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div>
      {/* Top Admin Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Panel de Control</h2>
            <span style={{
              background: 'rgba(255, 30, 39, 0.15)',
              color: 'var(--accent-red)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 30, 39, 0.3)'
            }}>
              MODO ADMIN
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Gestiona novedades vigentes, programa lanzamientos y modera comentarios en vivo.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowForm(!showForm)}
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            <PlusCircle size={18} /> Nueva Novedad
          </button>

          <button 
            className="btn-outline" 
            onClick={handleResetStats}
            title="Reiniciar contadores de vistas y clics a cero"
            style={{ padding: '10px 14px', fontSize: '0.82rem' }}
          >
            <RotateCcw size={15} /> Poner Métricas a Cero
          </button>

          <button 
            className="btn-outline" 
            onClick={handleLogout}
            title="Cerrar Sesión Segura"
            style={{ padding: '10px 16px', color: '#ff4d4d', borderColor: 'rgba(255, 77, 77, 0.3)' }}
          >
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      {/* Metrics Counters Row (Web General vs Novedades) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '18px',
        marginBottom: '28px'
      }}>
        {/* Vistas Web Generales */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <Globe size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{globalWebViews.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vistas Web Generales</div>
          </div>
        </div>

        {/* Lecturas de Novedades */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255, 30, 39, 0.1)', color: 'var(--accent-red)' }}>
            <Eye size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{totalAnnouncementViews.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Lecturas de Novedades</div>
          </div>
        </div>

        {/* Clics en Enlaces */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(22, 201, 70, 0.1)', color: 'var(--accent-green)' }}>
            <MousePointerClick size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{totalClicks.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Clics en Enlaces (CTA)</div>
          </div>
        </div>

        {/* Tasa de Clics (CTR) */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{ctr}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tasa de Conversión (CTR)</div>
          </div>
        </div>

        {/* Comentarios */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{totalCommentsCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Comentarios de Clientes</div>
          </div>
        </div>
      </div>

      {/* Create Announcement Form */}
      {showForm && (
        <div className="card mb-4" style={{ animation: 'fadeIn 0.3s', border: '1px solid var(--accent-red)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent-red)" /> Redactar y Publicar Novedad Oficial
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Título del Anuncio (Destacado)
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  required 
                  placeholder="ej. PUBLIQUEN DE LA SIGUIENTE MANERA:"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />

                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Cuerpo del Mensaje (Soporta ✅ viñetas, ⚠️ alertas y emojis)
                </label>
                <textarea 
                  className="input-field" 
                  rows={6} 
                  required
                  placeholder="✅ Primer punto clave&#10;✅ Segundo punto&#10;&#10;⚠️ Nota importante de spam..."
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                ></textarea>

                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Imagen o Banner (Opcional)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ImageIcon size={20} style={{ color: 'var(--text-muted)' }} />
                  <input 
                    type="url" 
                    className="input-field" 
                    style={{ margin: 0 }}
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Texto del Botón Principal (CTA)
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="ej. VER HEDAMPRO.COM"
                  value={formData.ctaText}
                  onChange={e => setFormData({...formData, ctaText: e.target.value})}
                />

                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Enlace URL de Destino
                </label>
                <input 
                  type="url" 
                  className="input-field" 
                  placeholder="https://hedampro.com"
                  value={formData.ctaUrl}
                  onChange={e => setFormData({...formData, ctaUrl: e.target.value})}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                      Fecha y Hora de Publicación
                    </label>
                    <input 
                      type="datetime-local" 
                      className="input-field" 
                      required
                      value={formData.publishedAt}
                      onChange={e => setFormData({...formData, publishedAt: e.target.value})}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>
                      Caducidad (Fin de Pop-up)
                    </label>
                    <input 
                      type="datetime-local" 
                      className="input-field" 
                      value={formData.expiresAt}
                      onChange={e => setFormData({...formData, expiresAt: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="submit" className="btn-primary">
                <CheckCircle size={18} /> Publicar Anuncio
              </button>
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements Table and Moderation */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
          Gestión de Publicaciones y Moderación
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '14px' }}>TÍTULO DE LA NOVEDAD</th>
                <th style={{ padding: '14px' }}>ESTADO</th>
                <th style={{ padding: '14px' }}>VISTAS NOVEDAD</th>
                <th style={{ padding: '14px' }}>CLICS CTA</th>
                <th style={{ padding: '14px' }}>COMUNIDAD</th>
                <th style={{ padding: '14px' }}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map(announcement => {
                const itemComments = comments.filter(c => c.announcementId === announcement.id);
                return (
                  <tr key={announcement.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px', fontWeight: 700 }}>
                      <div>{announcement.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                        {new Date(announcement.publishedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: announcement.status === 'published' ? 'rgba(22, 201, 70, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                        color: announcement.status === 'published' ? 'var(--accent-green)' : 'var(--text-muted)'
                      }}>
                        {announcement.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div className="flex items-center gap-2">
                        <Eye size={16} color="var(--text-muted)" /> {announcement.views}
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div className="flex items-center gap-2">
                        <MousePointerClick size={16} color="var(--text-muted)" /> {announcement.clicks}
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <button 
                        onClick={() => setSelectedAnnouncementId(selectedAnnouncementId === announcement.id ? null : announcement.id)}
                        className="btn-outline"
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        <MessageSquare size={14} /> {itemComments.length} mensajes
                      </button>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          onClick={() => setSelectedAnnouncementId(announcement.id)}
                          style={{
                            background: 'none',
                            color: 'var(--accent-red)',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        >
                          Moderar Chat →
                        </button>

                        <button
                          onClick={() => handleDeleteAnnouncement(announcement.id, announcement.title)}
                          title="Eliminar publicación"
                          style={{
                            background: 'none',
                            color: 'var(--text-muted)',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4d')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No hay novedades publicadas aún. Haz clic en <strong>"+ Nueva Novedad"</strong> para publicar la primera.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moderation Chat Drawer / Panel */}
      {selectedAnnouncementId && (
        <div className="card mt-4" style={{ border: '1px solid var(--accent-red)', animation: 'fadeIn 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              Hilo de Comentarios y Respuestas Oficiales
            </h4>
            <button className="btn-outline" onClick={() => setSelectedAnnouncementId(null)} style={{ padding: '4px 10px' }}>
              Cerrar Hilo
            </button>
          </div>

          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '16px'
          }}>
            {comments.filter(c => c.announcementId === selectedAnnouncementId).map(c => (
              <div 
                key={c.id} 
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: c.userId === 'admin_official' ? 'rgba(255, 30, 39, 0.08)' : 'var(--input-bg)',
                  border: c.userId === 'admin_official' ? '1px solid rgba(255, 30, 39, 0.3)' : '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.88rem', color: c.userId === 'admin_official' ? 'var(--accent-red)' : 'var(--text-main)' }}>
                      {c.userName}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem' }}>{c.content}</p>
                </div>

                <button
                  onClick={() => handleDeleteComment(c.id)}
                  title="Eliminar comentario"
                  style={{
                    background: 'none',
                    color: 'var(--text-muted)',
                    padding: '4px',
                    borderRadius: '4px',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4d')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {comments.filter(c => c.announcementId === selectedAnnouncementId).length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center', padding: '16px' }}>
                No hay comentarios aún para este anuncio.
              </p>
            )}
          </div>

          {/* Admin Reply Box */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text"
              placeholder="Responder a la comunidad como Administrador Oficial..."
              className="input-field"
              style={{ margin: 0 }}
              value={adminReplyText}
              onChange={(e) => setAdminReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdminReply(selectedAnnouncementId);
              }}
            />
            <button 
              className="btn-primary" 
              onClick={() => handleAdminReply(selectedAnnouncementId)}
              style={{ padding: '0 20px', borderRadius: '10px' }}
            >
              <Send size={16} /> Responder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
