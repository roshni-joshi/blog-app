package csci5409.blogapp.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import csci5409.blogapp.model.Blog;
import csci5409.blogapp.util.BlogAppUtil;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;

@Repository
public class BlogRepository {

	@Autowired
	private BlogAppUtil blogAppUtil;
	
	public void saveBlog(Blog blog) {
		DynamoDbTable<Blog> blogTable = blogAppUtil.getBlogTable();
		if(blog.getBlogId() == null) {
			blog.setBlogId("BLOG" + String.valueOf(new Date().getTime()));
			blogTable.putItem(blog);
		} else {
			blogTable.updateItem(blog);
		}
		
	}
	
	public void deleteBlog(String blogId) {
		DynamoDbTable<Blog> blogTable = blogAppUtil.getBlogTable();
		blogTable.deleteItem(Key.builder().partitionValue(blogId).build());
	}
	
	public Blog getBlog(String blogId) {
		DynamoDbTable<Blog> blogTable = blogAppUtil.getBlogTable();
		return blogTable.getItem(Key.builder().partitionValue(blogId).build());	
	}
	
	public List<Blog> getAllBlogs() {
		DynamoDbTable<Blog> blogTable = blogAppUtil.getBlogTable();
		Iterator<Blog> blogIterator = blogTable.scan().items().iterator();
        List<Blog> blogList = new ArrayList<Blog>();
        while(blogIterator.hasNext()) {
        	blogList.add(blogIterator.next());
        }
        return blogList;
	}
}
