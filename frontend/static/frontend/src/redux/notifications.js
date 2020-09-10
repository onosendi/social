import { createSlice } from '@reduxjs/toolkit';

// Local
import api, { descriptor } from '../api';

import { setLoading, setToast, unsetLoading } from './ui';

const NAMESPACE = 'notifications';

//
// Keys
//
export const key = {
  notifications: 'notifications',
  notificationsNext: 'notificationsNext',
  unreadNotifications: 'unreadNotifications',
  removeNotification: (notificationId) => (
    `removeNotification_${notificationId}`),
};

//
// Slice
//
const initialState = {
  unreadCount: null,
  notifications: {
    results: [],
  },
};

const notificationsSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      state.notifications.next = payload.next;
      state.notifications.results = [
        ...state.notifications.results,
        ...payload.results,
      ];
    },
    setUnreadNotificationsCount: (state, { payload }) => {
      state.unreadCount = payload;
    },
    unsetNotification: (state, { payload }) => {
      state.notifications.results = (
        state.notifications.results.filter((obj) => obj.id !== payload)
      );
    },
  },
});

const { actions, reducer } = notificationsSlice;
export const {
  setNotifications,
  setUnreadNotificationsCount,
  unsetNotification,
} = actions;
export default reducer;

//
// Selectors
//
export const selectNotifications = (state) => state.notifications.notifications;

export const selectUnreadNotificationsCount = (state) => {
  const { unreadCount } = state.notifications;
  return unreadCount === null ? 0 : unreadCount;
};

//
// Side effects
//
export const getNotifications = (nextUrl = null) => async (dispatch) => {
  let thisKey = key.notifications;
  if (nextUrl) {
    thisKey = key.notificationsNext;
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getNotifications, nextUrl);
    dispatch(setNotifications(data));
    dispatch(setUnreadNotificationsCount(0));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const getUnreadNotificationsCount = () => async (dispatch) => {
  const thisKey = key.unreadNotifications;
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getUnreadNotificationsCount);
    dispatch(setUnreadNotificationsCount(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};

export const removeNotification = (notificationId) => async (dispatch) => {
  const thisKey = key.removeNotification(notificationId);
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    await api(descriptor.removeNotification(notificationId));
    dispatch(unsetNotification(notificationId));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
