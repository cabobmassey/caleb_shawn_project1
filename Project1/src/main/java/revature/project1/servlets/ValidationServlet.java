package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Log4JTest;
import revature.project1.utils.ValidationHelper;

@WebServlet("*.validate")
public class ValidationServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	final static Logger logger = Logger.getLogger(Log4JTest.class);

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		logger.info("Request sent to ValidationServlet.doPost()");
		
		String validatedInput = ValidationHelper.process(request);
		
		ObjectMapper mapper = new ObjectMapper();
		String validatedJSON = mapper.writeValueAsString(validatedInput);
		
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		pw.write(validatedJSON);
	}
}