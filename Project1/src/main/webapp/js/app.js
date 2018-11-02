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
			console.log(user);
			if (user) {
				alert('Login successful!');
				window.localStorage.setItem('user', xhr.responseText);
				loadHome(user.userRoleId);
			} else {
				$('#login-message').show();
				$('#login-message').html('Invalid credentials');
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
	$('#user_id').html(user.id);
	$('#user_fn').html(user.firstName);
	$('#user_ln').html(user.lastName);
	$('#user_email').html(user.emailAddress);
	$('#user_username').html(user.username);
	$('#user_password').html(user.password);
}

function loadAuthorHomeInfo() {
	console.log('in loadAuthorHomeInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	$('#user_fn').html(user.firstName);
	
//	$('#submit-new-req-btn').on(/*go to submit new request*/);
	$('#req-history-btn').click(loadViewPastRequests);
	
}

function loadViewPastRequests(){
	console.log('in loadViewPastRequests()');
	
	let isAuth = isAuthenticated();
	updateNav(isAuth);

	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'author_pastrequests.view', true);

	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadViewPastRequestsInfo();
		}
	}

}

function loadViewPastRequestsInfo() {
	console.log('in loadViewPastRequestsInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	$('#user_fn').html(user.firstName);
	
	$('#author-return-home').click(function(){loadHome(user.userRoleId)});
	
}

function loadProfile() {
	console.log('in loadProfile()');

	let isAuth = isAuthenticated();
	updateNav(isAuth);
	if (!isAuth) {
		loadLogin();
		e.stopImmediatePropagation();
	}
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
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (!xhr.responseText) {
				$('#message').show().html('Something went wrong...');
			} else {
				$('#message').hide();
				alert('Enrollment successful! Please login using your credentials.');
				loadLogin();
			}
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
	console.log('in logout()');
	window.localStorage.removeItem('user');

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'logout', true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log('Session has been invalidated!');
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
