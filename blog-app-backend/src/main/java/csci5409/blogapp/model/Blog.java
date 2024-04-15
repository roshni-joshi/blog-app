package csci5409.blogapp.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamoDbBean
public class Blog {

	private String blogId;
	private String title;
	private String author;
	private String date;
	private String content;
	private String comments;
	
	@DynamoDbAttribute("blogId")
	@DynamoDbPartitionKey
	public String getBlogId() {
		return blogId;
	}
	
	@DynamoDbAttribute("title")
	public String getTitle() {
		return title;
	}
	
	@DynamoDbAttribute("author")
	public String getAuthor() {
		return author;
	}
	
	@DynamoDbAttribute("date")
	public String getDate() {
		return date;
	}
	
	@DynamoDbAttribute("content")
	public String getContent() {
		return content;
	}
	
	@DynamoDbAttribute("comments")
	public String getComments() {
		return comments;
	}
}
