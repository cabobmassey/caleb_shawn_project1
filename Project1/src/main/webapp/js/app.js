window.onload = function() {
	loadLogin();
	document.getElementById('toLogin').addEventListener('click', loadLogin);
	document.getElementById('toRegister').addEventListener('click', loadRegister);

	document.getElementById('toProfile').addEventListener('click', loadProfile);
	document.getElementById('toLogout').addEventListener('click', logout);

	// determines what navbar links to show if the user is or is not
	// authenticated
	let isAuth = isAuthenticated();
	updateNav(isAuth);
	let vUsername = false;
	let vEmail = false;
}

function login() {
	console.log('in login()');

	let username = document.getElementById('login-username').value;
	let password = document.getElementById('login-password').value;

	let credentials = [ username, password ];
	let credentialsJSON = JSON.stringify(credentials);

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'login', true);

	xhr.send(credentialsJSON);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let user = JSON.parse(xhr.responseText);
			if (user) {
				console.log(user);
				alert('Login successful!');
				window.localStorage.setItem('user', xhr.responseText);
				loadHome(user.userRoleId);
			} else {
				document.getElementById('login-message').style.display = 'block';
				document.getElementById('login-message').innerHTML = 'Invalid Credentials';
			}
		}
	}

}

function loadHome(userRoleId) {
	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	if (userRoleId == 1) {
		xhr.open('GET', 'author_home.view', true);
	} else if (userRoleId == 2) {
		xhr.open('GET', 'resolver_home.view', true);
	}

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (userRoleId == 2) {
				document.getElementById('view').innerHTML = xhr.responseText;
				loadResolverHomeInfo();
			} else {
				document.getElementById('view').innerHTML = xhr.responseText;
				loadAuthorHomeInfo();
			}
		}
	}
}

function loadResolverHomeInfo() {
	console.log('in loadResolverHomeInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	document.getElementById('user_fn').innerHTML = user.firstName;
	
	document.getElementById('submit-new-req-btn').addEventListener('click', loadCreateTicket);
	document.getElementById('view-pending-btn').addEventListener('click', loadManagerViewRequests);
}

function loadAuthorHomeInfo() {
	console.log('in loadAuthorHomeInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	document.getElementById('user_fn').innerHTML = user.firstName;
	
	document.getElementById('submit-new-req-btn').addEventListener('click', loadCreateTicket);
	document.getElementById('req-history-btn').addEventListener('click', loadViewPastRequests);
	
}

function loadViewPastRequests(){
	console.log('in loadViewPastRequests()');

	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'view_past_tickets.view', true);

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadViewPastRequestsInfo();
		}
	}
}

function loadManagerViewRequests() {
	console.log('in loadManagerViewRequests()');

	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'filter_by_reimbursement_status.view', true);

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadManagerViewRequestsInfo(1);
			document.getElementById('all_requests_option').addEventListener('click', function(e){
				getAllReimbursements();				
			});
			document.getElementById('accepted_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo(2);	
			});
			document.getElementById('denied_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo(3);				
			});
			document.getElementById('pending_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo(1);				
			});
		}
	}
}

function getAllReimbursements(){
	const errorRequestsMessage = document.getElementById('error-requests-message');
	errorRequestsMessage.setAttribute('hidden', true);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'view_all_tickets', true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200){
			let ticketData = JSON.parse(xhr.responseText);
			// add rows to the already created table containing all reimbursement requests for a particular user
			if (ticketData.length != 0){
				addRows(ticketData);
			}
		}
	}
}

