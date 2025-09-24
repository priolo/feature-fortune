import express from "express";
import cors from "cors";
import { OAuthApp } from "@octokit/oauth-app";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // FE su Vite

// Check required environment variables
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
	console.error("❌ Missing required environment variables:");
	console.error("   GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID ? "✅ Set" : "❌ Missing");
	console.error("   GITHUB_CLIENT_SECRET:", process.env.GITHUB_CLIENT_SECRET ? "✅ Set" : "❌ Missing");
	console.error("\n📝 Please create a .env file with your GitHub OAuth app credentials.");
	console.error("   See .env.example for the required format.");
	process.exit(1);
}

// Configurazione OAuthApp
const githubOAuth = new OAuthApp({
	clientType: "oauth-app",
	clientId: process.env.GITHUB_CLIENT_ID!,
	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

// 1. Login → redirect verso GitHub
app.get("/api/auth/github/login", (req, res) => {
	const url = githubOAuth.getWebFlowAuthorizationUrl({
		scopes: ["read:user", "user:email"],
	});
	console.log("Redirecting to GitHub OAuth:", url.url);
	res.json({ url: url.url })
});

// 2. Callback → GitHub ritorna con `code`
app.get("/api/auth/github/callback", async (req, res) => {
	const code = req.query.code as string;
	const error = req.query.error as string;

	// Check if GitHub returned an error
	if (error) {
		console.error("GitHub OAuth error:", error);
		return res.status(400).json({ error: `GitHub OAuth error: ${error}` });
	}

	// Check if code is present
	if (!code) {
		console.error("No authorization code received");
		return res.status(400).json({ error: "No authorization code received" });
	}

	try {
		console.log("Attempting to exchange code for token...");
		const { authentication } = await githubOAuth.createToken({ code });
		console.log("Token exchange successful");

		// Recupera info utente con Bearer token (more modern approach)
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${authentication.token}`,
				"User-Agent": "feature-fortune-app",
				"Accept": "application/vnd.github.v3+json"
			},
		});

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
		}

		const user:any = await response.json();
		console.log("User info retrieved successfully");

		// In produzione → salva token in sessione o cookie httpOnly
		// Redirect to frontend with token and user info as query parameters
		const redirectUrl = new URL("http://localhost:5173/app/register");
		redirectUrl.searchParams.set("token", authentication.token);
		redirectUrl.searchParams.set("user", user.id);
		
		res.redirect(redirectUrl.toString());


	} catch (err) {
		console.error("Authentication error:", err);

		// More detailed error response
		if (err instanceof Error) {
			res.status(400).json({
				error: "Authentication failed",
				details: err.message,
				// Don't expose sensitive details in production
				...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
			});
		} else {
			res.status(400).json({ error: "Authentication failed", details: "Unknown error" });
		}
	}
});

app.listen(3000, () => console.log("✅ Backend on http://localhost:3000"));
