package revature.project1.utils;

import javax.servlet.http.HttpServletRequest;

public class RequestViewHelper {

	public static String process(HttpServletRequest request) {
		
		switch(request.getRequestURI()) {
		
		case "/Project1/login.view":
			return "partials/login.html";
		
		case "/Project1/register.view":
			return "partials/register.html";
			
		case "/Project1/home.view":
			return "partials/home.html";
			
		default:
			return null;
			
		}
	}
}
