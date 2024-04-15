package csci5409.blogapp.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import csci5409.blogapp.model.User;
import csci5409.blogapp.util.BlogAppUtil;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;

@Repository
public class UserRepository {

	@Autowired
	private BlogAppUtil blogAppUtil;
	
	public void saveUser(User user) {
		DynamoDbTable<User> userTable = blogAppUtil.getUserTable();
		userTable.putItem(user);
	}
	
	public User getUser(String userId) {
		DynamoDbTable<User> userTable = blogAppUtil.getUserTable();
		return userTable.getItem(Key.builder().partitionValue(userId).build());	
	}
}
