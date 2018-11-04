package revature.project1.services;

import java.sql.Blob;
import java.sql.Timestamp;
import java.util.ArrayList;

import revature.project1.dao.ReimbursementDAO;
import revature.project1.dao.ReimbursementDAOImpl;
import revature.project1.models.Reimbursement;

public class ReimbursementService {
	private ReimbursementDAO reimbDAO = new ReimbursementDAOImpl();
	private UsersService userService = new UsersService();
	
	public ArrayList<Reimbursement> viewPastTickets(int authorId){
		return reimbDAO.viewPastTickets(authorId);
	}
	
	public boolean addReimbursementRequest(double amount, Timestamp date_submitted, Timestamp date_resolved, String description,
			Blob receipt, int author, int statusId, int typeId) {
		if (!checkAmount(amount)) {
			return false;
		}
		
		if (!checkStatusId(statusId)) {
			return false;
		}
		
		if (!checkTypeId(typeId)) {
			return false;
		}
		
		if (!checkIfUserExists(author)) {
			return false;
		}
		boolean createdUser = reimbDAO.addReimbursementRequest(amount, date_submitted, date_resolved, description, receipt, author, statusId, typeId);
		return createdUser;
	}
	
	public ArrayList<Reimbursement> viewAllReimbursements(){
		return reimbDAO.viewAllReimbursements();
	}
	
	public boolean changeReimbursementStatus(int reimbursementId, int statusId, int resolver_id) {
		if (!checkStatusId(statusId)) {
			return false;
		}
		
		if (!checkIfUserExists(resolver_id)) {
			return false;
		}
		
		reimbDAO.changeReimbursementStatus(reimbursementId, statusId, resolver_id);
		return true;
	}
	
	public ArrayList<Reimbursement> filterRequests(int statusId) {
		if (!checkStatusId(statusId)) {
			return new ArrayList<Reimbursement>();
		}
		
		return reimbDAO.filterRequests(statusId);	
	}
	
	private boolean checkAmount(double amount) {
		if (amount > 0) {
			return true;
		}else {
			return false;
		}
	}
	
	private boolean checkIfUserExists(int userId) {
		return userService.checkIfUserExistsById(userId);
	}
	
	
	private boolean checkStatusId(int statusId) {
		if (statusId >= 1 && statusId <= 3) {
			return true;
		}else {
			return false;
		}
	}
	
	private boolean checkTypeId(int typeId) {
		if (typeId >= 1 && typeId <= 4) {
			return true;
		}else {
			return false;
		}
	}
}
