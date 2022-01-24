const axios = require('axios').defaul;
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieSession = require('cookie-session');
const express = require('express');
const favicon = require('serve-favicon');
const fs = require('fs');
const helmet = require('helmet');
const showdown  = require('showdown');
const markdownHtmlConverter = new showdown.Converter()
const sslRedirect = require('heroku-ssl-redirect').default;
const modules = require('./modules');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const {createGzip} = require('zlib');
const url = require('url');
const { get, request } = require('http');

const app = express();

const PORT = process.env.PORT;
const isProduction = (process.env.IS_PROD == 'TRUE' || process.env.IS_PROD == true);
const dataJson = JSON.parse(fs.readFileSync('dataJson.json'));
if(!isProduction) {dataJson.websiteUrl = 'http://localhost:' + process.env.PORT;};

const emailTemplatesPath = "views/email_templates/";
var mailOptions = {};
var emailHtml = "";

app
.use(sslRedirect())
.use(helmet())
.use(compression())
.use(express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/images/logo/les-arroseurs-favicon.png'))
.use(bodyParser.urlencoded({extended: false}))
.use(cookieSession({
	name: "session-CG",
	secret: process.env.COOKIES_SESSION_SECRET,
	sameSite: 'none',
	maxAge: (24*60*60*1000*2) // 24*2 hours
}))

app.locals = {
	"isProduction": isProduction,
	"websiteUrl": dataJson.websiteUrl,
	"LAServices": dataJson.services,
	"companyData": dataJson.companyData,
	"pagesUrls": dataJson.pagesUrls,
	"urlParameters": dataJson.urlParameters,
	"outsidePagesUrls": dataJson.outsidePagesUrls,
	"promo": dataJson.promo,
	"chat": dataJson.chat,
	"servicesWeProvide": dataJson.services,
	"isProduction": isProduction,
	"provideAnalytics": true
};

const transporter = nodemailer.createTransport({
	host: 'SSL0.OVH.NET',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: 'equipe@les-arroseurs.com',
		pass: process.env.SMTP_PASS
	},
    tls: {
        rejectUnauthorized: false
    }
});


/********** INDEX **********/
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.status(200);
    res.render('index.ejs', {pageKey: 'index'});
})

/********** CONTACT **********/
.get('/' + dataJson.pagesUrls.contact, function(req, res) {

	const urlParameters = querystring.parse(url.parse(req.url).query);
	var formToDisplay = null;
	var formResult = null;
	var location = null;

	if(urlParameters.objet && urlParameters.objet != 'undefined' && urlParameters.objet != '') {formToDisplay = urlParameters.objet;}
	if(urlParameters.formResult && urlParameters.formResult != 'undefined' && urlParameters.formResult != '') {formResult = urlParameters.formResult;}
	if(urlParameters.location && urlParameters.location != 'undefined' && urlParameters.location != '') {location = urlParameters.location;}

	res.setHeader('Content-Type', 'text/html');
	res.status(200);
    res.render('contact.ejs', {
		pageKey: 'contact',
		availableCities: dataJson.availableCities,
		formToDisplay: formToDisplay,
		formResult: formResult,
		location: location
	});
})

