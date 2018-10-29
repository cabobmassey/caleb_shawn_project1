package revature.project1.models;

import java.io.InputStream;
import java.sql.Date;

public class Reimbursements {
	private int reimb_id;
	private double reimb_amount;
	private Date reimb_submitted;
	private Date reimb_resolved;
	private String reimb_description;
	private InputStream reimb_receipt;
	private int reimb_author;
	private int reimb_resolver;
	private int reimb_stasus_id;
	private int reimb_type_id;
}
