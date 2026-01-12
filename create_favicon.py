from PIL import Image

try:
    # 打开头像图片
    img = Image.open('images/new_profile.jpg')
    
    # 调整大小为标准favicon尺寸
    img = img.resize((32, 32))
    
    # 保存为favicon.ico
    img.save('favicon.ico')
    
    print('成功创建favicon.ico!')
except Exception as e:
    print(f'创建favicon时出错: {e}')