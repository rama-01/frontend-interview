$folderPath = "C:\Users\Username\Documents\MyFolder"
$oldExtension = ".notes"
$newExtension = ".md"

Get-ChildItem -Path $folderPath -Filter "*$oldExtension" | 
Rename-Item -NewName { $_.BaseName + $newExtension }
