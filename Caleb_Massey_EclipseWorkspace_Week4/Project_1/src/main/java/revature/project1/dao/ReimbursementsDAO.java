package revature.project1.dao;

import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursements;

public interface ReimbursementsDAO {
	
	ArrayList<Reimbursements> viewPastRequests(int author);
	boolean addReimbursementRequest(double amount, Date submitted,
									Date resolved, String description, InputStream receipt,
									int author, int resolver, int statusId, int typeId);
	ArrayList<Reimbursements> viewAllReimbursements(int roleId);
	boolean approveReimbursements(int roleId, int reimbursementId);
	ArrayList<Reimbursements> filterRequests(int roleId, int statusId);

}
