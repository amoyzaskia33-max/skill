from PIL import Image, ImageDraw, ImageFilter
import random, os

out_dir = r'D:/011_MyAPP/DMS Homepage/public/blog'
os.makedirs(out_dir, exist_ok=True)
W, H = 1600, 900

# 1
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / H
    r = int(20 + 80 * t)
    g = int(40 + 120 * t)
    b = int(90 + 100 * t)
    for x in range(W):
        p[x, y] = (r, g, b)
d = ImageDraw.Draw(img)
for i in range(12):
    y = H * 0.25 + i * 45
    d.arc((100, y, 1500, y + 280), start=200, end=340, fill=(180, 220, 255), width=2)
for _ in range(30):
    x = random.randint(0, W)
    y = random.randint(0, int(H * 0.45))
    d.ellipse((x, y, x + 2, y + 2), fill=(255, 255, 230))
img = img.filter(ImageFilter.GaussianBlur(0.3))
img.save(os.path.join(out_dir, 'today_me_ch6_01.jpg'), quality=92)

# 2
img = Image.new('RGB', (W, H), (28, 30, 35))
d = ImageDraw.Draw(img)
for i in range(8):
    x1 = 120 + i * 170
    y1 = 120 + (i % 2) * 40
    d.rounded_rectangle((x1, y1, x1 + 140, y1 + 200), radius=12, fill=(60 + i * 10, 80 + i * 8, 95 + i * 6), outline=(180, 200, 210), width=2)
for i in range(6):
    d.line((180, 650 - i * 30, 1400, 620 - i * 28), fill=(120, 180, 220), width=3)
for _ in range(40):
    x = random.randint(80, 1520)
    y = random.randint(80, 820)
    if random.random() < 0.5:
        d.rectangle((x, y, x + 6, y + 6), fill=(230, 190, 90))
img = img.filter(ImageFilter.GaussianBlur(0.4))
img.save(os.path.join(out_dir, 'today_me_ch6_02.jpg'), quality=92)

# 3
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / H
    r = int(10 + 20 * (1 - t))
    g = int(20 + 60 * (1 - t))
    b = int(40 + 120 * (1 - t))
    for x in range(W):
        p[x, y] = (r, g, b)
d = ImageDraw.Draw(img)
d.rectangle((220, 220, 1380, 760), outline=(190, 210, 230), width=4)
for i in range(12):
    y = 280 + i * 35
    d.line((280, y, 1320, y), fill=(120, 150, 190), width=2)
for i in range(5):
    d.line((330 + i * 200, 240, 330 + i * 200, 740), fill=(90, 120, 160), width=1)
for _ in range(50):
    x = random.randint(0, W)
    y = random.randint(0, 200)
    d.ellipse((x, y, x + 2, y + 2), fill=(220, 230, 255))
img = img.filter(ImageFilter.GaussianBlur(0.5))
img.save(os.path.join(out_dir, 'today_me_ch6_03.jpg'), quality=92)

print('generated')
