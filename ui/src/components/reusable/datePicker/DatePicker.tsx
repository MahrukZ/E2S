import "bootstrap/dist/css/bootstrap.min.css";
import { addDays } from "date-fns";
import { Range, DateRangePicker } from "react-date-range";
import { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Card, Col } from "react-bootstrap";
import "./DatePicker.css";
import Sums from "../sums/Sums";

export interface ISums {
    dateRange: Range[];
}
interface DatePickerProps {
    currentSite: any;
}
function DatePicker({ currentSite }: DatePickerProps) {
    const [state, setState] = useState<Range[]>([
        {
            startDate: addDays(new Date(), -7),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [dateRange, setDateRange] = useState<ISums>({
        dateRange: state,
    });

    const today = new Date();

    useEffect(() => {
        const setTheBetweenDates = async () => {
            setDateRange({ dateRange: state });
        };
        setTheBetweenDates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Col className="d-flex calendarContainer justify-content-center">
            <Card
                className="flex-fill datePickerCard"
                data-testid="datePickerElement"
            >
                <Card.Title>
                    Select a date range to view data in order to check your bill
                </Card.Title>
                <DateRangePicker
                    onChange={(item) => {
                        setState([item.selection]);
                        setDateRange({ dateRange: [item.selection] });
                    }}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    preventSnapRefocus={true}
                    calendarFocus="backwards"
                    maxDate={today}
                    staticRanges={[]}
                    inputRanges={[]}
                />
            </Card>
            <Sums betweenDates={dateRange} currentSite={currentSite} />
        </Col>
    );
}

export default DatePicker;
