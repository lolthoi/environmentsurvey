using EnvironmentSurvey.WebAPI.ClientSide.Common;
using EnvironmentSurvey.WebAPI.ClientSide.Models;
using MailKit.Security;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EnvironmentSurvey.WebAPI.BusinessLogic
{
    public interface ISendMailService
    {
        Task SendMail(MailModel mailContent);
        Task SendWelcomeEmailAsync(string email, string subject, string username, string token);
        Task SendEmailConfirm(string email, string subject, string username, string message);
        Task SendEmailAward(string email, string surveyName, string username, string subject, string message);
    }
    public class SendMailService : ISendMailService
    {
        private readonly MailSettings mailSettings;
        private readonly IHostingEnvironment _hostingEnvironment;

        public SendMailService(IOptions<MailSettings> _mailSettings, IHostingEnvironment hostingEnvironment)
        {
            mailSettings = _mailSettings.Value;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task SendWelcomeEmailAsync(string email, string subject, string username, string token)
        {
            string FilePath = _hostingEnvironment.WebRootPath + @"/templ/email.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[Username]", username);
            MailText = MailText.Replace("[userToken]", token);

            MailModel mailContent = new MailModel();
            mailContent.To = email;
            mailContent.Subject = subject;
            mailContent.Body = MailText;

            await SendMail(mailContent);
        }

        public async Task SendMail(MailModel mailContent)
        {
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(mailSettings.DisplayName, mailSettings.Mail);
            email.From.Add(new MailboxAddress(mailSettings.DisplayName, mailSettings.Mail));
            email.To.Add(MailboxAddress.Parse(mailContent.To));
            email.Subject = mailContent.Subject;


            var builder = new BodyBuilder();

            builder.HtmlBody = mailContent.Body;
            email.Body = builder.ToMessageBody();

            // dùng SmtpClient của MailKit
            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            smtp.Connect(mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(mailSettings.Mail, mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailConfirm(string email, string subject, string username, string message)
        {
            string FilePath = _hostingEnvironment.WebRootPath + @"/templ/confirm.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[Username]", username);
            MailText = MailText.Replace("[Message]", message);

            MailModel mailContent = new MailModel();
            mailContent.To = email;
            mailContent.Subject = subject;
            mailContent.Body = MailText;
            await SendMail(mailContent);
        }

        public async Task SendEmailAward(string email, string surveyName, string username, string subject, string message)
        {
            string FilePath = _hostingEnvironment.WebRootPath + @"/templ/AwardTemplate.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[Username]", username);
            MailText = MailText.Replace("[Message]", message);

            MailModel mailContent = new MailModel();
            mailContent.To = email;
            mailContent.Subject = subject;
            mailContent.Body = MailText;
            await SendMail(mailContent);
        }
    }
}
