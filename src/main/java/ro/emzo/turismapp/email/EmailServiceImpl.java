package ro.emzo.turismapp.email;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;
    
    @Override
    public void sendNewPersonalizedOffer(String[] to) {
    	try {
    		MimeMessage mail = mailSender.createMimeMessage();
    		MimeMessageHelper mailHelper = new MimeMessageHelper(mail, true);
    		mailHelper.setTo(to);
    		mailHelper.setSubject("New offer request was issued");
    		Context context = new Context();
    		context.setVariable("emailTitle", "<b>A new personalized offer request was issued!</b>");
    		
    		// rest of the email
    		
    		String body = templateEngine.process("emails/new-personalized-offer", context);
    		mailHelper.setText(body, true);
    		mailSender.send(mail);
    	} catch (MessagingException e) {
    		e.printStackTrace();
    	}
    }
}