function loadManagerViewRequestsInfo(statusId) {
	const errorRequestsMessage = document.getElementById('error-requests-message');
	errorRequestsMessage.setAttribute('hidden', true);
	console.log('in loadManagerViewRequestsInfo()');
	
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let statusIdJSON = JSON.stringify(statusId);
	
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'filter_by_reimbursement_status', true);
	//xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(statusIdJSON);
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			let ticketData = JSON.parse(xhr.responseText);
			// add rows to the already created table containing all reimbursement requests for a particular user
			if (ticketData.length != 0){
				addRows(ticketData);
			}else{
				addRows(ticketData);
				errorRequestsMessage.removeAttribute('hidden');
				errorRequestsMessage.innerHTML = 'No reimbursements found';
				
			}
		}
	}
	
	document.getElementById('resolver-return-home').addEventListener('click', function(){loadHome(user.userRoleId)});
	
}

function addRows(ticketData){
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let subDate = new Date(0);
	let resDate = new Date(0);
	 
	if(user.userRoleId == 2){
			const resolverTable = document.getElementById('resolver-view-table');
			const resolverTableBody = document.getElementById('resolver_view_reimbursement_table_body');
			resolverTable.removeChild(resolverTableBody);
			const newResolverTableBody = document.createElement('tbody');
			newResolverTableBody.id = 'resolver_view_reimbursement_table_body';
			resolverTable.appendChild(newResolverTableBody);
	}
	 
	for (let i = 0; i < ticketData.length; i++){
		// dynamically create table row and data cells
	    let row = document.createElement('tr');
	    let reimbIdCell = document.createElement('td');
	    let reimbAmountCell = document.createElement('td');
	    let reimbSubmittedCell = document.createElement('td');
	    let reimbResolvedCell = document.createElement('td');
	    let reimbDescriptionCell = document.createElement('td');
	    let reimbReceiptCell = document.createElement('td');
	    let reimbAuthorCell = document.createElement('td');
	    let reimbResolverCell = document.createElement('td');
	    let reimbStatusIdCell = document.createElement('td');
	    let reimbTypeIdCell = document.createElement('td');
	    let actionCell = document.createElement('td');

	    // append the newly created table cells to the new row
	    row.appendChild(reimbIdCell);
	    row.appendChild(reimbAmountCell);
	    row.appendChild(reimbSubmittedCell);
	    row.appendChild(reimbResolvedCell);
	    row.appendChild(reimbDescriptionCell);
	    row.appendChild(reimbReceiptCell);
	    row.appendChild(reimbAuthorCell);
	    row.appendChild(reimbResolverCell);
	    row.appendChild(reimbStatusIdCell);
	    row.appendChild(reimbTypeIdCell);
	    row.appendChild(actionCell);
	    
	    
	    if (ticketData[i].reimb_author != user.userId && user.userRoleId == 2){
	    	 if(ticketData[i].reimb_status_id == 1){
	 	    	let approveBtn = document.createElement('button');
	 	    	let denyBtn = document.createElement('button');
	 	    	approveBtn.className = 'btn btn-success btn-sm';
	 	    	denyBtn.className = 'btn btn-danger btn-sm';
	 	    	approveBtn.innerHTML = 'Approve';
	 	    	denyBtn.innerHTML = 'Deny';
	 	    	approveBtn.addEventListener('click', function(e){
	 	    		changeStatus(ticketData[i].reimb_id, 2, user.userId, e, denyBtn);
	 	    	});
	 	    	
	 	    	denyBtn.addEventListener('click', function(e){
	 	    		changeStatus(ticketData[i].reimb_id, 3, user.userId, e, approveBtn);
	 	    	});
	 	    	
	 	    	actionCell.appendChild(approveBtn);
	 	    	actionCell.appendChild(denyBtn);
	 	    	
	 	    } else {
	 	    	actionCell.innerText = 'Already processed';
	 	    }
	    }
	    
	    let tbody;
	    
	    if(user.userRoleId == 1){
	    	tbody = document.getElementById('author_past_reimbursements_table_body');
	    } else {
	    	tbody = document.getElementById('resolver_view_reimbursement_table_body');
	    }
	    
	    // append the row to our pre-existing table
	    tbody.appendChild(row);
	    
	    reimbIdCell.innerText = ticketData[i].reimb_id;
	    reimbAmountCell.innerText =  ticketData[i].reimb_amount;
	    subDate.setUTCSeconds(ticketData[i].reimb_submitted);
	    reimbSubmittedCell.innerText = subDate;
	    resDate.setUTCSeconds(ticketData[i].reimb_resolved);
	    reimbResolvedCell.innerText = resDate;
	    if (ticketData[i].reimb_description != null){
	    	 reimbDescriptionCell.innerText = ticketData[i].reimb_description;
	    }else{
	    	 reimbDescriptionCell.innerText = 'No Description Available'
	    }
	    if (ticketData[i].reimb_receipt != null){
	    	 reimbReceiptCell.innerText = ticketData[i].reimb_receipt;
	    }else{
	    	 reimbReceiptCell.innerText = 'No receipt image';
	    }
	    reimbAuthorCell.innerText = ticketData[i].reimb_author;
	    
	    if (ticketData[i].reimb_resolver == 0 || ticketData[i].reimb_resolver < 0){
	    	reimbResolverCell.innerText = 'Resolver is not valid';
	    }else{
	    	 reimbResolverCell.innerText = ticketData[i].reimb_resolver;
	    }
	   
	    reimbStatusIdCell.innerText = ticketData[i].reimb_status_id;
	    reimbTypeIdCell.innerText = ticketData[i].reimb_type_id;
	}
}

