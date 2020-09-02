import createPhantomPool from 'phantom-pool';

export const pool = createPhantomPool({
  max: 20,
  // For all opts, see opts at https://github.com/coopernurse/node-pool#createpool
  phantomArgs: [
    ['--ignore-ssl-errors=true', '--disk-cache=true', '--load-images=true'],
  ], // arguments passed to phantomjs-node directly, default is `[]`. For all opts, see https://github.com/amir20/phantomjs-node#phantom-object-api
});
