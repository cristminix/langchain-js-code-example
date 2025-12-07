# Script PowerShell yang diperbaiki untuk mengkonversi file VTT ke teks
# Penggunaan: .\convert-vtt-to-text-improved.ps1

# Nama file input dan output
$inputFile = "LangChain-Beginners-Tutorial-for-Typescript-Javascript.en.vtt"
$outputFile = "LangChain-Beginners-Tutorial-for-Typescript-Javascript.en.txt"

# Periksa apakah file input ada
if (-not (Test-Path $inputFile)) {
    Write-Host "Error: File $inputFile tidak ditemukan!" -ForegroundColor Red
    exit 1
}

Write-Host "Mengkonversi $inputFile ke $outputFile..." -ForegroundColor Green

# Baca semua baris dari file VTT
$lines = Get-Content $inputFile

# Inisialisasi variabel
$outputText = @()
$isCaptionText = $false
$lastText = ""

# Proses setiap baris
foreach ($line in $lines) {
    # Skip baris kosong
    if ([string]::IsNullOrWhiteSpace($line)) {
        $isCaptionText = $false
        continue
    }
    
    # Skip baris header WEBVTT, Kind, Language
    if ($line.StartsWith("WEBVTT") -or $line.StartsWith("Kind:") -or $line.StartsWith("Language:")) {
        continue
    }
    
    # Skip baris timestamp (format: 00:00:00.000 --> 00:00:01.000)
    if ($line -match "^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}") {
        $isCaptionText = $true
        continue
    }
    
    # Skip baris positioning (align:start position:0%)
    if ($line -match "align:start position:\d+%") {
        continue
    }
    
    # Proses teks caption
    if ($isCaptionText) {
        # Hapus tag HTML dan timestamp dari dalam teks
        $cleanLine = $line -replace '<[^>]+>', '' -replace '\d{2}:\d{2}:\d{2}\.\d{3}>', ''
        
        # Skip jika baris hanya berisi spasi setelah pembersihan
        if (-not [string]::IsNullOrWhiteSpace($cleanLine)) {
            $cleanLine = $cleanLine.Trim()
            
            # Hanya tambahkan jika teks berbeda dari teks sebelumnya (hindari duplikasi)
            if ($cleanLine -ne $lastText) {
                $outputText += $cleanLine
                $lastText = $cleanLine
            }
        }
    }
}

# Tulis hasil ke file output
$outputText | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Konversi selesai! Hasil disimpan di $outputFile" -ForegroundColor Green
Write-Host "Total baris teks unik: $($outputText.Count)" -ForegroundColor Cyan