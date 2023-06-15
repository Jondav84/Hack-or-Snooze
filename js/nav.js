/** @format */

"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// function to show the submit form on nav-link "submit"  click
function navSubmitClick() {
  hidePageComponents();
  $allStoriesList.show();
  $submitStoryForm.show();
}

$navSubmit.on("click", navSubmitClick);

//function to show my stories on click of nav-link

function navMyStoriesClick() {
  hidePageComponents();
  putMyStoriesOnPage();
  $myStories.show();
}

$navMyStories.on("click", navMyStoriesClick);

// fuction to show favs on click

function navFavoritesClick() {
  hidePageComponents();
  putFavoritesListOnPage();
}

$navFavorites.on("click", navFavoritesClick);
