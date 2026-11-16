import { createClient } from '@supabase/supabase-js';
import { SubscriberFormData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pmrgzdvnqwwtqlvkwmef.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kLPQ504GDXDMS62HWhrEQA_8fw9WvsL';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function saveSubscriber(data: SubscriberFormData): Promise<{ success: boolean; message?: string }> {
  try {
    // 1. Try backend API endpoint first (uses service_role on server)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (e) {
      // Fallback to client SDK if fetch fails
    }

    // 2. Direct client insert via Supabase SDK
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
        console.error('Supabase client error:', error);
        throw error;
      }
      return { success: true };
    }

    // 3. Local fallback storage
    const existing = JSON.parse(localStorage.getItem('infoai_subscribers') || '[]');
    existing.push({
      ...data,
      id: 'sub_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('infoai_subscribers', JSON.stringify(existing));
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message || 'Erro ao registrar assinatura.' };
  }
}
