import { addDays } from "date-fns";
import { Range, DateRangePicker } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Card, Col } from "react-bootstrap";
import "./DatePicker.css";
import Sums from "../sums/Sums";

export interface ISums {
  betweenDates: Range[];
}

function DatePicker() {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [betweenDates, setBetweenDates] = useState<ISums>({
    betweenDates: state,
  });

  useEffect(() => {
    const setTheBetweenDates = async () => {
      setBetweenDates({ betweenDates: state });
    };

    console.log(state);
    setTheBetweenDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="d-flex calendarContainer">
      <Card className="flex-fill datePickerCard">
        <DateRangePicker
          onChange={(item) => {
            setState([item.selection]);
            setBetweenDates({ betweenDates: [item.selection] });
          }}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
        />
      </Card>
        <Sums betweenDates={betweenDates} />
    </Col>
  );
}

export default DatePicker;
