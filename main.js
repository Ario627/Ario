// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Ambil semua elemen yang kita butuhkan
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const needle = document.getElementById('needle');
    const percentageDisplay = document.getElementById('percentage-display');
    const resultMessage = document.getElementById('result-message');
    const analysisBox = document.getElementById('analysis-box');

    // Elemen baru untuk gambar
    const fileInput1 = document.getElementById('file-input1');
    const imagePreview1 = document.getElementById('image-preview1');
    const imageContainer1 = document.getElementById('image-container1');
    const fileInput2 = document.getElementById('file-input2');
    const imagePreview2 = document.getElementById('image-preview2');
    const imageContainer2 = document.getElementById('image-container2');
    
    const placeholderImage = 'https://via.placeholder.com/150';

    // Fungsi untuk handle upload file gambar
    function handleFileSelect(event, previewElement) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Tambahkan event listener ke setiap input file
    fileInput1.addEventListener('change', (e) => handleFileSelect(e, imagePreview1));
    fileInput2.addEventListener('change', (e) => handleFileSelect(e, imagePreview2));

    // Fungsi untuk menghitung 'cinta'
    function calculateLove() {
        const name1 = name1Input.value.trim().toLowerCase();
        const name2 = name2Input.value.trim().toLowerCase();

        // Validasi: Pastikan nama dan gambar sudah diisi
        if (name1 === '' || name2 === '' || imagePreview1.src === placeholderImage || imagePreview2.src === placeholderImage) {
            resultMessage.textContent = 'Harap isi kedua nama & pilih kedua foto!';
            resultMessage.style.color = '#f44336';
            return;
        }
        
        // ---- INI BAGIAN PENTING UNTUK MENGGERAKKAN GAMBAR ----
        // 1. Tambahkan class animasi 3D ke container gambar
        imageContainer1.classList.add('animate-3d');
        imageContainer2.classList.add('animate-3d');
        
        // 2. Hapus class setelah animasi selesai agar bisa di-trigger lagi
        setTimeout(() => {
            imageContainer1.classList.remove('animate-3d');
            imageContainer2.classList.remove('animate-3d');
        }, 1500); // Durasi harus sama dengan transition di CSS

        // Algoritma 'cocoklogi' yang konsisten
        const combinedNames = name1 + "loves" + name2;
        let totalValue = 0;
        for (let i = 0; i < combinedNames.length; i++) {
            totalValue += combinedNames.charCodeAt(i);
        }
        const percentage = 40 + (totalValue % 61);

        updateUI(percentage, name1Input.value.trim(), name2Input.value.trim());
    }

    // Fungsi untuk update tampilan (jarum, teks, analisis)
    function updateUI(percentage, name1, name2) {
        const rotation = (percentage / 100) * 180 - 90;
        needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        let currentPercentage = 0;
        const interval = setInterval(() => {
            if (currentPercentage >= percentage) {
                clearInterval(interval);
            } else {
                currentPercentage++;
                percentageDisplay.textContent = currentPercentage + '%';
            }
        }, 20);

        setTimeout(() => {
            resultMessage.style.color = '#e91e63';
            resultMessage.textContent = `Kecocokan ${name1} & ${name2} adalah ${percentage}%!`;
            analysisBox.style.display = 'block';
            analysisBox.innerHTML = getAnalysisMessage(percentage, name1, name2);
        }, 2000);
    }
    
    function getAnalysisMessage(percentage, name1, name2) {
         if (percentage >= 90) {
            return `<strong>Analisis Cinta:</strong> JODOH SEJATI! Dengan kecocokan ${percentage}%, hubungan kalian ditakdirkan untuk bersama. Langgeng terus ya!`;
        } else if (percentage >= 75) {
            return `<strong>Analisis Cinta:</strong> PASANGAN SERASI! Kalian punya chemistry yang kuat. Komunikasi adalah kunci untuk membuat hubungan ini semakin sempurna.`;
        } else if (percentage >= 60) {
            return `<strong>Analisis Cinta:</strong> POTENSI BESAR! Ada potensi cinta yang besar di antara kalian. Butuh sedikit bumbu petualangan dan pengertian untuk membuatnya mekar.`;
        } else {
            return `<strong>Analisis Cinta:</strong> AWAL YANG BAIK! Ini adalah awal dari sesuatu yang indah. Teruslah saling mengenal dan temukan kecocokan tersembunyi di antara kalian.`;
        }
    }

    // Fungsi untuk mereset semuanya
    function resetAll() {
        name1Input.value = '';
        name2Input.value = '';
        needle.style.transform = 'translateX(-50%) rotate(-90deg)';
        percentageDisplay.textContent = '0%';
        resultMessage.textContent = 'Masukkan dua nama & foto untuk memulai';
        resultMessage.style.color = '#333';
        analysisBox.style.display = 'none';
        analysisBox.innerHTML = '';
        
        // Reset gambar dan input file
        imagePreview1.src = placeholderImage;
        imagePreview2.src = placeholderImage;
        fileInput1.value = null; // Membersihkan file yang dipilih
        fileInput2.value = null;
    }

    // Tambahkan event listener ke tombol
    calculateBtn.addEventListener('click', calculateLove);
    resetBtn.addEventListener('click', resetAll);
});
