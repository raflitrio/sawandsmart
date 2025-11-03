import { CalculationResult, Criterion, CalculationMethod } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

interface ResultTableProps {
  results: CalculationResult[];
  criteria: Criterion[];
  method: CalculationMethod;
}

export function ResultTable({ results, criteria, method }: ResultTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return 'default';
      case 2:
        return 'secondary';
      case 3:
        return 'outline';
      default:
        return 'outline';
    }
  };

  if (results.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
        <CardHeader>
          <CardTitle className="text-slate-900">Hasil Perhitungan</CardTitle>
          <CardDescription>
            Tambahkan kriteria dan kandidat untuk melihat hasil perhitungan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
              <Trophy className="h-10 w-10 text-slate-400" />
            </div>
            <p className="text-slate-600 mb-2">Belum ada hasil perhitungan</p>
            <p className="text-sm text-slate-500">Lakukan perhitungan terlebih dahulu pada tab "Hitung Ranking"</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Winner Card */}
      {results.length > 0 && (
        <Card className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 border-0 shadow-2xl">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                <div className="p-3 md:p-4 bg-white/20 backdrop-blur rounded-xl md:rounded-2xl flex-shrink-0">
                  <Trophy className="h-8 w-8 md:h-12 md:w-12 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-xs sm:text-sm mb-1">🏆 Penerima Beasiswa Terpilih</p>
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl truncate">{results[0].candidateName}</h2>
                  <p className="text-white/80 mt-1 md:mt-2 text-sm md:text-base">Skor: {results[0].finalScore.toFixed(4)}</p>
                </div>
              </div>
              <Badge className="bg-white text-yellow-700 px-4 sm:px-6 py-1.5 sm:py-2 text-base sm:text-lg flex-shrink-0">
                Rank #1
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-slate-900 text-base md:text-lg">Hasil Perhitungan - Metode {method}</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Ranking kandidat berdasarkan perhitungan {method}
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 md:px-4 py-1.5 md:py-2 w-fit text-xs md:text-sm">
              {results.length} Kandidat
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
        <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-16 md:w-20 text-xs md:text-sm">Rank</TableHead>
                  <TableHead className="min-w-[150px] md:min-w-[200px] text-xs md:text-sm">Nama Kandidat</TableHead>
                  {criteria.map((criterion) => (
                    <TableHead key={criterion.id} className="text-center min-w-[100px] md:min-w-[120px]">
                      <div className="space-y-1">
                        <div className="text-xs md:text-sm">{criterion.name}</div>
                        <Badge variant="outline" className="text-[10px] md:text-xs">
                          W: {criterion.weight}
                        </Badge>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-center min-w-[100px] md:min-w-[120px] text-xs md:text-sm">Skor Akhir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow 
                    key={result.candidateId}
                    className={`
                      ${result.rank === 1 ? 'bg-yellow-50 hover:bg-yellow-100' : ''}
                      ${result.rank === 2 ? 'bg-slate-50 hover:bg-slate-100' : ''}
                      ${result.rank === 3 ? 'bg-amber-50 hover:bg-amber-100' : ''}
                    `}
                  >
                    <TableCell className="py-2 md:py-4">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        {getRankIcon(result.rank)}
                        <Badge variant={getRankBadgeVariant(result.rank)} className="text-xs">
                          #{result.rank}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900 text-xs md:text-sm py-2 md:py-4">
                      {result.candidateName}
                    </TableCell>
                    {criteria.map((criterion) => (
                      <TableCell key={criterion.id} className="text-center py-2 md:py-4">
                        <div className="inline-flex items-center justify-center px-1.5 md:px-2 py-0.5 md:py-1 bg-slate-100 rounded text-[10px] md:text-sm font-mono">
                          {result.normalizedScores[criterion.id]?.toFixed(4) || '0.0000'}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center py-2 md:py-4">
                      <Badge className={`text-xs ${
                        result.rank === 1 ? 'bg-yellow-600' : ''
                      } ${
                        result.rank === 2 ? 'bg-slate-600' : ''
                      } ${
                        result.rank === 3 ? 'bg-amber-700' : ''
                      } ${
                        result.rank > 3 ? 'bg-slate-500' : ''
                      }`}>
                        {result.finalScore.toFixed(4)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 md:mt-6 p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <h4 className="text-slate-900 mb-3 flex items-center gap-2 text-sm md:text-base">
            <div className="w-1 h-4 md:h-5 bg-blue-600 rounded"></div>
            Keterangan
          </h4>
          <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs md:text-sm text-slate-700">
                <strong>W</strong> = Bobot kriteria
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs md:text-sm text-slate-700">
                Nilai tabel = nilai ternormalisasi (0-1)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs md:text-sm text-slate-700">
                Skor akhir = Σ (nilai ternormalisasi × bobot)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs md:text-sm text-slate-700">
                Ranking dari skor tertinggi ke terendah
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
