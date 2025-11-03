import { CalculationMethod } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface MethodSelectorProps {
  selectedMethod: CalculationMethod;
  onMethodChange: (method: CalculationMethod) => void;
}

export function MethodSelector({ selectedMethod, onMethodChange }: MethodSelectorProps) {
  return (
    <Card className="bg-white/80 backdrop-blur shadow-lg border-slate-200/60">
      <CardHeader>
        <CardTitle className="text-slate-900">Pilih Metode Perhitungan</CardTitle>
        <CardDescription>
          Pilih metode sistem pendukung keputusan yang ingin digunakan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={(value) => onMethodChange(value as CalculationMethod)}>
          <div className="space-y-3 md:space-y-4">
            <div className={`flex items-start space-x-3 md:space-x-4 p-4 md:p-5 border-2 rounded-xl cursor-pointer transition-all ${
              selectedMethod === 'SAW' 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
            }`}>
              <RadioGroupItem value="SAW" id="method-saw" className="mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Label htmlFor="method-saw" className="cursor-pointer flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-slate-900 text-sm md:text-base">SAW (Simple Additive Weighting)</span>
                  {selectedMethod === 'SAW' && (
                    <Badge className="bg-blue-600 text-xs w-fit">Terpilih</Badge>
                  )}
                </Label>
                <p className="text-xs md:text-sm text-slate-600 mt-2">
                  Metode penjumlahan terbobot yang menormalisasi nilai dengan pembagian.
                </p>
                <div className="mt-3 p-2.5 md:p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-700 mb-1">Formula:</p>
                  <p className="text-[10px] md:text-xs font-mono text-slate-800 break-all">
                    • Benefit: R<sub>ij</sub> = X<sub>ij</sub> / max(X<sub>ij</sub>)<br/>
                    • Cost: R<sub>ij</sub> = min(X<sub>ij</sub>) / X<sub>ij</sub>
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex items-start space-x-3 md:space-x-4 p-4 md:p-5 border-2 rounded-xl cursor-pointer transition-all ${
              selectedMethod === 'SMART' 
                ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
            }`}>
              <RadioGroupItem value="SMART" id="method-smart" className="mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Label htmlFor="method-smart" className="cursor-pointer flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-slate-900 text-sm md:text-base">SMART (Simple Multi-Attribute Rating Technique)</span>
                  {selectedMethod === 'SMART' && (
                    <Badge className="bg-indigo-600 text-xs w-fit">Terpilih</Badge>
                  )}
                </Label>
                <p className="text-xs md:text-sm text-slate-600 mt-2">
                  Metode yang menghitung utilitas dengan normalisasi linear.
                </p>
                <div className="mt-3 p-2.5 md:p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-700 mb-1">Formula:</p>
                  <p className="text-[10px] md:text-xs font-mono text-slate-800 break-all">
                    • Benefit: U<sub>i</sub> = (X<sub>i</sub> - X<sub>min</sub>) / (X<sub>max</sub> - X<sub>min</sub>)<br/>
                    • Cost: U<sub>i</sub> = (X<sub>max</sub> - X<sub>i</sub>) / (X<sub>max</sub> - X<sub>min</sub>)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
