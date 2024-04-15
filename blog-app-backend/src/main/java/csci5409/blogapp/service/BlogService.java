package csci5409.blogapp.service;

import java.util.List;

import csci5409.blogapp.model.BlogDTO;

public interface BlogService {

	void saveBlog(BlogDTO blogDTO);
	
	List<BlogDTO> getAllBlogs();
	
	void deleteBlog(String blogId);
}
