"use strict"
// Problem: Hints are shown even when form is valid
// Soluction： Hide and show them at appropriate time


// declare the variable
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
var $submitButton = $("#submit");

// Hide hints
$("form span").hide();

function isPasswordValid(){
	return $password.val().length >= 8;
}

function arePasswordMatching(){
	return $password.val() === $confirmPassword.val();
}

function canSubmit(){
	return isPasswordValid() && arePasswordMatching();
}

function passwordEvent(){
	//Find out if password is valid
	if(isPasswordValid()){
		// Hide hint if valid
		$password.next().hide();
	} else {	
		// else show hint
		$password.next().show();
	}
}

function confirmationPasswordEvent(){
	//Find out if password and confirmation match
	if(arePasswordMatching()){
		//Hide hint if match
		$confirmPassword.next().hide();
	} else {
		//else show match	
		$confirmPassword.next().show();
	}
}

function enableSubmitEvent(){
	$submitButton.prop("disabled", !canSubmit());
}

// when event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent)
				 .keyup(confirmationPasswordEvent).keyup(enableSubmitEvent);

// when event happens on confirmation input
$confirmPassword.focus(confirmationPasswordEvent).keyup(confirmationPasswordEvent)
								.keyup(enableSubmitEvent);

enableSubmitEvent();
