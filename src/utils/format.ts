/**
 * Format a number value for display
 * @param value - The number to format
 * @returns Formatted string with K, M, B suffix
 */
export const formatValue = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  } else {
    return value.toFixed(2);
  }
};

/**
 * Format a percentage value with appropriate sign
 * @param percent - The percentage value
 * @returns Formatted percentage with sign
 */
export const formatPercentage = (percent: number): string => {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};