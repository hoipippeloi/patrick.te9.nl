import { writable } from 'svelte/store';
import supabase from '$lib/supabase/supabaseClient';

const formsDeclaratiesStore = writable([]);

const fetchFormsDeclaraties = async () => {
    let { data: formsDeclaraties, error } = await supabase
        .from('forms_declaraties')
        .select('*')
        .order('id', { ascending: false });

    if (error) throw error;

    const transformedData = formsDeclaraties.map(item => {
        const datumTxt = new Date(item.date).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const insertedTxt = new Date(item.submit_time).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        const lastDayOfMonth = new Date(item.submit_time);
        lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
        lastDayOfMonth.setDate(0);
        
        const firstDayOfWeek = new Date(item.submit_time);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + 1);
        
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        return {
            ...item,
            datum_txt: datumTxt,
            ingediend_txt: insertedTxt,
            last_date_of_month: lastDayOfMonth.toISOString().split('T')[0],
            last_date_of_week: lastDayOfWeek.toISOString().split('T')[0],
        };
    });

    formsDeclaratiesStore.set(transformedData);
}


const addFormsDeclaratie = async (declaratieDetail) => {
    const { data: formsDeclaraties, error } = await supabase
        .from('forms_declaraties')
        .insert([declaratieDetail]);
    if (error) throw error;
    formsDeclaratiesStore.set(formsDeclaraties);
}

const updateFormsDeclaratie = async (id, updatedDetail) => {
    const { data: formsDeclaraties, error } = await supabase
      .from('forms_declaraties')
      .update(updatedDetail)
      .match({ id });
    if (error) throw error;
    formsDeclaratiesStore.set(formsDeclaraties);
}

const deleteFormsDeclaratie = async (id) => {
    const { data: formsDeclaraties, error } = await supabase
      .from('forms_declaraties')
      .delete()
      .match({ id });
    if (error) throw error;
    formsDeclaratiesStore.set(formsDeclaraties);
}

export {
    formsDeclaratiesStore,
    fetchFormsDeclaraties,
    addFormsDeclaratie,
    updateFormsDeclaratie,
    deleteFormsDeclaratie
}
