import { sendEmail } from "./sendEmail";
import cron from "node-cron";

// uncomment the following to test the email being send after each minute
// "*/1 * * * *"

export const EmailCronJob = () => {
  cron.schedule("0 0 6 * * 1", function () {
    sendEmail()
      .then((emailResponse) => console.log("Email successfully send..", emailResponse))
      .catch((error) => console.log(error.message));
  });
};
