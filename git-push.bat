@echo off
cd /d "C:\Users\Administrator\Documents\trae_projects\my website"
git add -A
git commit -m "合并远程更改，保留本地最新版本"
git push -u origin main
pause