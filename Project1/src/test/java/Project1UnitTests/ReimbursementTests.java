package Project1UnitTests;
import static org.junit.Assert.assertEquals;

import java.sql.Timestamp;

import org.junit.Test;

import revature.project1.services.ReimbursementService;

public class ReimbursementTests {
	private ReimbursementService reimbService = new ReimbursementService();
	
	@Test
	public void testCreateReimbursement() {
		assertEquals(true, reimbService.addReimbursementRequest(200.23, new Timestamp(System.currentTimeMillis()), null, "", null, 26, 1, 3));
	}
	
	@Test 
	public void testCreateReimbursementInvalidDataAuthorId() {
		assertEquals(false, reimbService.addReimbursementRequest(200.23, new Timestamp(System.currentTimeMillis()), null, "", null, 1000000, 1, 3));
	}
	
	@Test
	public void testCreateReimbursementInvalidDataStatus() {
		assertEquals(false, reimbService.addReimbursementRequest(200.23, new Timestamp(System.currentTimeMillis()), null, "", null, 10000, 4, 3));

	}
	
	@Test
	public void testCreateReimbursementInvalidDataTypes() {
		assertEquals(false, reimbService.addReimbursementRequest(200.23, new Timestamp(System.currentTimeMillis()), null, "", null, 10000, 2, 5));
	}
	
	@Test
	public void testChangeReimbursementStatus() {
		assertEquals(true, reimbService.changeReimbursementStatus(6, 2, 26));
	}
	
}
