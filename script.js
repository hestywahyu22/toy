// 1. Data Produk Baju
const produkBaju = [
  {
    id: 1,
    nama: "Kaos Polos Hitam",
    harga: 75000,
    gambar: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400"
  },
  {
    id: 2,
    nama: "Kemeja Flanel Kotak",
    harga: 150000,
    gambar: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400"
  },
  {
    id: 3,
    nama: "Hoodie Oversize Abu",
    harga: 200000,
    gambar: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"
  }
];

let keranjang = [];

// 2. Menampilkan Produk ke Halaman HTML
const wadahProduk = document.getElementById("daftar-produk");

produkBaju.forEach((baju) => {
  wadahProduk.innerHTML += `
    <div class="kartu">
      <img src="${baju.gambar}" alt="${baju.nama}">
      <h4>${baju.nama}</h4>
      <p class="harga">Rp ${baju.harga.toLocaleString("id-ID")}</p>
      
      <label>Ukuran: </label>
      <select id="ukuran-${baju.id}">
        <option value="S">S</option>
        <option value="M" selected>M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <button class="btn-tambah" onclick="tambahKeKeranjang(${baju.id})">
        + Tambah ke Keranjang
      </button>
    </div>
  `;
});

// 3. Fungsi Tambah ke Keranjang
function tambahKeKeranjang(idBaju) {
  const bajuDipilih = produkBaju.find((item) => item.id === idBaju);
  const ukuranDipilih = document.getElementById(`ukuran-${idBaju}`).value;

  // Cek apakah baju dengan ukuran sama sudah ada di keranjang
  const itemAda = keranjang.find(
    (item) => item.id === idBaju && item.ukuran === ukuranDipilih
  );

  if (itemAda) {
    itemAda.jumlah += 1;
  } else {
    keranjang.push({
      id: bajuDipilih.id,
      nama: bajuDipilih.nama,
      harga: bajuDipilih.harga,
      ukuran: ukuranDipilih,
      jumlah: 1
    });
  }

  updateTampilanKeranjang();
  alert(`${bajuDipilih.nama} (Ukuran ${ukuranDipilih}) masuk keranjang!`);
}

// 4. Fungsi Memperbarui Isi Keranjang
function updateTampilanKeranjang() {
  const wadahKeranjang = document.getElementById("isi-keranjang");
  const elemenJumlah = document.getElementById("jumlah-item");
  const elemenTotal = document.getElementById("total-harga");

  wadahKeranjang.innerHTML = "";
  let totalItem = 0;
  let totalHarga = 0;

  if (keranjang.length === 0) {
    wadahKeranjang.innerHTML = "<p>Keranjang masih kosong.</p>";
  } else {
    keranjang.forEach((item, index) => {
      totalItem += item.jumlah;
      totalHarga += item.harga * item.jumlah;

      wadahKeranjang.innerHTML += `
        <div class="item-keranjang">
          <div>
            <strong>${item.nama}</strong> (${item.ukuran})<br>
            <small>${item.jumlah} x Rp ${item.harga.toLocaleString("id-ID")}</small>
          </div>
          <button class="btn-hapus" onclick="hapusItem(${index})">Hapus</button>
        </div>
      `;
    });
  }

  elemenJumlah.innerText = totalItem;
  elemenTotal.innerText = "Rp " + totalHarga.toLocaleString("id-ID");
}

// 5. Hapus Item & Buka/Tutup Modal
function hapusItem(index) {
  keranjang.splice(index, 1);
  updateTampilanKeranjang();
}

function bukaTutupKeranjang() {
  const modal = document.getElementById("modal-keranjang");
  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

function checkout() {
  if (keranjang.length === 0) {
    alert("Keranjangmu masih kosong!");
    return;
  }
  alert("Terima kasih! Pesanan bajumu sedang diproses.");
  keranjang = [];
  updateTampilanKeranjang();
  bukaTutupKeranjang();
}
