import { sendEmailWeekly } from "./sendEmailweekly";
import cron from "node-cron";

// uncomment the following to test the email being send after each minute
// "*/1 * * * *"
// 0 11 * * MON
// function to send the email on every monday at 12 noon time

export const EmailCronJob = () => {
  cron.schedule("*/1 * * * *", function () {
    sendEmailWeekly()
      .then(() => console.log("Email successfully send"))
      .catch((error) => console.log(error.message));
  });
};
