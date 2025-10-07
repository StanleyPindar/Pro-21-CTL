import { supabase } from '../lib/supabase';
import { MatchedClinic } from '../types';

export interface QuizUser {
  email: string;
  name?: string;
  quiz_responses?: Record<string, string>;
  matched_clinics?: MatchedClinic[];
}

export class UserService {
  static async saveQuizUser(userData: QuizUser) {
    try {
      if (!supabase) return { success: false, error: 'Database not available' };

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', userData.email)
        .single();

      const payload = {
        email: userData.email,
        first_name: userData.name,
        quiz_responses: userData.quiz_responses,
        quiz_completed: true,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existingUser) {
        result = await supabase
          .from('users')
          .update(payload)
          .eq('id', existingUser.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('users')
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving user:', result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error('UserService error:', error);
      return { success: false, error: 'Unexpected error' };
    }
  }
}