from PIL import Image, ImageDraw, ImageFilter
import random, os, math

out_dir = r'D:/011_MyAPP/DMS Homepage/public/blog'
os.makedirs(out_dir, exist_ok=True)
W, H = 1600, 900

# 1) Restart window - dawn gradient with geometric checkpoints
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(18 + 40 * t)
    g = int(30 + 95 * t)
    b = int(58 + 140 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)
for i in range(7):
    x = 170 + i * 190
    y = 220 + (i % 2) * 40
    d.rounded_rectangle((x, y, x + 140, y + 360), radius=22, outline=(190, 228, 255), width=3)

for i in range(6):
    y = 640 - i * 45
    d.line((120, y, 1480, y - 85), fill=(130, 190, 235), width=3)

for _ in range(45):
    x = random.randint(30, W - 30)
    y = random.randint(40, 260)
    d.ellipse((x, y, x + 3, y + 3), fill=(240, 245, 255))

img = img.filter(ImageFilter.GaussianBlur(0.35))
img.save(os.path.join(out_dir, 'today_me_ch9_01.jpg'), quality=93)

# 2) Noise control - layered wave fields and clean center lane
img = Image.new('RGB', (W, H), (16, 20, 30))
d = ImageDraw.Draw(img)

for band in range(12):
    y0 = 80 + band * 62
    color = (40 + band * 8, 80 + band * 10, 120 + band * 9)
    points = []
    for x in range(0, W + 1, 20):
        y = y0 + int(24 * math.sin((x / 120) + band * 0.7))
        points.append((x, y))
    d.line(points, fill=color, width=6)

# central low-friction lane
for i in range(8):
    alpha_col = (180 + i * 6, 220 + i * 3, 245)
    d.rounded_rectangle((260 + i * 8, 250 + i * 6, 1340 - i * 8, 650 - i * 6), radius=28, outline=alpha_col, width=2)

for _ in range(90):
    x = random.randint(0, W)
    y = random.randint(0, H)
    if random.random() < 0.55:
        d.rectangle((x, y, x + 2, y + 2), fill=(230, 240, 255))

img = img.filter(ImageFilter.GaussianBlur(0.45))
img.save(os.path.join(out_dir, 'today_me_ch9_02.jpg'), quality=93)

# 3) Evening handoff map - nodes and directed arcs
img = Image.new('RGB', (W, H))
p = img.load()
for y in range(H):
    t = y / (H - 1)
    r = int(12 + 46 * t)
    g = int(16 + 42 * t)
    b = int(34 + 86 * t)
    for x in range(W):
        p[x, y] = (r, g, b)

d = ImageDraw.Draw(img)

nodes = [(180, 690), (360, 620), (560, 560), (760, 500), (980, 430), (1220, 340), (1420, 250)]
for i in range(len(nodes) - 1):
    x1, y1 = nodes[i]
    x2, y2 = nodes[i + 1]
    d.line((x1, y1, x2, y2), fill=(165, 208, 245), width=4)
    d.arc((x1 - 80, y2 - 120, x2 + 80, y1 + 120), start=205, end=332, fill=(120, 170, 220), width=2)

for x, y in nodes:
    d.ellipse((x - 10, y - 10, x + 10, y + 10), fill=(225, 238, 255), outline=(120, 170, 220), width=2)

for _ in range(70):
    x = random.randint(20, W - 20)
    y = random.randint(20, 260)
    d.ellipse((x, y, x + 2, y + 2), fill=(235, 240, 255))

img = img.filter(ImageFilter.GaussianBlur(0.4))
img.save(os.path.join(out_dir, 'today_me_ch9_03.jpg'), quality=93)

print('generated ch9 images')