/********** SEND MESSAGE **********/
.post('/' + dataJson.pagesUrls.contact + '/' + dataJson.pagesUrls.contactForms.writeToUs, function(req, res) {
	const params = req.body;
	if(
		'sendMessageForm_email' in params == false || params.sendMessageForm_email.length == 0 || 
		'sendMessageForm_message' in params == false || params.sendMessageForm_message.length == 0 ||
		'sendMessageForm_referer' in params == false || params.sendMessageForm_referer.length == 0
	) {
		const error = 'result=messageNotSent';
		console.log("Erreur : " + error)
		res.redirect('/' + dataJson.pagesUrls.contact + '?objet=' + dataJson.urlParameters.contact.writeToUs + '&formResult=messageNotSent');
		return ;
	}
	
	var recapDataTabForClient = {
		d0: {"label": "Email", "value": params.sendMessageForm_email},
		d1: {"label": "Message", "value": ('<em style="opacity:.7">' + params.sendMessageForm_message.replace(/\n/g, "<br/>") + "</em>")}
	}
	var recapDataTabForAdmin = {
		d0: {"label": "Email", "value": params.sendMessageForm_email},
		d1: {"label": "Message", "value": ('<em style="opacity:.7">' + params.sendMessageForm_message.replace(/\n/g, "<br/>") + "</em>")},
		d3: {"label": "Referer", "value": params.sendMessageForm_referer}
	}

	if('sendMessageForm_city' in params == false || params.sendMessageForm_city.length == 0) {
		recapDataTabForAdmin.d2 = {"label": "Commune", "value": "<em style='opacity:.7'>Commune non renseignée</em>"}
	} else {
		recapDataTabForClient.d2 = {"label": "Commune", "value": params.sendMessageForm_city}
		recapDataTabForAdmin.d2 = {"label": "Commune", "value": params.sendMessageForm_city}
	}

	const recapHtmlTabForClient = modules.buildRecapTabForEmailHtml(recapDataTabForClient, null);
	const recapHtmlTabForAdmin = modules.buildRecapTabForEmailHtml(recapDataTabForAdmin, null);

	const bodyEmailHtmlForClient = fs.readFileSync(emailTemplatesPath + 'visitor_post_message_FOR_VISITOR.html', 'utf8') + recapHtmlTabForClient;
	const bodyEmailHtmlForAdmin = fs.readFileSync(emailTemplatesPath + 'visitor_post_message_FOR_ADMIN.html', 'utf8') + recapHtmlTabForAdmin;

	const fullEmailHtmlForClient = modules.buildEmailHtml(bodyEmailHtmlForClient, null, dataJson.companyData);
	const fullEmailHtmlForAdmin = modules.buildEmailHtml(bodyEmailHtmlForAdmin, null, dataJson.companyData);
	
	const mailOptionsForClient = {
		from: 'Les Arroseurs <' + dataJson.mailer.email.ADMIN_NO_REPLY_EMAIL + '>',
		to: params.sendMessageForm_email,
		subject: dataJson.mailer.subject.FOR_VISITOR__VISITOR_SENT_MESSAGE,
		html: fullEmailHtmlForClient
	};
	
	const mailOptionsForAdmin =  {
		from: 'Les Arroseurs <' + dataJson.mailer.email.ADMIN_NO_REPLY_EMAIL + '>',
		to: dataJson.mailer.email.ADMIN_CONTACT_EMAIL,
		subject: dataJson.mailer.subject.FOR_ADMIN__VISITOR_SENT_MESSAGE,
		html: fullEmailHtmlForAdmin
	};

/* SEND EMAIL TO VISITOR */
	transporter.sendMail(mailOptionsForClient, function(error, info) {
		if(error) {
			console.log("ADMIN 0011 | Erreur lors de l'envoi d'un email : " + error);
			res.redirect('/' + dataJson.pagesUrls.contact + '?objet=' + dataJson.urlParameters.contact.writeToUs + '&formResult=messageNotSent');
			return ;
		}
		console.log("ADMIN 0011 | Email envoyé : " + info.response);
		res.redirect('/' + dataJson.pagesUrls.contact + '?objet=' + dataJson.urlParameters.contact.writeToUs + '&formResult=messageSent');
	});
	transporter.close();
/* SEND EMAIL TO ADMIN */
	transporter.sendMail(mailOptionsForAdmin, function(error, info) {
		if(error) {
			console.log("ADMIN 0011 | Erreur lors de l'envoi d'un email : " + error);
			return ;
		}
		console.log("ADMIN 0011 | Email envoyé : " + info.response);
	});
	transporter.close();
})


