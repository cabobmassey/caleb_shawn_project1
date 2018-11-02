package revature.project1.services;

import revature.project1.dao.UserDAO;
import revature.project1.dao.UserDAOImpl;
import revature.project1.models.Users;

public class UsersService {
	private UserDAO userDAO = new UserDAOImpl();
	
	public Users login(String username, String password) {
		Users u = userDAO.login(username, password);
		return u;
	}
	
	public int getUserId(String username) {
		int userId = userDAO.getUserId(username);
		return userId;
	}
	
	public boolean createUser(String username, String password, String firstname, String lastname, String email,
			int roleId) {
		boolean createdUser = false;
		if (checkIfValidRole(roleId)) {
			createdUser = userDAO.createUser(username, password, firstname, lastname, email, roleId);
		}else {
			return false;
		}
		return createdUser;
	}
	
	public boolean checkIfUserExistsById(int userId) {
		return userDAO.checkIfUserExistsById(userId);
	}
	
	private boolean checkIfValidRole(int roleId) {
		if (roleId >= 1 && roleId <= 2) {
			return true;
		}else {
			return false;
		}
	}
	
//	public boolean isEmailAvailable(String emailAddress) {
//		Users u = userDAO.getUserByEmailAddress(emailAddress);
//		
//		if(u == null)
//			return true;
//		
//		return false;
//	}
//	
//	public boolean isUsernameAvailable(String username) {
//		Users u = userDAO.getUserByUsername(username);
//		
//		if(u == null)
//			return true;
//		
//		return false;
//	}
}
