package revature.project1.dao;

import java.sql.Blob;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;
import revature.project1.reimbursementstatus.ReimbursementStatus;
import revature.project1.reimbursementtypes.ReimbursementTypes;
import revature.project1.userroles.UserRoles;

public interface ReimbursementDAO {
	
	ArrayList<Reimbursement> viewPastRequests(int author);
	boolean addReimbursementRequest(double amount, Date submitted,
									Date resolved, String description, Blob receipt,
									int author, int resolver, ReimbursementStatus statusId, ReimbursementTypes typeId);
	ArrayList<Reimbursement> viewAllReimbursements(UserRoles roleId);
	boolean approveReimbursements(UserRoles roleId);
	ArrayList<Reimbursement> filterRequests(UserRoles roleId, ReimbursementStatus statusId);

}