---
name: ios-repair-tool
description: Use when restoring/upgrading iOS firmware - command-line tool to restore IPSW firmware to iOS devices
---

# iOS Repair Tool (idevicerestore) Skill

## Purpose

This skill provides expertise in using idevicerestore, a command-line application to restore or upgrade firmware files to iOS devices using official IPSW firmware archives.

## When to Use

Use this skill when:
- Restoring iOS firmware
- Upgrading iOS version manually
- Downgrading iOS (if signed)
- Unbricking iOS devices
- Installing custom firmware
- Device recovery mode operations

## Key Features

### Capabilities

| Feature | Description |
|---------|-------------|
| **Restore Firmware** | Full restore with data erase |
| **Update** | Update preserving content |
| **DFU Mode** | Support for DFU recovery |
| **Recovery Mode** | Recovery mode operations |
| **SHSH Blobs** | Custom firmware support with blobs |
| **Multiple Devices** | iPhone, iPad, iPod Touch |

### Supported Modes

- **Normal Mode** - Standard restore/update
- **Recovery Mode** - Device recovery
- **DFU Mode** - Deep firmware restore
- **Recovery Mode Custom** - Custom IPSW restore

## Requirements

### Dependencies

- libimobiledevice
- libplist
- libusb
- curl
- libzip

### Installation (Linux/macOS)

```bash
# Ubuntu/Debian
sudo apt-get install idevicerestore

# macOS (Homebrew)
brew install idevicerestore

# Build from source
git clone https://github.com/libimobiledevice/idevicerestore.git
cd idevicerestore
./autogen.sh
make
sudo make install
```

## Usage

### Basic Commands

```bash
# Show help
idevicerestore --help

# List device info
idevicerestore -i

# Update device (preserve data)
idevicerestore -u

# Restore device (erase all)
idevicerestore -r

# Restore with custom IPSW
idevicerestore -r custom.ipsw

# Boot device
idevicerestore -b

# Exit recovery mode
idevicerestore -e
```

### Command Options

| Option | Description |
|--------|-------------|
| `-i, --info` | Show device info |
| `-u, --update` | Update device (keep data) |
| `-r, --restore` | Restore device (erase) |
| `-e, --exit` | Exit recovery mode |
| `-b, --boot` | Boot device |
| `-c, --latest` | Use latest firmware |
| `-w, --erase` | Erase all content |
| `--no-action` | Don't restore, just download |

## Restore Process

```
1. Download IPSW firmware
2. Verify firmware signature
3. Enter recovery/DFU mode
4. Upload firmware components:
   - iBSS (Bootloader)
   - iBEC (Bootloader)
   - Kernel
   - Device Tree
   - Ramdisk
   - OS
5. Verify and boot
```

## For AI Assistants

When helping with iOS repair:

1. **Identify device** - Model, iOS version, ECID
2. **Check signing status** - Is firmware still signed?
3. **Backup first** - iTunes/iCloud backup
4. **Download correct IPSW** - Match device model
5. **Follow restore process** - Don't interrupt

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Device not detected | Check USB cable, reinstall drivers |
| Error 3194 | DNS issues, modify hosts file |
| Error 4013 | Hardware issue, try different cable |
| Stuck on Apple logo | Force restart, try DFU mode |
| Recovery loop | Exit recovery mode, restore again |

## Related Skills

- `libimobiledevice` - iOS device communication library
- `magisk-root` - Android rooting alternative
- `android-root-guide` - Android rooting guide

## Repository Location

`C:\Users\user\.qwen\skills\ios-repair-tool`

## Source

https://github.com/libimobiledevice/idevicerestore

---

**Note:** idevicerestore is a powerful tool for iOS firmware management. Always backup before restoring and ensure firmware is still being signed by Apple.
