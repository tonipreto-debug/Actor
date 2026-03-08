Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('C:\Users\tonip\.gemini\antigravity\playground\scalar-shepard\portfolio-antonio\images\portada_desktop.jpg')
$color = $img.GetPixel(10, 10)
Write-Output "#$($color.R.ToString('X2'))$($color.G.ToString('X2'))$($color.B.ToString('X2'))"
$img.Dispose()
