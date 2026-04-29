import { createClient } from '@supabase/supabase-js';

// Estas chaves vêm do seu projeto Supabase (Próximo Amor)
// Usamos fallback para garantir que o deploy funcione em qualquer lugar
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mgkgzdqhxqkndvnlyyyj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Rvq97xiWjg1w4PoGKMHXVg_wHWTDKiJ';

// Cria o cliente de comunicação oficial do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
