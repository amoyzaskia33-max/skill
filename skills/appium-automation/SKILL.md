---
name: appium-automation
description: Use when automating mobile app testing for iOS and Android - cross-platform mobile UI automation framework
---

# Appium Automation Skill - Mobile App Testing

## Purpose

This skill provides expertise in using Appium, an open-source cross-platform mobile UI automation framework that supports iOS, Android, and Windows apps.

## When to Use

Use this skill when:
- Automating mobile app testing
- Testing both iOS and Android apps
- Need cross-platform automation
- Implementing CI/CD for mobile apps
- Testing native, hybrid, or mobile web apps
- Using multiple programming languages

## Key Features

### Platform Support

| Platform | Support |
|----------|---------|
| **iOS** | Native apps, Safari, hybrid apps |
| **Android** | Native apps, Chrome, hybrid apps |
| **Windows** | Windows desktop apps |
| **Mac** | Mac desktop apps |

### Language Support

- Java
- Python
- JavaScript/TypeScript
- Ruby
- PHP
- C#
- Robot Framework

## Architecture

```
┌─────────────────────────────────────┐
│         Your Test Code              │
│    (Java, Python, JS, etc.)         │
├─────────────────────────────────────┤
│         Appium Client Library       │
├─────────────────────────────────────┤
│         Appium Server               │
├──────────────┬──────────────────────┤
│   UIAutomator2    │    XCUITest     │
│    (Android)      │     (iOS)       │
└─────────────────┴───────────────────┘
```

## Installation

```bash
# Install Appium 2.x
npm install -g appium

# Install drivers
appium driver install xcuitest    # iOS
appium driver install uiautomator2 # Android

# Install Appium client for your language
npm install webdriverio          # JavaScript
pip install Appium-Python-Client # Python
```

## Quick Start

### Basic Test Example

```javascript
// JavaScript (WebDriverIO)
const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'iOS',
  'appium:deviceName': 'iPhone 15',
  'appium:platformVersion': '17.0',
  'appium:app': '/path/to/app.app'
};

const driver = await remote({ capabilities });
const element = await driver.$('~login_button');
await element.click();
```

### Python Example

```python
from appium import webdriver
from appium.options.ios import XCUITestOptions

options = XCUITestOptions()
options.device_name = 'iPhone 15'
options.app = '/path/to/app.app'

driver = webdriver.Remote('http://localhost:4723', options)
driver.find_element('accessibility id', 'login_button').click()
```

## Common Commands

### Element Interaction

```javascript
// Find element
const el = await driver.$('~element_id');

// Click
await el.click();

// Send text
await el.setValue('Hello World');

// Get text
const text = await el.getText();

// Swipe
await driver.performTouchAction([
  { action: 'press', options: { x: 100, y: 500 } },
  { action: 'moveTo', options: { x: 100, y: 200 } },
  { action: 'release' }
]);
```

### Wait Strategies

```javascript
// Explicit wait
await driver.waitUntil(
  async () => await driver.$('~element').isDisplayed(),
  { timeout: 10000 }
);

// Implicit wait
driver.setTimeout({ implicit: 5000 });
```

## For AI Assistants

When helping with Appium automation:

1. **Setup environment** - Install Appium, drivers, SDKs
2. **Configure capabilities** - Platform-specific settings
3. **Locator strategy** - Accessibility ID, XPath, etc.
4. **Handle waits** - Explicit vs implicit waits
5. **Parallel execution** - Selenium Grid or Appium Grid

## Best Practices

- **Use accessibility IDs** - Most reliable locator
- **Page Object Model** - Maintainable test structure
- **Explicit waits** - More reliable than sleeps
- **Parallel tests** - Faster execution
- **Cloud testing** - BrowserStack, Sauce Labs, LambdaTest

## Related Skills

- `adb-login-tool` - Android ADB automation
- `browser-use` - Browser automation
- `fe-interview-questions` - Testing interview questions

## Repository Location

`C:\Users\user\.qwen\skills\appium-automation`

## Source

https://github.com/appium/appium

## Documentation

https://appium.io/docs

---

**Note:** Appium is the industry standard for mobile automation. Write tests once, run on both iOS and Android with the same API.