function changeStatus(reimbursementId, statusId, resolverId, eventButton, oppositeButton){
	eventButton.target.disabled = 'true';
	oppositeButton.disabled = 'true';
	let changeStatusInformation = {
			reimb_id: reimbursementId,
			reimb_amount: 0,
			reimb_submitted: null,
			reimb_resolved: null,
			reimb_description: null,
			reimb_receipt: null,
			reimb_author: 0,
			reimb_resolver: resolverId,
			reimb_status_id: statusId,
			reimb_type_id: 0
		}
	
	let statusInformationJSON = JSON.stringify(changeStatusInformation);
	
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'change_reimbursement_status', true);
	xhr.send(statusInformationJSON);
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			let ticketData = JSON.parse(xhr.responseText);
			if (ticketData){
				alert('Reimbursement status is resolved');
				loadManagerViewRequestsInfo(1);	
				
			}else{
				alert('There was an error processing your request');
				loadManagerViewRequestsInfo(1);	
			}
		}
	}
}

function loadViewPastRequestsInfo() {
	const pastTicketErrorMessage = document.getElementById('past-requests-message');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let authorId = user.userId;
	let authorIdJSON = JSON.stringify(authorId);
	document.getElementById('user_fn').innerHTML = user.firstName;
	
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'view_past_tickets', true);

	xhr.send(authorIdJSON);
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			let ticketData = JSON.parse(xhr.responseText);
			// add rows to the already created table containing all reimbursement requests for a particular user
			if (ticketData.length != 0){
				pastTicketErrorMessage.setAttribute('hidden', true);
				addRows(ticketData);
			}else{
				pastTicketErrorMessage.removeAttribute('hidden');
				pastTicketErrorMessage.innerHTML = 'No closed tickets were found';
			}
		}
	}
	
	document.getElementById('author-return-home').addEventListener('click', function(){loadHome(user.userRoleId)});
	
}

function loadProfile() {
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	loadHome(user.userRoleId);
}

function loadLogin() {
	console.log('in loadLogin()');

	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'login.view', true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadLoginInfo();
		}
	}
}

function loadLoginInfo() {
	console.log('in loadLoginInfo()');

	document.getElementById('login-message').style.display = 'none';
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('toRegisterBtn').addEventListener('click', loadRegister);
}

