package revature.project1.utils;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.services.UsersService;

public class ValidationHelper {

	public static String process(HttpServletRequest request) throws IOException {
		
		UsersService userService = new UsersService();
		ObjectMapper mapper = new ObjectMapper();
		
		switch(request.getRequestURI()) {
		
		case "/Project1/username.validate": 
			String username = mapper.readValue(request.getInputStream(), String.class);
			
			if(userService.isUsernameAvailable(username)) return username;
			else return null;
			
		case "/Project1/email.validate":
			System.out.println("entered email validation");
			String emailAddress = mapper.readValue(request.getInputStream(), String.class);
			
			if(userService.isEmailAvailable(emailAddress)) return emailAddress;
			else return null;
			
		default:
			return null;
		}
	}
}