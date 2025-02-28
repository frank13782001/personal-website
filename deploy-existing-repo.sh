#!/bin/bash

# 确保脚本在出错时停止执行
set -e

# 仓库信息
REPO_NAME="personal-website"
read -p "请输入您的GitHub用户名: " GITHUB_USERNAME

echo "正在初始化Git仓库..."
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "更新网站文件，修复路径问题"

# 添加远程仓库
echo "配置远程仓库..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# 推送到GitHub
echo "推送代码到GitHub..."
git push -u origin main || git push -u origin master || git push -u origin --all

echo "完成！您的网站应该很快就会在以下地址可用:"
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "请确保在GitHub仓库的Settings > Pages页面中:"
echo "1. Source部分选择了您的主分支(main或master)"
echo "2. 文件夹选择为/(root)"
echo "3. 点击Save按钮"
