const
  dotenv = require('dotenv').load(),
  express = require('express'),
  nodemailer = require('nodemailer'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  PORT = process.env.PORT || 3001
;

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({message:'API root'})
})

app.post('/quote', (req, res) => {
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'premierevaletservice.la@gmail.com',
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  
  let HelperOptions = {
    from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
    to: 'matthew.westenhaver@gmail.com',
    subject: `Message from ${req.body.name}`,
    html: `${req.body.email}` 
  }

  let ConfirmationOptions = {
    from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
    to: req.body.email,
    subject: `Your Message Was Received`,
    html: `<b>Subject:</b> ${req.body.name}<br /><br />We will get back to you as soon as possible!<br />The PVS Team`
  }
  
  transporter.sendMail(HelperOptions, (error, info) => {
    if(error) {
      return console.log(error)
    }
    console.log('message was sent!')
    console.log(info)
  });

  transporter.sendMail(ConfirmationOptions, (error2, info2) => {
    if(error2) {
      return console.log(error2)
    }
    console.log('confirmation email sent.')
    console.log(info2)
  })

  res.json({message:'Comment received.'})

})

app.post('/work', (req, res) => {
  
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'premierevaletservice.la@gmail.com',
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  
  let HelperOptions = {
    from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
    to: 'matthew.westenhaver@gmail.com',
    subject: `Message from ${req.body.firstName}`,
    html: `<b>SUBJECT:</b> ${req.body.lastName}<br /><br /><b>REPLY TO:</b> ${req.body.email}` 
  }

  let ConfirmationOptions = {
    from: `"Premiere Valet Service" <premierevaletservice.la@gmail.com>`,
    to: req.body.email,
    subject: `Your Message Was Received`,
    html: `<b>Subject:</b> ${req.body.firstName}<br /><br />We will get back to you as soon as possible!<br />The PVS Team`
  }
  
  transporter.sendMail(HelperOptions, (error, info) => {
    if(error) {
      return console.log(error)
    }
    console.log('message was sent!')
    console.log(info)
  });

  transporter.sendMail(ConfirmationOptions, (error2, info2) => {
    if(error2) {
      return console.log(error2)
    }
    console.log('confirmation email sent.')
    console.log(info2)
  })

  res.json({message:'Comment received.'})

})

app.listen(PORT, (err) => {
  console.log(err || `👏🏾 Server running on ${PORT}`)
});