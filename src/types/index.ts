// Types untuk aplikasi beasiswa

export type CriterionType = 'benefit' | 'cost';

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  type: CriterionType;
  description?: string;
}

export interface Candidate {
  id: string;
  name: string;
  values: Record<string, number>; // criterionId -> value
}

export interface CalculationResult {
  candidateId: string;
  candidateName: string;
  normalizedScores: Record<string, number>;
  finalScore: number;
  rank: number;
}

export type CalculationMethod = 'SAW' | 'SMART';
