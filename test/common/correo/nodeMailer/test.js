import assert from 'assert'
import { MailSender } from '../index.js'
import { accountGmail, accountEthereal, accountInvalid, accountGmailInvalid } from './mailAccounts.js'
import { bodyHtml_1 } from './bodyHtml.js'

const smtpAccount = accountEthereal;
const smtpInvalidAccount = accountInvalid;
const smtpRejectedAccount = accountGmailInvalid;


describe('mailSender', function () {


  describe('Agegegar una cuenta smtp al mailSender.', function () {

    it('Al agregar una cuenta smtp correcta, debe devolver la misma con el estado aceptada.', function () {
      const account = smtpAccount
      const sender = MailSender();
      const result = sender.setCuenta(account);
      assert.deepEqual(result.account, account);
      assert.ok(result.accepted);
      assert.ok(!result.rejected);
    });

    it('Al agregar una cuenta smtp invália, debe devolver la misma con el estado rechazada.', function () {
      const account = smtpInvalidAccount
      const sender = MailSender();
      const result = sender.setCuenta(account);
      assert.deepEqual(result.account, account);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });

    it('Al agregar una cuenta smtp vacia, debe devolver la misma con el estado rechazada.', function () {
      const account = {};
      const sender = MailSender();
      const result = sender.setCuenta(account);
      assert.deepEqual(result.account, account);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });

    it('Al agregar una cuenta smtp undefined, debe devolver la misma con el estado rechazada.', function () {
      let account;
      const sender = MailSender();
      const result = sender.setCuenta(account);
      assert.deepEqual(result.account, account);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });
  });


  describe('Agegegar un mensaje.', function () {

    it('Al agregar un mensaje correcto, debe devolver el mismo con el estado aceptado.', function () {
      const message = { to: ['test@gmail.com'], subject: '', html: '' };
      const sender = MailSender();
      const result = sender.addMensaje(message);
      assert.deepEqual(result.message, message);
      assert.ok(result.accepted);
      assert.ok(!result.rejected);
    });

    it('Al agregar un mensaje sin una lista de destinatarios, debe devolver el mismo con el estado rechazado.', function () {
      const message = { to: 'test@gmail.com', subject: '', html: '' };
      const sender = MailSender();
      const result = sender.addMensaje(message);
      assert.deepEqual(result.message, message);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });

    it('Al agregar un mensaje sin asunto, debe devolver el mismo con el estado rechazado.', function () {
      const message = { to: ['test@gmail.com'], html: '' };
      const sender = MailSender();
      const result = sender.addMensaje(message);
      assert.deepEqual(result.message, message);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });

    it('Al agregar un mensaje sin body, debe devolver el mismo con el estado rechazado.', function () {
      const message = { to: ['test@gmail.com'], subject: '', };
      const sender = MailSender();
      const result = sender.addMensaje(message);
      assert.deepEqual(result.message, message);
      assert.ok(!result.accepted);
      assert.ok(result.rejected);
    });
  });


  describe('Envío indiviual', function () {

    it('Al enviar un mensaje exitosamente, debe devolver el mismo con los destinatarios aceptados y rechazados.', async function () {
      this.timeout(15000);
      const account = smtpAccount
      const message = { to: ['capurissedgard@gmail.com', 'echigah@gmail.com'], subject: 'TP MAIL GRUPO 9 ✔', html: bodyHtml_1 };
      const sender = MailSender(account);
      const result = await sender.enviarMail(message);
      assert.deepEqual(result.message, message);
      assert.deepEqual(result.accepted, message.to);
      assert.deepEqual(result.rejected, []);
    });

    it('Al enviar un mensaje sin configurar la cuenta, debe devolver un error.', async function () {
      this.timeout(15000);
      const message = { to: ['capurissedgard@gmail.com', 'echigah@gmail.com'], subject: 'TP MAIL GRUPO 9 ✔', html: bodyHtml_1 };
      const sender = MailSender();
      const ejecutar = async () => await sender.enviarMail(message);
      assert.rejects(ejecutar, Error);
    });

    it('Al agregar una cuenta smtp correcta y enviar mensaje exitosamente, debe devolver el mismo con los destinatarios aceptados y rechazados.', async function () {
      this.timeout(15000);
      const account = smtpAccount
      const message = { to: ['capurissedgard@gmail.com', 'echigah@gmail.com'], subject: 'TP MAIL GRUPO 9 ✔', html: bodyHtml_1 };
      const sender = MailSender();
      sender.setCuenta(account);
      const result = await sender.enviarMail(message);
      assert.deepEqual(result.message, message);
      assert.deepEqual(result.accepted, message.to);
      assert.deepEqual(result.rejected, []);
    });
  });


  describe('Envío masivo', function () {

    it('Al enviar un mensaje masivo exitosamente, debe devolver el mismo con los destinatarios aceptados y rechazados.', async function () {
      this.timeout(15000);
      const account = smtpAccount
      const sender = MailSender(account);
      const message1 = { to: ['capurissedgard@gmail.com'], subject: 'TP MAIL 1 GRUPO 9 ✔', html: bodyHtml_1 };
      const message2 = { to: ['echigah@gmail.com'], subject: 'TP MAIL 2 GRUPO 9 ✔', html: bodyHtml_1 };
      sender.addMensaje(message1);
      sender.addMensaje(message2);
      const result = await sender.enviarMails();
      assert.deepEqual(result.messages[0].message, message1);
      assert.deepEqual(result.messages[0].accepted, message1.to);
      assert.deepEqual(result.messages[0].rejected, []);
      assert.deepEqual(result.messages[1].message, message2);
      assert.deepEqual(result.messages[1].accepted, message2.to);
      assert.deepEqual(result.messages[1].rejected, []);
      assert.deepEqual(result.errorMessages, []);
    });

    it('Al enviar un mensaje masivo sin configurar la cuenta, debe devolver un error.', async function () {
      this.timeout(15000);
      const message = { to: ['capurissedgard@gmail.com'], subject: 'TP MAIL GRUPO 9 ✔', html: bodyHtml_1 };
      const sender = MailSender();
      sender.addMensaje(message);
      const ejecutar = async () => await sender.enviarMails();
      assert.rejects(ejecutar, Error);
    });

    it('Al agregar una cuenta smtp correcta y enviar un mensaje masivo exitosamente, debe devolver el mismo con los destinatarios aceptados y rechazados.', async function () {
      this.timeout(15000);
      const account = smtpAccount
      const sender = MailSender();
      sender.setCuenta(account);
      const message1 = { to: ['capurissedgard@gmail.com'], subject: 'TP MAIL 1 GRUPO 9 ✔', html: bodyHtml_1 };
      const message2 = { to: ['echigah@gmail.com'], subject: 'TP MAIL 2 GRUPO 9 ✔', html: bodyHtml_1 };
      sender.addMensaje(message1);
      sender.addMensaje(message2);
      const result = await sender.enviarMails();
      assert.deepEqual(result.messages[0].message, message1);
      assert.deepEqual(result.messages[0].accepted, message1.to);
      assert.deepEqual(result.messages[0].rejected, []);
      assert.deepEqual(result.messages[1].message, message2);
      assert.deepEqual(result.messages[1].accepted, message2.to);
      assert.deepEqual(result.messages[1].rejected, []);
      assert.deepEqual(result.errorMessages, []);
    });

    it('Al agregar una cuenta smtp correcta pero inválida y enviar un mensaje masivo exitosamente, debe devolver un error.', async function () {
      this.timeout(15000);
      const account = smtpRejectedAccount
      const message = { to: ['capurissedgard@gmail.com'], subject: 'TP MAIL GRUPO 9 ✔', html: bodyHtml_1 };
      const sender = MailSender(account);
      sender.addMensaje(message);
      const ejecutar = async () => await sender.enviarMails();
      assert.rejects(ejecutar, Error);
    });
  });
});