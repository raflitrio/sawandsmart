import { Criterion } from '../types';

/**
 * Data kriteria default untuk demo
 * Dapat dimodifikasi oleh admin melalui UI
 */
export const defaultCriteria: Criterion[] = [
  {
    id: 'ipk',
    name: 'IPK (Indeks Prestasi Kumulatif)',
    weight: 30,
    type: 'benefit',
    description: 'Nilai IPK mahasiswa (skala 0-4)'
  },
  {
    id: 'penghasilan',
    name: 'Penghasilan Orang Tua',
    weight: 25,
    type: 'cost',
    description: 'Penghasilan orang tua per bulan (dalam juta rupiah)'
  },
  {
    id: 'tanggungan',
    name: 'Jumlah Tanggungan',
    weight: 20,
    type: 'benefit',
    description: 'Jumlah tanggungan dalam keluarga'
  },
  {
    id: 'prestasi',
    name: 'Prestasi Akademik/Non-Akademik',
    weight: 15,
    type: 'benefit',
    description: 'Jumlah prestasi yang diraih (skor 0-10)'
  },
  {
    id: 'semester',
    name: 'Semester',
    weight: 10,
    type: 'benefit',
    description: 'Semester saat ini'
  }
];
