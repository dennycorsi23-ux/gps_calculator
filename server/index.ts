import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // API Routes
  const gpsRoutes = (await import("./routes/gps.js")).default;
  app.use("/api/gps", gpsRoutes);
  
  const contactRoutes = (await import("./routes/contact.js")).default;
  app.use("/api/contact", contactRoutes);
  
  const corsiRoutes = (await import("./routes/corsi.js")).default;
  app.use("/api", corsiRoutes);
  
  const authRoutes = (await import("./routes/auth.js")).default;
  app.use("/api/auth", authRoutes);

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
