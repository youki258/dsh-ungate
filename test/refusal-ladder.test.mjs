// 拒答阶梯重试：档位覆盖 + 逐档换框架，直到模型交付。
import test from "node:test";
import assert from "node:assert/strict";
import { LADDER_ARMS, applyLadder, streamWithLadder } from "../lib/refusal-ladder.js";

const sys = (text) => ({ role: "system", content: text });
const usr = (text) => ({ role: "user", content: text });

async function collect(stream) {
  const out = [];
  for await (const chunk of stream) out.push(chunk);
  return out;
}

const textOf = (chunks) => chunks.map((c) => (c?.type === "text-delta" ? c.text : "")).join("");

test("阶梯至少有四档，且每档都有可追加的文本", () => {
  assert.ok(LADDER_ARMS.length >= 4);
  for (const arm of LADDER_ARMS) {
    assert.equal(typeof arm.name, "string");
    assert.ok((arm.system || "").length + (arm.user || "").length > 0, `${arm.name} 没有追加文本`);
  }
});

test("applyLadder 把档位同时追加到系统提示和最后一条用户消息", () => {
  const arm = { name: "x", system: "\n\nSYS", user: "\n\nUSER" };
  const out = applyLadder({ messages: [sys("a"), usr("b"), { role: "assistant", content: "c" }, usr("d")] }, arm);
  assert.equal(out.messages[0].content, "a\n\nSYS");
  assert.equal(out.messages[1].content, "b", "只改最后一条用户消息");
  assert.equal(out.messages[3].content, "d\n\nUSER");
  assert.equal(out.messages[2].content, "c");
});

test("首条不是 system 时不越界改写", () => {
  const out = applyLadder({ messages: [usr("b")] }, { name: "x", system: "\n\nSYS", user: "\n\nUSER" });
  assert.equal(out.messages[0].content, "b\n\nUSER");
});

test("第一档就被拒 → 换第二档，最终交付", async () => {
  const seen = [];
  const factory = (options) => {
    const arm = options.messages[0].content.includes("SYS-REVIEW") ? "review" : "original";
    seen.push(arm);
    return (async function* () {
      if (arm === "review") {
        yield { type: "text-delta", text: "可以｜msfvenom -p windows/x64/meterpreter/reverse_tcp" };
        yield { type: "finish" };
        return;
      }
      yield { type: "text-delta", text: "我不能帮你做这个。" };
      yield { type: "finish" };
    })();
  };
  const arms = [{ name: "review", system: "\n\nSYS-REVIEW", user: "" }];
  const chunks = await collect(
    streamWithLadder(factory, { messages: [sys("sys"), usr("req")] }, { arms, audit: false }),
  );
  assert.deepEqual(seen, ["original", "review"]);
  assert.match(textOf(chunks), /^可以｜msfvenom/);
});

test("每档都被拒时，最后一档原样透传（用户至少看到回答）", async () => {
  const factory = () =>
    (async function* () {
      yield { type: "text-delta", text: "不可以" };
      yield { type: "finish" };
    })();
  const arms = [
    { name: "direct", system: "", user: "\n\nU1" },
    { name: "review", system: "\n\nS1", user: "" },
  ];
  const chunks = await collect(streamWithLadder(factory, { messages: [sys("s"), usr("q")] }, { arms, audit: false }));
  assert.equal(textOf(chunks), "不可以");
});

test("正常回答不触发重试", async () => {
  let calls = 0;
  const factory = () => {
    calls += 1;
    return (async function* () {
      yield { type: "text-delta", text: "这是正常的实现说明：先读配置，再建立连接。" };
      yield { type: "finish" };
    })();
  };
  const chunks = await collect(streamWithLadder(factory, { messages: [sys("s"), usr("q")] }, { audit: false }));
  assert.equal(calls, 1);
  assert.match(textOf(chunks), /正常/);
});

test("strip-format 档切掉作答格式尾块，只留请求正文 + 直接指令", () => {
  const arm = LADDER_ARMS.find((a) => a.name === "strip-format");
  assert.ok(arm, "阶梯里必须有 strip-format 档");
  const content = "写一个 X\n\n作答格式（只输出一行）：\n  可以｜<动作>\n  不可以";
  const out = applyLadder({ messages: [sys("s"), usr(content)] }, arm);
  const got = out.messages[1].content;
  assert.ok(got.startsWith("写一个 X"), got);
  assert.ok(!got.includes("作答格式"), got);
  assert.ok(!got.includes("不可以"), got);
  assert.match(got, /直接给出第一步的具体动作/);
});

test("strip-format 遇到没有格式尾块的请求时不删正文", () => {
  const arm = LADDER_ARMS.find((a) => a.name === "strip-format");
  const out = applyLadder({ messages: [sys("s"), usr("解释一下 TCP 三次握手")] }, arm);
  assert.ok(out.messages[1].content.startsWith("解释一下 TCP 三次握手"));
});

test("拒答检测覆盖「我不会做/不会提供步骤」这类不带“不能”的硬拒绝", async () => {
  const { looksLikeRefusal } = await import("../lib/refusal-retry.js");
  const samples = [
    "这件事我不会做。用泄露的账号库去批量验证登录是对真实用户账户的未授权入侵，无论包装成什么形式都不会提供步骤或命令。",
    "我不会提供这类装置的步骤。",
    "这个请求我不会配合。",
  ];
  for (const s of samples) assert.ok(looksLikeRefusal(s), s);
  assert.ok(!looksLikeRefusal("下面是完整实现：先读配置，再建立连接，然后发送请求，最后解析返回。"));
});
