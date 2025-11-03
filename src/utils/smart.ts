import { Criterion, Candidate, CalculationResult } from '../types';

/**
 * Normalisasi nilai untuk metode SMART
 * Benefit: Ui = (Xi - Xmin) / (Xmax - Xmin)
 * Cost: Ui = (Xmax - Xi) / (Xmax - Xmin)
 */
function normalizeValueSmart(
  value: number,
  min: number,
  max: number,
  type: 'benefit' | 'cost'
): number {
  const range = max - min;
  if (range === 0) return 0;

  if (type === 'benefit') {
    return (value - min) / range;
  } else {
    return (max - value) / range;
  }
}

/**
 * Hitung ranking menggunakan metode SMART
 * @param criteria - Array kriteria beserta bobot
 * @param candidates - Array kandidat beserta nilai per kriteria
 * @returns Array hasil perhitungan dengan ranking
 */
export function calculateSMART(
  criteria: Criterion[],
  candidates: Candidate[]
): CalculationResult[] {
  if (candidates.length === 0 || criteria.length === 0) {
    return [];
  }

  // Normalisasi bobot agar total = 1
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const normalizedWeights = criteria.map(c => ({
    ...c,
    weight: totalWeight === 0 ? 0 : c.weight / totalWeight
  }));

  // Hitung nilai utilitas untuk setiap kriteria
  const results: CalculationResult[] = candidates.map(candidate => {
    const normalizedScores: Record<string, number> = {};
    let finalScore = 0;

    criteria.forEach(criterion => {
      // Ambil semua nilai untuk kriteria ini dari semua kandidat
      const allValues = candidates.map(c => c.values[criterion.id] || 0);
      const candidateValue = candidate.values[criterion.id] || 0;

      const minValue = Math.min(...allValues);
      const maxValue = Math.max(...allValues);

      // Normalisasi nilai (utilitas)
      const utilityValue = normalizeValueSmart(
        candidateValue,
        minValue,
        maxValue,
        criterion.type
      );
      normalizedScores[criterion.id] = utilityValue;

      // Tambahkan ke skor final (utilitas × bobot)
      const weight = normalizedWeights.find(w => w.id === criterion.id)?.weight || 0;
      finalScore += utilityValue * weight;
    });

    return {
      candidateId: candidate.id,
      candidateName: candidate.name,
      normalizedScores,
      finalScore,
      rank: 0 // akan diisi setelah sorting
    };
  });

  // Urutkan berdasarkan finalScore (descending) dan tambahkan ranking
  results.sort((a, b) => b.finalScore - a.finalScore);
  results.forEach((result, index) => {
    result.rank = index + 1;
  });

  return results;
}
