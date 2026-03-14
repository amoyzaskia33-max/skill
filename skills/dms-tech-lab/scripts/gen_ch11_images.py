from PIL import Image, ImageDraw, ImageFilter
import random, os, math

out_dir = r'D:/011_MyAPP/DMS Homepage/public/blog'
os.makedirs(out_dir, exist_ok=True)
W, H = 1600, 900

# 1) Boundary ritual - layered horizon gates
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(10 + 30 * t)
    g = int(22 + 74 * t)
    b = int(48 + 130 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)
for i in range(9):
    x1 = 120 + i * 150
    y1 = 620 - i * 34
    x2 = x1 + 190
    y2 = y1 + 180
    d.rounded_rectangle((x1, y1, x2, y2), radius=22, outline=(140 + i * 8, 200 + i * 4, 245), width=3)

for i in range(8):
    y = 700 - i * 65
    d.line((80, y, 1520, y - 120), fill=(90 + i * 14, 150 + i * 10, 220), width=2)

for _ in range(120):
    x = random.randint(0, W - 1)
    y = random.randint(30, 280)
    d.ellipse((x, y, x + 2, y + 2), fill=(230, 240, 255))

img = img.filter(ImageFilter.GaussianBlur(0.45))
img.save(os.path.join(out_dir, 'today_me_ch11_01.jpg'), quality=93)

# 2) Context budget - modular tiles and flow lanes
img = Image.new('RGB', (W, H), (14, 18, 28))
d = ImageDraw.Draw(img)

for row in range(4):
    for col in range(7):
        x = 120 + col * 200
        y = 130 + row * 170
        hue = 70 + row * 26 + col * 9
        d.rounded_rectangle((x, y, x + 160, y + 110), radius=16, outline=(hue, 160 + row * 12, 230), width=3)

for i in range(12):
    y = 80 + i * 62
    points = []
    for x in range(0, W + 1, 20):
        yy = y + int(15 * math.sin((x / 95) + i * 0.8))
        points.append((x, yy))
    d.line(points, fill=(70 + i * 8, 120 + i * 6, 190 + i * 4), width=2)

for i in range(6):
    d.rounded_rectangle((280 + i * 14, 260 + i * 10, 1320 - i * 14, 640 - i * 10), radius=26, outline=(170 + i * 8, 210 + i * 5, 245), width=2)

img = img.filter(ImageFilter.GaussianBlur(0.35))
img.save(os.path.join(out_dir, 'today_me_ch11_02.jpg'), quality=93)

# 3) Quiet restart corridor - single vanishing point composition
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(16 + 44 * t)
    g = int(18 + 54 * t)
    b = int(36 + 96 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)
center = (W // 2, 260)

for i in range(14):
    pad = 70 + i * 36
    color = (90 + i * 10, 140 + i * 8, 210 + i * 3)
    d.line((pad, H - 80, center[0], center[1]), fill=color, width=2)
    d.line((W - pad, H - 80, center[0], center[1]), fill=color, width=2)

for i in range(7):
    y = H - 110 - i * 78
    w = 1320 - i * 150
    x1 = (W - w) // 2
    x2 = x1 + w
    d.line((x1, y, x2, y), fill=(150 + i * 10, 195 + i * 6, 240), width=3)

for _ in range(140):
    x = random.randint(0, W - 1)
    y = random.randint(20, 300)
    if random.random() < 0.7:
        d.rectangle((x, y, x + 1, y + 1), fill=(235, 240, 255))

img = img.filter(ImageFilter.GaussianBlur(0.4))
img.save(os.path.join(out_dir, 'today_me_ch11_03.jpg'), quality=93)

print('generated ch11 images')
