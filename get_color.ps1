Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile('C:\Users\tonip\.gemini\antigravity\brain\d4da3a39-7594-4e9e-a215-f2cad70d3ac1\media__1772887532802.jpg')
$color = $img.GetPixel(10, 500)
Write-Output "#$($color.R.ToString('X2'))$($color.G.ToString('X2'))$($color.B.ToString('X2'))"
$img.Dispose()
