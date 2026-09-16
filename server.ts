import express from "express";
import { createServer as createViteServer } from "vite";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/bots/status", (req, res) => {
    // Run systemctl command
    exec("systemctl --user is-active openclaw-gateway-*", (error, stdout, stderr) => {
      // If it fails (e.g. not running on the actual server), return a mock or the error
      if (error) {
        return res.json({ 
          success: false, 
          error: error.message, 
          stderr, 
          stdout,
          mock: true,
          data: {
            "openclaw-gateway-boss": "active",
            "openclaw-gateway-lhb-bizbot": "active",
            "openclaw-gateway-lhb-finbot": "active",
            "openclaw-gateway-lhb-whbot": "active",
            "openclaw-gateway-lhb-procbot": "active",
            "openclaw-gateway-lhb-hrbot": "active",
            "openclaw-gateway-lhb-engbot": "active",
            "openclaw-gateway-lhb-csmbot": "active",
            "openclaw-gateway-lhb-adminbot": "active",
            "openclaw-gateway-lhb-mgmtbot": "active"
          }
        });
      }
      
      // Parse stdout if successful
      // Assuming stdout is a list of statuses separated by newlines
      const statuses = stdout.split('\n').filter(Boolean);
      res.json({ success: true, data: statuses });
    });
  });

  app.get("/api/data/inventory", async (req, res) => {
    try {
      const content = await fs.readFile("/root/workspace-boss/company/Warehouse/inventory.md", "utf-8");
      res.json({ success: true, content });
    } catch (e) {
      res.json({ 
        success: false, 
        error: String(e),
        mock: true,
        content: "# Inventory\n- Steel Beams: 150 tons\n- Cement: 500 bags\n- Bricks: 10,000 pcs\n- Heavy Machinery: 5 units active"
      });
    }
  });

  app.get("/api/data/receivables", async (req, res) => {
    try {
      const content = await fs.readFile("/root/workspace-boss/company/CFO/receivables.md", "utf-8");
      res.json({ success: true, content });
    } catch (e) {
      res.json({ 
        success: false, 
        error: String(e),
        mock: true,
        content: "# Receivables\n- Project Alpha: $450,000 (Due 30 days)\n- Project Beta: $200,000 (Overdue)\n- City Mall: $550,000 (Due 15 days)\n\n**Total: $1.2M**"
      });
    }
  });

  app.get("/api/data/projects", async (req, res) => {
    try {
      const content = await fs.readFile("/root/workspace-boss/company/Business/opportunities.md", "utf-8");
      res.json({ success: true, content });
    } catch (e) {
      res.json({ 
        success: false, 
        error: String(e),
        mock: true,
        content: "# Active Projects\n1. Project Alpha - Foundation phase\n2. Project Beta - Structural phase\n3. City Mall - Finishing phase\n4. Highway Extension - Planning\n5. River Bridge - Bidding\n6. Metro Station - Excavation\n7. Airport Terminal - Design\n8. Tech Park - Handover"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
