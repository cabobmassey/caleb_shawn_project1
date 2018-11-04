package revature.project1.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import revature.project1.utils.RequestViewHelper;

@WebServlet("*.view")
public class LoadView extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String nextView = RequestViewHelper.process(request);

		request.getRequestDispatcher(nextView).forward(request, response);
	}
}
