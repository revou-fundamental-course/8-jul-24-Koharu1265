document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("downloadButton").addEventListener("click", downloadResult);
});

// Variables
var age = document.getElementById("usia");
var height = document.getElementById("tinggi");
var weight = document.getElementById("berat");
var male = document.getElementById("selection-man");
var female = document.getElementById("selection-woman");
var resultArea = document.querySelector(".result");
var downloadButton = document.querySelector(".Submit"); // Tombol Download Hasil BMI

var modalContent = document.querySelector(".modal-content");
var modalText = document.querySelector("#modalText");
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
var bedaParagraph = document.querySelector(".beda");

// Function untuk menghitung bmi
function calculate() {
    if (age.value === '' || height.value === '' || weight.value === '' || (male.checked === false && female.checked === false)) {
        modal.style.display = "block";
        modalText.innerHTML = "Semua kolom harus diisi!";
    } else {
        countBmi();
    }
}

// Function untuk if else bmi
function countBmi() {
    var p = [age.value, height.value, weight.value];
    var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);

    var result = '';
    if (bmi < 18.5) {
        result = 'Kurus';
    } else if (18.5 <= bmi && bmi <= 24.9) {
        result = 'Sehat';
    } else if (25 <= bmi && bmi <= 29.9) {
        result = 'Berlebihan';
    } else if (30 <= bmi && bmi <= 34.9) {
        result = 'Obesitas';
    } else if (35 <= bmi) {
        result = 'Obesitas Ekstrim';
    }

    // Update paragraph sesuai output
    switch (result) {
        case 'Kurus':
            bedaParagraph.textContent = "Anda termasuk dalam kategori kurang berat badan. Pertahankan pola makan sehat untuk mencapai berat badan yang ideal.";
            updateInformation('Kurus');
            break;
        case 'Sehat':
            bedaParagraph.textContent = "Anda memiliki berat badan yang ideal. Pertahankan gaya hidup sehat Anda!";
            updateInformation('Sehat');
            break;
        case 'Berlebihan':
            bedaParagraph.textContent = "Anda termasuk dalam kategori kelebihan berat badan. Pertimbangkan untuk menurunkan berat badan melalui pola makan dan olahraga teratur.";
            updateInformation('Berlebihan');
            break;
        case 'Obesitas':
            bedaParagraph.textContent = "Anda mengalami obesitas. Penting untuk mengurangi berat badan guna mengurangi risiko penyakit.";
            updateInformation('Obesitas');
            break;
        case 'Obesitas Ekstrim':
            bedaParagraph.textContent = "Anda mengalami obesitas ekstrim. Konsultasikan dengan profesional kesehatan untuk langkah-langkah perbaikan yang tepat.";
            updateInformation('Obesitas Ekstrim');
            break;
        default:
            bedaParagraph.textContent = "Hasil BMI tidak dapat dikategorikan dengan benar. Mohon cek kembali data yang dimasukkan.";
            updateInformation('Unknown');
    }

    // Display hasil
    resultArea.style.display = "block";
    downloadButton.style.display = "block";
    document.querySelector(".comment").innerHTML = "Anda termasuk dalam kategori <span id='comment'>" + result + "</span>";
    document.querySelector("#result").innerHTML = bmi.toFixed(2);
}

// Fungsi untuk memperbarui informasi berdasarkan kategori BMI
function updateInformation(category) {
    var h3Element = document.querySelector('.informasi h3');
    var paragraphElement = document.querySelector('.informasi p');

    switch (category) {
        case 'Kurus':
            h3Element.textContent = "Beberapa penyakit yang dihasilkan kekurusan";
            paragraphElement.textContent = "Kekurusan dapat menyebabkan masalah kesehatan seperti rendahnya energi, gangguan hormon, dan penurunan kekebalan tubuh.";
            break;
        case 'Sehat':
            h3Element.textContent = "Pertahankan berat badan yang sehat";
            paragraphElement.textContent = "Selamat! Anda memiliki berat badan yang ideal. Pertahankan gaya hidup sehat Anda!";
            break;
        case 'Berlebihan':
        case 'Obesitas':
        case 'Obesitas Ekstrim':
            h3Element.textContent = "Beberapa penyakit yang Berasal dari kegemukan";
            paragraphElement.innerHTML = "Memiliki kelebihan berat badan atau obesitas meningkatkan risiko terkena kondisi yang dapat menyebabkan penyakit jantung, seperti tekanan darah tinggi, kolesterol darah tinggi dan glukosa darah tinggi.";
            break;
        default:
            h3Element.textContent = "Informasi tidak tersedia";
            paragraphElement.textContent = "Mohon maaf, informasi untuk kategori BMI ini tidak tersedia.";
            break;
    }
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    calculate();
});

// Close modal x
span.onclick = function() {
    modal.style.display = "none";
}

// Close modal diluar X
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Tombol dowmload

function downloadResult() {
    var resultText = document.getElementById("result").innerText;
    var blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "BMI_Result.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
