const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.dondominio.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODemailer_USER,
    pass: process.env.NODemailer_PASS
  }
})

transporter.verify((err, success) =>
  err
    ? console.error('Error en configuración de SMTP:', err)
    : console.log('Servidor listo para enviar correos')
)

const sendActivationEmail = async (email, token) => {
  //cambiar localhost por process.env.ORIGIN_URL
  const link = `http://localhost:4200/activar-cuenta?token=${token}`

  const mailOptions = {
    from: 'contacto@tuwebsolidaria.com',
    to: email,
    subject: 'Activa tu cuenta',
    html: `
     <p>Un administrador del sitio web de Bali Asociados ha iniciado tu registro. Por favor, finaliza tu registro en el siguiente enlace antes de 24 horas:</p>
      <a href="${link}">Activar cuenta</a>
    `
  }
  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error al enviar el correo.', error)
    return false
  }
}

const sendResetPasswordEmail = (user, token) => {
  console.log('completar reseteo de contraseña lógica')
}

module.exports = {
  sendActivationEmail,
  sendResetPasswordEmail
}
