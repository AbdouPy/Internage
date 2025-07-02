// server/utils/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ton.email@gmail.com", // ton adresse Gmail
    pass: "mot_de_passe_app"     // un mot de passe d'application (pas ton vrai mot de passe)
  },
});

const sendAcceptanceEmail = async (to, name) => {
  const mailOptions = {
    from: "abdourazak1198@gmail.com",
    to,
    subject: "🎉 Votre candidature a été acceptée !",
    html: `
      <p>Bonjour <b>${name}</b>,</p>
      <p>Nous sommes heureux de vous informer que votre candidature pour le stage a radisson a été <b>acceptée</b> !</p>
      <p>Veuillez préparer les documents suivants :</p>
      <ul>
        <li>Casier judiciaire (-3 mois)</li>
        <li>2 Photos d'identité</li>
        <li>Copie légalisée de la carte d'identité</li>
        <li>Copie légalisée de l’acte de naissance</li>
        <li>Test hépatite B (pour la cuisine)</li>
        <li>Assurance de l’établissement (école, université, institut)</li>
      </ul>
      <p>Merci pour votre confiance.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendAcceptanceEmail };
