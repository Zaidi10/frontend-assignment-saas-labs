import { defaultErrorMessage } from "../../Constants/ErrorView";
import "./ErrorView.css";

type ErrorViewData = {
  errorMessage: string;
  onRetry: () => void;
};

const ErrorView = (props: ErrorViewData) => {
  const { errorMessage, onRetry } = props;
  return (
    <div className="error-view">
      <h2>Oops.</h2>
      <p>{errorMessage || defaultErrorMessage}</p>
      <button onClick={onRetry} className="retry-button">
        Retry
      </button>
    </div>
  );
};

export default ErrorView;
