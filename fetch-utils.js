const SUPABASE_URL = 'https://frbmbjirrybrfhgeciij.supabase.co';
const SUPABASE_KEY = 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyYm1iamlycnlicmZoZ2VjaWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAwNjI0MzQsImV4cCI6MTk3NTYzODQzNH0.yBcxYAIHsNPLt47MZKdzWfykIdTzjBPHOnskDd2lhos';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createNewPoll(data) {
    const resp = await client
        .from('polls')
        .insert(data);

    if (resp.error) {
        throw new Error(resp.error.message);
    }
    return resp.data;
}

export async function getPolls() {
    const resp = await client
        .from('polls')
        .select('*');
    if (resp.error) {
        throw new Error(resp.error.message);
    }
    return resp.data;
}