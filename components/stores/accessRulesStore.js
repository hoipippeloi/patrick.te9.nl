// src/lib/stores/accessRuleStore.js

import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://appz.pockethost.io/');

// globally disable auto cancellation
pb.autoCancellation(false);

// Initial state
const initialState = [];

// Create the store
const accessRuleStore = writable(initialState);

// Fetch all access rules
async function fetchAccessRules() {
  const accessRules = await pb.collection('access_rules').getFullList({ sort: '-created' });
  accessRuleStore.set(accessRules);
}

// Create a new access rule
async function createAccessRule(data) {
  try {
    const record = await pb.collection('access_rules').create(data);
    fetchAccessRules();  // Fetch the updated list of access rules
    return record; // Return the newly added access rule
  } catch (error) {
    throw error;  // Propagate the error to the caller
  }
}

// Update an access rule
async function updateAccessRule(ruleId, data) {
  try {
    const updatedRule = await pb.collection('access_rules').update(ruleId, data);
    fetchAccessRules();  // Fetch the updated list of access rules after an update
    return updatedRule; // Return the updated access rule
  } catch (error) {
    throw error;  // Re-throw the error to the caller
  }
}

// Delete an access rule
async function deleteAccessRule(ruleId) {
  try {
    await pb.collection('access_rules').delete(ruleId);
    fetchAccessRules();  // Fetch the updated list of access rules after deleting
  } catch (error) {
    throw error;  // Re-throw the error to the caller
  }
}

// Export the store and the functions to manipulate it
export default {
  subscribe: accessRuleStore.subscribe,
  createAccessRule,
  fetchAccessRules,
  updateAccessRule,
  deleteAccessRule
};
