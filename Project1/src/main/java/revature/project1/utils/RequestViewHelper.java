package revature.project1.utils;

import javax.servlet.http.HttpServletRequest;

public class RequestViewHelper {

	public static String process(HttpServletRequest request) {
		
		switch(request.getRequestURI()) {
		
		case "/Project1/authorlogin.view":
			return "partials/authorlogin.html";
		
		case "/Project1/authorregister.view":
			return "partials/authorregister.html";
			
		case "/Project1/authorhome.view":
			return "partials/authorhome.html";
			
		default:
			return null;
			
		}
	}
}
