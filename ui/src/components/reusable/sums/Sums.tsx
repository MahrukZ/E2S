import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { ISums } from "./../datePicker/DatePicker";
import "../datePicker/DatePicker.css";

interface ISumsProps {
  betweenDates: ISums;
}

function Sums({ betweenDates }: ISumsProps) {
  console.log(betweenDates);
  return (
    <Card className="flex-fill datePickerCard">
      <Card.Title>Total Costs</Card.Title>
      <Card.Body>
        <b>hi</b>
      </Card.Body>
    </Card>
  );
}

export default Sums;
