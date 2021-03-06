import io from 'socket.io-client';
import {
  REQUEST_WS_PROFILE,
  COMPLETE_WS_PROFILE,
  RECEIVE_WS_NOTIFICATION,
  CONSUME_WS_NOTIFICATION
} from '../constants/actionTypes';

export function requestProfile() {
  return { type: REQUEST_WS_PROFILE };
}

export function completeProfile(data) {
  return { type: COMPLETE_WS_PROFILE, user: data };
}

export function receiveNotification(notification) {
  return { type: RECEIVE_WS_NOTIFICATION, notification };
}

export function consumeNotification(index) {
  return { type: CONSUME_WS_NOTIFICATION, index };
}

export function emitProfileRequest() {
  return dispatch => {
    const socket = io();
    socket.emit('login');

    socket.on('loginResponse', data => {
      dispatch(completeProfile(data));
    });

    socket.on('notification', notification => {
      dispatch(receiveNotification(notification));
    });
  };
}
