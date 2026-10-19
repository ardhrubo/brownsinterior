import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Brown\'s Interior - Application Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: '#1c1815',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ maxWidth: '480px' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#c9b59c',
              marginBottom: '1rem'
            }}>
              Brown's Interior
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Something went wrong loading this view. Please refresh or return to the homepage.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                display: 'inline-block',
                padding: '0.85rem 1.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #c9b59c, #a88a66)',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(168, 138, 102, 0.35)'
              }}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
