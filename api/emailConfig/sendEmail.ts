import { google } from "googleapis";
import nodemailer from "nodemailer";

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

    const mailSettings = {
      sender: "testuser15689@gmail.com>",
      recipient: "zulfiqarm1@cardiff.ac.uk",
      subject: "Your weekly report is attached",
      // need to provide the required file path
      // attachments: [
      //   {
      //     filename: "file1.pdf",
      //     filePath: process.cwd() + "file1.pdf",
      //     contentType: "application/pdf",
      //   },
      // ],
    };

    const emailResponse = await transport.sendMail(mailSettings);
    return emailResponse;
  } catch (error) {
    return error;
  }
};
