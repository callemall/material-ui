/* eslint-disable no-console */
const childProcess = require('child_process');
const fse = require('fs-extra');
const lodash = require('lodash');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

const workspaceRoot = path.join(__dirname, '../../');
const snapshotDestPath = path.join(workspaceRoot, 'size-snapshot.json');

/**
 * @param {object} snapshot snapshot generated by rollup-plugin-size-snapshot
 * @returns {object} size snapshot with the same format as a snapshot from size-limit
 */
function normalizeRollupSnapshot(snapshot) {
  return { parsed: snapshot.minified, gzip: snapshot.gzipped };
}

async function getRollupSize(snapshotPath) {
  const rollupSnapshot = await fse.readJSON(snapshotPath);

  return Object.entries(rollupSnapshot).map(([bundlePath, snapshot]) => [
    // path in the snapshot is relative the snapshot itself
    path.relative(workspaceRoot, path.join(path.dirname(snapshotPath), bundlePath)),
    normalizeRollupSnapshot(snapshot),
  ]);
}

/**
 * creates size snapshot for every bundle that built with webpack
 */
async function getWebpackSizes() {
  await fse.mkdirp(path.join(__dirname, 'build'));

  const configPath = path.join(__dirname, 'webpack.config.js');
  const statsPath = path.join(__dirname, 'build', 'stats.json');
  await exec(`webpack --config ${configPath} --json > ${statsPath}`);

  const stats = await fse.readJSON(statsPath);
  const assets = new Map(stats.assets.map(asset => [asset.name, asset]));

  return Object.entries(stats.assetsByChunkName).map(([chunkName, assetName]) => {
    const parsedSize = assets.get(assetName).size;
    const gzipSize = assets.get(`${assetName}.gz`).size;
    return [chunkName, { parsed: parsedSize, gzip: gzipSize }];
  });
}

// waiting for String.prototype.matchAll in node 10
function* matchAll(string, regex) {
  let match = null;
  do {
    match = regex.exec(string);
    if (match !== null) {
      yield match;
    }
  } while (match !== null);
}

/**
 * @param {string} n
 * @param {'B', 'kB' | 'mB' | 'gB' | 'tB' | 'pB'} unit
 */
function prettyBytesInverse(n, unit) {
  const metrixPrefix = unit.length < 2 ? '' : unit[0];
  const metricPrefixes = ['', 'k', 'm', 'g', 't', 'p'];
  const power = metricPrefixes.indexOf(metrixPrefix) * 3;
  if (power === -1) {
    throw new Error(
      `unrecognized metric prefix '${metrixPrefix}' in unit '${unit}'. only '${metricPrefixes.join(
        "', '",
      )}' are allowed`,
    );
  }
  return n * 10 ** power;
}

/**
 * parses output from next build to size snapshot format
 * @returns {[string, { gzip: number, files: number, packages: number }][]}
 */
async function getNextPagesSize() {
  const consoleOutput = await fse.readFile(path.join(__dirname, 'build/docs.next'), {
    encoding: 'utf8',
  });
  const pageRegex = /^(?<treeViewPresentation>┌|├|└)\s*(?<fileType>σ|⚡|)\s*(?<pageUrl>[^\s]+)\s*(?<sizeFormatted>[0-9.]+)\s*(?<sizeUnit>\w+)\s*(?<files>\d+)\s*(?<packages>\d+)/gm;

  // legacy ids
  const pageUrlIdMappings = {
    '/': 'docs.landing',
    _app: 'docs.main',
  };

  return Array.from(matchAll(consoleOutput, pageRegex), match => {
    const { pageUrl, sizeFormatted, sizeUnit, files, packages } = match.groups;

    const snapshotId = pageUrlIdMappings[pageUrl] || `docs-${pageUrl}`;

    return [
      snapshotId,
      {
        gzip: prettyBytesInverse(sizeFormatted, sizeUnit),
        parsed: Number.NaN,
        files: +files,
        packages: +packages,
      },
    ];
  });
}

async function run() {
  const rollupBundles = [path.join(workspaceRoot, 'packages/material-ui/size-snapshot.json')];

  const bundleSizes = lodash.fromPairs([
    ...(await getWebpackSizes()),
    ...lodash.flatten(await Promise.all(rollupBundles.map(getRollupSize))),
    ...(await getNextPagesSize()),
  ]);

  await fse.writeJSON(snapshotDestPath, bundleSizes, { spaces: 2 });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
