import { Component } from 'react';
import { AuthContextProvider } from './firebseConfig/AuthContext';
import './index.css';
import Routs from './routing/Routs';

function App() {

  interface ErrorBoundaryProps {
    children?: JSX.Element
    | JSX.Element[]
    | React.ReactNode
  }
  interface ErrorBoundaryState {
    hasError: boolean;
  }

  class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }


    render() {
      if (this.state.hasError) {
        return <h1>UPS.Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }
  return (
    <AuthContextProvider>
      <ErrorBoundary>
        <Routs />
      </ErrorBoundary>
    </AuthContextProvider>

  );
}

export default App;
