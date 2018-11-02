package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Reimbursement;
import revature.project1.services.ReimbursementService;

@WebServlet("/add_reimbursement")
public class AddReimbursementRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        ObjectMapper mapper = new ObjectMapper();
	        ReimbursementService reimbService = new ReimbursementService();
	        
	        Reimbursement reimbursement = mapper.readValue(request.getInputStream(), Reimbursement.class);
	        boolean addReimbursement = reimbService.addReimbursementRequest(reimbursement.getReimb_amount(), reimbursement.getReimb_submitted(), reimbursement.getReimb_resolved(),
	        		reimbursement.getReimb_description(), reimbursement.getReimb_receipt(), reimbursement.getReimb_author(), reimbursement.getReimb_status_id(), 
	        		reimbursement.getReimb_type_id());
	        PrintWriter pw = response.getWriter();
	        String reimbursementJSON = "";
	        response.setContentType("application/json");
	        if (addReimbursement) {
	            reimbursementJSON = mapper.writeValueAsString(Boolean.TRUE);
	        }else {
	            reimbursementJSON = mapper.writeValueAsString(Boolean.FALSE);
	        }
	        pw.write(reimbursementJSON);
	}
}
