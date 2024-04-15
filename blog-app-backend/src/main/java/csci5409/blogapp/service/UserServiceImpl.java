package csci5409.blogapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csci5409.blogapp.model.User;
import csci5409.blogapp.repository.UserRepository;
import csci5409.blogapp.util.BlogAppUtil;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void saveUser(User user) {
		user.setPassword(BlogAppUtil.encryptPassword(user.getPassword()));
		userRepository.saveUser(user);
	}

	@Override
	public User validateUser(User user) {
		try {
			User savedUser = userRepository.getUser(user.getEmail());
			if(savedUser != null && savedUser.getEmail().equals(user.getEmail()) 
					&& savedUser.getPassword().equals(BlogAppUtil.encryptPassword(user.getPassword()))) {
				savedUser.setPassword("");
				return savedUser;
			}
		} catch (Exception e) {
			return new User();
		}
		return new User();
	}
}
