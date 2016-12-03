import dispatcher from './dispatcher';

export function up () {
  dispatcher.dispatch({
    type: 'CURSOR_UP'
  });
}

export function down () {
  dispatcher.dispatch({
    type: 'CURSOR_DOWN'
  });
}

export function next () {
  dispatcher.dispatch({
    type: 'STAGE_NEXT'
  });
}

export function prev () {
  dispatcher.dispatch({
    type: 'STAGE_PREV'
  });
}

let interval;
export function startCounter() {
  const time = 1000;
  if (!interval) {
    interval = setInterval(() => {
      dispatcher.dispatch({
        type: 'TIME_ADD',
        milliseconds: time
      });
    }, time);
  }
}
