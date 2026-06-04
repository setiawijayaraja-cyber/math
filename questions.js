const questions = [];

function addQuestion(q) {
  questions.push({ id: questions.length + 1, ...q });
}

const questionBank = [
  { topic: 'Algebra', number: 1, question: 'Selesaikan: 2x + 5 = 13', answer: 'x = 4', difficulty: 'Mudah' },
  { topic: 'Algebra', number: 2, question: 'Selesaikan: x² - 5x + 6 = 0', answer: 'x = 2 atau x = 3', difficulty: 'Sederhana' },
  { topic: 'Algebra', number: 3, question: 'Kembangkan: (x + 3)(x - 2)', answer: 'x² + x - 6', difficulty: 'Sederhana' },
  { topic: 'Algebra', number: 4, question: 'Faktorkan: x² - 9', answer: '(x + 3)(x - 3)', difficulty: 'Mudah' },
  { topic: 'Algebra', number: 5, question: 'Cari kecerunan garis y = 3x + 5', answer: 'm = 3', difficulty: 'Mudah' },
  { topic: 'Geometri', number: 1, question: 'Cari keliling segi empat tepat dengan panjang 8 cm dan lebar 5 cm', answer: '26 cm', difficulty: 'Mudah' },
  { topic: 'Geometri', number: 2, question: 'Cari luas segitiga dengan asas 10 cm dan tinggi 6 cm', answer: '30 cm²', difficulty: 'Mudah' },
  { topic: 'Geometri', number: 3, question: 'Cari luas bulatan dengan jejari 7 cm', answer: '154 cm² (atau 49π cm²)', difficulty: 'Sederhana' },
  { topic: 'Geometri', number: 4, question: 'Cari isipadu kubus dengan sisi 4 cm', answer: '64 cm³', difficulty: 'Mudah' },
  { topic: 'Geometri', number: 5, question: 'Jumlah sudut dalam segitiga adalah', answer: '180°', difficulty: 'Mudah' },
  { topic: 'Trigonometri', number: 1, question: 'Cari nilai sin 30°', answer: '0.5 atau 1/2', difficulty: 'Mudah' },
  { topic: 'Trigonometri', number: 2, question: 'Cari nilai cos 60°', answer: '0.5 atau 1/2', difficulty: 'Mudah' },
  { topic: 'Trigonometri', number: 3, question: 'Cari nilai tan 45°', answer: '1', difficulty: 'Mudah' },
  { topic: 'Trigonometri', number: 4, question: 'Dalam segitiga tegak, jika sin θ = 3/5, cari cos θ', answer: '4/5', difficulty: 'Sederhana' },
  { topic: 'Trigonometri', number: 5, question: 'Gunakan teorem sinus untuk cari sisi a jika A = 30°, B = 60°, b = 10', answer: 'a ≈ 5.77', difficulty: 'Sukar' },
  { topic: 'Statistik', number: 1, question: 'Cari purata: 3, 5, 7, 9, 11', answer: '7', difficulty: 'Mudah' },
  { topic: 'Statistik', number: 2, question: 'Cari median: 2, 4, 6, 8', answer: '5', difficulty: 'Mudah' },
  { topic: 'Statistik', number: 3, question: 'Cari mod: 2, 2, 3, 4, 4, 4, 5', answer: '4', difficulty: 'Mudah' },
  { topic: 'Statistik', number: 4, question: 'Cari julat: 10, 15, 20, 25, 30', answer: '20', difficulty: 'Mudah' },
  { topic: 'Statistik', number: 5, question: 'Cari varians bagi: 2, 4, 6', answer: '2.67', difficulty: 'Sederhana' },
  { topic: 'Kebarangkalian', number: 1, question: 'Apakah kebarangkalian mendapat angka genap apabila melambung dadu?', answer: '3/6 = 1/2 = 0.5 = 50%', difficulty: 'Mudah' },
  { topic: 'Kebarangkalian', number: 2, question: 'Apakah kebarangkalian mendapat kepala apabila melambung syiling?', answer: '1/2 = 0.5 = 50%', difficulty: 'Mudah' },
  { topic: 'Kebarangkalian', number: 3, question: 'Apakah kebarangkalian mendapat kartu merah dari 52 kartu?', answer: '26/52 = 1/2 = 0.5', difficulty: 'Mudah' },
  { topic: 'Kebarangkalian', number: 4, question: 'Apakah kebarangkalian mendapat 2 kepala apabila melambung 2 syiling?', answer: '1/4 = 0.25 = 25%', difficulty: 'Sederhana' },
  { topic: 'Kebarangkalian', number: 5, question: 'Apakah kebarangkalian mendapat 7 apabila melambung 2 dadu?', answer: '6/36 = 1/6 ≈ 0.167', difficulty: 'Sederhana' },
  { topic: 'Kewangan', number: 1, question: 'Kira faedah mudah: P = RM1000, r = 5%, t = 2 tahun', answer: 'A = RM1100', difficulty: 'Sederhana' },
  { topic: 'Kewangan', number: 2, question: 'Kira faedah kompaun: P = RM1000, r = 5%, t = 2 tahun', answer: 'A ≈ RM1102.50', difficulty: 'Sederhana' },
  { topic: 'Kewangan', number: 3, question: 'Apakah nilai masa depan RM500 pada 3% selama 5 tahun?', answer: '≈ RM580.64', difficulty: 'Sederhana' },
  { topic: 'Kewangan', number: 4, question: 'Kira ROI jika membeli saham RM10,000 dan jual RM12,000', answer: '20%', difficulty: 'Mudah' },
  { topic: 'Kewangan', number: 5, question: 'Kira bayaran bulanan pinjaman: Pinjaman = RM100,000, kadar = 4%, tempoh = 5 tahun', answer: '≈ RM1840.29', difficulty: 'Sukar' },
  { topic: 'Matriks', number: 1, question: 'Cari determinan [[2,1],[3,4]]', answer: '5', difficulty: 'Mudah' },
  { topic: 'Matriks', number: 2, question: 'Cari invers [[2,1],[3,4]]', answer: '[[4/5,-1/5],[-3/5,2/5]]', difficulty: 'Sederhana' },
  { topic: 'Matriks', number: 3, question: 'Tambah [[1,2],[3,4]] + [[5,6],[7,8]]', answer: '[[6,8],[10,12]]', difficulty: 'Mudah' },
  { topic: 'Matriks', number: 4, question: 'Darabkan [[1,2],[3,4]] × [[5,6],[7,8]]', answer: '[[19,22],[43,50]]', difficulty: 'Sederhana' },
  { topic: 'Matriks', number: 5, question: 'Cari transpose [[1,2,3],[4,5,6]]', answer: '[[1,4],[2,5],[3,6]]', difficulty: 'Mudah' }
];

questionBank.forEach(addQuestion);
