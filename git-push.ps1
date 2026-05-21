# 解决Git冲突并推送到GitHub

# 设置工作目录
Set-Location "C:\Users\Administrator\Documents\trae_projects\my website"

# 添加所有文件到暂存区（解决冲突）
git add -A

# 提交合并结果
git commit -m "合并远程更改，保留本地最新版本

- 解决所有文件冲突
- 统一使用本地最新方案
- 添加Awesome Skills模块
- 苹果化整体页面风格"

# 推送到GitHub
git push -u origin main

# 输出完成信息
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "成功推送到GitHub！" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "仓库地址: https://github.com/zackal007/AwsomeIntelligence" -ForegroundColor Cyan
Write-Host ""