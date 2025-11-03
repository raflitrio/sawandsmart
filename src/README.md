# Sistem Pendukung Keputusan Beasiswa

Aplikasi web untuk pemilihan penerima beasiswa menggunakan metode **SAW (Simple Additive Weighting)** dan **SMART (Simple Multi-Attribute Rating Technique)**.

## 📋 Fitur Utama

- ✅ Manajemen Kriteria Penilaian (benefit/cost)
- ✅ Input Data Kandidat Beasiswa
- ✅ Perhitungan Ranking dengan Metode SAW
- ✅ Perhitungan Ranking dengan Metode SMART
- ✅ Tampilan Hasil dengan Tabel Ranking
- ✅ Data Default untuk Demo
- ✅ State Management Client-Side (React useState)

## 🏗️ Struktur Proyek

```
├── App.tsx                          # Komponen utama aplikasi
├── types/
│   └── index.ts                     # Definisi TypeScript interfaces
├── utils/
│   ├── saw.ts                       # Logika perhitungan SAW
│   └── smart.ts                     # Logika perhitungan SMART
├── data/
│   ├── defaultCriteria.ts           # Data kriteria default
│   └── sampleCandidates.ts          # Data kandidat contoh
├── components/
│   ├── CriteriaForm.tsx             # Form kelola kriteria
│   ├── CandidateInput.tsx           # Form input kandidat
│   ├── MethodSelector.tsx           # Pemilih metode SAW/SMART
│   └── ResultTable.tsx              # Tabel hasil ranking
└── components/ui/                   # Komponen UI Shadcn
```

## 🎯 Cara Penggunaan

### 1. Admin Panel
- **Kelola Kriteria**: Tambah, edit, atau hapus kriteria penilaian
  - Tentukan nama kriteria (IPK, Penghasilan, dll)
  - Tentukan bobot (akan dinormalisasi otomatis)
  - Pilih tipe: Benefit (semakin besar semakin baik) atau Cost (semakin kecil semakin baik)
  
- **Kelola Kandidat**: Tambah data kandidat beasiswa
  - Masukkan nama kandidat
  - Isi nilai untuk setiap kriteria

### 2. Hitung Ranking
- Pilih metode perhitungan (SAW atau SMART)
- Klik tombol "Hitung Ranking"
- Sistem akan memproses data di client-side

### 3. Lihat Hasil
- Tabel ranking menampilkan:
  - Peringkat kandidat
  - Nilai ternormalisasi setiap kriteria
  - Skor akhir
  - Badge untuk top 3 peringkat

## 🧮 Metode Perhitungan

### SAW (Simple Additive Weighting)

**Normalisasi:**
- Benefit: `Rij = Xij / max(Xij)`
- Cost: `Rij = min(Xij) / Xij`

**Skor Akhir:**
```
Vi = Σ(Wj × Rij)
```

### SMART (Simple Multi-Attribute Rating Technique)

**Normalisasi (Utilitas):**
- Benefit: `Ui = (Xi - Xmin) / (Xmax - Xmin)`
- Cost: `Ui = (Xmax - Xi) / (Xmax - Xmin)`

**Skor Akhir:**
```
Vi = Σ(Wj × Ui)
```

## 💡 State Management

Aplikasi ini menggunakan React `useState` untuk state management sederhana:

```typescript
// State utama
const [criteria, setCriteria] = useState<Criterion[]>(defaultCriteria);
const [candidates, setCandidates] = useState<Candidate[]>(sampleCandidates);
const [selectedMethod, setSelectedMethod] = useState<CalculationMethod>('SAW');
const [results, setResults] = useState<CalculationResult[]>([]);
```

## 🎨 Konversi Desain Figma → React

Jika Anda memiliki desain Figma, ikuti panduan ini:

### 1. Identifikasi Komponen
- **Header/Navigation** → Komponen terpisah
- **Form Input** → CriteriaForm, CandidateInput
- **Cards** → Gunakan Shadcn Card component
- **Tables** → Gunakan Shadcn Table component
- **Buttons** → Gunakan Shadcn Button component

### 2. Ekstrak Styling
- Gunakan Tailwind classes untuk layout
- Preserve spacing dari Figma (padding, margin)
- Gunakan tokens di `styles/globals.css` untuk konsistensi

### 3. Mapping Layer Figma
```
Frame → <div> atau <section>
Auto Layout → flex atau grid di Tailwind
Text → <h1>, <p>, <span>
Button → <Button> component
Input → <Input> component
```

### 4. Interaktivitas
- Tambahkan onClick handlers
- Implementasi form validation
- Tambahkan state untuk UI interactions

## 📦 Teknologi

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Lucide React** - Icons

## 🔄 Extend Aplikasi

### Tambah Kriteria Baru
Edit file `/data/defaultCriteria.ts`:
```typescript
{
  id: 'kriteria-baru',
  name: 'Nama Kriteria',
  weight: 15,
  type: 'benefit',
  description: 'Deskripsi kriteria'
}
```

### Tambah Metode Perhitungan Baru
1. Buat file baru di `/utils/metode-baru.ts`
2. Implement fungsi perhitungan
3. Tambahkan ke MethodSelector
4. Update CalculationMethod type

### Export/Import Data
Tambahkan fitur export ke JSON:
```typescript
const exportData = () => {
  const data = { criteria, candidates };
  const blob = new Blob([JSON.stringify(data, null, 2)], 
    { type: 'application/json' });
  // Download logic
};
```

## 📝 Lisensi

Proyek ini dibuat untuk keperluan studi kasus dan pembelajaran.
