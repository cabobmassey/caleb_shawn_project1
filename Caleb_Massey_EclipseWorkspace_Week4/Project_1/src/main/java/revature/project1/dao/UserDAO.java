package revature.project1.dao;

import revature.project1.models.User;

public interface UserDAO {

	User login (String username, String password);
	int getUserId(String username);
	User createUser(String username, String password, 
            String  firstname, String lastname, 
            String email, int roleId);
}
