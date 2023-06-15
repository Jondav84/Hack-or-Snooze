/** @format */

"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  $storiesContainer.show();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
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
  $storiesContainer.show();
  $submitStoryForm.show();
  $allStoriesList.show();
}

$navSubmit.on("click", navSubmitClick);

//function to show my stories on click of nav-link

function navMyStoriesClick() {
  hidePageComponents();
  $storiesContainer.show();
  putMyStoriesOnPage();
  $myStories.show();
}

$navMyStories.on("click", navMyStoriesClick);

// fuction to show favs on click

function navFavoritesClick() {
  hidePageComponents();
  $storiesContainer.show();
  putFavoritesListOnPage();
}

$navFavorites.on("click", navFavoritesClick);
