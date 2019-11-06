import {Observable} from "rxjs/Observable"
import {Subject} from "rxjs/Subject"
import 'rxjs/add/operator/skipUntil';
import { map, filter, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { consolePrint } from "./utils/operators";

let observable = Observable.create((observer:any)=>{
  let i = 1
  setInterval(() => {
    observer.next(i++)
  }, 1000);
})

let subject = new Subject

setTimeout(() => {
  subject.next()
}, 3000);

let obs = observable.skipUntil(subject)

of(1, 2, 3, 4, 5, 6).pipe(
  filter(x => x < 3),
  map(x => x * 2),
  reduce((x, y) => x + y, 0))
.subscribe(x => addItem(x));
// consolePrint(obs)
// obs.subscribe((x:any)=>addItem(x))

function addItem(val:any) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}