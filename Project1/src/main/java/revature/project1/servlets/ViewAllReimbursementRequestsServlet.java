package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Reimbursement;
import revature.project1.services.ReimbursementService;

@WebServlet("/view_all_tickets")
public class ViewAllReimbursementRequestsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ReimbursementService reimbService = new ReimbursementService();
		ObjectMapper mapper = new ObjectMapper();
			
		ArrayList<Reimbursement> allReimbursementRequsts = reimbService.viewAllReimbursements();
			
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		String allReimbursementsJSON = mapper.writeValueAsString(allReimbursementRequsts);
		pw.write(allReimbursementsJSON);
	}

}
