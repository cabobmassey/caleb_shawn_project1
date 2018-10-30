package revature.project1.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import revature.project1.models.User;
import revature.project1.userroles.UserRoles;
import revature.project1.utils.ConnectionFactory;

public class UserDAOImpl implements UserDAO {

	@Override
	public User login(String username, String password) {
		User existingUser = null;
        
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
            existingUser = new User();
            if (loginResultSet.next()) {
                existingUser.setUserId(loginResultSet.getInt("ers_users_id"));
                existingUser.setFirstName(loginResultSet.getString("user_first_name"));
                existingUser.setLastName(loginResultSet.getString("user_last_name"));
                existingUser.setUsername(loginResultSet.getString("ers_username"));
                existingUser.setPassword(loginResultSet.getString("ers_password"));
                existingUser.setEmail(loginResultSet.getString("user_email"));
                int userRole = loginResultSet.getInt("user_role_id");
                if (userRole == 1) {
                	existingUser.setUserRoleId(UserRoles.AUTHOR);
                }else if (userRole == 2) {
                	existingUser.setUserRoleId(UserRoles.RESOLVER);
                }
            }
    
            conn.commit();
            conn.close();
        } catch (SQLException e) {
            //e.printStackTrace();
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

		}
		
		return userId;
	}

	@Override
	public boolean createUser(String username, String password, String firstname, String lastname, String email,
			int roleId) {
		try(Connection conn = ConnectionFactory.getInstance().getConnection();){
            conn.setAutoCommit(false);
            
            // determine if a user already exists in the database by retrieving the passed-in username and email
            // if the passed-in username or email is found, then the account already exists and false is returned
            String sqlRetrieveUser = "select * from ers_users where ers_username = ? OR ers_email = ?";
            PreparedStatement pstmtUsernames = conn.prepareStatement(sqlRetrieveUser);
            pstmtUsernames.setString(1, username);
            pstmtUsernames.setString(2,  email);
            ResultSet checkIfUserExists = pstmtUsernames.executeQuery();
            
            // Once the query is executed, the result is placed in a ResultSet
            // The ResultSet maintains a cursor; initially it is placed before the first row. The first call to the next() method will move the cursor forward to the first record
            // If the record is valid, then the account exists. If there are no rows in the ResultSet, the account does not exist
            if (!checkIfUserExists.next()) {
                // since the account does not already exist, a new user is inserted into the Users table
                String sqlAddUser = "insert into Users (firstname, lastname, accountstate) values(?, ?, ?)";
                String[] userKeys = new String[1];
                userKeys[0] = "userid";
                
                // creates a PreparedStatement object which contains the auto-generated keys produced from query execution; the array holds the names of the fields that contains auto-generated fields
                PreparedStatement pstmtUser = conn.prepareStatement(sqlAddUser, userKeys);
                pstmtUser.setString(1, newUser.getFirstName());
                pstmtUser.setString(2, newUser.getLastName());
                pstmtUser.setInt(3, 0);
                
                int rowsInsertedUser = pstmtUser.executeUpdate(); // executes the DML statement; inserts a new User into the Users table
                
                ResultSet rsInsertUser = pstmtUser.getGeneratedKeys(); // get generated keys produced from the query
                
                if(rowsInsertedUser != 0 && rsInsertUser.next()) {
                    newUser.setUserId(rsInsertUser.getInt(1));
                }else if (rowsInsertedUser == 0) {
                    return false;
                }
                
                // once the user has been inserted into the Users table, a new account associated with that user can be created and inserted into the Accounts table
                String sqlAddAccount = "insert into Accounts (userid, username, password) values(?,?,?)";
                
                // the PreparedStatement is used to represent a parameterized sql statement
                PreparedStatement pstmtAccount = conn.prepareStatement(sqlAddAccount);
                pstmtAccount.setInt(1, newUser.getUserId());
                pstmtAccount.setString(2, username);
                pstmtAccount.setString(3, password);

                int rowsInsertedAccount = pstmtAccount.executeUpdate(); // inserts a new account into the Accounts table
                
                if (rowsInsertedAccount == 0) {
                    return false;
                }
                
                conn.commit();
                conn.close();
            }else {
                return false;
            }
            
            
        } catch (SQLException e) {
            //e.printStackTrace();
        }
        
        return true;
	}

}
