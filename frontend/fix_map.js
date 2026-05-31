const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, 'src', 'components', 'Map.tsx');

const oldRepoMap = path.join(__dirname, '..', 'temp_caria_repo', 'client', 'src', 'components', 'Map.tsx');
if (fs.existsSync(oldRepoMap)) {
  let oldContent = fs.readFileSync(oldRepoMap, 'utf-8');
  // Add "use client";
  oldContent = '"use client";\n' + oldContent;
  // Fix imports
  oldContent = oldContent.replace(/from "\.\.\/hooks\/usePersistFn"/g, 'from "@/hooks/usePersistFn"');
  oldContent = oldContent.replace(/from "\.\/ui\//g, 'from "@/components/ui/');
  // Fix types
  oldContent = oldContent.replace(/google\?: typeof google;/g, 'google?: any;');
  // Fix env vars
  oldContent = oldContent.replace(/import\.meta\.env\.VITE_FRONTEND_FORGE_API_KEY/g, 'process.env.NEXT_PUBLIC_FORGE_API_KEY');
  oldContent = oldContent.replace(/import\.meta\.env\.VITE_FRONTEND_FORGE_API_URL/g, 'process.env.NEXT_PUBLIC_FORGE_API_URL');
  
  // Fix onMapReady null check
  oldContent = oldContent.replace(/if \(onMapReady\) {\s*onMapReady\(map\.current\);\s*}/g, 'if (onMapReady && map.current) {\n      onMapReady(map.current);\n    }');

  fs.writeFileSync(mapPath, oldContent, 'utf-8');
  console.log('Restored and fixed Map.tsx properly');
}
