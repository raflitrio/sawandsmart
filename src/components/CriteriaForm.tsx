import { useState } from 'react';
import { Criterion, CriterionType } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash2, Plus } from 'lucide-react';
import { Badge } from './ui/badge';

interface CriteriaFormProps {
  criteria: Criterion[];
  onUpdateCriteria: (criteria: Criterion[]) => void;
}

export function CriteriaForm({ criteria, onUpdateCriteria }: CriteriaFormProps) {
  const [newCriterion, setNewCriterion] = useState<Partial<Criterion>>({
    name: '',
    weight: 0,
    type: 'benefit',
    description: ''
  });

  const handleAddCriterion = () => {
    if (!newCriterion.name || !newCriterion.weight) {
      alert('Nama dan bobot kriteria harus diisi');
      return;
    }

    const criterion: Criterion = {
      id: `criterion-${Date.now()}`,
      name: newCriterion.name,
      weight: Number(newCriterion.weight),
      type: newCriterion.type as CriterionType,
      description: newCriterion.description
    };

    onUpdateCriteria([...criteria, criterion]);
    setNewCriterion({ name: '', weight: 0, type: 'benefit', description: '' });
  };

  const handleDeleteCriterion = (id: string) => {
    onUpdateCriteria(criteria.filter(c => c.id !== id));
  };

  const handleUpdateWeight = (id: string, weight: number) => {
    onUpdateCriteria(
      criteria.map(c => c.id === id ? { ...c, weight } : c)
    );
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
        <CardHeader>
          <CardTitle className="text-slate-900">Kelola Kriteria</CardTitle>
          <CardDescription>
            Tambah atau edit kriteria penilaian beasiswa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Daftar Kriteria */}
          <div className="space-y-3">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 md:p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-900 text-sm md:text-base">{criterion.name}</span>
                    <Badge variant={criterion.type === 'benefit' ? 'default' : 'secondary'} className={`text-xs ${criterion.type === 'benefit' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}>
                      {criterion.type === 'benefit' ? '↑ Benefit' : '↓ Cost'}
                    </Badge>
                  </div>
                  {criterion.description && (
                    <p className="text-xs md:text-sm text-slate-600">{criterion.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Bobot</div>
                    <Input
                      type="number"
                      value={criterion.weight}
                      onChange={(e) => handleUpdateWeight(criterion.id, Number(e.target.value))}
                      className="w-16 sm:w-20 text-center"
                      min="0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCriterion(criterion.id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {criteria.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <span className="text-slate-900">Total Bobot</span>
              <Badge className="bg-blue-600">{totalWeight}</Badge>
            </div>
          )}

          {/* Form Tambah Kriteria */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="text-slate-900 text-sm md:text-base">Tambah Kriteria Baru</h3>
            <div className="grid gap-3 md:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="criterion-name" className="text-sm">Nama Kriteria</Label>
                <Input
                  id="criterion-name"
                  value={newCriterion.name}
                  onChange={(e) => setNewCriterion({ ...newCriterion, name: e.target.value })}
                  placeholder="Contoh: IPK, Penghasilan Orang Tua"
                  className="text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="criterion-description" className="text-sm">Deskripsi (Opsional)</Label>
                <Input
                  id="criterion-description"
                  value={newCriterion.description}
                  onChange={(e) => setNewCriterion({ ...newCriterion, description: e.target.value })}
                  placeholder="Keterangan kriteria"
                  className="text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="criterion-weight" className="text-sm">Bobot</Label>
                  <Input
                    id="criterion-weight"
                    type="number"
                    value={newCriterion.weight}
                    onChange={(e) => setNewCriterion({ ...newCriterion, weight: Number(e.target.value) })}
                    placeholder="0"
                    min="0"
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="criterion-type" className="text-sm">Tipe</Label>
                  <Select
                    value={newCriterion.type}
                    onValueChange={(value) => setNewCriterion({ ...newCriterion, type: value as CriterionType })}
                  >
                    <SelectTrigger id="criterion-type" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="benefit" className="text-sm">Benefit (Semakin besar semakin baik)</SelectItem>
                      <SelectItem value="cost" className="text-sm">Cost (Semakin kecil semakin baik)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddCriterion} className="w-full text-sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kriteria
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
