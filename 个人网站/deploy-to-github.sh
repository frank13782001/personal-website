#!/bin/bash

# 确保脚本在出错时停止执行
set -e

# 提示用户输入GitHub用户名和仓库名
read -p "请输入您的GitHub用户名: " github_username
read -p "请输入您要创建的仓库名称: " repo_name

echo "正在初始化Git仓库..."
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交"

# 创建GitHub仓库（需要GitHub CLI，如果没有安装，请手动在GitHub上创建仓库）
if command -v gh &> /dev/null; then
    echo "使用GitHub CLI创建仓库..."
    gh repo create "$repo_name" --public --source=. --remote=origin
else
    echo "GitHub CLI未安装，请手动在GitHub上创建仓库，然后运行以下命令:"
    echo "git remote add origin https://github.com/$github_username/$repo_name.git"
    read -p "创建完成后按Enter键继续..."
    git remote add origin "https://github.com/$github_username/$repo_name.git"
fi

# 推送到GitHub
echo "推送代码到GitHub..."
git push -u origin main || git push -u origin master

echo "完成！您的网站应该很快就会在以下地址可用:"
echo "https://$github_username.github.io/$repo_name/"
echo ""
echo "请记得在GitHub仓库的Settings页面中启用GitHub Pages。"
