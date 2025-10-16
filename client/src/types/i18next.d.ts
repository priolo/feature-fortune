import "i18next";

// Disable strict typing for i18next to allow flexible key usage
declare module "i18next" {
	interface CustomTypeOptions {
		returnNull: false;
	}
}