function register() {
	console.log('in register()');
	
	document.getElementById('register').setAttribute('disabled', true);
;	let roleId = checkRoleId();
	let user = {
		firstName : document.getElementById('fn').value,
		lastName : document.getElementById('ln').value,
		email : document.getElementById('email').value,
		username : document.getElementById('reg-username').value,
		password : document.getElementById('reg-password').value,
		userRoleId : roleId
	}
	
	let userJSON = JSON.stringify(user);

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'register', true);
	xhr.send(userJSON);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			
			if(xhr.responseText == 'false') {
				document.getElementById('reg-message').innerHTML = 'Something went wrong...';
				document.getElementById('reg-message').style.display = 'block';
			} else  {
				document.getElementById('register').removeAttribute('disabled');
				document.getElementById('reg-message').style.display = 'none';
				alert('Enrollment successful! Please login using your credentials.');
				loadLogin();
			}
		}
	}
}

function loadCreateTicket() {
let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'add_reimbursement.view', true);

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.responseText)
			document.getElementById('view').innerHTML = xhr.responseText;
			loadCreateTicketInfo();
		}
	}

}

function loadCreateTicketInfo() {
	console.log('in loadCreateTicketInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	document.getElementById('submit-request').setAttribute('disabled', true);
	
	document.getElementById('amount').addEventListener('blur', isCreateTicketFormValid);
	document.getElementById('description-input').addEventListener('blur', isCreateTicketFormValid);
	document.getElementById('type-input').addEventListener('blur', isCreateTicketFormValid);

	document.getElementById('submit-request').addEventListener('click', createTicket);
	document.getElementById('author-return-home_Create_Reimb').addEventListener('click', function() {loadHome(user.userRoleId)});

}

function isCreateTicketFormValid() {
	console.log('in isCreateFormValid()');
	
	let form = [(document.getElementById('amount').value), (document.getElementById('description-input').value), (document.getElementById('type-input').value)];

	if (!(form[0] && form[2]) ){
		console.log('disabled');
		document.getElementById('submit-request').setAttribute('disabled', true);
	}
	else{
		console.log('enabled');
		document.getElementById('submit-request').removeAttribute('disabled');
	}
}

function createTicket() {
	
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let typeId = checkTypeId();
	let request = {
			reimb_amount: document.getElementById('amount').value,
			reimb_submitted: new Date().toUTCString(),
			reimb_resolved: null,
			reimb_description: document.getElementById('description-input').value,
			reimb_receipt: null,
			reimb_author: user.userId,
			reimb_status_id: 1,
			reimb_type_id: typeId
		}
	
	let requestJSON = JSON.stringify(request);

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'add_reimbursement', true);
	xhr.send(requestJSON);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('submit-request').setAttribute('disabled', true);
			document.getElementById('amount').setAttribute('disabled', true);
			document.getElementById('description-input').setAttribute('disabled', true);
			document.getElementById('type-input').setAttribute('disabled', true);
			if(xhr.responseText == 'false') {
				alert("Reimbursement Request NOT Successful")
				loadHome(user.userRoleId);
				
			} else if (xhr.responseText == 'true')  {
				alert("Reimbursement Request Successful");
				document.getElementById('submit-request').setAttribute('disabled', true);
				loadHome(user.userRoleId);
			}
		}
	}
}

function checkTypeId() {
	let typeId = 0;
	if ((document.getElementById('type-input').value) === 'Lodging') {
		typeId = 1;
	} else if ((document.getElementById('type-input').value) === 'Travel') {
		typeId = 2;
	} else if ((document.getElementById('type-input').value) === 'Food') {
		typeId = 3;
	} else if ((document.getElementById('type-input').value) === 'Other') {
		typeId = 4;
	}
	return typeId;
}

function checkRoleId() {
	let roleId = 0;
	if ((document.getElementById('user-role').value) === 'Author') {
		roleId = 1;
	} else if ((document.getElementById('user-role').value) === 'Resolver') {
		roleId = 2;
	}
	return roleId;
}

