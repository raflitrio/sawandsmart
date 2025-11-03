import { Criterion, Candidate, CalculationResult } from '../types';

/**
 * Normalisasi nilai untuk metode SAW
 * Benefit: Rij = Xij / max(Xij)
 * Cost: Rij = min(Xij) / Xij
 */
function normalizeValue(
  value: number,
  values: number[],
  type: 'benefit' | 'cost'
): number {
  if (type === 'benefit') {
    const maxValue = Math.max(...values);
    return maxValue === 0 ? 0 : value / maxValue;
  } else {
    const minValue = Math.min(...values);
    return value === 0 ? 0 : minValue / value;
  }
}

/**
 * Hitung ranking menggunakan metode SAW
 * @param criteria - Array kriteria beserta bobot
 * @param candidates - Array kandidat beserta nilai per kriteria
 * @returns Array hasil perhitungan dengan ranking
 */
export function calculateSAW(
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

  // Hitung nilai ternormalisasi untuk setiap kriteria
  const results: CalculationResult[] = candidates.map(candidate => {
    const normalizedScores: Record<string, number> = {};
    let finalScore = 0;

    criteria.forEach(criterion => {
      // Ambil semua nilai untuk kriteria ini dari semua kandidat
      const allValues = candidates.map(c => c.values[criterion.id] || 0);
      const candidateValue = candidate.values[criterion.id] || 0;

      // Normalisasi nilai
      const normalizedValue = normalizeValue(
        candidateValue,
        allValues,
        criterion.type
      );
      normalizedScores[criterion.id] = normalizedValue;

      // Tambahkan ke skor final (nilai ternormalisasi × bobot)
      const weight = normalizedWeights.find(w => w.id === criterion.id)?.weight || 0;
      finalScore += normalizedValue * weight;
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
