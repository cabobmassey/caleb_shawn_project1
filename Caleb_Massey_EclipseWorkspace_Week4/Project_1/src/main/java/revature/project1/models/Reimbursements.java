package revature.project1.models;

import java.io.InputStream;
import java.sql.Date;

import revature.project1.reimbursementstatus.ReimbursementStatus;
import revature.project1.reimbursementtypes.ReimbursementTypes;
import revature.project1.userroles.UserRoles;

public class Reimbursements {
	private int reimb_id;
	private double reimb_amount;
	private Date reimb_submitted;
	private Date reimb_resolved;
	private String reimb_description;
	private InputStream reimb_receipt;
	private UserRoles reimb_author;
	private UserRoles reimb_resolver;
	private ReimbursementStatus reimb_status_id;
	private ReimbursementTypes reimb_type_id;
	
	public Reimbursements(int reimb_id, double reimb_amount, Date reimb_submitted, Date reimb_resolved,
			String reimb_description, InputStream reimb_receipt, UserRoles reimb_author, UserRoles reimb_resolver,
			ReimbursementStatus reimb_status_id, ReimbursementTypes reimb_type_id) {
		super();
		this.reimb_id = reimb_id;
		this.reimb_amount = reimb_amount;
		this.reimb_submitted = reimb_submitted;
		this.reimb_resolved = reimb_resolved;
		this.reimb_description = reimb_description;
		this.reimb_receipt = reimb_receipt;
		this.reimb_author = reimb_author;
		this.reimb_resolver = reimb_resolver;
		this.reimb_status_id = reimb_status_id;
		this.reimb_type_id = reimb_type_id;
	}
	
	public int getReimb_id() {
		return reimb_id;
	}

	public void setReimb_id(int reimb_id) {
		this.reimb_id = reimb_id;
	}

	public double getReimb_amount() {
		return reimb_amount;
	}

	public void setReimb_amount(double reimb_amount) {
		this.reimb_amount = reimb_amount;
	}

	public Date getReimb_submitted() {
		return reimb_submitted;
	}

	public void setReimb_submitted(Date reimb_submitted) {
		this.reimb_submitted = reimb_submitted;
	}

	public Date getReimb_resolved() {
		return reimb_resolved;
	}

	public void setReimb_resolved(Date reimb_resolved) {
		this.reimb_resolved = reimb_resolved;
	}

	public String getReimb_description() {
		return reimb_description;
	}

	public void setReimb_description(String reimb_description) {
		this.reimb_description = reimb_description;
	}

	public InputStream getReimb_receipt() {
		return reimb_receipt;
	}

	public void setReimb_receipt(InputStream reimb_receipt) {
		this.reimb_receipt = reimb_receipt;
	}

	public UserRoles getReimb_author() {
		return reimb_author;
	}

	public void setReimb_author(UserRoles reimb_author) {
		this.reimb_author = reimb_author;
	}

	public UserRoles getReimb_resolver() {
		return reimb_resolver;
	}

	public void setReimb_resolver(UserRoles reimb_resolver) {
		this.reimb_resolver = reimb_resolver;
	}

	public ReimbursementStatus getReimb_status_id() {
		return reimb_status_id;
	}

	public void setReimb_status_id(ReimbursementStatus reimb_status_id) {
		this.reimb_status_id = reimb_status_id;
	}

	public ReimbursementTypes getReimb_type_id() {
		return reimb_type_id;
	}

	public void setReimb_type_id(ReimbursementTypes reimb_type_id) {
		this.reimb_type_id = reimb_type_id;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(reimb_amount);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((reimb_author == null) ? 0 : reimb_author.hashCode());
		result = prime * result + ((reimb_description == null) ? 0 : reimb_description.hashCode());
		result = prime * result + reimb_id;
		result = prime * result + ((reimb_resolved == null) ? 0 : reimb_resolved.hashCode());
		result = prime * result + ((reimb_resolver == null) ? 0 : reimb_resolver.hashCode());
		result = prime * result + ((reimb_status_id == null) ? 0 : reimb_status_id.hashCode());
		result = prime * result + ((reimb_submitted == null) ? 0 : reimb_submitted.hashCode());
		result = prime * result + ((reimb_type_id == null) ? 0 : reimb_type_id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Reimbursements other = (Reimbursements) obj;
		if (Double.doubleToLongBits(reimb_amount) != Double.doubleToLongBits(other.reimb_amount))
			return false;
		if (reimb_author != other.reimb_author)
			return false;
		if (reimb_description == null) {
			if (other.reimb_description != null)
				return false;
		} else if (!reimb_description.equals(other.reimb_description))
			return false;
		if (reimb_id != other.reimb_id)
			return false;
		if (reimb_resolved == null) {
			if (other.reimb_resolved != null)
				return false;
		} else if (!reimb_resolved.equals(other.reimb_resolved))
			return false;
		if (reimb_resolver != other.reimb_resolver)
			return false;
		if (reimb_status_id != other.reimb_status_id)
			return false;
		if (reimb_submitted == null) {
			if (other.reimb_submitted != null)
				return false;
		} else if (!reimb_submitted.equals(other.reimb_submitted))
			return false;
		if (reimb_type_id != other.reimb_type_id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Reimbursements [reimb_id=" + reimb_id + ", reimb_amount=" + reimb_amount + ", reimb_submitted="
				+ reimb_submitted + ", reimb_resolved=" + reimb_resolved + ", reimb_description=" + reimb_description
				+ ", reimb_receipt=" + reimb_receipt + ", reimb_author=" + reimb_author + ", reimb_resolver="
				+ reimb_resolver + ", reimb_status_id=" + reimb_status_id + ", reimb_type_id=" + reimb_type_id + "]";
	}
	
	
	
	
}