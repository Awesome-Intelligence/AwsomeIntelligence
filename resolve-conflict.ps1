# 解决Git冲突 - 保留本地版本
cd "C:\Users\Administrator\Documents\trae_projects\my website"

# 放弃所有冲突文件，使用本地版本
git checkout --ours .

# 添加所有文件到暂存区
git add .

# 提交合并结果
git commit -m "合并远程更改，保留本地最新方案

- 解决所有文件冲突
- 统一使用本地最新版本"

# 推送到GitHub
git push -u origin main

Write-Host "完成！所有更改已推送到GitHub。" -ForegroundColor Green