package revature.project1.dao;

import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;

import revature.project1.models.Reimbursement;

public class ReimbursementDAOImpl implements ReimbursementDAO{

	@Override
	public ArrayList<Reimbursement> viewPastRequests(int author) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean addReimbursementRequest(double amount, Date submitted, Date resolved, String description,
			InputStream receipt, int author, int resolver, int statusId, int typeId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ArrayList<Reimbursement> viewAllReimbursements(int userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean approveReimbursements(int roleId, int reimbursementId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public ArrayList<Reimbursement> filterRequests(int roleId, int statusId) {
		// TODO Auto-generated method stub
		return null;
	}

}