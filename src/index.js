import { createRepo as createBaseRepo } from "ipfs-repo";

import { MemoryLock } from "ipfs-repo/locks/memory";
import { MemoryDatastore } from "datastore-core";
import { MemoryBlockstore } from "blockstore-core";

import * as dagPb from "@ipld/dag-pb";
import * as dagCbor from "@ipld/dag-cbor";
import * as raw from "multiformats/codecs/raw";
import * as IPFS from "ipfs-core";

// multiformat codecs to support
const codecs = [dagPb, dagCbor, raw].reduce((acc, curr) => {
  acc[curr.name] = curr;
  acc[curr.code] = curr;
  return acc;
}, {});

// Create IPFS Client with in-memory repo
export async function createInMemoryIPFS(name) {
  return await IPFS.create(await createInMemoryRepo(name));
}

// Create in memory repo
export async function createInMemoryRepo(name) {
  name = name || Math.random().toString(36).slice(2, 8);
  const loadCodec = (nameOrCode) => {
    if (codecs[nameOrCode]) {
      return codecs[nameOrCode];
    }

    throw new Error(`Could not load codec for ${nameOrCode}`);
  };

  const repo = createBaseRepo(
    name,
    loadCodec,
    {
      root: new MemoryDatastore(),

      blocks: new MemoryBlockstore(),

      keys: new MemoryDatastore(),
      datastore: new MemoryDatastore(),
      pins: new MemoryDatastore(),
    },
    {
      lock: MemoryLock,
      autoMigrate: false,
      repoOwner: true,
    }
  );

  return {
    repo,
    init: {
      emptyRepo: true,
      privateKey:
        "CAESQEQh005HaHeDzbnAkjryrcNJSkUakq/yx6HTIS6OpgATcwTxOtfrp2I6clTqVdDMMTRC9JUua/xUp+ZmGDd8EVo=",
    },

    offline: true,
    start: false,

    config: {
      Bootstrap: [],
    },

    libp2p: {
      nat: {
        enabled: false,
      },
    },
  };
}
