/**
 * Example of how to use i18next translations in your components
 * 
 * This file demonstrates different ways to use the translation hook
 * and can be used as a reference when implementing translations.
 */

import { useTranslation } from 'react-i18next';

// Example 1: Basic usage
export function BasicExample() {
	const { t } = useTranslation();
	
	return (
		<div>
			<h1>{t('feature.title')}</h1>
			<button>{t('common.save')}</button>
		</div>
	);
}

// Example 2: With interpolation
export function InterpolationExample() {
	const { t } = useTranslation();
	
	return (
		<div>
			{/* Add to en.json: "welcome": "Welcome, {{name}}!" */}
			{/* <p>{t('welcome', { name: 'John' })}</p> */}
		</div>
	);
}

// Example 3: Using t function in event handlers
export function EventHandlerExample() {
	const { t } = useTranslation();
	
	const handleClick = () => {
		alert(t('common.success'));
	};
	
	return <button onClick={handleClick}>{t('common.save')}</button>;
}

// Example 4: Changing language
export function LanguageSwitcher() {
	const { i18n } = useTranslation();
	
	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};
	
	return (
		<div>
			<button onClick={() => changeLanguage('en')}>English</button>
			{/* Add more languages as needed */}
		</div>
	);
}

// Example 5: Using translation in Material-UI components
export function MuiExample() {
	const { t } = useTranslation();
	
	return (
		<>
			{/* <Button variant="contained">{t('common.save')}</Button> */}
			{/* <TextField label={t('auth.email')} /> */}
		</>
	);
}
