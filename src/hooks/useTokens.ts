import { useEffect } from 'react';
import { useTokenStore } from '../stores/tokenStore';

export const useTokens = () => {
  const { tokens, loading, loadTokens } = useTokenStore();

  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  return { tokens, loading };
};