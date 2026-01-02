import React from 'react';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Helper untuk mendeteksi apakah child adalah Config Object (bukan React Element)
export const isConfigObject = (v: any): boolean => {
  return (
    v &&
    typeof v === 'object' &&
    !React.isValidElement(v) &&
    ('child' in v || 'children' in v || 'sx' in v || 'style' in v)
  );
};

// Helper untuk menggabungkan SX props
export const mergeSx = (defaultSx: any, propsSx: any) => {
  return propsSx ? [defaultSx, propsSx] : defaultSx;
};