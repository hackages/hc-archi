import { Component, OnInit } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';

function next(value: any) {
  console.log(value);
}
function error(value: any) {
  console.log(value);
}
function complete() {
  console.log('Done........');
}

interface Observer {
  next(value: any): any;
  error(value: any): any;
  complete(): any;
}

interface Subscription {
  unsubscribe(): void;
}

const observer: Observer = {
  next,
  error,
  complete
};

class Observable {
  constructor(private producer: (observer: Observer) => Subscription) {}

  subscribe(observer: Observer) {
    return this.producer(observer);
  }

  interval(period: number) {
    return new Observable(function producer(observer: Observer) {
      let counter = 0;
      const id = setInterval(() => {
        observer.next(counter++);
      }, period);

      const subscription = {
        unsubscribe() {
          clearInterval(id);
        }
      };

      return subscription;
    });
  }

  from(...args: any[]) {
    return new Observable(function fromProducer(
      observer: Observer
    ): Subscription {
      try {
        args.forEach(el => observer.next(el));
        observer.complete();
        return {
          unsubscribe() {
            return null;
          }
        };
      } catch (error) {
        observer.error(error);
      }
    });
  }
  fromPromise() {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    const interval$ = new Observable(function producer(observer: Observer) {
      let counter = 0;
      const id = setInterval(() => {
        observer.next(counter++);
      }, 1000);

      const subscription = {
        unsubscribe() {
          clearInterval(id);
        }
      };

      return subscription;
    });

    const obj: Subscription = interval$.subscribe(observer);
    setTimeout(() => {
      interval$.subscribe(observer);
      obj.unsubscribe();
    }, 4000);
  }
}
