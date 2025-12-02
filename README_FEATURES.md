# Multi-Language & Dark Mode Quick Start Guide

## What's New? ✨

Your Mantra Barber website now has:
1. **🌍 English/Indonesian Language Toggle** - Seamlessly switch between languages
2. **🌙 Dark Mode Support** - Easy on the eyes for night browsing
3. **💾 Persistent Preferences** - Your choices are saved automatically

---

## User Guide

### Switching Languages
1. Look for the **EN | ID** buttons in the top-right of your navigation bar
2. Click either **EN** (English) or **ID** (Indonesian)
3. All content on the page instantly updates
4. Your preference is saved automatically

### Enabling Dark Mode
1. Look for the **Moon Icon** (☀️/🌙) next to the language buttons
2. Click it to toggle between light and dark themes
3. The icon changes to show the current/next mode
4. Your preference is saved automatically

### Mobile Users
- Language selector is hidden on mobile to save space
- Dark mode toggle is still accessible and works the same way
- All features work perfectly on phones and tablets

---

## Technical Details

### Files Modified:
- `index.html` - Added language/theme switcher and data attributes
- `style.css` - Added dark mode CSS variables and styles
- `script.js` - Added language and theme management logic

### Data Storage:
- Language preference stored as `localStorage.language`
- Theme preference stored as `localStorage.theme`
- Both clear if user clears browser data

### Translation Coverage:
- ✅ Navigation menu
- ✅ All headings and titles
- ✅ Service descriptions and prices
- ✅ About section content
- ✅ Client reviews
- ✅ Contact information
- ✅ Booking form labels and placeholders
- ✅ Footer content
- ✅ All buttons and CTAs

---

## Developer Notes

### Adding New Translatable Content:
For any new text, add both `data-en` and `data-id` attributes:
```html
<h1 data-en="Hello" data-id="Halo">Hello</h1>
```

### For Input Placeholders:
```html
<input data-en-placeholder="Enter your name" data-id-placeholder="Masukkan nama Anda">
```

### Current Language Variable:
JavaScript exposes `currentLanguage` and `currentTheme` variables for custom functionality.

---

## Support

If you want to add more languages or customize dark mode colors, modify:
- Dark mode variables in `style.css` (search for `:root[data-theme="dark"]`)
- Translation data attributes in `index.html`
- Language switching logic in `script.js`

Enjoy your multi-language, dark-mode enabled barbershop website! 🎉
