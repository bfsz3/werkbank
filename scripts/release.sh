#!/usr/bin/env bash
# Erstellt ein Werkbank-Release als Git-Tag, der das gebaute dist/ enthält.
#
#   scripts/release.sh 0.2.0
#
# Ablauf: Version in package.json auf main setzen und committen, bauen, dann einen
# losgelösten Release-Commit mit dist/ (ohne prepare-Skript) erzeugen und als v<version>
# taggen. main selbst enthält kein dist/. Gepusht wird nicht – das passiert danach mit
#   git push origin main v<version>
set -euo pipefail

version="${1:?Version angeben, z. B. scripts/release.sh 0.2.0}"
tag="v$version"
root="$(git rev-parse --show-toplevel)"
cd "$root"

[[ "$(git branch --show-current)" == "main" ]] || { echo "Release nur von main." >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo "Arbeitskopie ist nicht sauber." >&2; exit 1; }
git rev-parse -q --verify "refs/tags/$tag" >/dev/null && { echo "Tag $tag existiert schon." >&2; exit 1; }
grep -q "^## \[$version\]" CHANGELOG.md || { echo "CHANGELOG.md hat keinen Abschnitt ## [$version]." >&2; exit 1; }

# 1. Version auf main
node -e '
const fs = require("node:fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.version = process.argv[1];
fs.writeFileSync("package.json", JSON.stringify(pkg, null, "\t") + "\n");
' "$version"
if ! git diff --quiet package.json; then
	git commit -qm "Release $tag" package.json
fi

# 2. Prüfen und bauen
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build

# 3. Release-Commit mit dist/ in einem temporären Worktree
work="$(mktemp -d)"
trap 'git worktree remove --force "$work" >/dev/null 2>&1 || true' EXIT
git worktree add -q --detach "$work" HEAD
cp -R dist "$work/dist"
node -e '
const fs = require("node:fs");
const file = process.argv[1];
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
delete pkg.scripts.prepare; // Konsumenten installieren das fertige dist/, ohne Build-Skript
fs.writeFileSync(file, JSON.stringify(pkg, null, "\t") + "\n");
' "$work/package.json"
git -C "$work" add -f dist package.json
git -C "$work" commit -qm "Release $tag (gebautes dist/)"
git tag -a "$tag" -m "Werkbank $tag" "$(git -C "$work" rev-parse HEAD)"

echo "Fertig: $tag -> $(git rev-parse --short "$tag^{commit}")"
echo "Pushen mit: git push origin main $tag"
