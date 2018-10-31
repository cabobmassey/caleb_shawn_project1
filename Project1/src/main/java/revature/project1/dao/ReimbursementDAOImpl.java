package revature.project1.dao;

import java.sql.Blob;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;
import revature.project1.reimbursementstatus.ReimbursementStatus;
import revature.project1.reimbursementtypes.ReimbursementTypes;
import revature.project1.userroles.UserRoles;

public class ReimbursementDAOImpl implements ReimbursementDAO{

	@Override
	public ArrayList<Reimbursement> viewPastRequests(int author) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addReimbursementRequest(double amount, Date submitted, Date resolved, String description,
			Blob receipt, UserRoles author, UserRoles resolver, ReimbursementStatus statusId, ReimbursementTypes typeId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ArrayList<Reimbursement> viewAllReimbursements(UserRoles userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean approveReimbursements(UserRoles roleId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ArrayList<Reimbursement> filterRequests(UserRoles roleId, ReimbursementStatus statusId) {
		// TODO Auto-generated method stub
		return null;
	}

}