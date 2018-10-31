package revature.project1.dao;

import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;

public interface ReimbursementDAO {
	
	ArrayList<Reimbursement> viewPastRequests(int author);
	boolean addReimbursementRequest(double amount, Date submitted,
									Date resolved, String description, InputStream receipt,
									int author, int resolver, int statusId, int typeId);
	ArrayList<Reimbursement> viewAllReimbursements(int userId);
	boolean approveReimbursements(int roleId, int reimbursementId);
	ArrayList<Reimbursement> filterRequests(int roleId, int statusId);

}