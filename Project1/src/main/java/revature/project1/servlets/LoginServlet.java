package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Users;
import revature.project1.services.UsersService;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UsersService usersService = new UsersService();
		ObjectMapper mapper = new ObjectMapper();
		
		String[] userCredentials = mapper.readValue(request.getInputStream(), String[].class);
		String username = userCredentials[0];
		String password = userCredentials[1];
		
		UsersService userService = new UsersService();
		
		
		Users authUser = userService.login(username, password);
		if (authUser != null) {
			authUser.setPassword("");
			authUser.setUsername("");
			authUser.setEmail("");
			
			HttpSession session = request.getSession();
			session.setAttribute("user", authUser);
		}
			
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		String authUserJSON = mapper.writeValueAsString(authUser);
		pw.write(authUserJSON);
	}
}