import { createClient } from '@supabase/supabase-js';
import { SubscriberFormData } from '../types';

// Load Supabase credentials from environment or fallback placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function saveSubscriber(data: SubscriberFormData): Promise<{ success: boolean; message?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('subscribers').insert([
        {
          full_name: data.fullName,
          channel: data.channel,
          email: data.email || null,
          phone: data.phone || null,
          dispatch_time: data.dispatchTime,
          interests: data.interests,
          created_at: new Date().toISOString(),
          is_active: true
        }
      ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return { success: true };
    } else {
      // Offline fallback: Save in localStorage for development/testing
      const existing = JSON.parse(localStorage.getItem('infoai_subscribers') || '[]');
      existing.push({
        ...data,
        id: 'sub_' + Date.now(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('infoai_subscribers', JSON.stringify(existing));
      console.log('Saved to local subscriber store (configure VITE_SUPABASE_URL for production sync):', data);
      return { success: true };
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Erro ao registrar assinatura.' };
  }
}

