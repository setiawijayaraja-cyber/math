const formulas = [];

function addFormula(item) {
  formulas.push({ id: formulas.length + 1, ...item });
}

const formulaTemplates = [
  { name: 'Persamaan Linear', topic: 'Algebra', formula: 'y = mx + c', explanation: 'Hubungan antara x dan y bagi garis lurus.', example: 'Jika m=2 dan c=3, y=2x+3.' },
  { name: 'Persamaan Kuadratik', topic: 'Algebra', formula: 'ax^2 + bx + c = 0', explanation: 'Bentuk umum persamaan kuadratik.', example: 'x^2 - 5x + 6 = 0.' },
  { name: 'Faktorisasi', topic: 'Algebra', formula: 'x^2 - 5x + 6 = (x-2)(x-3)', explanation: 'Ubah suai polinomial kepada faktor.', example: 'x^2 + 7x + 10 = (x+5)(x+2).' },
  { name: 'Fungsi Linear', topic: 'Algebra', formula: 'f(x) = mx + c', explanation: 'Garisan lurus dalam bentuk fungsi.', example: 'f(x)=3x-2.' },
  { name: 'Fungsi Kuadratik', topic: 'Algebra', formula: 'f(x) = ax^2 + bx + c', explanation: 'Graf parabola bagi fungsi kuadratik.', example: 'f(x)=x^2-4x+4.' },
  { name: 'Kosinus dalam Segitiga', topic: 'Trigonometri', formula: 'cosθ = bersebelahan/hypotenus', explanation: 'Definisi kosinus untuk segitiga tegak.', example: 'cos30° = √3/2.' },
  { name: 'Sinus dalam Segitiga', topic: 'Trigonometri', formula: 'sinθ = bertentangan/hypotenus', explanation: 'Definisi sinus untuk segitiga tegak.', example: 'sin45° = √2/2.' },
  { name: 'Tangen dalam Segitiga', topic: 'Trigonometri', formula: 'tanθ = bertentangan/bersebelahan', explanation: 'Definisi tangen untuk segitiga tegak.', example: 'tan60° = √3.' },
  { name: 'Teorem Sinus', topic: 'Trigonometri', formula: 'a/sinA = b/sinB = c/sinC', explanation: 'Perhubungan sisi dan sudut dalam sebarang segitiga.', example: 'a/sinA = 10/sin30°.' },
  { name: 'Teorem Kosinus', topic: 'Trigonometri', formula: 'a² = b² + c² - 2bc cosA', explanation: 'Gunakan untuk mencari sisi atau sudut dalam segitiga bukan tegak.', example: '13² = 5² + 12² - 2×5×12 cosA.' },
  { name: 'Jumlah Sudut Segitiga', topic: 'Geometri', formula: 'A + B + C = 180°', explanation: 'Jumlah semua sudut dalam segitiga.', example: 'Jika A=40° dan B=60°, C=80°.' },
  { name: 'Luas Segitiga', topic: 'Geometri', formula: '½ × asas × tinggi', explanation: 'Hitung luas segitiga menggunakan asas dan tinggi.', example: 'Luas = 0.5 × 10 × 6 = 30.' },
  { name: 'Keliling Segi Empat Tepat', topic: 'Geometri', formula: '2(l + w)', explanation: 'Jumlah semua sisi segi empat tepat.', example: '2(8 + 5) = 26.' },
  { name: 'Luas Bulatan', topic: 'Geometri', formula: 'πr²', explanation: 'Luas kawasan bulatan berdasarkan jejari.', example: 'Jika r=7, luas=154.' },
  { name: 'Isipadu Kubus', topic: 'Geometri', formula: 's³', explanation: 'Isipadu kubus dengan sisi s.', example: 'Jika s=4, isipadu=64.' },
  { name: 'Purata', topic: 'Statistik', formula: 'μ = Σx / n', explanation: 'Nilai purata bagi satu set data.', example: 'Purata 5,7,9 = 7.' },
  { name: 'Median', topic: 'Statistik', formula: 'Nilai tengah data tersusun', explanation: 'Median untuk bilangan ganjil atau genap.', example: 'Median 2,4,6 = 4.' },
  { name: 'Mod', topic: 'Statistik', formula: 'Nilai paling kerap muncul', explanation: 'Cara kenal pasti nilai mod.', example: 'Mod 2,2,3,4 = 2.' },
  { name: 'Julat', topic: 'Statistik', formula: 'Nilai maks - nilai min', explanation: 'Perbezaan antara nilai tertinggi dan terendah.', example: 'Julat 3,7,9 = 6.' },
  { name: 'Varians', topic: 'Statistik', formula: 'σ² = Σ(x - μ)² / n', explanation: 'Pengukuran taburan nilai.', example: 'Varians 2,4,6 = 2.67.' },
  { name: 'Sisihan Piawai', topic: 'Statistik', formula: 'σ = √σ²', explanation: 'Akar kuasa dua varians.', example: 'Sisihan piawai = √2.67.' },
  { name: 'Kebarangkalian Asas', topic: 'Kebarangkalian', formula: 'P(A) = n(A) / n(S)', explanation: 'Kebarangkalian peristiwa A.', example: 'P(dadu genap) = 3/6 = 1/2.' },
  { name: 'Gabungan Peristiwa', topic: 'Kebarangkalian', formula: 'P(A dan B) = P(A) × P(B)', explanation: 'Untuk peristiwa bebas.', example: 'P(genap dan besar) = 1/2 × 1/2.' },
  { name: 'Faedah Mudah', topic: 'Kewangan', formula: 'A = P(1 + rt)', explanation: 'Kira jumlah dengan faedah mudah.', example: 'A = 1000(1 + 0.05×2).' },
  { name: 'Faedah Kompaun', topic: 'Kewangan', formula: 'A = P(1 + r)^t', explanation: 'Kira jumlah dengan faedah kompaun.', example: 'A = 1000(1.05)^3.' },
  { name: 'Determinan 2x2', topic: 'Matriks', formula: 'det = ad - bc', explanation: 'Determinan matriks 2×2.', example: 'det[[2,3],[1,4]] = 5.' },
  { name: 'Invers 2x2', topic: 'Matriks', formula: '1/det × [[d,-b],[-c,a]]', explanation: 'Invers matriks 2×2 jika det ≠ 0.', example: 'Matriks invers untuk [[2,1],[3,4]].' }
];

formulaTemplates.forEach(addFormula);
for (let i = 1; i <= 120; i += 1) {
  const topic = i <= 24 ? 'Algebra' : i <= 48 ? 'Geometri' : i <= 72 ? 'Trigonometri' : i <= 92 ? 'Statistik' : i <= 108 ? 'Kebarangkalian' : 'Matriks';
  const formula = topic === 'Algebra'
    ? `x^${(i % 3) + 1} + ${(i % 8) + 1}x + ${((i + 5) % 10) + 1}`
    : topic === 'Geometri'
      ? `L = ${((i % 10) + 1)} × r`
      : topic === 'Trigonometri'
        ? `sinθ = ${Math.round(Math.sin(i) * 100) / 100}`
        : topic === 'Statistik'
          ? `μ = Σx / ${((i % 5) + 3)}`
          : topic === 'Kebarangkalian'
            ? `P = ${(i % 5) + 1}/6`
            : `det = a${i}d${i} - b${i}c${i}`;
  addFormula({ name: `${topic} Formula ${i}`, topic, formula, explanation: `Formula ${i} bagi topik ${topic}.`, example: `Contoh: gunakan ${formula}.` });
}
