package revature.project1.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import revature.project1.models.User;
import revature.project1.utils.ConnectionFactory;

public class UserDAOImpl implements UserDAO {

@Override
public User createUser(String username, String password, 
                  String  firstname, String lastname, 
                  String email, into roleId){
                  
     return null;
}

	@Override
	public User login(String username, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getUserId(String username) {
		int userId = -1;
		try(Connection conn = ConnectionFactory.getInstance().getConnection();){
			conn.setAutoCommit(false);
			String getId = "SELECT ers_users_id FROM ers_users WHERE ers_username = ?";
			PreparedStatement pstmtgetId = conn.prepareStatement(getId);
			pstmtgetId.setString(1, username);
			ResultSet rs = pstmtgetId.executeQuery();
			if (!rs.next()) {
				return -1;
			}
			userId = rs.getInt("ers_users_id");
			conn.commit();
			conn.close();
			
		} catch (SQLException e) {

		}
		
		return userId;
	}

}
