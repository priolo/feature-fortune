# i18next Integration Guide

This project uses **i18next** and **react-i18next** for internationalization (i18n).

## 📁 File Structure

```
src/
├── plugins/
│   ├── i18n.ts                      # i18n configuration
│   └── i18n.usage.example.tsx       # Usage examples
├── locales/
│   └── en.json                      # English translations
└── types/
    └── i18next.d.ts                 # TypeScript type definitions
```

## 🚀 Setup

The i18n service is automatically initialized in `src/main.tsx`:

```tsx
import './plugins/i18n' // Initialize i18n before App
```

## 📝 Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('feature.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### With Interpolation

Add to your `en.json`:
```json
{
  "welcome": "Welcome, {{name}}!"
}
```

Use in component:
```tsx
<p>{t('welcome', { name: 'John' })}</p>
```

### Change Language

```tsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <button onClick={() => i18n.changeLanguage('en')}>
      English
    </button>
  );
}
```

### With Material-UI

```tsx
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';

function MuiComponent() {
  const { t } = useTranslation();
  
  return (
    <>
      <Button variant="contained">{t('common.save')}</Button>
      <TextField label={t('auth.email')} />
    </>
  );
}
```

## 🌍 Adding New Languages

1. Create a new JSON file in `src/locales/` (e.g., `it.json` for Italian)
2. Add translations following the same structure as `en.json`
3. Import and add to resources in `src/plugins/i18n.ts`:

```typescript
import it from "../locales/it.json";

export const resources = {
  en: { translation: en },
  it: { translation: it }  // Add new language
} as const;
```

## 📚 Translation Keys Structure

Current translation structure in `en.json`:

- `common.*` - Common UI elements (save, cancel, delete, etc.)
- `auth.*` - Authentication related
- `feature.*` - Feature pages
- `account.*` - Account pages
- `comment.*` - Comment functionality
- `funding.*` - Funding functionality

## 🔧 Configuration

The i18n configuration is in `src/plugins/i18n.ts`:

```typescript
i18n
  .use(initReactI18next)
  .init({
    resources,
    debug: import.meta.env.DEV,  // Debug only in development
    lng: "en",                   // Default language
    fallbackLng: "en",           // Fallback language
    interpolation: {
      escapeValue: false         // React already protects from XSS
    }
  });
```

## 💡 Best Practices

1. **Organize keys hierarchically** - Group related translations (e.g., `auth.login`, `auth.logout`)
2. **Use descriptive keys** - `feature.title` is better than `title1`
3. **Keep translations flat** - Avoid deep nesting (max 2-3 levels)
4. **Use interpolation** - For dynamic content like names, numbers
5. **Provide context** - Use different keys for words with different meanings

## 🔍 Type Safety

TypeScript types are configured in `src/types/i18next.d.ts`. The current setup allows flexible key usage without strict type checking, which is practical for rapid development.

For stricter type safety, you can enable typed keys by modifying the type definition file.

## 📖 More Information

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
