// src/lib/stores/appRouteStore.js

import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://appz.pockethost.io/');

pb.autoCancellation(false);

const initialState = [];

const appRouteStore = writable(initialState);

async function fetchAppRoutes() {
  const appRoutes = await pb.collection('app_routes').getFullList({sort: '-created'});
  appRouteStore.set(appRoutes);
}

// Add this function to enrich route access with details
async function enrichRouteAccess(routeIds) {
  const enrichedRoutes = [];

  for (const routeId of routeIds) {
    try {
      const routeDetail = await pb.collection('app_routes').getOne(routeId);
      enrichedRoutes.push(routeDetail);
    } catch (error) {
      console.error(`Error fetching route details for ID ${routeId}:`, error);
      // Handle error as needed
    }
  }

  return enrichedRoutes;
}

async function createAppRoute(data) {
  try {
    const record = await pb.collection('app_routes').create(data);
    fetchAppRoutes(); // Refresh the app routes in the store
    return record;
  } catch (error) {
    throw error;
  }
}

async function updateAppRoute(routeId, data) {
  try {
    const updatedRoute = await pb.collection('app_routes').update(routeId, data);
    fetchAppRoutes(); // Refresh the app routes
    return updatedRoute;
  } catch (error) {
    throw error;
  }
}

async function deleteAppRoute(routeId) {
  try {
    await pb.collection('app_routes').delete(routeId);
    fetchAppRoutes(); // Refresh the app routes
  } catch (error) {
    throw error;
  }
}

// Optionally, you can also enhance fetchAppRoutes to automatically include additional details
// based on some criteria, for instance, if your application requires that information upfront.

export default {
  subscribe: appRouteStore.subscribe,
  createAppRoute,
  fetchAppRoutes,
  updateAppRoute,
  deleteAppRoute,
  enrichRouteAccess // Exporting the new function to be used elsewhere in the application
};
