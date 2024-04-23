// lib/stores/lvs_leerlijnenlijst.js

import { writable } from 'svelte/store';
import supabase from '$lib/supabase/supabaseClient';

const lvsLeerlijnenlijstStore = writable([]);

const fetchLeerlijnenlijst = async () => {
    let { data: lvsLeerlijnenlijst, error } = await supabase
        .from('lvs_leerlijnenlijst')
        .select('*')
        .order('volgorde', { ascending: true })
        .order('id', { ascending: true })
        ;
    if (error) throw error;
    lvsLeerlijnenlijstStore.set(lvsLeerlijnenlijst);
}

const addLeerlijnenlijst = async (leerlijnenlijstDetail) => {
    const { data: lvsLeerlijnenlijst, error } = await supabase
        .from('lvs_leerlijnenlijst')
        .insert([leerlijnenlijstDetail]);
    if (error) throw error;
    lvsLeerlijnenlijstStore.set(lvsLeerlijnenlijst);
}

const updateLeerlijnenlijst = async (id, updatedDetail) => {
    const { data: lvsLeerlijnenlijst, error } = await supabase
      .from('lvs_leerlijnenlijst')
      .update(updatedDetail)
      .match({ id });
    if (error) throw error;
    lvsLeerlijnenlijstStore.set(lvsLeerlijnenlijst);
}

const deleteLeerlijnenlijst = async (id) => {
    const { data: lvsLeerlijnenlijst, error } = await supabase
      .from('lvs_leerlijnenlijst')
      .delete()
      .match({ id });
    if (error) throw error;
    lvsLeerlijnenlijstStore.set(lvsLeerlijnenlijst);
}

export {
    lvsLeerlijnenlijstStore,
    fetchLeerlijnenlijst,
    addLeerlijnenlijst,
    updateLeerlijnenlijst,
    deleteLeerlijnenlijst
}
