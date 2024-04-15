package csci5409.blogapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csci5409.blogapp.mapper.BlogMapper;
import csci5409.blogapp.model.Blog;
import csci5409.blogapp.model.BlogDTO;
import csci5409.blogapp.repository.BlogRepository;
import csci5409.blogapp.util.BlogAppUtil;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogRepository blogRepository;
	
	@Autowired
	private BlogMapper blogMapper;
	
	@Autowired
	private BlogAppUtil blogAppUtil;
	
	@Override
	public void saveBlog(BlogDTO blogDTO) {
		if(blogDTO.getBlogId() != null) {
			blogAppUtil.sendSQSMessage(blogDTO);
		}
		Blog blog = blogMapper.blogDTOToBlog(blogDTO);
		blogRepository.saveBlog(blog);
	}

	@Override
	public List<BlogDTO> getAllBlogs() {
		List<Blog> blogs = blogRepository.getAllBlogs();
		List<BlogDTO> blogDTOs = blogs.stream().map(blog -> blogMapper.blogToBlogDTO(blog)).collect(Collectors.toList());
		return blogDTOs;
	}

	@Override
	public void deleteBlog(String blogId) {
		if(blogId != null) {
			blogRepository.deleteBlog(blogId);
		}
	}
}
