import { notifyServerToSendNotification } from './serviceWorker';
import { v4 as uuidv4 } from 'uuid';

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'add':
      notifyServerToSendNotification({
        text: "add a new todo" + " , title : " + payload,
        type: "ADD"
      });
      return [...state, {
        id: uuidv4(),
        text: payload,
        completed: false
      }];

    case 'finish':
      let targetIdx;
      state.find((item, idx) => {
        if (item.id === payload) {
          targetIdx = idx;
          return true;
        }
      });

      const newState = [...state];
      newState[targetIdx].completed = !newState[targetIdx].completed;
      notifyServerToSendNotification({
        text: "you changed state of a todo" + " , title : " + newState[targetIdx].text,
        type: "FINISHED"
      });
      return newState;

    case 'remove':
      let targetRemoveIdx;
      state.find((item, idx) => {
        if (item.id === payload) {
          targetRemoveIdx = idx;
          return true;
        }
      });
      const newRemoveState = [...state];
      const deleteItem = newRemoveState.splice(targetRemoveIdx, 1)[0];
      notifyServerToSendNotification({
        text: "you remove a todo" + " , title : " + deleteItem.text,
        type: "REMOVE"
      });
      return newRemoveState;

    case 'clear':
      notifyServerToSendNotification({
        text: "you cleared all completed todos",
        type: "CLEARALL"
      });
      return state.filter(item => !item.completed)

    default:
      return state;
  }
}

export const initialState = [
  {
    id: uuidv4(),
    text: 'hello world',
    completed: false
  }
];