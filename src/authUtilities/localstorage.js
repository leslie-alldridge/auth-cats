//these functions are awesome to use across projects. Feel free to save them as a gist. What's a Gist you ask? It's like a GitHub notepad! Google it, you may love it.

//how to view localstorage in google chrome you ask?
// 1. from dev tools click the Application heading
// 2. Click Local Storage
// 3. expand the menu and take a look, wahoo!

const localStorage = global.window.localStorage;

export function get(key) {
  return localStorage.getItem(key);
}

export function set(key, value) {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
}
