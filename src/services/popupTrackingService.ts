import { supabase } from '../lib/supabase';

export type PopupActionType = 'shown' | 'closed' | 'claimed' | 'code_copied';

interface PopupInteractionData {
  page_url: string;
  action_type: PopupActionType;
  promo_code?: string;
  session_id?: string;
  user_agent?: string;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('popup_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('popup_session_id', sessionId);
  }
  return sessionId;
};

export const trackPopupInteraction = async (
  actionType: PopupActionType,
  promoCode?: string
): Promise<void> => {
  try {
    const interactionData: PopupInteractionData = {
      page_url: window.location.href,
      action_type: actionType,
      promo_code: promoCode,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from('popup_interactions')
      .insert([interactionData]);

    if (error) {
      console.error('Error tracking popup interaction:', error);
    }
  } catch (err) {
    console.error('Failed to track popup interaction:', err);
  }
};

export const getPopupAnalytics = async (startDate?: Date, endDate?: Date) => {
  try {
    let query = supabase
      .from('popup_interactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }

    if (endDate) {
      query = query.lte('created_at', endDate.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching popup analytics:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Failed to fetch popup analytics:', err);
    return null;
  }
};

export const getPopupConversionRate = async (promoCode: string) => {
  try {
    const { data, error } = await supabase
      .from('popup_interactions')
      .select('action_type')
      .eq('promo_code', promoCode);

    if (error || !data) {
      console.error('Error fetching conversion data:', error);
      return { shown: 0, claimed: 0, conversionRate: 0 };
    }

    const shown = data.filter(item => item.action_type === 'shown').length;
    const claimed = data.filter(item => item.action_type === 'claimed').length;
    const conversionRate = shown > 0 ? (claimed / shown) * 100 : 0;

    return {
      shown,
      claimed,
      conversionRate: Math.round(conversionRate * 100) / 100
    };
  } catch (err) {
    console.error('Failed to calculate conversion rate:', err);
    return { shown: 0, claimed: 0, conversionRate: 0 };
  }
};
