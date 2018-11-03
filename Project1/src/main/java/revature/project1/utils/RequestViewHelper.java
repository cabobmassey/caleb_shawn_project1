package revature.project1.utils;

import javax.servlet.http.HttpServletRequest;

public class RequestViewHelper {

	public static String process(HttpServletRequest request) {
		
		switch(request.getRequestURI()) {
		
		case "/Project1/login.view":
			return "partials/login.html";
		
		case "/Project1/register.view":
			return "partials/register.html";
			
		case "/Project1/author_home.view":
			return "partials/authorhome.html";
			
		case "/Project1/resolver_home.view":
			return "partials/resolverhome.html";
			
		case "/Project1/author_pastrequests.view":
			return "partials/authorpastrequests.html";
			
		case "/Project1/author_newticket.view":
			return "partials/createticket.html";
			
		case "/Project1/add_reimbursement.view":
			return "partials/createticketsuccess.html";
			
		default:
			return null;
			
		}
	}
}
