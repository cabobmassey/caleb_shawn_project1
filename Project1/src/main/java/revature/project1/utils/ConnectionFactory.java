package revature.project1.utils;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionFactory {
    private static ConnectionFactory cf;
    private static boolean build = true;
    
    private ConnectionFactory() {
        build = false;
    }
    
    public static synchronized ConnectionFactory getInstance() {
        return (build) ? cf = new ConnectionFactory() : cf;
    }
    
    public Connection getConnection() {
        
        Connection conn = null;
        Properties prop = new Properties();
        
        try {
            
            // Load the properties file keys/values into the Properties object
            prop.load(new FileReader("src/main/resources/application.properties"));
            
            // Get a connection from the DriverManager
            conn = DriverManager.getConnection(
                    prop.getProperty("url"),
                    prop.getProperty("usr"),
                    prop.getProperty("pw"));
            
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        } catch (FileNotFoundException fnfe) {
            fnfe.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        
        return conn;
    }
}