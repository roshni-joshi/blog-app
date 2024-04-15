package csci5409.blogapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import csci5409.blogapp.model.BlogDTO;
import csci5409.blogapp.model.User;
import csci5409.blogapp.service.BlogService;
import csci5409.blogapp.service.UserService;

@RestController
public class BlogAppController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private BlogService blogService;
	
	@GetMapping("/")
	public ResponseEntity<String> checkHealth() {
		return new ResponseEntity<String>("ok status", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		return new ResponseEntity<User>(userService.validateUser(user), HttpStatus.OK);
	}
	
	@PostMapping("/users")
	public ResponseEntity<String> saveUser(@RequestBody User user) {
		userService.saveUser(user);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@PostMapping("/blogs")
	public ResponseEntity<String> saveBlog(@RequestBody BlogDTO blogDTO) {
		blogService.saveBlog(blogDTO);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@DeleteMapping("/blogs/{blogId}")
	public ResponseEntity<String> deleteBlog(@PathVariable String blogId) {
		blogService.deleteBlog(blogId);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@GetMapping("/blogs")
	public ResponseEntity<List<BlogDTO>> getAllBlog() {
		List<BlogDTO> blogs = blogService.getAllBlogs();
		return new ResponseEntity<List<BlogDTO>>(blogs, HttpStatus.OK);
	}
}
