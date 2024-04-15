package csci5409.blog.app.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.SQSEvent;
import com.amazonaws.services.lambda.runtime.events.SQSEvent.SQSMessage;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sesv2.SesV2Client;
import software.amazon.awssdk.services.sesv2.model.Body;
import software.amazon.awssdk.services.sesv2.model.Content;
import software.amazon.awssdk.services.sesv2.model.Destination;
import software.amazon.awssdk.services.sesv2.model.EmailContent;
import software.amazon.awssdk.services.sesv2.model.Message;
import software.amazon.awssdk.services.sesv2.model.SendEmailRequest;
import software.amazon.awssdk.services.sesv2.model.SesV2Exception;

public class EmailLambdaRequestHandler implements RequestHandler<SQSEvent, String> {

	@Override
	public String handleRequest(SQSEvent event, Context context) {
		String message = "";
		for (SQSMessage msg : event.getRecords()) {
			message = new String(msg.getBody());
			System.out.println("Message : " + new String(msg.getBody()));
		}
		
		String[] messageData = message.split(":::");
		
		System.setProperty("aws.accessKeyId", "AKIugfccUT66W26BFNNC");
		System.setProperty("aws.secretAccessKey", "HvLv9f8Is3xbqqJVFdsaqrrefPRWlohAUnwTc3st/");

		Region region = Region.US_EAST_1;
		System.out.println("Region : " + region);
		SesV2Client sesv2Client = SesV2Client.builder().region(region).build();

		String bodyHTML = "<html>" + "<head></head>" + "<body>" + "<h1>Hello!</h1>"
				+ "<p>You have received a comment on your blog '" + messageData[1] + "' from '" + messageData[2] + "'.</p>" + "</body>"
				+ "</html>";

		Destination destination = Destination.builder().toAddresses(messageData[0]).build();
		Content content = Content.builder().data(bodyHTML).build();
		Content sub = Content.builder().data("Comment Added To The Blog").build();
		Body body = Body.builder().html(content).build();

		Message msg = Message.builder().subject(sub).body(body).build();
		EmailContent emailContent = EmailContent.builder().simple(msg).build();
		SendEmailRequest emailRequest = SendEmailRequest.builder().destination(destination).content(emailContent)
				.fromEmailAddress("rosh7299@gmail.com").build();
		try {
			System.out.println("Sending email");
			sesv2Client.sendEmail(emailRequest);
			System.out.println("email was sent");
		} catch (SesV2Exception e) {
			System.err.println(e.awsErrorDetails().errorMessage());
			System.exit(1);
		}
		return ("email sent");
	}

}
