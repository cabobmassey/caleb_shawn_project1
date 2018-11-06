window.onload = function() {
	loadLogin();
	document.getElementById('toLogin').addEventListener('click', loadLogin);
	document.getElementById('toRegister').addEventListener('click',
			loadRegister);

	document.getElementById('toHome').addEventListener('click', loadHome);
	document.getElementById('toProfile').addEventListener('click', loadProfile);
	document.getElementById('toLogout').addEventListener('click', logout);

	// determines what navbar links to show if the user is or is not
	// authenticated
	let isAuth = isAuthenticated();
	updateNav(isAuth);
}

function login() {
	console.log('in login()');

	let username = $('#login-username').val();
	let password = $('#login-password').val();

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
				$('#login-message').show();
				$('#login-message').html('Invalid Credentials');
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
	
	$('#submit-new-req-btn').click(loadCreateTicket);
	$('#view-pending-btn').click(loadManagerViewRequests);
}

function loadAuthorHomeInfo() {
	console.log('in loadAuthorHomeInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	$('#user_fn').html(user.firstName);
	
	$('#submit-new-req-btn').click(loadCreateTicket);
	$('#req-history-btn').click(loadViewPastRequests);
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
			loadManagerViewRequestsInfo('1');
			document.getElementById('all_requests_option').addEventListener('click', function(e){
				getAllReimbursements();				
			});
			document.getElementById('accepted_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo('2');	
			});
			document.getElementById('denied_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo('3');				
			});
			document.getElementById('pending_requests_option').addEventListener('click', function(e){
				loadManagerViewRequestsInfo('1');				
			});
		}
	}
}

function getAllReimbursements(){
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
	console.log('in loadManagerViewRequestsInfo()');
	
	const errorRequestsMessage = document.getElementById('error-requests-message');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let statusIdJSON = JSON.stringify(statusId);
	
	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'filter_by_reimbursement_status', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(statusIdJSON);
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			let ticketData = JSON.parse(xhr.responseText);
			// add rows to the already created table containing all reimbursement requests for a particular user
			if (ticketData.length != 0){
				errorRequestsMessage.setAttribute('hidden', true);
				addRows(ticketData);
			}else{
				errorRequestsMessage.removeAttribute('hidden');
				errorRequestsMessage.innerHTML = 'No pending reimbursements';
			}
		}
	}
	
	$('#resolver-return-home').click(function(){loadHome(user.userRoleId)});
	
}

