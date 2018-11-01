package revature.project1.services;

import revature.project1.dao.UserDAOImpl;
import revature.project1.models.Users;

public class UsersService {
	private UserDAOImpl userDAO = new UserDAOImpl();
	
	public Users login(String username, String password) {
		Users u = userDAO.login(username, password);
		return u;
	}
	
	public int getUserById(String username) {
		return -1;
	}
	
	public boolean createUser(String username, String password, String firstname, String lastname, String email,
			int roleId) {
		return false;
	}
	
	public boolean checkIfUsernameOrEmailExists(String usernameOrEmail) {
		return false;
	}
}
