package revature.project1.dao;

import java.sql.Blob;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;


public interface ReimbursementDAO {
	
	ArrayList<Reimbursement> viewPastRequests(int author);
	boolean addReimbursementRequest(double amount, Date submitted,
									Date resolved, String description, Blob receipt,
									int author, int resolver, int statusId, int typeId);
	ArrayList<Reimbursement> viewAllReimbursements(int roleId);
	void changeReimbursementStatus(int reimbursementId, int statusId);
	ArrayList<Reimbursement> filterRequests(int statusId);

}