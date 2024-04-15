package csci5409.blogapp.mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import csci5409.blogapp.model.Blog;
import csci5409.blogapp.model.BlogDTO;
import csci5409.blogapp.model.Comment;
import csci5409.blogapp.model.User;
import csci5409.blogapp.repository.UserRepository;

@Component
public class BlogMapperImpl implements BlogMapper {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Blog blogDTOToBlog(BlogDTO blogDTO) {
		if(blogDTO == null) {
			return null;
		}
		List<Comment> comments = blogDTO.getComments();
		String modifiedComments = comments.stream().map(comment -> comment.getName() + "-" + comment.getMessage()).collect(Collectors.joining(","));
		
		Blog blog = new Blog();
		blog.setBlogId(blogDTO.getBlogId());
		blog.setTitle(blogDTO.getTitle());
		blog.setAuthor(blogDTO.getAuthor().getEmail());
		blog.setDate(blogDTO.getDate());
		blog.setContent(blogDTO.getContent());
		blog.setComments(modifiedComments);
		return blog;
	}

	@Override
	public BlogDTO blogToBlogDTO(Blog blog) {
		if(blog == null) {
			return null;
		}
		List<Comment> dtoComments = new ArrayList<Comment>();
		
		if(blog.getComments() != null && !blog.getComments().isBlank() && !blog.getComments().isEmpty()) {
			List<String> comments = Arrays.asList(blog.getComments().split(","));
			
			if(comments != null && !comments.isEmpty()) {
				comments.forEach(data -> {
					Comment comment =  new Comment();
					comment.setName(data.split("-")[0]);
					comment.setMessage(data.split("-")[1]);
					dtoComments.add(comment);
				});
			}
		}
	
		User user = userRepository.getUser(blog.getAuthor());
		user.setPassword("");
		
		BlogDTO blogDTO = new BlogDTO();
		blogDTO.setBlogId(blog.getBlogId());
		blogDTO.setTitle(blog.getTitle());
		blogDTO.setAuthor(user);
		blogDTO.setDate(blog.getDate());
		blogDTO.setContent(blog.getContent());
		blogDTO.setComments(dtoComments);
		return blogDTO;
	}

}
