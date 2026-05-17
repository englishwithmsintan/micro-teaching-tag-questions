export interface SlideProps {
  onNext: () => void;
  onBack: () => void;
}

export type SlideType = 
  | 'intro' 
  | 'warmup' 
  | 'context' 
  | 'elicitation' 
  | 'presentation' 
  | 'ccq' 
  | 'practice' 
  | 'production'
  | 'conclusion';
