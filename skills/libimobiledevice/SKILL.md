---
name: libimobiledevice
description: Use when communicating with iOS devices - cross-platform library for iOS device communication without iTunes
---

# libimobiledevice Skill - iOS Device Communication Library

## Purpose

This skill provides expertise in using libimobiledevice, a cross-platform library that enables communication with iOS devices (iPhone, iPad, iPod Touch) without requiring iTunes.

## When to Use

Use this skill when:
- Accessing iOS device data programmatically
- Backup/restore iOS devices
- Transfer files to/from iOS
- Access device information
- Install/uninstall iOS apps
- Debug iOS applications
- Build iOS management tools

## Key Features

### Capabilities

| Feature | Description |
|---------|-------------|
| **Device Info** | Query device details, UDID, version |
| **Backup/Restore** | Create and restore backups |
| **File Transfer** | Access app documents, media |
| **App Management** | Install, uninstall, list apps |
| **Screenshot** | Capture device screen |
| **Crash Reports** | Access crash logs |
| **Network** | WiFi pairing, port forwarding |
| **Syslog** | Real-time system logs |

### Tools Included

| Tool | Purpose |
|------|---------|
| `ideviceinfo` | Device information |
| `idevicebackup2` | Backup/restore |
| `ideviceinstaller` | App management |
| `ifuse` | Mount device filesystem |
| `idevicescreenshot` | Take screenshots |
| `idevicesyslog` | View system logs |
| `idevicecrashreport` | Get crash reports |
| `iproxy` | Port forwarding |

## Installation

### Linux (Ubuntu/Debian)

```bash
sudo apt-get install libimobiledevice-utils
```

### macOS (Homebrew)

```bash
brew install libimobiledevice
brew install ifuse
```

### Windows

Download pre-built binaries from:
- https://github.com/libimobiledevice/libimobiledevice/releases
- Or use iTunes drivers

### Build from Source

```bash
git clone https://github.com/libimobiledevice/libimobiledevice.git
cd libimobiledevice
./autogen.sh
make
sudo make install
```

## Usage Examples

### Device Information

```bash
# Get device info
ideviceinfo

# Get UDID
ideviceinfo -k UniqueDeviceID

# Get iOS version
ideviceinfo -k ProductVersion

# Get device name
ideviceinfo -k DeviceName
```

### Backup & Restore

```bash
# Create backup
idevicebackup2 backup /path/to/backup

# Restore backup
idevicebackup2 restore /path/to/backup

# Full restore (erase device)
idevicebackup2 restore --system /path/to/backup

# List backups
idevicebackup2 list
```

### App Management

```bash
# List installed apps
ideviceinstaller -l

# Install app
ideviceinstaller -i app.ipa

# Uninstall app
ideviceinstaller -d com.bundle.id

# Get app info
ideviceinstaller -i com.bundle.id
```

### File Access

```bash
# Mount filesystem (requires ifuse)
ifuse /mnt/iphone

# Access camera roll
ifuse --documents com.apple.camera /mnt/camera

# Unmount
fusermount -u /mnt/iphone
```

### Screenshots & Logs

```bash
# Take screenshot
idevicescreenshot screenshot.png

# View system logs
idevicesyslog

# Get crash reports
idevicecrashreport ./crashes
```

### Network

```bash
# Pair device
idevicepair pair

# Port forwarding (local:device)
iproxy 8080:80

# List network interfaces
ideviceinfo -k NetworkAddress
```

## For AI Assistants

When helping with iOS device operations:

1. **Trust computer** - User must trust on device
2. **USB connection** - Ensure proper cable/port
3. **Check pairing** - `idevicepair validate`
4. **Backup first** - Before any operations
5. **Handle errors** - Common connection issues

## Common Issues

| Issue | Solution |
|-------|----------|
| Device not detected | Reconnect, trust computer |
| Permission denied | Add user to plugdev group |
| Pairing failed | Unpair and re-pair |
| Backup fails | Check storage space |
| App install fails | Verify IPA is valid |

## Programming Integration

### Python Example

```python
import subprocess

# Get device info
result = subprocess.run(['ideviceinfo'], capture_output=True)
print(result.stdout.decode())

# Take screenshot
subprocess.run(['idevicescreenshot', 'screen.png'])
```

### Node.js Example

```javascript
const { execSync } = require('child_process');

const deviceInfo = execSync('ideviceinfo').toString();
console.log(deviceInfo);
```

## Related Skills

- `ios-repair-tool` - iOS firmware restore
- `appium-automation` - iOS app automation
- `adb-login-tool` - Android equivalent

## Repository Location

`C:\Users\user\.qwen\skills\libimobiledevice`

## Source

https://github.com/libimobiledevice/libimobiledevice

---

**Note:** libimobiledevice is essential for iOS device management on Linux/macOS without iTunes. Works with most iOS versions.
