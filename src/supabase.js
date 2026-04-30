<<<<<<< Updated upstream
import { createClient } from '@supabase/supabase-js';

// Estas chaves vêm do seu projeto Supabase (Próximo Amor)
// Usamos fallback para garantir que o deploy funcione em qualquer lugar
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mgkgzdqhxqkndvnlyyyj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Rvq97xiWjg1w4PoGKMHXVg_wHWTDKiJ';

// Cria o cliente de comunicação oficial do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
=======
// Mock Supabase client
const handlers = [];

export const supabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
    }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
    channel: () => ({
      on: () => ({
        on: () => ({
          subscribe: () => ({})
        })
      }),
      subscribe: () => ({})
    }),
    removeChannel: () => ({})
  }),
  auth: {
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback) => {
      handlers.push(callback);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  }
};
>>>>>>> Stashed changes
