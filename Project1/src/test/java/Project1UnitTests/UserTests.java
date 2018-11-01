package Project1UnitTests;
import org.junit.Test;
import junit.framework.Assert;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import revature.project1.services.UsersService;
public class UserTests {
	private UsersService userService = new UsersService();
	
	@Test
	public void testCreateUserWithRoleId1() {
		assertEquals(true, userService.createUser("test_username_unique1", "test_password", "test_firstname", "test_lastname", "jimmyUnique1@gmail.com", 1));
	}
	
	@Test
	public void testCreateWithRoleId2() {
		assertEquals(true, userService.createUser("test_username5_unique", "test_password", "test_firstname", "test_lastname", "jimmyUnique5@gmail.com", 2));
	}
	
	
	@Test
	public void testCreateWithRoleId0() {
		assertEquals(false, userService.createUser("test_username3", "test_password", "test_firstname", "test_lastname", "jimmy3@gmail.com", 0));
	}
	
	@Test
	public void testCreateWithRoleId3() {
		assertEquals(false, userService.createUser("test_username4", "test_password", "test_firstname", "test_lastname", "jimmy4@gmail.com", 3));
	}
	
	@Test
	public void testCreateUserExistingUsername() {
		assertEquals(false, userService.createUser("test_username", "test_password", "test_firstname", "test_lastname", "jimmy4@gmail.com", 2));
	}
	
	@Test
	public void testCreateUserExistingEmail() {
		assertEquals(false, userService.createUser("new_user", "new_password", "new_first", "new_last", "jimmy@gmail.com", 1));
	}
	
	@Test
	public void testCreateUserExistingUsernameEmail() {
		assertEquals(false, userService.createUser("test_username", "test_password", "test_first", "test_last", "jimmy@gmail.com", 2));
	}

	@Test
	public void testLoginUser() {
		assertNotEquals(null, userService.login("test_username", "test_password"));
	}
	
	@Test
	public void testLoginNonUser() {
		assertEquals(null, userService.login("non_existing_username", "non_existing_password"));
	}

	@Test
	public void getUserId() {
		assertEquals(22, userService.getUserId("test_username2"));
	}
	
	@Test
	public void getNonUserId() {
		assertEquals(-1, userService.getUserId("nonUsername"));
	}
	
	@Test
	public void testUser() {
		assertEquals(true, userService.checkIfUserExistsById(21));
	}
	
	@Test
	public void testUserDoesNotExist() {
		assertEquals(false, userService.checkIfUserExistsById(10000000));
	}
}

