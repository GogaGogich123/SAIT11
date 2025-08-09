import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Cadet {
  id: string;
  auth_user_id?: string;
  name: string;
  email: string;
  phone?: string;
  platoon: string;
  squad: number;
  avatar_url?: string;
  rank?: number;
  total_score: number;
  join_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'study' | 'discipline' | 'events';
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  deadline: string;
  status?: 'active' | 'inactive';
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  is_active: boolean;
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  is_main?: boolean;
  background_image_url?: string;
  images?: any[];
  created_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  color?: string;
  created_at?: string;
}

export interface Score {
  id: string;
  cadet_id: string;
  study_score: number;
  discipline_score: number;
  events_score: number;
  created_at?: string;
  updated_at?: string;
}

export interface AutoAchievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  requirement_type: string;
  requirement_value: number;
  requirement_category?: string;
  created_at?: string;
}

export interface CadetAchievement {
  id: string;
  cadet_id: string;
  achievement_id?: string;
  auto_achievement_id?: string;
  awarded_date?: string;
  awarded_by?: string;
  achievement?: Achievement;
  auto_achievement?: AutoAchievement;
}

// Data fetching functions
export const getCadets = async (): Promise<Cadet[]> => {
  const { data, error } = await supabase
    .from('cadets')
    .select('*')
    .order('total_score', { ascending: false });

  if (error) {
    console.error('Error fetching cadets:', error);
    throw error;
  }

  return data || [];
};

export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }

  return data || [];
};

export const getNews = async (): Promise<News[]> => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    throw error;
  }

  return data || [];
};

export const getAchievements = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }

  return data || [];
};

export const getAutoAchievements = async (): Promise<AutoAchievement[]> => {
  const { data, error } = await supabase
    .from('auto_achievements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching auto achievements:', error);
    throw error;
  }

  return data || [];
};

export const getCadetAchievements = async (cadetId: string): Promise<CadetAchievement[]> => {
  const { data, error } = await supabase
    .from('cadet_achievements')
    .select(`
      *,
      achievement:achievements(*),
      auto_achievement:auto_achievements(*)
    `)
    .eq('cadet_id', cadetId)
    .order('awarded_date', { ascending: false });

  if (error) {
    console.error('Error fetching cadet achievements:', error);
    throw error;
  }

  return data || [];
};

export const getCadetScores = async (cadetId: string): Promise<Score | null> => {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('cadet_id', cadetId)
    .single();

  if (error) {
    console.error('Error fetching cadet scores:', error);
    throw error;
  }

  return data;
};

export interface ScoreHistory {
  id: string;
  cadet_id: string;
  category: 'study' | 'discipline' | 'events';
  points: number;
  description: string;
  awarded_by?: string;
  created_at: string;
}

export const getScoreHistory = async (cadetId: string): Promise<ScoreHistory[]> => {
  const { data, error } = await supabase
    .from('score_history')
    .select('*')
    .eq('cadet_id', cadetId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching score history:', error);
    throw error;
  }

  return data || [];
};

export const addCadetByAdmin = async (cadetData: {
  name: string;
  email: string;
  password: string;
  platoon: string;
  squad: number;
  avatar_url?: string;
}): Promise<void> => {
  // Call the edge function to create cadet with auth user
  const response = await fetch(`${supabaseUrl}/functions/v1/create-cadet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify(cadetData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create cadet');
  }

  const result = await response.json();
  return result.cadet;
};

export const updateCadetByAdmin = async (id: string, cadetData: Partial<Cadet>): Promise<Cadet> => {
  const { data, error } = await supabase
    .from('cadets')
    .update(cadetData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating cadet:', error);
    throw error;
  }

  return data;
};

export const deleteCadet = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('cadets')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting cadet:', error);
    throw error;
  }
};

export const getCadetById = async (id: string): Promise<Cadet | null> => {
  const { data, error } = await supabase
    .from('cadets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching cadet:', error);
    throw error;
  }

  return data;
};

// Authentication functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting current user:', error);
    throw error;
  }

  return user;
};