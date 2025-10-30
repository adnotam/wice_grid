import path from 'path';
import coffeeScriptPlugin from 'esbuild-coffeescript';
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ["app/assets/javascripts/bundle.js"],
  bundle: true,
  outfile: "vendor/assets/javascripts/wice_grid.js",
  plugins: [coffeeScriptPlugin()],
}).catch(() => process.exit(1));