/********** BOOK PHONE APPOINTMENT **********/
.post('/' + dataJson.pagesUrls.contact + '/' + dataJson.pagesUrls.contactForms.bookAppointment, function(req, res) {
	const params = req.body;
	if(
		'bookPhoneAppointment_date' in params == false || params.bookPhoneAppointment_date.length == 0 || 
		'bookPhoneAppointment_hours' in params == false || params.bookPhoneAppointment_hours.length == 0 ||
		'bookPhoneAppointment_minutes' in params == false || params.bookPhoneAppointment_minutes.length == 0 ||
		'bookPhoneAppointment_email' in params == false || params.bookPhoneAppointment_email.length == 0 ||
		'bookPhoneAppointment_phone' in params == false || params.bookPhoneAppointment_phone.length == 0 ||
		'bookPhoneAppointment_referer' in params == false || params.bookPhoneAppointment_referer.length == 0
	) {
		const error = 'result=appointmentNotBooked';
		console.log("Erreur : " + error)
		res.redirect('/' + dataJson.pagesUrls.contact + '?' + error);
		return ;
	}

	const recapDataTabForAdmin = {
		d0: {"label": "Email", "value": params.bookPhoneAppointment_email},
		d1: {"label": "Referer", "value": params.bookPhoneAppointment_referer}
	}
	const recapHtmlTabForAdmin = modules.buildRecapTabForEmailHtml(recapDataTabForAdmin, null);

	const emailTemplateForClient = fs.readFileSync(emailTemplatesPath + 'visitor_book_appointment_VISITOR.html', 'utf8');
	const emailTemplateForAdmin = fs.readFileSync(emailTemplatesPath + 'visitor_book_appointment_ADMIN.html', 'utf8') + recapHtmlTabForAdmin;

	const fullEmailHtmlForClient = modules.buildEmailHtml(emailTemplateForClient, params, dataJson.companyData);
	const fullEmailHtmlForAdmin = modules.buildEmailHtml(emailTemplateForAdmin, params, dataJson.companyData);
	
	const mailOptionsForClient = {
		from: 'Les Arroseurs <' + dataJson.mailer.email.ADMIN_NO_REPLY_EMAIL + '>',
		to: params.bookPhoneAppointment_email,
		subject: dataJson.mailer.subject.FOR_VISITOR__VISITOR_BOOKED_APPOINTMENT,
		html: fullEmailHtmlForClient
	};
	
	const mailOptionsForAdmin =  {
		from: 'Les Arroseurs <' + dataJson.mailer.email.ADMIN_NO_REPLY_EMAIL + '>',
		to: dataJson.mailer.email.ADMIN_CONTACT_EMAIL,
		subject: dataJson.mailer.subject.FOR_ADMIN__VISITOR_BOOKED_APPOINTMENT,
		html: fullEmailHtmlForAdmin
	};

/* SEND EMAIL TO VISITOR */
	transporter.sendMail(mailOptionsForClient, function(error, info) {
		if(error) {
			console.log("ADMIN 0012 | Erreur lors de l'envoi d'un email : " + error);
			res.redirect('/' + dataJson.pagesUrls.contact + '?objet=' + dataJson.urlParameters.contact.bookAppointment + '&formResult=appointmentNotBooked');
			return ;
		}
		console.log("ADMIN 0012 | Email envoyé : " + info.response);
		res.redirect('/' + dataJson.pagesUrls.contact + '?objet=' + dataJson.urlParameters.contact.bookAppointment + '&formResult=appointmentBooked');
	});
	transporter.close();
/* SEND EMAIL TO ADMIN */
	transporter.sendMail(mailOptionsForAdmin, function(error, info) {
		if(error) {
			console.log("ADMIN 0012 | Erreur lors de l'envoi d'un email : " + error);
			return ;
		}
		console.log("ADMIN 0012 | Email envoyé : " + info.response);
	});
	transporter.close();
})

/******************** ERRORs & LISTEN ********************/

.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.status(404);
	console.log("Contenu non chargé : " + url.parse(req.url).href);
    res.redirect('/');
});

app.listen(PORT);