
import { fromFetch } from 'rxjs/fetch';
import {
  map,
  switchMap,
  startWith,
  combineLatest
} from 'rxjs/operators';
import {fromEvent, Observable } from 'rxjs';


let closeButton1 = document.querySelector('.close1');
let closeButton2 = document.querySelector('.close2');
let closeButton3 = document.querySelector('.close3');
let close1ClickStream = fromEvent(closeButton1, 'click');
let close2ClickStream = fromEvent(closeButton2, 'click');
let close3ClickStream = fromEvent(closeButton3, 'click');
let refreshButton = document.querySelector('.refresh');
let refreshClickStream = fromEvent(refreshButton, 'click')

interface userInformation {
  html_url: String,
  login: String,
  avatar_url: String
}

let requestStream = refreshClickStream.pipe(startWith('fire my requests')).pipe(map(() => {
  let randomOffset = Math.floor(Math.random() * 500);
  return 'https://api.github.com/users?since=' + randomOffset;
}))

let responseStream = requestStream.pipe(
  switchMap((url: string) => fromFetch(url).pipe(
    switchMap(response => response.ok && response.json())
  ))
)

let suggestionStream = (closebtnClick: Observable<Event>, selector: string) => closebtnClick.pipe(startWith('initial')).pipe(combineLatest(responseStream, (_, user) => {
  return user[Math.floor(Math.random() * user.length)]
})).subscribe((x: userInformation) => renderSuggestion(x, selector))


suggestionStream(close1ClickStream, '.stream1')
suggestionStream(close2ClickStream, '.stream2')
suggestionStream(close3ClickStream, '.stream3')


function renderSuggestion(suggestedUser: userInformation, selector: any) {
  var suggestionEl = document.querySelector(selector);
  var usernameEl = suggestionEl.querySelector('.user');
  usernameEl.href = suggestedUser.html_url;
  usernameEl.textContent = suggestedUser.login;
  var imgEl = suggestionEl.querySelector('img');
  imgEl.src = "";
  imgEl.src = suggestedUser.avatar_url;
}