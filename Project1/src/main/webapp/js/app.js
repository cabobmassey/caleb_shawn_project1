window.onload = function() {
	loadAuthorLogin();
	document.getElementById('toLogin').addEventListener('click', loadAuthorLogin);
	document.getElementById('toRegister').addEventListener('click', loadAuthorRegister);
	document.getElementById('toHome').addEventListener('click', loadAuthorHome);
	document.getElementById('toProfile').addEventListener('click', loadAuthorProfile);
	document.getElementById('toLogout').addEventListener('click', logout);
	
	// determines what navbar links to show if the user is or is not authenticated
	let isAuth = isAuthenticated();
	updateNav(isAuth);
}
function updateNav(isAuth) {
	console.log('in updateNav()');
	
	if(isAuth) {
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
	
	if(authenticatedUser) return true
	else return false;
}

function loadAuthorLogin() {
	console.log('in loadAuthorLogin()');
	
	let isAuth = isAuthenticated();
	updateNav(isAuth);
	
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'authorlogin.view', true);
	xhr.send();
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadAuthorLoginInfo();
		}
	}
}

function loadAuthorRegister() {
	console.log('in loadAuthorRegister()');
	
	let isAuth = isAuthenticated();
	updateNav(isAuth);
	
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'register.view', true);
	xhr.send();
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadAuthorRegisterInfo();
		}
	}
}

function loadAuthorHome() {
	console.log('in loadAuthorHome()');
	
	let isAuth = isAuthenticated();
	updateNav(isAuth);
	
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'home.view', true);
	xhr.send();
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('view').innerHTML = xhr.responseText;
			loadAuthorHomeInfo();
		}
	}
}

function loadAuthorHomeInfo() {
	console.log('in loadAuthorHomeInfo()');
	let userJSON = window.localStorage.getItem('user');
	let user = JSON.parse(userJSON);
	$('#user_id').html(user.id);
	$('#user_fn').html(user.firstName);
	$('#user_ln').html(user.lastName);
	$('#user_email').html(user.emailAddress);
	$('#user_username').html(user.username);
	$('#user_password').html(user.password);
}

function loadAuthorProfile() {
	console.log('in loadProfile()');
	
	let isAuth = isAuthenticated();
	updateNav(isAuth);
	if(!isAuth) {
		loadAuthorLogin();
		e.stopImmediatePropagation();
	}
}

function loadAuthorLoginInfo() {
	console.log('in loadAuthorLoginInfo()');
	
	$('#login-message').hide();
	$('#login').on('click', login);
	$('#toRegisterBtn').on('click', loadAuthorRegister);
}

function loginAuthor() {
	console.log('in login()');
	
	let username = $('#login-username').val();
	let password = $('#login-password').val();
	
	let credentials = [username, password];
	let credentialsJSON = JSON.stringify(credentials);
	
	let xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'login', true);
	xhr.send(credentialsJSON);
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			let user = JSON.parse(xhr.responseText);
			if(user) {
				alert('Login successful!');
				window.localStorage.setItem('user', xhr.responseText);
				loadAuthorHome();
				console.log(`User id: ${user.id} login successful`);
			} else {
				$('#login-message').show();
				$('#login-message').html('Invalid credentials');
			}
		}
	}
	
}

function logout() {
	console.log('in logout()');
	window.localStorage.removeItem('user');
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'logout', true);
	xhr.send();
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log('Session has been invalidated!');
			loadAuthorLogin();
		}
	}
}

function loadAuthorRegisterInfo() {
	console.log('in loadAuthorRegisterInfo()');
	
	$('#reg-message').hide();
	
	$('#fn').blur(isRegisterFormValid);
	$('#ln').blur(isRegisterFormValid);
	$('#email').blur(isRegisterFormValid);
	$('#reg-username').blur(isRegisterFormValid);
	$('#reg-password').blur(isRegisterFormValid);
	
	$('#reg-username').blur(validateUsername); // same as document.getElementById('reg-username').addEventListener('blur', function, boolean);
	$('#email').blur(validateEmail);
	
	$('#register').attr('disabled', true);
	$('#register').on('click', register);
	
}

function isRegisterFormValid() {
	let form = [
		$('#fn').val(), 
		$('#ln').val(), 
		$('#email').val(), 
		$('#reg-username').val(), 
		$('#reg-password').val()
	];
	
	if(!(form[0] && form[1] && form[2] && form[3] && form[4])) $('#register').attr('disabled', true);
	else $('#register').attr('disabled', false);
}

function validateUsername() {
	console.log('in validateUsername()');
	
	let username = $('#reg-username').val();
	console.log(username);
	
	if(username !== '') {
		let usernameJSON = JSON.stringify(username);
		let xhr = new XMLHttpRequest();
		
		xhr.open('POST', 'username.validate', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(usernameJSON);
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				let username = JSON.parse(xhr.responseText);
				if(!username) {
					$('#reg-message').show();
					$('#reg-message').html('Username is already in use! Please try another!');
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
	
	if(email) {
		let emailJSON = JSON.stringify(email);
		let xhr = new XMLHttpRequest();
		
		xhr.open('POST', 'email.validate', true);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.send(emailJSON);
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				let email = JSON.parse(xhr.responseText);
				if(!email) {
					$('#reg-message').show();
					$('#reg-message').html('Email is already in use! Please try another!');
					$('#register').attr('disabled', true);
				} else {
					$('#reg-message').hide();
				}
			}
		}
	}
}

function registerAuthor() {
	console.log('in registerAuthor()');
	
	$('#register').attr('disabled', true);
	
	let user = {
			id: 0,
			firstName: $('#fn').val(),
			lastName: $('#ln').val(),
			emailAddress: $('#email').val(),
			username: $('#reg-username').val(),
			password: $('#reg-password').val()
	}
	
	let userJSON = JSON.stringify(user);
	
	let xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'register', true);
	xhr.send(userJSON);
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			if(!xhr.responseText) {
				$('#message').show().html('Something went wrong...');
			} else {
				$('#message').hide();
				alert('Enrollment successful! Please login using your credentials.');
				loadAuthorLogin();
			}
		}
	}
}