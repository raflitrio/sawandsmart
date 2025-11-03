import { useState } from 'react';
import { Criterion, Candidate, CalculationMethod, CalculationResult } from './types';
import { defaultCriteria } from './data/defaultCriteria';
import { sampleCandidates } from './data/sampleCandidates';
import { calculateSAW } from './utils/saw';
import { calculateSMART } from './utils/smart';
import { CriteriaForm } from './components/CriteriaForm';
import { CandidateInput } from './components/CandidateInput';
import { MethodSelector } from './components/MethodSelector';
import { ResultTable } from './components/ResultTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { GraduationCap, Calculator, FileText, BarChart3, RefreshCw, Trash2, Award } from 'lucide-react';
import { Badge } from './components/ui/badge';

export default function App() {
  const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);
  const [candidates, setCandidates] = useState<Candidate[]>(sampleCandidates);
  const [selectedMethod, setSelectedMethod] = useState<CalculationMethod>('SAW');
  const [results, setResults] = useState<CalculationResult[]>([]);

  const handleCalculate = () => {
    if (criteria.length === 0) {
      alert('Tambahkan kriteria terlebih dahulu');
      return;
    }

    if (candidates.length === 0) {
      alert('Tambahkan kandidat terlebih dahulu');
      return;
    }

    const calculatedResults = selectedMethod === 'SAW'
      ? calculateSAW(criteria, candidates)
      : calculateSMART(criteria, candidates);

    setResults(calculatedResults);
  };

  const handleResetData = () => {
    if (confirm('Reset semua data ke default?')) {
      setCriteria(defaultCriteria);
      setCandidates(sampleCandidates);
      setResults([]);
    }
  };

  const handleClearAll = () => {
    if (confirm('Hapus semua kriteria dan kandidat?')) {
      setCriteria([]);
      setCandidates([]);
      setResults([]);
    }
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg md:rounded-xl shadow-lg flex-shrink-0">
                <GraduationCap className="h-5 w-5 md:h-7 md:w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-slate-900 truncate text-base md:text-lg">Sistem Pendukung Keputusan Beasiswa</h1>
                <p className="text-slate-600 hidden sm:block text-sm md:text-base">
                  Metode SAW & SMART untuk Pemilihan Penerima Beasiswa
                </p>
                <p className="text-slate-600 sm:hidden text-xs">
                  SAW & SMART
                </p>
              </div>
            </div>
            <Badge variant="outline" className="hidden lg:flex gap-2 px-3 md:px-4 py-2 flex-shrink-0">
              <Award className="h-4 w-4" />
              SPK v1.0
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <Tabs defaultValue="admin" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-white/80 backdrop-blur p-1 shadow-md h-auto">
            <TabsTrigger value="admin" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white flex-col sm:flex-row py-2 sm:py-2.5 gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Admin Panel</span>
              <span className="sm:hidden">Admin</span>
            </TabsTrigger>
            <TabsTrigger value="calculate" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white flex-col sm:flex-row py-2 sm:py-2.5 gap-1 sm:gap-2 text-xs sm:text-sm">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Hitung Ranking</span>
              <span className="sm:hidden">Hitung</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white flex-col sm:flex-row py-2 sm:py-2.5 gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Hasil</span>
              <span className="sm:hidden">Hasil</span>
            </TabsTrigger>
          </TabsList>

          {/* Admin Panel */}
          <TabsContent value="admin" className="space-y-4 md:space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2 md:pb-3">
                  <CardDescription className="text-blue-100 text-xs md:text-sm">Total Kriteria</CardDescription>
                  <CardTitle className="text-white text-xl md:text-2xl">{criteria.length}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 md:pb-4">
                  <FileText className="h-6 w-6 md:h-8 md:w-8 opacity-30" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2 md:pb-3">
                  <CardDescription className="text-indigo-100 text-xs md:text-sm">Total Kandidat</CardDescription>
                  <CardTitle className="text-white text-xl md:text-2xl">{candidates.length}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 md:pb-4">
                  <GraduationCap className="h-6 w-6 md:h-8 md:w-8 opacity-30" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2 md:pb-3">
                  <CardDescription className="text-purple-100 text-xs md:text-sm">Total Bobot</CardDescription>
                  <CardTitle className="text-white text-xl md:text-2xl">{totalWeight}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 md:pb-4">
                  <BarChart3 className="h-6 w-6 md:h-8 md:w-8 opacity-30" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
                <CardHeader className="pb-2 md:pb-3">
                  <CardDescription className="text-pink-100 text-xs md:text-sm">Hasil Perhitungan</CardDescription>
                  <CardTitle className="text-white text-xl md:text-2xl">{results.length}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3 md:pb-4">
                  <Award className="h-6 w-6 md:h-8 md:w-8 opacity-30" />
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
              <CardHeader>
                <CardTitle className="text-slate-900">Panel Administrasi</CardTitle>
                <CardDescription>
                  Kelola kriteria dan data kandidat beasiswa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <Button onClick={handleResetData} variant="outline" className="flex-1 w-full sm:w-auto sm:min-w-[180px]">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Reset ke Data Default</span>
                    <span className="sm:hidden">Reset Data</span>
                  </Button>
                  <Button onClick={handleClearAll} variant="outline" className="flex-1 w-full sm:w-auto sm:min-w-[180px]">
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Hapus Semua Data</span>
                    <span className="sm:hidden">Hapus Semua</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Forms */}
            <div className="grid lg:grid-cols-2 gap-6">
              <CriteriaForm 
                criteria={criteria} 
                onUpdateCriteria={setCriteria}
              />
              <CandidateInput
                candidates={candidates}
                criteria={criteria}
                onUpdateCandidates={setCandidates}
              />
            </div>
          </TabsContent>

          {/* Calculate */}
          <TabsContent value="calculate" className="space-y-4 md:space-y-6">
            {/* Statistics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
                <CardHeader className="pb-3 md:pb-6">
                  <CardDescription className="text-xs md:text-sm">Total Kriteria</CardDescription>
                  <CardTitle className="text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                    <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    </div>
                    {criteria.length} Kriteria
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
                <CardHeader className="pb-3 md:pb-6">
                  <CardDescription className="text-xs md:text-sm">Total Kandidat</CardDescription>
                  <CardTitle className="text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                    <div className="p-1.5 md:p-2 bg-indigo-100 rounded-lg">
                      <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                    </div>
                    {candidates.length} Kandidat
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
                <CardHeader className="pb-3 md:pb-6">
                  <CardDescription className="text-xs md:text-sm">Metode Terpilih</CardDescription>
                  <CardTitle className="text-slate-900 flex items-center gap-2 md:gap-3 text-base md:text-xl">
                    <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
                      <Calculator className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                    </div>
                    {selectedMethod}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <MethodSelector
              selectedMethod={selectedMethod}
              onMethodChange={setSelectedMethod}
            />

            <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
              <CardHeader>
                <CardTitle className="text-slate-900">Proses Perhitungan</CardTitle>
                <CardDescription>
                  Klik tombol di bawah untuk menghitung ranking kandidat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleCalculate} 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                  disabled={criteria.length === 0 || candidates.length === 0}
                  size="lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Hitung Ranking dengan Metode {selectedMethod}
                </Button>
                
                {(criteria.length === 0 || candidates.length === 0) && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      ⚠️ Pastikan Anda sudah menambahkan kriteria dan kandidat sebelum melakukan perhitungan.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results */}
          <TabsContent value="results">
            <ResultTable
              results={results}
              criteria={criteria}
              method={selectedMethod}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur border-t border-slate-200/60 mt-8 md:mt-12">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-slate-600 text-center md:text-left">
              Sistem Pendukung Keputusan Beasiswa - Studi Kasus SPK dengan Metode SAW & SMART
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-slate-600 text-xs">
                SAW
              </Badge>
              <Badge variant="outline" className="text-slate-600 text-xs">
                SMART
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
