### js-ipfs-in-memory-repo

A small utility library to create an offline, all in-memory IPFS repo in Javascript.

The returned `ipfs` object should be compatible with the [core JS IPFS API](https://github.com/ipfs/js-ipfs/tree/master/docs/core-api),
for FILES, DAG, and OBJECT Apis, and possibly others.

```
import { createInMemoryIPFS } from "ipfs-in-memory-repo";

...

const ipfs = await createInMemoryIPFS();
```


An optional `name` can be passed to `createInMemoryIPFS()`, which will be used to prevent duplicate repos with same name.
By default, a random name is chosen.


