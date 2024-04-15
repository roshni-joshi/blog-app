package csci5409.blogapp.service;

import csci5409.blogapp.model.User;

public interface UserService {

	User validateUser(final User user);
	
	void saveUser(final User user);
	
}
