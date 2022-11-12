import test from "ava";
import { createInMemoryIPFS } from "../src/index.js";


test("repo init", async t => {
  const ipfs = await createInMemoryIPFS();
  t.pass();
});


test("add + get block", async t => {
  const ipfs = await createInMemoryIPFS();

  const {cid} = await ipfs.add("abc");

  let data;

  for await (const chunk of ipfs.cat(cid)) {
    data = chunk;
  }

  t.is(new TextDecoder().decode(data), "abc");

});


test("no dupe named repos", async t => {
  const ipfs = await createInMemoryIPFS("named");

  try {
    await createInMemoryIPFS("named");
  } catch (e) {
    t.is(e.code, "ERR_LOCK_EXISTS");
    t.pass();
  }
});