function updateNav(isAuth) {
	console.log('in updateNav()');

	if (isAuth) {
		document.getElementById('toLogin').setAttribute('hidden', true);
		document.getElementById('toRegister').setAttribute('hidden', true);

		document.getElementById('toProfile').removeAttribute('hidden');
		document.getElementById('toLogout').removeAttribute('hidden');
	} else {
		document.getElementById('toLogin').removeAttribute('hidden');
		document.getElementById('toRegister').removeAttribute('hidden');

		document.getElementById('toProfile').setAttribute('hidden', true);
		document.getElementById('toLogout').setAttribute('hidden', true);
	}
}

function isAuthenticated() {
	let authenticatedUser = window.localStorage.getItem('user');
	console.log(authenticatedUser);

	if (authenticatedUser)
		return true
	else
		return false;
}

function logout() {
	window.localStorage.removeItem('user');

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'logout', true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			loadLogin();
		}
	}
}

function loadRegister() {
	console.log('in loadRegister()');

	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'register.view', true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadRegisterInfo();
		}
	}
}


function loadRegisterInfo() {
	console.log('in loadRegisterInfo()');
	document.getElementById('register').setAttribute('disabled', true);
	
	document.getElementById('register').addEventListener('click', register);
	document.getElementById('reg-message').style.display = 'none';

	document.getElementById('fn').addEventListener('blur', isRegisterFormValid);
	document.getElementById('ln').addEventListener('blur', isRegisterFormValid);
	document.getElementById('email').addEventListener('blur', isRegisterFormValid);
	document.getElementById('reg-username').addEventListener('blur', isRegisterFormValid);
	document.getElementById('reg-password').addEventListener('blur', isRegisterFormValid);

	document.getElementById('reg-username').addEventListener('blur', validateUsername);
	document.getElementById('email').addEventListener('blur', validateEmail);
	

}

function isRegisterFormValid() {
	let errorMessage = document.getElementById('reg-message');
	let registerBtn = document.getElementById('register');
	let firstName = document.getElementById('fn');
	let lastName = document.getElementById('ln');
	let email = document.getElementById('email');
	let username = document.getElementById('reg-username');
	let password = document.getElementById('reg-password');
	let form = [ firstName.value, lastName.value, email.value, username.value, password.value ];

	if ((form[0] && form[1] && form[2] && form[3] && form[4])){
		if (vUsername){
			if (vEmail){
				registerBtn.removeAttribute('disabled');
			}
		}
	}else{
		registerBtn.setAttribute('disabled', true);
	}
}

function validateUsername() {
	console.log('in validateUsername()');

	let username = document.getElementById('reg-username').value;
	console.log(username);
	
	if (username) {
		let usernameJSON = JSON.stringify(username);
		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'username.validate', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(usernameJSON);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				let username = JSON.parse(xhr.responseText);
				if (!username) {
					document.getElementById('reg-message').style.display = 'block';
					document.getElementById('reg-message').innerHTML = 'Username is already in use! Please try another!';
				} else {
					vUsername = true;
					document.getElementById('reg-message').style.display = 'none';
				}

			}
		}
	}
}



function validEmailFormat(){
	let email = document.getElementById('email');
	const emailRegex = /\S+@\S+/;
	if (emailRegex.test(email.value)){
		return true;
	}else{
		return false;
	}
}

function validateEmail() {
	console.log('in validateEmail()');

	let email = document.getElementById('email').value;
	if (email) {
		let emailJSON = JSON.stringify(email);
		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'email.validate', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(emailJSON);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				let email = JSON.parse(xhr.responseText);
				if (!validEmailFormat()){
					document.getElementById('reg-message').style.display = 'block';
					document.getElementById('reg-message').innerHTML = 'Please Enter A Valid Email.';
				}else if (!email && validEmailFormat()) {
					document.getElementById('reg-message').style.display = 'block';
					document.getElementById('reg-message').innerHTML = 'Email Is Already In Use. Please Try Another.';
				} else {
					vEmail = true;
					document.getElementById('reg-message').style.display = 'none';
				}
			}
		}
	}
}








