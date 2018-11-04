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
import revature.project1.models.Users;
import revature.project1.services.ReimbursementService;

@WebServlet("/view_past_tickets")
public class ViewPastTicketsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       doPost(request, response);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ReimbursementService reimbService = new ReimbursementService();
		ObjectMapper mapper = new ObjectMapper();
		
		Integer author = mapper.readValue(request.getInputStream(), Integer.class);
		ArrayList<Reimbursement> pastAuthorRequests = reimbService.viewPastTickets(author);
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		String pastRequestsJSON = mapper.writeValueAsString(pastAuthorRequests);
		pw.write(pastRequestsJSON);
	}
}