function addRows(ticketData){
	
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	
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
	    
	    /*if(ticketData[i].reimb_status_id == 1 && user.userRoleId == 2){
	    	let approveBtn = document.createElement('button');
	    	let denyBtn = document.createElement('button');
	    	approveBtn.className = 'btn btn-success btn-sm';
	    	denyBtn.className = 'btn btn-danger btn-sm';
	    	approveBtn.innerHTML = 'Approve';
	    	denyBtn.innerHTML = 'Deny';
	    	approveBtn.addEventListener('click', approveRequest);
	    	denyBtn.addEventListener('click', denyRequest);
	    	actionCell.appendChild(approveBtn);
	    	actionCell.appendChild(denyBtn);
	    	
	    } else {
	    	actionCell.InnerText = 'Already processed';
	    }*/
	    
	    let tbody;
	    
	    if(user.userRoleId == 1){
	    	tbody = document.getElementById('past_request_table_body');
	    } else {
	    	tbody = document.getElementById('author-past-requests-table');
	    }
	    
	    // append the row to our pre-existing table
	    tbody.appendChild(row);
	    
	    reimbIdCell.innerText = ticketData[i].reimb_id;
	    reimbAmountCell.innerText = ticketData[i].reimb_amount;
	    reimbSubmittedCell.innerText = ticketData[i].reimb_submitted;
	    reimbResolvedCell.innerText = ticketData[i].reimb_resolved;
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

function loadViewPastRequestsInfo() {
	const pastTicketErrorMessage = document.getElementById('past-requests-message');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let authorId = user.userId;
	let authorIdJSON = JSON.stringify(authorId);
	$('#user_fn').html(user.firstName);
	
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
	
	$('#author-return-home').click(function(){loadHome(user.userRoleId)});
	
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

	$('#login-message').hide();
	$('#login').on('click', login);
	$('#toRegisterBtn').on('click', loadRegister);
}

function register() {
	console.log('in register()');

	$('#register').attr('disabled', true);
	let roleId = checkRoleId();
	let user = {
		firstName : $('#fn').val(),
		lastName : $('#ln').val(),
		email : $('#email').val(),
		username : $('#reg-username').val(),
		password : $('#reg-password').val(),
		userRoleId : roleId
	}

	let userJSON = JSON.stringify(user);

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'register', true);
	xhr.send(userJSON);

	xhr.onreadystatechange = function() {
    
		if(xhr.readyState == 4 && xhr.status == 200) {
			if(xhr.responseText == 'false') {
				$('#reg-message').show().html('Something went wrong...');
			} else  {
				$('#reg-message').hide();
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
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	$('#submit-request').attr('disabled', true);
	
	$('#amount').blur(isCreateTicketFormValid);
	$('#description-input').blur(isCreateTicketFormValid);
	$('#type-input').blur(isCreateTicketFormValid);

	
	$('#submit-request').click(createTicket);
	$('#author-return-home_Create_Reimb').click(function() {loadHome(user.userRoleId)});

}

function isCreateTicketFormValid() {
	let form = [ $('#amount').val(), $('#description-input').val(), $('#type-input').val()];

	if (!(form[0] && form[2]))
		$('#submit-request').attr('disabled', true);
	else
		$('#submit-request').attr('disabled', false);
}

function createTicket() {
	
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	let typeId = checkTypeId();
	let request = {
			reimb_amount: $('#amount').val(),
			reimb_submitted: new Date().toUTCString(),
			reimb_resolved: null,
			reimb_description: $('#description-input').val(),
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
			$('#submit-request').attr('disabled', true);
			$('#amount').attr('disabled', true);
			$('#description-input').attr('disabled', true);
			$('#type-input').attr('disabled', true);
			if(xhr.responseText == 'false') {
				alert("Reimbursement Request NOT Successful")
				loadHome(user.userRoleId);
				
			} else if (xhr.responseText == 'true')  {
				alert("Reimbursement Request Successful");
				$('#submit-request').attr('disabled', true);
				loadHome(user.userRoleId);
			}
		}
	}
}

function checkTypeId() {
	let typeId = 0;
	if ($('#type-input').val() === 'Lodging') {
		typeId = 1;
	} else if ($('#type-input').val() === 'Travel') {
		typeId = 2;
	} else if ($('#type-input').val() === 'Food') {
		typeId = 3;
	} else if ($('#type-input').val() === 'Other') {
		typeId = 4;
	}
	return typeId;
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

	$('#reg-message').hide();

	$('#fn').blur(isRegisterFormValid);
	$('#ln').blur(isRegisterFormValid);
	$('#email').blur(isRegisterFormValid);
	$('#reg-username').blur(isRegisterFormValid);
	$('#reg-password').blur(isRegisterFormValid);

	$('#reg-username').blur(validateUsername); // same as
												// document.getElementById('reg-username').addEventListener('blur',
												// function, boolean);
	$('#email').blur(validateEmail);

	$('#register').attr('disabled', true);
	$('#register').on('click', register);

}

function checkRoleId() {
	let roleId = 0;
	if ($('#user-role').val() === 'Author') {
		roleId = 1;
	} else if ($('#user-role').val() === 'Resolver') {
		roleId = 2;
	}
	return roleId;
}

function updateNav(isAuth) {
	console.log('in updateNav()');

	if (isAuth) {
		$('#toLogin').attr('hidden', true);
		$('#toRegister').attr('hidden', true);

		$('#toHome').attr('hidden', false);
		$('#toProfile').attr('hidden', false);
		$('#toLogout').attr('hidden', false);
	} else {
		$('#toLogin').attr('hidden', false);
		$('#toRegister').attr('hidden', false);

		$('#toHome').attr('hidden', true);
		$('#toProfile').attr('hidden', true);
		$('#toLogout').attr('hidden', true);
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

function isRegisterFormValid() {
	let form = [ $('#fn').val(), $('#ln').val(), $('#email').val(),
			$('#reg-username').val(), $('#reg-password').val() ];

	if (!(form[0] && form[1] && form[2] && form[3] && form[4]))
		$('#register').attr('disabled', true);
	else
		$('#register').attr('disabled', false);
}

function validateUsername() {
	console.log('in validateUsername()');

	let username = $('#reg-username').val();
	console.log(username);

	if (username !== '') {
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
					$('#reg-message').show();
					$('#reg-message').html(
							'Username is already in use! Please try another!');
					$('#register').attr('disabled', true);
				} else {
					$('#reg-message').hide();
				}

			}
		}
	}
}

function validateEmail() {
	console.log('in validateEmail()');

	let email = $('#email').val();

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
				if (!email) {
					$('#reg-message').show();
					$('#reg-message').html(
							'Email is already in use! Please try another!');
					$('#register').attr('disabled', true);
				} else {
					$('#reg-message').hide();
				}
			}
		}
	}
}