<<<<<<< Updated upstream
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext({});
=======
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
>>>>>>> Stashed changes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
<<<<<<< Updated upstream
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verifica se já existe uma sessão ativa ao carregar o site
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    // 2. Escuta mudanças no estado de login (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Busca os dados extras (nome, cargo, etc) na tabela 'profiles' que criamos
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error) setProfile(data);
    setLoading(false);
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
=======
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, setUser, setProfile }}>
>>>>>>> Stashed changes
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
