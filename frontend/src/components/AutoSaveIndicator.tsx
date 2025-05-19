import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface AutoSaveIndicatorProps {
  status: 'saved' | 'saving' | 'idle';
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {status === 'saving' && (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Saving...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>Saved</span>
        </>
      )}
    </div>
  );
};

export default AutoSaveIndicator;