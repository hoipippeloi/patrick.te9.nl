// src/stores/werklogStore.js

import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://appz.pockethost.io/');

pb.autoCancellation(false);

const initialState = [];

const werklogStore = writable(initialState);

/* Fetch all activities */
async function fetchActivities() {
  const options = {
    sort: 'created',
    expand: 'user' // Passed 'users' to the expand property
  };
  const activities = await pb.collection('werklog').getFullList(options);
  werklogStore.set(activities);
}
/*
async function fetchActivities() {
  const activities = await pb.collection('werklog').getFullList({ sort: '-date,-created' });
  werklogStore.set(activities);
}
*/

/* Create a new activity */
async function createActivity(data) {
  try {
    const record = await pb.collection('werklog').create(data);
    fetchActivities(); 
    return record; 
  } catch (error) {
    throw error; 
  }
}

/* Update an activity */
async function updateActivity(activityId, data) {
  try {
    const updatedActivity = await pb.collection('werklog').update(activityId, data);
    fetchActivities();  
    return updatedActivity; 
  } catch (error) {
    throw error; 
  }
}

/* Delete an activity */
async function deleteActivity(activityId) {
  try {
    await pb.collection('werklog').delete(activityId);
    fetchActivities(); 
  } catch (error) {
    throw error;
  }
}

export default {
  subscribe: werklogStore.subscribe,
  createActivity,
  fetchActivities,
  updateActivity,
  deleteActivity
};
