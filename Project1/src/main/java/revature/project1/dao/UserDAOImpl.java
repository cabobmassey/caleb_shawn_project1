package revature.project1.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import revature.project1.models.Users;
import revature.project1.utils.ConnectionFactory;

public class UserDAOImpl implements UserDAO {
	@Override
	public Users login(String username, String password) {
		Users existingUser = null;
        
        try(Connection conn = ConnectionFactory.getInstance().getConnection();){
            conn.setAutoCommit(false);
            
            // determine if the account exists; if no rows were affected by executeUpdate, then the account does not exist
            String sqlExistingAccount = "select * from ers_users where ers_username = ? AND ers_password = ?";
            PreparedStatement pstmtExisting = conn.prepareStatement(sqlExistingAccount);
            pstmtExisting.setString(1, username);
            pstmtExisting.setString(2, password);
            
            ResultSet loginResultSet = pstmtExisting.executeQuery(); // execute the query and retrieve the result of the query
            
            if (!loginResultSet.next()) {
                return existingUser;
            }
            
            /* since the user exists, retrieve the column values of the selected record 
            		from the User table and set the private fields of the new user */
            existingUser = new Users();
            if (loginResultSet.next()) {
                existingUser.setUserId(loginResultSet.getInt("ers_users_id"));
                existingUser.setFirstName(loginResultSet.getString("user_first_name"));
                existingUser.setLastName(loginResultSet.getString("user_last_name"));
                existingUser.setUsername(loginResultSet.getString("ers_username"));
                existingUser.setPassword(loginResultSet.getString("ers_password"));
                existingUser.setEmail(loginResultSet.getString("user_email"));
                existingUser.setUserRoleId(loginResultSet.getInt("user_role_id"));
            }
    
            conn.commit();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return existingUser;
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
			e.printStackTrace();
		}
		
		return userId;
	}
	
	

	@Override
	public boolean createUser(String username, String password, String firstname, String lastname, String email,
			int roleId) {
		try(Connection conn = ConnectionFactory.getInstance().getConnection();){
            conn.setAutoCommit(false);
                       
            // since the account does not already exist, a new user is inserted into the Users table
            String sqlAddUser = "insert into ers_users (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id) values(?, ?, ?, ?, ?, ?)";
                
            PreparedStatement pstmtUser = conn.prepareStatement(sqlAddUser);
            pstmtUser.setString(1, username);
            pstmtUser.setString(2, password);
            pstmtUser.setString(3, firstname);
            pstmtUser.setString(4, lastname);
            pstmtUser.setString(5, email);
            pstmtUser.setInt(6, roleId);
            
            int rowsInsertedUser = pstmtUser.executeUpdate(); // executes the DML statement; inserts a new User into the Users table; returns the number of rows affected
                
            if(rowsInsertedUser == 0) {
                return false;
            }
                
            conn.commit();
            conn.close();
            
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return true;
	}

	@Override
	public boolean checkIfUserExists(String usernameOrEmail) {
		try(Connection conn = ConnectionFactory.getInstance().getConnection();){
            
            // determine if the username or email is unique
            String sqlRetrieveUser = "select * from ers_users where ers_username = ? OR ers_email = ?";
            PreparedStatement pstmtUsernames = conn.prepareStatement(sqlRetrieveUser);
            pstmtUsernames.setString(1, usernameOrEmail);
            pstmtUsernames.setString(2,  usernameOrEmail);
            ResultSet checkIfUserExists = pstmtUsernames.executeQuery();
            
            // Once the query is executed, the result is placed in a ResultSet
            // The ResultSet maintains a cursor; initially it is placed before the first row. The first call to the next() method will move the cursor forward to the first record
            // If the record is valid, then the account exists. If there are no rows in the ResultSet, the account does not exist
            if (!checkIfUserExists.next()) {
            	return false;
            }
            
            conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
}