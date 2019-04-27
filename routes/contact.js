var express = require('express');
var mailgun = require('mailgun-js');
var router = express.Router();

const sandbox = 'sandbox8d9627f558604b498465199d4b425524.mailgun.org';
const key = 'dc5f81da-c9cb8c83';
const mg = mailgun({apiKey: key, domain: sandbox});

/* GET contact page. */
router.get('/', function(req, res, next) {
res.render('contact', { title: 'Contact Us' });
});

/ GET thanks page. /
router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Thank You' });
});

/ POST to contact page - part 1: validation /
router.post('/', function(req, res, next) {
  const { email, message, name } = req.body;
  const errors = {
    count: 0,
    list: [],
  };

if (!email || email === '') {
  errors.count += 1;
  errors.list.push('Email missing.');
}
if (!message || message === '') {
  errors.count += 1;
  errors.list.push('Message missing.');
}
if (!name || name === '') {
  errors.count += 1;
  errors.list.push('Name missing.');
}

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (!re.test(String(email).toLowerCase())) {
  errors.count += 1;
  errors.list.push('Malformed email.');
}

if (errors.count > 0) {
  return res.json(errors);
}

next();
});

/ POST to contact page - part 2: send the email /
router.post('/', function(req, res, next) {
  return res.json({ succes: true });
});

module.exports = router;