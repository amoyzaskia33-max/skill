---
name: magisk-root
description: Use when rooting Android devices - Magisk is the standard for systemless root access on modern Android
---

# Magisk Root Skill - Android Systemless Root

## Purpose

This skill provides expertise in using Magisk, the standard systemless root solution for modern Android devices, enabling root access, module installation, and system modifications without modifying the system partition.

## When to Use

Use this skill when:
- Rooting Android devices
- Installing custom modules
- Passing SafetyNet/Play Integrity
- Systemless modifications
- Custom ROM management
- Boot image patching

## Key Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Systemless Root** | Root without modifying /system |
| **MagiskHide** | Hide root from specific apps |
| **Magisk Modules** | Modular customization system |
| **Boot Image Patching** | Patch boot images for root |
| **SafetyNet Fix** | Pass SafetyNet/Play Integrity |
| **Zygisk** | Zygote injection for modules |
| **DenyList** | Hide root from banking apps |

### Magisk Components

- **MagiskSU** - Root access management
- **MagiskInit** - Boot initialization
- **MagiskHide** - Root hiding
- **Magisk Modules** - Extension system
- **Zygisk** - Zygote injection
- **Magisk Boot** - Boot image tool

## Installation Methods

### Method 1: Patch Boot Image (Recommended)

```bash
# 1. Download stock boot.img from firmware
# 2. Copy boot.img to device
# 3. Install Magisk app
# 4. Open Magisk app → Install → Patch boot image
# 5. Copy patched_boot.img to PC
# 6. Flash via fastboot:
fastboot flash boot patched_boot.img
fastboot reboot
```

### Method 2: Custom Recovery (TWRP)

```bash
# 1. Download Magisk.apk
# 2. Rename to Magisk.zip
# 3. Boot to TWRP recovery
# 4. Flash Magisk.zip
# 5. Reboot system
```

### Method 3: ADB Sideload

```bash
# 1. Boot to recovery
# 2. Select ADB sideload
# 3. On PC:
adb sideload Magisk.zip
```

## Requirements

| Requirement | Details |
|------------|---------|
| **Unlocked Bootloader** | Required for flashing |
| **Custom Recovery** | TWRP, OrangeFox (optional) |
| **Magisk App** | Latest from GitHub |
| **Boot Image** | Stock boot.img from firmware |
| **Fastboot/ADB** | Platform tools |

## Post-Root Setup

### Essential Modules

```
1. MagiskHide Props Config
   - Device fingerprint modification
   
2. Universal SafetyNet Fix
   - Pass SafetyNet/Play Integrity
   
3. LSPosed (Zygisk)
   - Xposed framework replacement
   
4. BusyBox
   - Unix utilities
```

### Configure MagiskHide

```
1. Open Magisk app
2. Settings → MagiskHide (or DenyList)
3. Enable for apps:
   - Banking apps
   - Google Pay/Wallet
   - Games with anti-cheat
```

## For AI Assistants

When helping with Magisk root:

1. **Check device compatibility** - Some devices have locked bootloaders
2. **Backup first** - Always backup before rooting
3. **Correct boot image** - Must match firmware version
4. **Unlock bootloader** - Required step
5. **Post-root setup** - SafetyNet, MagiskHide

## Common Commands

### Magisk Boot (PC)

```bash
# Unpack boot image
magiskboot unpack boot.img

# Patch boot image
magiskboot cpio boot.img "add 0750 init.rc init.rc"

# Repack boot image
magiskboot repack boot.img

# Cleanup
magiskboot cleanup
```

### ADB Commands

```bash
# Check root
adb shell su -c "id"

# Reboot to bootloader
adb reboot bootloader

# Reboot to recovery
adb reboot recovery

# Check Magisk version
adb shell su -c "magisk -v"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Bootloop | Flash stock boot.img, try again |
| No root | Re-patch boot, check Magisk app |
| SafetyNet fails | Install SafetyNet fix module |
| Banking apps fail | Enable MagiskHide/DenyList |
| Module causes issues | Boot without modules (volume down) |

## SafetyNet/Play Integrity

```
To pass SafetyNet:
1. Install Magisk
2. Enable Zygisk
3. Install Play Integrity Fix module
4. Configure DenyList
5. Clear Google Play Services data
6. Reboot
```

## Related Skills

- `android-root-guide` - Comprehensive rooting guide
- `adb-login-tool` - ADB device management
- `ios-repair-tool` - iOS equivalent

## Repository Location

`C:\Users\user\.qwen\skills\magisk-root`

## Source

https://github.com/topjohnwu/Magisk

## Documentation

https://topjohnwu.github.io/Magisk/

---

**Note:** Magisk is the gold standard for Android rooting. Systemless approach means OTA updates work and root can be hidden from apps. Always backup before rooting!
