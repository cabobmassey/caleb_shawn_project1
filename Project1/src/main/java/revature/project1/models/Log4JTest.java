package revature.project1.models;

import org.apache.log4j.Logger;

public class Log4JTest {

	final static Logger logger = Logger.getLogger(Log4JTest.class);

	public static void main(String[] args) {

		Log4JTest obj = new Log4JTest();
		obj.runMe("mkyong");

	}

	private void runMe(String parameter) {

		if (logger.isDebugEnabled()) {
			logger.debug("This is debug : " + parameter);
		}

		if (logger.isInfoEnabled()) {
			logger.info("This is info : " + parameter);
		}

		logger.warn("This is warn : " + parameter);
		logger.error("This is error : " + parameter);
		logger.fatal("This is fatal : " + parameter);
		logger.trace("This is trace : " + parameter);

	}

}
