import { pipe } from 'fp-ts/lib/pipeable';
import * as r from 'rxjs';
import * as ro from 'rxjs/operators';

const observable = new r.Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

observable.subscribe(console.log);

const interpolated = pipe(
  observable,
  ro.map(String),
  ro.map(n => `${n} with string interpolation`)
);

interpolated.subscribe(console.log);

const sameThing = observable.pipe(
  ro.map(String),
  ro.map(n => `${n} with string interpolation`)
);

sameThing.subscribe(console.log);
