import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

const CONFIGS = {
  success: {
    icon: <CheckCircle2 size={20} />,
    bg: '#F0FFF4',
    border: '#9AE6B4',
    color: '#276749',
    bar: '#38A169',
  },
  error: {
    icon: <XCircle size={20} />,
    bg: '#FFF5F5',
    border: '#FEB2B2',
    color: '#C53030',
    bar: '#E53E3E',
  },
  info: {
    icon: <Info size={20} />,
    bg: '#EBF8FF',
    border: '#90CDF4',
    color: '#2B6CB0',
    bar: '#3182CE',
  },
  warning: {
    icon: <AlertCircle size={20} />,
    bg: '#FFFAF0',
    border: '#FBD38D',
    color: '#C05621',
    bar: '#DD6B20',
  },
};

const Toast = ({ message, type = 'info', onClose, duration = 4500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const cfg = CONFIGS[type] || CONFIGS.info;

  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        .toast-progress {
          animation: shrink ${duration}ms linear forwards;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: '88px',
        right: '24px',
        zIndex: 9999,
        width: '360px',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: '14px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.13)',
        overflow: 'hidden',
        animation: 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          color: cfg.color,
        }}>
          <span style={{ flexShrink: 0, marginTop: '2px' }}>{cfg.icon}</span>
          <p style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.55, margin: 0 }}>
            {message}
          </p>
          <button
            onClick={onClose}
            style={{
              color: cfg.color,
              opacity: 0.5,
              flexShrink: 0,
              transition: 'opacity 0.2s',
              lineHeight: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.5'}
          >
            <X size={16} />
          </button>
        </div>
        <div style={{ height: '3px', background: 'rgba(0,0,0,0.06)' }}>
          <div
            className="toast-progress"
            style={{ height: '100%', background: cfg.bar, borderRadius: '0 0 14px 14px' }}
          />
        </div>
      </div>
    </>
  );
};

export default Toast;
