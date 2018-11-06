package revature.project1.dao;

import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;
import revature.project1.utils.ConnectionFactory;

public class ReimbursementDAOImpl implements ReimbursementDAO {

	@Override
	public ArrayList<Reimbursement> viewPastTickets(int authorId) {
		ArrayList<Reimbursement> requests = new ArrayList<Reimbursement>();

		try (Connection conn = ConnectionFactory.getInstance().getConnection();) {

			// This is a parameterized SQL query, using '?' as a placeholder for values that
			// will
			// be provided later.
			String sql = "SELECT * FROM ers_reimbursement WHERE reimb_author = ? AND reimb_status_id <> 1";

			// Get the PreparedStatement object from the Connection
			PreparedStatement pstmt = conn.prepareStatement(sql);

			// Set the value of the 1st '?' to the value of 'id'
			pstmt.setInt(1, authorId);

			// Execute the query and retrieve a ResultSet
			ResultSet rs = pstmt.executeQuery();

			// Iterate through the ResultSet and assign values to our Artist object
			while (rs.next()) {
				Reimbursement temp = new Reimbursement();
				temp.setReimb_id(rs.getInt("reimb_id"));
				temp.setReimb_amount(rs.getDouble("reimb_amount"));
				temp.setReimb_submitted(rs.getTimestamp("reimb_submitted"));
				temp.setReimb_resolved(rs.getTimestamp("reimb_resolved"));
				temp.setReimb_description(rs.getString("reimb_description"));
				temp.setReimb_receipt(rs.getBlob("reimb_receipt"));
				temp.setReimb_author(rs.getInt("reimb_author"));
				temp.setReimb_resolver(rs.getInt("reimb_resolver"));
				temp.setReimb_status_id(rs.getInt("reimb_status_id"));
				temp.setReimb_type_id(rs.getInt("reimb_type_id"));
				requests.add(temp);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return requests;

	}

	@Override
	public boolean addReimbursementRequest(double amount, Timestamp date_submitted, Timestamp date_resolved,
			String description, Blob receipt, int author, int statusId, int typeId) {

		try (Connection conn = ConnectionFactory.getInstance().getConnection();) {
			conn.setAutoCommit(false);

			// since the account does not already exist, a new user is inserted into the
			// Users table
			String sqlAddReimbursement = "insert into ers_reimbursement (reimb_amount, REIMB_SUBMITTED, REIMB_RESOLVED, REIMB_DESCRIPTION, REIMB_RECEIPT, REIMB_AUTHOR, REIMB_STATUS_ID, REIMB_TYPE_ID) values(?, ?, ?, ?, ?, ?, ?, ?)";

			PreparedStatement pstmtReimbursement = conn.prepareStatement(sqlAddReimbursement);
			pstmtReimbursement.setDouble(1, amount);
			pstmtReimbursement.setTimestamp(2, date_submitted);
			pstmtReimbursement.setTimestamp(3, date_resolved);
			pstmtReimbursement.setString(4, description);
			pstmtReimbursement.setBlob(5, receipt);
			pstmtReimbursement.setInt(6, author);
			pstmtReimbursement.setInt(7, statusId);
			pstmtReimbursement.setInt(8, typeId);

			int rowsInsertedUser = pstmtReimbursement.executeUpdate(); // executes the DML statement; inserts a new
																		// Reimbursement into the Reimbursement table;
																		// returns the number of rows affected

			if (rowsInsertedUser == 0) {
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
	public ArrayList<Reimbursement> viewAllReimbursements() {
		ArrayList<Reimbursement> requests = new ArrayList<>();

		try (Connection conn = ConnectionFactory.getInstance().getConnection();) {

			// Create our SQL query string
			String sql = "SELECT * FROM ers_reimbursement";

			// Obtain a Statement object from our Connection
			Statement stmt = conn.createStatement();

			// Execute the statement and retrieve a ResultSet object
			ResultSet rs = stmt.executeQuery(sql);

			// Iterate through the ResultSet object and create temporary Artist objects that
			// will be stored into our artists ArrayList
			while (rs.next()) {
				Reimbursement temp = new Reimbursement();
				temp.setReimb_id(rs.getInt("reimb_id"));
				temp.setReimb_amount(rs.getDouble("reimb_amount"));
				temp.setReimb_submitted(rs.getTimestamp("reimb_submitted"));
				temp.setReimb_resolved(rs.getTimestamp("reimb_resolved"));
				temp.setReimb_description(rs.getString("reimb_description"));
				temp.setReimb_receipt(rs.getBlob("reimb_receipt"));
				temp.setReimb_author(rs.getInt("reimb_author"));
				temp.setReimb_resolver(rs.getInt("reimb_resolver"));
				temp.setReimb_status_id(rs.getInt("reimb_status_id"));
				temp.setReimb_type_id(rs.getInt("reimb_type_id"));
				requests.add(temp);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return requests;
	}

	@Override
	public void changeReimbursementStatus(int reimbursementId, int statusId, int resolver_id) {
		try (Connection conn = ConnectionFactory.getInstance().getConnection();) {
			conn.setAutoCommit(false);
			String sql = "{CALL change_reimb_status(?, ?, ?)}";
			CallableStatement cstmt = conn.prepareCall(sql);

			// Setting parameters here is the same as if we were working with a
			// PreparedStatement
			cstmt.setInt(1, reimbursementId);
			cstmt.setInt(2, statusId);
			cstmt.setInt(3, resolver_id);

			boolean wasExecuted = cstmt.execute();

			conn.commit();
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public ArrayList<Reimbursement> filterRequests(int statusId) {
		ArrayList<Reimbursement> requests = new ArrayList<Reimbursement>();

		try (Connection conn = ConnectionFactory.getInstance().getConnection();) {

			// This is a parameterized SQL query, using '?' as a placeholder for values that
			// will
			// be provided later.
			String sql = "SELECT * FROM ers_reimbursement WHERE reimb_status = ?";

			// Get the PreparedStatement object from the Connection
			PreparedStatement pstmt = conn.prepareStatement(sql);

			// Set the value of the 1st '?' to the value of 'id'
			pstmt.setInt(1, statusId);

			// Execute the query and retrieve a ResultSet
			ResultSet rs = pstmt.executeQuery();

			// Iterate through the ResultSet and assign values to our Artist object
			while (rs.next()) {
				Reimbursement temp = new Reimbursement();
				temp.setReimb_id(rs.getInt("reimb_id"));
				temp.setReimb_amount(rs.getDouble("reimb_amount"));
				temp.setReimb_submitted(rs.getTimestamp("reimb_submitted"));
				temp.setReimb_resolved(rs.getTimestamp("reimb_resolved"));
				temp.setReimb_description(rs.getString("reimb_description"));
				temp.setReimb_receipt(rs.getBlob("reimb_receipt"));
				temp.setReimb_author(rs.getInt("reimb_author"));
				temp.setReimb_resolver(rs.getInt("reimb_resolver"));
				temp.setReimb_status_id(rs.getInt("reimb_status_id"));
				temp.setReimb_type_id(rs.getInt("reimb_type_id"));
				requests.add(temp);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return requests;
	}

}