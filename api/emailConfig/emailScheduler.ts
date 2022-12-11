import { sendEmail } from "./sendEmail";
import cron from "node-cron";

// Uncomment the following and paste it in the cron.schedule() to send the email at noon on monday
// "0 0 12 ? * MON" 

export const EmailCronJob = () => {
  cron.schedule("*/5 * * * *", function () {
    sendEmail()
      .then(() => console.log("Email successfully send"))
      .catch((error) => {
        console.log(error);
      });
  });
};
