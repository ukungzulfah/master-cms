# Cara Membuat dan Push Project ke GitHub via CLI

Berikut langkah-langkah dan perintah yang bisa kamu gunakan untuk membuat repository baru di GitHub dan push project lokal menggunakan CLI:

## 1. Inisialisasi Git di Folder Project
```bash
git init
```

## 2. Tambahkan Semua File dan Commit Awal
```bash
git add .
git commit -m "Initial commit"
```

## 3. Buat Repository Baru di GitHub dan Push Project
Pastikan sudah install GitHub CLI (`gh`).

```bash
gh repo create <nama-repo> --public --source=. --remote=origin --push
```
Contoh:
```bash
gh repo create master-cms --public --source=. --remote=origin --push
```

## 4. Selesai!
Project sudah ter-push ke GitHub dan remote origin sudah terhubung.

---

**Catatan:**
- Ganti `<nama-repo>` dengan nama repository yang kamu inginkan.
- Pastikan sudah login ke GitHub via CLI dengan `gh auth login` jika belum pernah login.
- Untuk project selanjutnya, cukup ulangi langkah di atas di folder project baru.

---

## Contoh Prompting Fleksibel untuk AI

Kamu bisa gunakan contoh prompt berikut agar AI seperti Copilot memahami dan menjalankan proses push project ke GitHub dengan benar:

### Contoh Prompt:

> "Bro, tolong akses terminal/CLI, inisialisasi git di project ini, buat repository baru di GitHub dengan nama <nama-repo> (public/private sesuai kebutuhan), hubungkan remote origin, dan push semua file project ke repository tersebut. Pastikan semua langkah selesai tanpa error."

### Penjelasan:
- Ganti `<nama-repo>` dengan nama repository yang kamu inginkan.
- Prompt ini sudah cukup jelas dan fleksibel untuk berbagai project.
- Bisa ditambah detail lain seperti tipe repo (public/private), deskripsi, atau langkah tambahan jika diperlukan.

### Contoh Variasi Prompt:
- "Buat repo baru di GitHub untuk project ini dan push semua file sekarang juga."
- "Inisialisasi git, buat repo di GitHub dengan nama `<nama-repo>`, lalu push project ini ke sana."
- "Push project ini ke repo GitHub baru bernama `<nama-repo>`, pastikan semua file terupload."

Dengan prompt seperti di atas, AI akan lebih mudah memahami dan menjalankan instruksi sesuai kebutuhanmu.
