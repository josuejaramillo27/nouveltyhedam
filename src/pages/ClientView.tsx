import { useEffect, useState } from 'react';
import { useNovedades } from '../context/NovedadesContext';
import type { Announcement } from '../types';
import { X, MessageSquare, ExternalLink, ArrowRight, CheckCircle2, AlertTriangle, Megaphone, Send, Sparkles } from 'lucide-react';

const ClientView = () => {
  const { announcements, trackWebView, trackView, trackClick, addComment, comments } = useNovedades();
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Contabilizar visita a la web en general al cargar
  useEffect(() => {
    trackWebView();
  }, [trackWebView]);

  const activeAnnouncements = announcements.filter(
    a => a.status === 'published' && (!a.expiresAt || new Date(a.expiresAt) > new Date())
  );

  useEffect(() => {
    if (activeAnnouncements.length > 0) {
      const latest = activeAnnouncements[0];
      const seen = sessionStorage.getItem(`seen_${latest.id}`);
      if (!seen) {
        setActiveAnnouncement(latest);
        trackView(latest.id);
        sessionStorage.setItem(`seen_${latest.id}`, 'true');
      }
    }
  }, [activeAnnouncements, trackView]);

  const handleCloseModal = () => {
    setActiveAnnouncement(null);
    setShowComments(false);
  };

  const handleOpenAnnouncement = (announcement: Announcement) => {
    setActiveAnnouncement(announcement);
    trackView(announcement.id);
  };

  const handleCtaClick = (id: string, url: string) => {
    trackClick(id);
    window.open(url, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAnnouncement && newComment.trim()) {
      addComment({
        announcementId: activeAnnouncement.id,
        userId: 'client_' + Math.random().toString(36).substring(7),
        userName: commentAuthor.trim() || 'Miembro de la Comunidad',
        content: newComment.trim()
      });
      setNewComment('');
    }
  };

  const activeComments = activeAnnouncement 
    ? comments.filter(c => c.announcementId === activeAnnouncement.id)
    : [];

  return (
    <div style={{ position: 'relative' }}>
      {/* Header Badge style HedamPro */}
      <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
          <span style={{
            background: 'rgba(255, 30, 39, 0.1)',
            border: '1px solid rgba(255, 30, 39, 0.3)',
            color: 'var(--accent-red)',
            padding: '5px 14px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={13} /> TABLÓN OFICIAL DE NOVEDADES
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.5px', margin: 0 }}>
              Noticias y Anuncios
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Descubre las últimas guías para distribuidores, avisos de stock y actualizaciones del sistema.
            </p>
          </div>

          {activeAnnouncements.length > 0 && (
            <button 
              className="btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => handleOpenAnnouncement(activeAnnouncements[0])}
            >
              <Megaphone size={16} color="var(--accent-red)" />
              Abrir Novedad Pop-up
            </button>
          )}
        </div>
      </div>

      {/* Feed Grid */}
      {activeAnnouncements.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {activeAnnouncements.map((announcement, index) => (
            <div 
              key={announcement.id} 
              className="card" 
              style={{ 
                cursor: 'pointer', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onClick={() => handleOpenAnnouncement(announcement)}
            >
              {index === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'var(--accent-red)',
                  color: 'white',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Destacado
                </div>
              )}
              
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
                  {new Date(announcement.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {announcement.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.9rem', 
                  whiteSpace: 'pre-line',
                  display: '-webkit-box', 
                  WebkitLineClamp: 4, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden',
                  marginBottom: '18px',
                  lineHeight: 1.5
                }}>
                  {announcement.content}
                </p>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '14px',
                fontSize: '0.84rem',
                color: 'var(--text-muted)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MessageSquare size={14} /> {comments.filter(c => c.announcementId === announcement.id).length} comentarios
                </span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Ver detalle <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State for brand new platform */
        <div className="card" style={{
          textAlign: 'center',
          padding: '60px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 30, 39, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-red)'
          }}>
            <Megaphone size={28} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Aún no hay novedades publicadas</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '450px', fontSize: '0.92rem' }}>
            Cuando el equipo de administración publique una novedad o guía oficial, aparecerá automáticamente aquí en primer plano.
          </p>
        </div>
      )}

      {/* POP-UP MODAL PRINCIPAL */}
      {activeAnnouncement && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Peeking Mascot resting hands on top border */}
            <div className="mascot-container">
              <img 
                src="/mascot.png" 
                alt="Mascota HedamPro" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/macot.png';
                }}
              />
            </div>

            {/* Close Button X */}
            <button 
              className="modal-close" 
              onClick={handleCloseModal}
              title="Cerrar novedad"
            >
              <X size={18} />
            </button>

            {/* Inner Content Container */}
            <div style={{ padding: '36px 36px 28px' }}>
              
              {/* Badge: NUEVA NOVEDAD */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  background: 'var(--accent-red)',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 3px 12px var(--accent-red-glow)',
                  letterSpacing: '0.5px'
                }}>
                  <Megaphone size={14} className="emoji-animated" /> NUEVA NOVEDAD
                </span>
              </div>

              {/* Title Header with Graphics */}
              <div style={{ 
                marginTop: '16px', 
                marginBottom: '20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ 
                    fontSize: '1.9rem', 
                    fontWeight: 900, 
                    lineHeight: 1.15, 
                    color: '#0e1118', 
                    textTransform: 'uppercase',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
                  }}>
                    {activeAnnouncement.title}
                  </h2>
                </div>

                {/* Minimalist Vector Browser Illustration */}
                <div style={{
                  width: '115px',
                  background: '#f1f3f7',
                  borderRadius: '12px',
                  border: '1.5px solid #dbe0eb',
                  padding: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%', 
                      background: 'var(--accent-red)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: 'white', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      boxShadow: '0 2px 6px rgba(255,30,39,0.3)'
                    }}>
                      👤
                    </div>
                    <div style={{ flex: 1, height: '16px', background: 'var(--accent-red)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#fff' }}>🔗</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Text & Checklist */}
              <div style={{ marginBottom: '26px' }}>
                {activeAnnouncement.content.split('\n').map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={idx} style={{ height: '8px' }} />;

                  // If line starts with checkmark or bullet
                  if (trimmed.startsWith('✅') || trimmed.startsWith('-') || trimmed.startsWith('•')) {
                    const text = trimmed.replace(/^[✅\-•]\s*/, '');
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                        <CheckCircle2 size={18} color="#11a842" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.98rem', fontWeight: 600, color: '#1c2230' }}>
                          {text.includes('hedampro.com') ? (
                            <>
                              {text.split('hedampro.com')[0]}
                              <span style={{ color: 'var(--accent-red)', fontWeight: 800 }}>hedampro.com</span>
                              {text.split('hedampro.com')[1]}
                            </>
                          ) : (
                            text
                          )}
                        </span>
                      </div>
                    );
                  }

                  // If line starts with warning
                  if (trimmed.startsWith('⚠️') || trimmed.toLowerCase().startsWith('así evitamos')) {
                    const warningText = trimmed.replace(/^⚠️\s*/, '');
                    return (
                      <div key={idx} style={{
                        marginTop: '16px',
                        background: '#fff9e6',
                        borderLeft: '4px solid #f59e0b',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#92400e',
                        fontWeight: 700,
                        fontSize: '0.92rem'
                      }}>
                        <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                        <span>{warningText}</span>
                      </div>
                    );
                  }

                  return (
                    <p key={idx} style={{ fontSize: '0.98rem', color: '#2d3342', lineHeight: 1.5, marginBottom: '8px', fontWeight: 500 }}>
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* CTA Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '14px', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                marginTop: '16px'
              }}>
                {activeAnnouncement.ctaUrl && (
                  <button 
                    className="btn-primary" 
                    onClick={() => handleCtaClick(activeAnnouncement.id, activeAnnouncement.ctaUrl!)}
                    style={{ flex: 1, minWidth: '220px', padding: '14px 24px', fontSize: '0.92rem' }}
                  >
                    <ExternalLink size={17} />
                    <span>{activeAnnouncement.ctaText || 'VER AHORA'}</span>
                    <ArrowRight size={17} />
                  </button>
                )}

                <button 
                  className="btn-secondary" 
                  onClick={() => setShowComments(!showComments)}
                  style={{ flex: 1, minWidth: '200px', padding: '14px 22px', fontSize: '0.92rem' }}
                >
                  <MessageSquare size={17} />
                  <span>{showComments ? 'OCULTAR CHAT' : 'COMENTAR NOVEDAD'}</span>
                </button>
              </div>

              {/* Comments Section Drawer */}
              {showComments && (
                <div style={{ 
                  marginTop: '25px', 
                  borderTop: '2px solid #eef1f6', 
                  paddingTop: '20px',
                  animation: 'fadeIn 0.25s'
                }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0e1118', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Hilo de Comentarios</span>
                    <span style={{ fontSize: '0.82rem', color: '#687285', fontWeight: 600 }}>{activeComments.length} mensajes</span>
                  </h4>

                  <div style={{ 
                    maxHeight: '190px', 
                    overflowY: 'auto', 
                    paddingRight: '6px',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    {activeComments.map(c => (
                      <div key={c.id} style={{ 
                        background: '#f8fafc', 
                        padding: '11px 14px', 
                        borderRadius: '12px', 
                        border: '1px solid #e2e8f0' 
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--accent-red)' }}>{c.userName}</span>
                          <span style={{ fontSize: '0.74rem', color: '#8892a4' }}>
                            {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e293b' }}>{c.content}</p>
                      </div>
                    ))}
                    {activeComments.length === 0 && (
                      <p style={{ color: '#8892a4', fontSize: '0.85rem', textAlign: 'center', padding: '12px' }}>
                        Aún no hay comentarios. ¡Sé el primero en participar!
                      </p>
                    )}
                  </div>

                  {/* Comment Input Form */}
                  <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Tu alias o nombre" 
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        style={{
                          flex: '0 0 150px',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1.5px solid #dce2ee',
                          fontSize: '0.85rem',
                          outline: 'none',
                          color: '#0e1118',
                          background: '#ffffff'
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder="Escribe una opinión o consulta..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid #dce2ee',
                          fontSize: '0.85rem',
                          outline: 'none',
                          color: '#0e1118',
                          background: '#ffffff'
                        }}
                      />
                      <button 
                        type="submit" 
                        className="btn-primary" 
                        style={{ padding: '0 18px', borderRadius: '10px', boxShadow: 'none' }}
                        title="Enviar comentario"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientView;
