import { Component, useEffect, useState } from 'react';
import { AlertTriangle, Home, RefreshCcw, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clearCalculatorStorage } from '../../utils/persistentState';

const FallbackPanel = ({
  title,
  description,
  error,
  showHomeLink = false,
  onRetry,
  onClearSavedData,
}) => (
  <section className="mx-auto flex min-h-[55vh] w-full max-w-3xl items-center justify-center py-12">
    <div className="w-full rounded-[2rem] border border-red-200 bg-white p-6 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] sm:p-8">
      <div className="flex flex-col gap-5">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>
        {error?.message && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Chi tiet loi</p>
            <p className="mt-1 break-words">{error.message}</p>
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <RefreshCcw className="h-4 w-4" />
            Thu lai
          </button>
          <button
            type="button"
            onClick={onClearSavedData}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Trash2 className="h-4 w-4" />
            Xoa du lieu da luu
          </button>
          {showHomeLink && (
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Home className="h-4 w-4" />
              Ve trang chu
            </Link>
          )}
        </div>
      </div>
    </div>
  </section>
);

class BoundaryCore extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ui-error-boundary]', error, info);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  reset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      return this.props.renderFallback({
        error: this.state.error,
        reset: this.reset,
      });
    }

    return this.props.children;
  }
}

const clearSavedDataAndReload = () => {
  clearCalculatorStorage();
  window.location.reload();
};

export const AppErrorBoundary = ({ children }) => {
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    const handleWindowError = (event) => {
      setGlobalError(event.error ?? new Error(event.message || 'Loi khong xac dinh'));
    };

    const handleUnhandledRejection = (event) => {
      const reason = event.reason;
      const error = reason instanceof Error ? reason : new Error(String(reason));
      setGlobalError(error);
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (globalError) {
    return (
      <FallbackPanel
        title="Trang gap loi khi khoi dong"
        description="Ung dung da chan loi toan cuc de tranh tinh trang trang bi trang. Ban co the thu tai lai trang hoac xoa du lieu da luu tren trinh duyet."
        error={globalError}
        onRetry={() => window.location.reload()}
        onClearSavedData={clearSavedDataAndReload}
      />
    );
  }

  return (
    <BoundaryCore
      renderFallback={({ error, reset }) => (
        <FallbackPanel
          title="Khong the khoi tao giao dien"
          description="Da xay ra loi trong luc render giao dien. Ung dung da hien thong bao thay vi de man hinh trang."
          error={error}
          onRetry={reset}
          onClearSavedData={clearSavedDataAndReload}
        />
      )}
    >
      {children}
    </BoundaryCore>
  );
};

export const RouteErrorBoundary = ({ children }) => {
  const location = useLocation();
  const resetKey = `${location.pathname}${location.search}${location.hash}`;

  return (
    <BoundaryCore
      resetKey={resetKey}
      renderFallback={({ error, reset }) => (
        <FallbackPanel
          title="Khong the tai noi dung truong da chon"
          description="Trang calculator nay da gap loi trong luc tai du lieu hoac render giao dien. Ban co the thu lai, xoa du lieu da luu, hoac quay lai trang chu."
          error={error}
          showHomeLink
          onRetry={reset}
          onClearSavedData={clearSavedDataAndReload}
        />
      )}
    >
      {children}
    </BoundaryCore>
  );
};
