import { useState } from 'react';
import { Candidate, Criterion } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Trash2, Plus, UserPlus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Toaster, toast } from 'sonner';

interface CandidateInputProps {
  candidates: Candidate[];
  criteria: Criterion[];
  onUpdateCandidates: (candidates: Candidate[]) => void;
}

export function CandidateInput({ candidates, criteria, onUpdateCandidates }: CandidateInputProps) {
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '',
    values: {}
  });

  const handleAddCandidate = () => {
    if (!newCandidate.name) {
      toast.warning('Nama kandidat harus diisi');
      return;
    }

    // Validasi semua nilai kriteria sudah diisi
    const missingCriteria = criteria.filter(c => !newCandidate.values?.[c.id]);
    if (missingCriteria.length > 0) {
      toast.warning('Semua nilai kriteria harus diisi');
      return;
    }

    const candidate: Candidate = {
      id: `candidate-${Date.now()}`,
      name: newCandidate.name,
      values: newCandidate.values || {}
    };

    onUpdateCandidates([...candidates, candidate]);
    setNewCandidate({ name: '', values: {} });
  };

  const handleDeleteCandidate = (id: string) => {
    onUpdateCandidates(candidates.filter(c => c.id !== id));
  };

  const handleCriterionValueChange = (criterionId: string, value: number) => {
    setNewCandidate({
      ...newCandidate,
      values: {
        ...newCandidate.values,
        [criterionId]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Toaster richColors position="top-center" />
      <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
        <CardHeader>
          <CardTitle className="text-slate-900">Kelola Kandidat</CardTitle>
          <CardDescription>
            Tambah data kandidat penerima beasiswa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Daftar Kandidat */}
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                <div className="p-1.5 md:p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                  <UserPlus className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-900 text-sm md:text-base truncate">{candidate.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                      className="hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {criteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center gap-1">
                        <span className="text-xs md:text-sm text-slate-600 truncate">{criterion.name}:</span>
                        <Badge variant="outline" className="bg-slate-50 text-xs">{candidate.values[criterion.id] || 0}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {candidates.length === 0 && (
            <div className="text-center py-12 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg">
              <UserPlus className="h-12 w-12 mx-auto text-slate-400 mb-3" />
              <p className="text-slate-600">Belum ada kandidat.</p>
              <p className="text-sm text-slate-500">Tambahkan kandidat baru di bawah ini.</p>
            </div>
          )}

          {/* Form Tambah Kandidat */}
          {criteria.length > 0 ? (
            <div className="pt-4 border-t border-slate-200 space-y-3 md:space-y-4">
              <h3 className="text-slate-900 text-sm md:text-base">Tambah Kandidat Baru</h3>
              <div className="grid gap-3 md:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="candidate-name" className="text-sm">Nama Kandidat</Label>
                  <Input
                    id="candidate-name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                    placeholder="Nama lengkap kandidat"
                    className="text-sm"
                  />
                </div>

                <div className="grid gap-3">
                  <Label className="text-sm">Nilai Kriteria</Label>
                  {criteria.map((criterion) => (
                    <div key={criterion.id} className="grid gap-2">
                      <Label htmlFor={`value-${criterion.id}`} className="text-xs md:text-sm">
                        {criterion.name}
                        <span className="text-muted-foreground ml-1">
                          ({criterion.type === 'benefit' ? 'Benefit' : 'Cost'})
                        </span>
                      </Label>
                      <Input
                        id={`value-${criterion.id}`}
                        type="number"
                        step="0.01"
                        value={newCandidate.values?.[criterion.id] || ''}
                        onChange={(e) => handleCriterionValueChange(criterion.id, Number(e.target.value))}
                        placeholder={criterion.description || 'Masukkan nilai'}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>

                <Button onClick={handleAddCandidate} className="w-full text-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kandidat
                </Button>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t text-center text-muted-foreground text-sm">
              Tambahkan kriteria terlebih dahulu sebelum menambah kandidat
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
