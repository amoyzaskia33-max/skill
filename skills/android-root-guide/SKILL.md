---
name: android-root-guide
description: Use when learning Android rooting - comprehensive guide for bootloader unlock, custom recovery, root, and custom ROMs
---

# Android Root Guide Skill - Complete Rooting Reference

## Purpose

This skill provides comprehensive knowledge about Android rooting, including bootloader unlocking, custom recovery installation, root access, and custom ROM flashing.

## When to Use

Use this skill when:
- Learning Android rooting process
- Unlocking device bootloader
- Installing custom recovery (TWRP)
- Rooting Android devices
- Installing custom ROMs
- Recovering bricked devices

## Rooting Process Overview

```
┌─────────────────────────────────────────┐
│  1. Unlock Bootloader                   │
│     (Wipes all data)                    │
├─────────────────────────────────────────┤
│  2. Install Custom Recovery             │
│     (TWRP, OrangeFox, etc.)             │
├─────────────────────────────────────────┤
│  3. Root Device                         │
│     (Magisk, KernelSU, etc.)            │
├─────────────────────────────────────────┤
│  4. (Optional) Custom ROM               │
│     (LineageOS, Pixel Experience, etc.) │
└─────────────────────────────────────────┘
```

## Step 1: Unlock Bootloader

### Prerequisites

- USB Debugging enabled
- OEM Unlocking enabled (Developer Options)
- ADB and Fastboot installed
- Device-specific drivers
- Backup all data (will be wiped!)

### Unlock Process

```bash
# Enable Developer Options
# Settings → About Phone → Tap Build Number 7x

# Enable USB Debugging & OEM Unlock
# Settings → Developer Options

# Reboot to bootloader
adb reboot bootloader

# Check lock status
fastboot oem device-info

# Unlock bootloader (command varies by manufacturer)
fastboot flashing unlock           # Pixel, Motorola
fastboot oem unlock                # HTC, Sony
fastboot oem unlock-go             # Some Xiaomi
fastboot flashing unlock_critical  # Some devices

# Confirm on device (volume keys)
# Device will reboot and wipe data
```

### Manufacturer-Specific Commands

| Manufacturer | Unlock Command | Notes |
|-------------|----------------|-------|
| **Google Pixel** | `fastboot flashing unlock` | Easy unlock |
| **OnePlus** | `fastboot oem unlock` | Need unlock code |
| **Xiaomi** | Mi Unlock tool | 7-30 day wait |
| **Samsung** | Odin + combination | Knox trips |
| **Motorola** | `fastboot oem unlock CODE` | Get code online |
| **Sony** | `fastboot oem unlock 0xCODE` | Get code online |
| **Huawei** | bootloader unlock code | Code service discontinued |

## Step 2: Install Custom Recovery

### Download Recovery

```bash
# Get TWRP for your device
# https://twrp.me/Devices/

# Or OrangeFox
# https://orangefox.download/
```

### Flash Recovery

```bash
# Boot to bootloader
adb reboot bootloader

# Flash recovery
fastboot flash recovery twrp.img

# Or boot temporarily
fastboot boot twrp.img

# Reboot to recovery
# Volume down + Power (most devices)
```

### TWRP Setup

```
1. Swipe to allow modifications
2. Go to Settings → Enable MD5 verification (optional)
3. Backup current ROM (recommended)
4. Wipe → Format Data (for encryption)
```

## Step 3: Root with Magisk

### Method A: Via Recovery

```bash
# 1. Download Magisk.apk from GitHub
# 2. Rename to Magisk.zip
# 3. Copy to device
# 4. Boot to TWRP
# 5. Install → Select Magisk.zip
# 6. Swipe to confirm
# 7. Reboot System
```

### Method B: Patch Boot Image

```bash
# 1. Extract boot.img from stock firmware
# 2. Copy to device
# 3. Install Magisk app
# 4. Install → Patch boot image
# 5. Copy patched_boot.img to PC
# 6. Flash:
fastboot flash boot patched_boot.img
fastboot reboot
```

## Step 4: Custom ROM (Optional)

### Popular Custom ROMs

| ROM | Based On | Features |
|-----|----------|----------|
| **LineageOS** | AOSP | Clean, stable |
| **Pixel Experience** | AOSP | Pixel features |
| **crDroid** | LineageOS | Customization |
| **Evolution X** | AOSP | Pixel + customization |
| **ArrowOS** | AOSP | Lightweight |
| **Paranoid Android** | AOSP | Unique features |

### Flash Custom ROM

```bash
# 1. Download ROM zip and GApps
# 2. Boot to TWRP
# 3. Wipe → Advanced Wipe
#    - Dalvik/ART Cache
#    - System
#    - Data
#    - Cache
# 4. Install → Select ROM zip
# 5. Add more zips → GApps
# 6. Swipe to confirm
# 7. Reboot System
```

## For AI Assistants

When helping with Android rooting:

1. **Identify device** - Exact model matters
2. **Check bootloader status** - Some carriers lock permanently
3. **Find device-specific guides** - XDA Developers
4. **Backup everything** - Rooting can brick
5. **Follow steps carefully** - Don't skip steps

## Common Issues

| Issue | Solution |
|-------|----------|
| Bootloop | Restore backup, re-flash |
| No root | Re-flash Magisk |
| TWRP won't boot | Use correct version |
| Encryption issues | Format data in TWRP |
| Widevine L1 → L3 | Normal after unlock |
| Banking apps fail | Use MagiskHide |
| SafetyNet fails | Install fix module |

## Essential Tools

| Tool | Purpose |
|------|---------|
| **ADB/Fastboot** | Device communication |
| **TWRP** | Custom recovery |
| **Magisk** | Root management |
| **ODIN** | Samsung flashing |
| **SP Flash Tool** | MediaTek devices |
| **Mi Flash** | Xiaomi devices |

## Related Skills

- `magisk-root` - Magisk specifics
- `adb-login-tool` - ADB commands
- `ios-repair-tool` - iOS equivalent

## Repository Location

`C:\Users\user\.qwen\skills\android-root-guide`

## Source

https://github.com/awesome-android-root/awesome-android-root

## XDA Developers

https://forum.xda-developers.com/

---

**Note:** Rooting voids warranty on most devices. Always backup, follow device-specific guides, and understand the risks. XDA Developers forum is the best resource for device-specific information.
