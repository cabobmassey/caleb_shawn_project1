package revature.project1.dao;

import revature.project1.models.Users;
import revature.project1.userroles.UserRoles;

public interface UserDAO {

	Users login (String username, String password);
	int getUserId(String username);
	boolean createUser(String username, String password, 
            String  firstname, String lastname, 
            String email, UserRoles roleId);
	boolean checkIfUserExists(String usernameOrEmail);
}