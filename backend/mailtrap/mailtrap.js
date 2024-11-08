const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
 
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "APTITUDE GURU",
};
const recipients = [
  {
    email: "sarvajna2004file@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then((response) => {
    console.log("Email sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });