/** @format */

"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, myStory = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        <div>
          ${myStory ? getTrashCan() : ""}
          ${showStar ? getStar(story, currentUser) : ""}
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}

// added trash can to delete
function getTrashCan() {
  return `<span class="trash-can">
            <i class="fas fa-trash-alt"></i>
          </span>`;
}

//added a star for adding/removing favorites
function getStar(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `<span class="star">
            <i class="${starType} fa-star"></i>
          </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// submit story function
async function submitStory(evt) {
  evt.preventDefault();

  const title = $titleInput.val();
  const author = $authorInput.val();
  const url = $urlInput.val();
  const storyData = { title, author, url };

  const response = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(response);

  $allStoriesList.prepend($story);
  $submitStoryForm.hide();
  $submitStoryForm.trigger("reset");
}

$submitStoryForm.on("submit", submitStory);

// functionality to show users stories
function putMyStoriesOnPage() {
  $myStories.empty();
  currentUser.ownStories.forEach((story) => {
    let $story = generateStoryMarkup(story, true);
    $myStories.append($story);
  });
  $myStories.show();
}

// show users favorites functions
function putFavoritesListOnPage() {
  $favorites.empty();
  currentUser.favorites.forEach((s) => {
    const $story = generateStoryMarkup(s);
    $favorites.append($story);
  });
  $favorites.show();
}

// toggle favorite story
async function toggleFavorites(evt) {
  const $target = $(evt.target);
  const storyId = $target.closest("li").attr("id");
  const story = storyList.stories.find((s) => s.storyId === storyId);

  if ($target.hasClass("fas")) {
    await currentUser.deleteFavorite(story);
    $target.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
}

$storyLists.on("click", ".star", toggleFavorites);

//delete stories event
async function deleteStory(evt) {
  const storyId = $(evt.target).closest("li").attr("id");
  await storyList.removeStory(currentUser, storyId);
  await putMyStoriesOnPage();
}

$myStories.on("click", ".trash-can", deleteStory);
