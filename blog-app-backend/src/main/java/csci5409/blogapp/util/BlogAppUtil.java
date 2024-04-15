package csci5409.blogapp.util;

import java.math.BigInteger;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import csci5409.blogapp.model.Blog;
import csci5409.blogapp.model.BlogDTO;
import csci5409.blogapp.model.User;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

@Component
public class BlogAppUtil {
	
	@Value("${aws.accessKey}")
	private String accessKey;
	
	@Value("${aws.secretKey}")
	private String secretKey;
	
	@Value("${aws.sessionToken}")
	private String sessionToken;

	public DynamoDbTable<User> getUserTable() {
		DynamoDbEnhancedClient dbClient = getDynamoDbClient();
		DynamoDbTable<User> userTable = dbClient.table("user", TableSchema.fromBean(User.class));
		return userTable;
	}
	
	public DynamoDbTable<Blog> getBlogTable() {
		DynamoDbEnhancedClient dbClient = getDynamoDbClient();
		DynamoDbTable<Blog> blogTable = dbClient.table("blog", TableSchema.fromBean(Blog.class));
		return blogTable;
	}
	
	private DynamoDbEnhancedClient getDynamoDbClient() {
		setAWSCredentials();
		Region region = Region.US_EAST_1;
        DynamoDbClient ddb = DynamoDbClient.builder()
                .region(region)
                .build();
        
        DynamoDbEnhancedClient dbClient = DynamoDbEnhancedClient.builder().dynamoDbClient(ddb).build();
        return dbClient;
	}
	
	private void setAWSCredentials() {
		System.setProperty("aws.accessKeyId", accessKey);
		System.setProperty("aws.secretAccessKey", secretKey);
		System.setProperty("aws.sessionToken", sessionToken);
		System.setProperty("aws.region", "us-east-1");
	}
	
	public static String encryptPassword(final String password) {
		String encryptedPassword = "";
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(password.getBytes("UTF-8"));
			byte[] mddigest = messageDigest.digest();
			BigInteger bigInteger = new BigInteger(1, mddigest);
			encryptedPassword = String.format("%064x", bigInteger);
		} catch (Exception e) {
			System.out.println("Exception occured in encryption");
			e.printStackTrace();
		}
		return encryptedPassword;
	}
	
	public void sendSQSMessage(BlogDTO blogDTO) {
		setAWSCredentials();
		try {
			String queueUrl = "https://sqs.us-east-1.amazonaws.com/730335546483/blog-app-queue";
			SqsClient sqsClient = SqsClient.builder()
	                .region(Region.US_EAST_1)
	                .build();
			SendMessageRequest sendMsgRequest = SendMessageRequest.builder()
	                .queueUrl(queueUrl)
	                .messageBody(blogDTO.getAuthor().getEmail() + ":::" + 
	                		blogDTO.getTitle() + ":::" +
	                		blogDTO.getComments().get(0).getName())
	                .delaySeconds(5)
	                .build();
			sqsClient.sendMessage(sendMsgRequest);
			sqsClient.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
