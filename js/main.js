/** @format */

"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:
// HTML consts
const $body = $("body");
const $storiesContainer = $("#stories-container");

const $storyLists = $(".stories-list");

const $myStories = $("#my-stories");
const $favorites = $("#favorite-stories");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
// form consts
const $submitStoryForm = $("#submit-new-story");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
//input consts
const $titleInput = $("#title-input");
const $urlInput = $("#url-input");
const $authorInput = $("#author-input");
//nav consts
const $navFavorites = $("#nav-favorites");
const $navMyStories = $("#nav-my-stories");
const $navSubmit = $("#nav-submit");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $loginForm,
    $signupForm,
    $submitStoryForm,
    $storyLists,
    $storiesContainer,
  ];
  components.forEach((c) => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn(
  "HEY STUDENT: This program sends many debug messages to" +
    " the console. If you don't see the message 'start' below this, you're not" +
    " seeing those helpful debug messages. In your browser console, click on" +
    " menu 'Default Levels' and add Verbose"
);
$(start);
