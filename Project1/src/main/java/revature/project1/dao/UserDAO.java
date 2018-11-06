package revature.project1.dao;

import revature.project1.models.Users;

public interface UserDAO {

	Users login (String username, String password);
	int getUserId(String username);
	boolean createUser(String username, String password, 
            String  firstname, String lastname, 
            String email, int roleId);
	boolean checkIfUserExistsById(int userId);
	boolean isUsernameAvailable(String username);
	boolean isEmailAvailable(String email);
}