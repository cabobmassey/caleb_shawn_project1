package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import revature.project1.utils.ValidationHelper;

@WebServlet("*.validate")
public class ValidationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Request sent to front controller, ValidationServlet.doPost()");
		
		boolean validatedInput = ValidationHelper.process(request);
		
		ObjectMapper mapper = new ObjectMapper();
		String validatedJSON = "";
		if (validatedInput) {
			validatedJSON = mapper.writeValueAsString(Boolean.TRUE);
		}else {
			validatedJSON = mapper.writeValueAsString(Boolean.FALSE);
		}
		
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		pw.write(validatedJSON);
	}
}