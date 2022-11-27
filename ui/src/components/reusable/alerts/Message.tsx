import { Alert } from "react-bootstrap";

interface MessageProps {
    message: string;
    type: string
}

function Message({ message, type }: MessageProps) {
  return (
    <div className="container mt-3">
        <Alert key={type} variant={type}>
            { message }
        </Alert>
    </div>
  );
};

export default Message;