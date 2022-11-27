import { Alert } from "react-bootstrap";

interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="container mt-3">
        <Alert key={'danger'} variant={'danger'}>
            { message }
        </Alert>
    </div>
  );
};

export default ErrorMessage;