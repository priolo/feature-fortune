import fs from "node:fs/promises";
import path from "path";


let authEmailCodeTemplateCached: string | null = null;

export async function getEmailCodeTemplate(
	values: Record<string, string>, 
	tmpPath: string = "templates/email/code.html"
): Promise<string> {

	let template: string = null;
	if (authEmailCodeTemplateCached) {
		template = authEmailCodeTemplateCached;
	} else {
		const templatePath = path.resolve(process.cwd(), tmpPath);
		template = await fs.readFile(templatePath, "utf-8");
	}

	// Replace all {{var}} placeholders in the template
	return template.replace(/{{(\w+)}}/g, (_, key) => values[key] || "");

}
