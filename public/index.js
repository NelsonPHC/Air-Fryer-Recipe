/*
 * This is the frontend JS for my air fryer recipe page.
 * It handles form inputs (create, update, search, delete a recipe) and displays
 * the corresponding messages.
 * When a user searches an existing recipe, all the recipe details will be displayed on the page.
 * For the other two functions (create, update, delete), it replies with a message indicating
 * if the operation is successful.
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * initiates page upon load
   */
  function init() {
    let options = qsa("input[name='option']");
    for (let i = 0; i < options.length; i++) {
      options[i].addEventListener("change", toggleView);
    }

    id('search-form').addEventListener('submit', function(e) {
      e.preventDefault();
      searchRequest();
    });

    id('delete-form').addEventListener('submit', function(e) {
      e.preventDefault();
      deleteRequest();
    });

    id('create-form').addEventListener('submit', function(e) {
      e.preventDefault();
      createRequest();
    });

    id('update-form').addEventListener('submit', function(e) {
      e.preventDefault();
      updateRequest();
    });
  }

  /**
   * toggles forms based on the select input type (create/search for a recipe)
   */
  function toggleView() {
    let option = this.value;
    id('search-form').classList.add('hidden');
    id('create-form').classList.add('hidden');
    id('update-form').classList.add('hidden');
    id('delete-form').classList.add('hidden');


    id(option + '-form').classList.remove('hidden');
  }

  /**
   * searches for a recipe
   */
  function searchRequest() {
    id('recipe-display').innerHTML = '';
    id('recipe-display').classList.remove('hidden');
    let name = id('searchname').value;
    fetch('/recipes/' + name)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(recipeDisplay)
      .catch(handleError);
  }

  /**
   * displays the received recipe on the page
   * @param {object} response an object containing the recipe information
   */
  function recipeDisplay(response) {
    let name = Object.keys(response)[0];

    if (name !== 'error') {
      appendElement('h2', response.name);
      appendElement('p', response.description);
      appendElement('p', 'Temperature: ' + response.temperature + '°F');
      appendElement('p', 'Timer: ' + response.timer + ' mins');
      appendElement('p', 'Flip half-way? ' + response.flip);
    } else {
      appendElement('p', response.message); // display error if recipe not found
    }
  }

  /**
   * a helper function for creating recipe detail entries and display them on the page
   * @param {string} dom a string representing the type of DOM object to create
   * @param {string} content a string for the text content in dom
   */
  function appendElement(dom, content) {
    let element = document.createElement(dom);
    element.textContent = content;
    id('recipe-display').appendChild(element);
  }

  /**
   * deletes a recipe
   */
  function deleteRequest() {
    id('recipe-display').innerHTML = '';
    id('recipe-display').classList.remove('hidden');
    let params = new FormData(id("delete-form")); // pass in entire form tag
    let name = params.get('deletename');
    fetch('/recipes/' + name, {method: "DELETE"})
      .then(statusCheck)
      .then(resp => resp.json())
      .then(messageDisplay)
      .catch(handleError);
  }

  /**
   * creates a recipe
   */
  function createRequest() {
    id('recipe-display').innerHTML = '';
    id('recipe-display').classList.remove('hidden');
    let params = new FormData(id("create-form"));
    fetch('/recipes/', {method: "POST", body: params})
      .then(statusCheck)
      .then(resp => resp.json())
      .then(messageDisplay)
      .catch(handleError);
  }

  /**
   * updates a recipe
   */
   function updateRequest() {
    id('recipe-display').innerHTML = '';
    id('recipe-display').classList.remove('hidden');
    let params = new FormData(id("update-form"));
    fetch('/recipes/' + params.get('name'), {method: "PATCH", body: params})
      .then(statusCheck)
      .then(resp => resp.json())
      .then(messageDisplay)
      .catch(handleError);
  }

  /**
   * displays a message if the recipe is created/updated
   * @param {string} response a message telling the user if the recipe is created/updated
   */
  function messageDisplay(response) {
    appendElement('p', response.message);
  }

  /**
   * displays the error message when deleting or creating/updating recipes
   * @param {string} err an error message when searching or creating/updating recipes
   */
  function handleError(err) {
    appendElement('p', err);
  }

  /* --- CSE 154 HELPER FUNCTIONS --- */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * id helper function
   * @param {String} idName name of id
   * @return {Object} element with id name
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();