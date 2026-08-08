import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <div className="error-code">500</div>
          <h2>Something went wrong</h2>
          <p>An unexpected error occurred while loading this page. Please refresh, or head back to the homepage.</p>
          <a className="btn btn-primary" href="/">Back to Home</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
