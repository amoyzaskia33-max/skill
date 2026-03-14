from PIL import Image, ImageDraw, ImageFilter
import random, os, math

out_dir = r'D:/011_MyAPP/DMS Homepage/public/blog'
os.makedirs(out_dir, exist_ok=True)
W, H = 1600, 900

# 1) Closing checkpoints over a calm desk-like plane
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(12 + 26 * t)
    g = int(20 + 55 * t)
    b = int(38 + 120 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)
for i in range(7):
    y = 640 - i * 48
    d.line((120, y, 1480, y - 70), fill=(70 + i * 12, 150 + i * 8, 225), width=2)

for i in range(3):
    x = 360 + i * 320
    y = 430 - i * 24
    d.rounded_rectangle((x, y, x + 180, y + 110), radius=22, outline=(180, 225 - i * 10, 255), width=4)
    d.line((x + 42, y + 58, x + 78, y + 84), fill=(210, 245, 255), width=5)
    d.line((x + 78, y + 84, x + 136, y + 32), fill=(210, 245, 255), width=5)

for _ in range(120):
    x = random.randint(0, W - 1)
    y = random.randint(40, 260)
    d.ellipse((x, y, x + 2, y + 2), fill=(230, 240, 255))

img = img.filter(ImageFilter.GaussianBlur(0.4))
img.save(os.path.join(out_dir, 'today_me_ch13_01.jpg'), quality=93)

# 2) Modular morning-start panel layout
img = Image.new('RGB', (W, H), (10, 16, 28))
d = ImageDraw.Draw(img)

for row in range(3):
    for col in range(5):
        x = 150 + col * 245
        y = 130 + row * 180
        d.rounded_rectangle((x, y, x + 190, y + 120), radius=18, outline=(80 + col * 18, 160 + row * 18, 240), width=3)

for i in range(5):
    x = 170 + i * 245
    d.rounded_rectangle((x, 180, x + 190, 180 + 120), radius=18, fill=(20 + i * 10, 70 + i * 12, 130 + i * 8), outline=(170, 230, 255), width=4)

for i in range(9):
    points = []
    base_y = 90 + i * 70
    for x in range(0, W + 1, 18):
        yy = base_y + int(12 * math.sin(x / 90 + i * 0.7))
        points.append((x, yy))
    d.line(points, fill=(60 + i * 10, 110 + i * 9, 180 + i * 7), width=2)

img = img.filter(ImageFilter.GaussianBlur(0.35))
img.save(os.path.join(out_dir, 'today_me_ch13_02.jpg'), quality=93)

# 3) Transition corridor into recovery mode
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(14 + 46 * t)
    g = int(18 + 44 * t)
    b = int(34 + 92 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)
vanish = (W // 2, 220)
for i in range(12):
    pad = 90 + i * 42
    color = (90 + i * 9, 145 + i * 7, 220 + i * 2)
    d.line((pad, H - 70, vanish[0], vanish[1]), fill=color, width=2)
    d.line((W - pad, H - 70, vanish[0], vanish[1]), fill=color, width=2)

for i in range(6):
    y = H - 110 - i * 92
    w = 1180 - i * 150
    x1 = (W - w) // 2
    x2 = x1 + w
    d.line((x1, y, x2, y), fill=(170 + i * 8, 210 + i * 6, 245), width=3)

for _ in range(140):
    x = random.randint(0, W - 1)
    y = random.randint(20, 280)
    d.rectangle((x, y, x + 1, y + 1), fill=(235, 242, 255))

img = img.filter(ImageFilter.GaussianBlur(0.45))
img.save(os.path.join(out_dir, 'today_me_ch13_03.jpg'), quality=93)

print('generated ch13 images')
