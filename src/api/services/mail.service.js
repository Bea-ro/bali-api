const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.dondominio.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODemailer_USER,
    pass: process.env.NODemailer_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify((err, success) =>
  err
    ? console.error('Error en configuración de SMTP:', err)
    : console.log('Servidor listo para enviar correos')
)

const sendActivationEmail = async (email, token) => {
  const link = `${process.env.ORIGIN_URL}/activar-cuenta?token=${token}`
  //const link = `http://localhost:4200/activar-cuenta?token=${token}`

  // const mailOptions = {
  //   from: 'contacto@tuwebsolidaria.com',
  //   to: email,
  //   subject: 'Activa tu cuenta',
  //   html: `
  //  <img style="height:50px" class="header-logo" src="https://sitio-bali.vercel.app/bali-asociados-logo-correo.jpg" alt="bali-asociados-logo"/>
  //   <p>Un administrador del sitio web de Bali Asociados ha iniciado tu registro.</p>
  //       <p>Por favor, finaliza tu registro en el siguiente enlace antes de 24 horas:</p>
  //     <a href="${link}">Activar cuenta</a>
  //   `
  // }

  try {
    //const info = await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error al enviar el correo.', error)
    return false
  }
}

const sendResetEmail = async (email, token) => {
  const link = `${process.env.ORIGIN_URL}/reset-email?token=${token}`
  // const link = `http://localhost:4200/activar-cuenta?token=${token}`

  // const mailOptions = {
  //   from: 'contacto@tuwebsolidaria.com',
  //   to: email,
  //   subject: 'Reseteo de contraseña',
  //   html: `
  //  <img style="height:50px" class="header-logo" src="https://sitio-bali.vercel.app/bali-asociados-logo-correo.jpg" alt="bali-asociados-logo"/>
  //     <p>Puedes reestablecer tu contraseña en el siguiente enlace antes de 24 horas:</p>
  //     <a href="${link}">Reestablecer contraseña</a>
  //   `
  // }
  try {
    //const info = await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error al enviar el correo.', error)
    return false
  }
}

module.exports = {
  sendActivationEmail,
  sendResetEmail
}
