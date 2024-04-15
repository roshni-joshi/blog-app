package csci5409.blogapp.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@DynamoDbBean
public class User {

	private String email;
	private String firstname;
	private String lastname;
	private String password;
	
	@DynamoDbAttribute("email")
	@DynamoDbPartitionKey
	public String getEmail() {
		return email;
	}
	
	@DynamoDbAttribute("firstname")
	public String getFirstname() {
		return firstname;
	}
	
	@DynamoDbAttribute("lastname")
	public String getLastname() {
		return lastname;
	}
	
	@DynamoDbAttribute("password")
	public String getPassword() {
		return password;
	}
}
