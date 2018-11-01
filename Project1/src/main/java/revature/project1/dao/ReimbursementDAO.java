package revature.project1.dao;

import java.sql.Blob;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;


public interface ReimbursementDAO {
	
	ArrayList<Reimbursement> viewPastRequests(int author);
	boolean addReimbursementRequest(double amount, Timestamp submitted,
									Timestamp resolved, String description, Blob receipt,
									int author, int statusId, int typeId);
	ArrayList<Reimbursement> viewAllReimbursements();
	void changeReimbursementStatus(int reimbursementId, int statusId, int resolver_id);
	ArrayList<Reimbursement> filterRequests(int statusId);
}