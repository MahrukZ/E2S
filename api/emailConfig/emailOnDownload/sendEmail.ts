import { google } from "googleapis";
import nodemailer from "nodemailer";
const pdfToBase64 = require("pdf-to-base64");

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

export const sendEmail = async () => {
  try {
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

    pdfToBase64(process.cwd() + "/uploads/report.pdf")
      .then(async (response: any) => {
        const mailSettings = {
          from: "testuser15689@gmail.com>",
          // add your email to test the email service
          to: "",
          subject: "Your weekly report is attached",
          attachments: [
            {
              filename: "report.pdf",
              content: response,
              encoding: "base64",
            },
          ],
        };
        const emailResponse = await transport.sendMail(mailSettings);
        return emailResponse;
      })
      .catch((error: any) => {
        console.log(error);
      });
  } catch (error) {
    return error;
  }
};
