package revature.project1.utils;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Log4JTest;
import revature.project1.services.UsersService;

public class ValidationHelper {
	
	final static Logger logger = Logger.getLogger(Log4JTest.class);

	public static String process(HttpServletRequest request) throws IOException {
		
		UsersService userService = new UsersService();
		ObjectMapper mapper = new ObjectMapper();
		
		switch(request.getRequestURI()) {
		
		case "/Project1/username.validate": 
			String username = mapper.readValue(request.getInputStream(), String.class);
			
			if(userService.isUsernameAvailable(username)) return null;
			else return username;
			
		case "/Project1/email.validate":
			logger.debug("enetered email validation");
			String emailAddress = mapper.readValue(request.getInputStream(), String.class);
			
			if(userService.isEmailAvailable(emailAddress)) return null;
			else return emailAddress;
			
		default:
			return null;
		}
	}
}