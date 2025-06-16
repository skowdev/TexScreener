import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface TokenState {
  tokens: any[];
  loading: boolean;
  loadTokens: () => Promise<void>;
  createToken: (tokenData: any) => Promise<any>;
  updateToken: (id: string, tokenData: any) => Promise<void>;
}

export const useTokenStore = create<TokenState>((set, get) => ({
  tokens: [],
  loading: false,
  
  loadTokens: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select(`
          *,
          creator:profiles(username),
          stats:token_stats(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ tokens: data || [], loading: false });
    } catch (error) {
      console.error('Error loading tokens:', error);
      set({ loading: false });
    }
  },
  
  createToken: async (tokenData) => {
    try {
      // First create or get the profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: tokenData.creator_id,
            username: tokenData.creator_id.slice(0, 8), // Use first 8 chars of wallet address as username
          }
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      // Then create the token
      const { data: token, error: tokenError } = await supabase
        .from('tokens')
        .insert([{
          creator_id: profile.id,
          name: tokenData.name,
          symbol: tokenData.symbol,
          description: tokenData.description,
          total_supply: tokenData.total_supply,
          buy_tax: tokenData.buy_tax,
          sell_tax: tokenData.sell_tax,
          tax_distribution: tokenData.tax_distribution,
          icon_url: tokenData.icon_url
        }])
        .select()
        .single();
      
      if (tokenError) throw tokenError;
      
      // Initialize token stats
      await supabase
        .from('token_stats')
        .insert([{
          token_id: token.id,
          price: 0,
          market_cap: 0,
          volume_24h: 0,
          holders_count: 0,
        }]);
      
      const tokens = get().tokens;
      set({ tokens: [token, ...tokens] });
      
      return token;
    } catch (error) {
      console.error('Error creating token:', error);
      throw error;
    }
  },
  
  updateToken: async (id, tokenData) => {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .update(tokenData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      const tokens = get().tokens.map(token => 
        token.id === id ? { ...token, ...data } : token
      );
      set({ tokens });
    } catch (error) {
      console.error('Error updating token:', error);
      throw error;
    }
  },
}));