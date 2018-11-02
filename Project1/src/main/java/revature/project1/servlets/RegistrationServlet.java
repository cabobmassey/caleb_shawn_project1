package revature.project1.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import revature.project1.models.Users;
import revature.project1.services.UsersService;

@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        UsersService userService = new UsersService();
        ObjectMapper mapper = new ObjectMapper();
        
        Users newUser = mapper.readValue(request.getInputStream(), Users.class);
        boolean registerUser = userService.createUser(newUser.getUsername(), newUser.getPassword(), newUser.getFirstName(), newUser.getLastName(), newUser.getEmail(), newUser.getUserRoleId());
        
        PrintWriter pw = response.getWriter();
        String userJSON = "";
        response.setContentType("application/json");
        if (registerUser) {
            userJSON = mapper.writeValueAsString(Boolean.TRUE);
        }else {
            userJSON = mapper.writeValueAsString(Boolean.FALSE);
        }
        pw.write(userJSON);
    }

}