console.log("Implementing rxjs");

const Observable = function(subscribe) {
  this.subscribe = subscribe;
};

const observer = {
  next: value => console.log(value),
  error: error => console.log(error),
  complete: () => console.log("complete")
};

Observable.from = values => {
  return new Observable(observer => {
    values.forEach(value => observer.next(value));

    return {
      unSubscribe: () => console.log("unSubscribed!")
    };
  });
};

Observable.interval = interval => {
  return new Observable(observer => {
    let producer = () =>
      Math.random()
        .toString(36)
        .substr(2, 5);
    const intervalId = setInterval(() => {
      observer.next(producer());
    }, interval);

    return {
      unSubscribe: () => {
        clearInterval(intervalId);
        console.log("unSubscribed!");
      }
    };
  });
};

//Operator
Observable.prototype.map = mapper => {
  let observable = this;
  return new Observable(observer => {
    observable.subscribe(mapper(observer));
  });
};

//From array
const family$ = Observable.from([
  "ziye",
  "miranda",
  "celine",
  "mama",
  "angelo"
]);
family$.subscribe(observer);

//Interval
const intervald$ = Observable.interval(1000);
const intervaldSubscription = intervald$.subscribe(observer);
setTimeout(() => {
  intervaldSubscription.unSubscribe();
}, 10000);
