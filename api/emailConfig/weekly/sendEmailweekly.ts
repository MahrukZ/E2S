import { google } from "googleapis";
import nodemailer from "nodemailer";
import { findConsumptionSumAndCosts } from "./consumptionSum";

const CLIENT_ID =
  "756325392326-fade03emr8dot73dao9v90up5sm42tnk.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04hIQRmidKMnNCgYIARAAGAQSNwF-L9Iri85N5StO9sEg5c5b9DGEf_PMXa2YQOatcJ8YRPOEwkeLgvZNgHOdWQOb8jkLASlfnUI";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmailWeekly = async () => {
  try {
    const insightsSum = await findConsumptionSumAndCosts();

    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "testuser15689@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token || "",
      },
    });

    const mailSettings = {
      from: "testuser15689@gmail.com>",
      // add your email to test the email service
      to: "",
      subject: "Your weekly insights",
      text: `Your total consumption sum for last week is: \n, 
          Total electricity demand: ${insightsSum[0].toFixed(2)} kWh \n
          Total gas demand: ${insightsSum[1].toFixed(2)} kWh \n
          Total emissions: ${insightsSum[2].toFixed(2)} kgCO2e \n
          Total costs: £ ${insightsSum[3].toFixed(2)} \n
          You can view detailed report at http://localhost:3000/reports `,
    };
    const emailResponse = await transport.sendMail(mailSettings);
    return emailResponse;
  } catch (error) {
    return error;
  }
};
