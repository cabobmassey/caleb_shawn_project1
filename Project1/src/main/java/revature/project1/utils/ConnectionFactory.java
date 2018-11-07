package revature.project1.utils;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;

import revature.project1.models.Log4JTest;

public class ConnectionFactory {
    private static ConnectionFactory cf;
    private static boolean build = true;
    
    final static Logger logger = Logger.getLogger(Log4JTest.class);
    
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
            
        	Class.forName("oracle.jdbc.driver.OracleDriver");
            URL fileLoc = getClass().getResource("../../../application.properties");
            prop.load(new FileReader(fileLoc.getFile()));
            
            // Get a connection from the DriverManager
            conn = DriverManager.getConnection(
                    prop.getProperty("url"),
                    prop.getProperty("usr"),
                    prop.getProperty("pw"));
            
        } catch (SQLException sqle) {
        	logger.error("SQL Exception : " + sqle);
        } catch (FileNotFoundException fnfe) {
        	logger.error("File Not Found Exception : " + fnfe);
        } catch (IOException ioe) {
        	logger.error("IOException : " + ioe);
        } catch (ClassNotFoundException e) {
        	logger.error("Class Not Found Exception : " + e);
		}
        
        return conn;
    }
}