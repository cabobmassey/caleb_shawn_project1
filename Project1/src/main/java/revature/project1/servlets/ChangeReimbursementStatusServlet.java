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
import revature.project1.models.Users;
import revature.project1.services.ReimbursementService;

/**
 * Servlet implementation class ChangeReimbursementStatusServlet
 */
@WebServlet("/change_reimbursement_status")
public class ChangeReimbursementStatusServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ReimbursementService reimbService = new ReimbursementService();
		ObjectMapper mapper = new ObjectMapper();
	        
		Reimbursement reimbursementToChange = mapper.readValue(request.getInputStream(), Reimbursement.class);
	    boolean isReimbursementChanged = reimbService.changeReimbursementStatus(reimbursementToChange.getReimb_id(), reimbursementToChange.getReimb_status_id(),
	    								reimbursementToChange.getReimb_resolver());
	        
	    PrintWriter pw = response.getWriter();
	    String reimbursementStatusJSON = "";
	    response.setContentType("application/json");
	    if (isReimbursementChanged) {
	        reimbursementStatusJSON = mapper.writeValueAsString(Boolean.TRUE);
	    }else {
	        reimbursementStatusJSON = mapper.writeValueAsString(Boolean.FALSE);
	    }
	    pw.write(reimbursementStatusJSON);
	}
}
