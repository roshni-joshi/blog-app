package csci5409.blogapp.mapper;

import csci5409.blogapp.model.Blog;
import csci5409.blogapp.model.BlogDTO;

public interface BlogMapper {

	Blog blogDTOToBlog(BlogDTO blogDTO);
	
	BlogDTO blogToBlogDTO(Blog blog);
}
