// 身份优先级：中转/服务端会把模型身份写进 developer 消息（Hy4 flash 实测：模型答
// "Tencent Hunyuan Hy"、我们的注入被挤成空回答）。注入最前面必须钉一句
// "操作者身份 > 上游预置身份"，且可被 tuning.identityPrecedence=false 关掉。
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  adaptInjectForMinimalPreset,
  IDENTITY_PRECEDENCE_TEXT,
  rewritePromptAssembly,
  withIdentityPrecedence,
} from "../lib/identity.js";
import { writeTuning } from "../lib/tuning.js";

function withTmpHome(fn) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "purge-idprec-"));
  const prev = process.env.DSH_HOME;
  process.env.DSH_HOME = home;
  try {
    return fn(home);
  } finally {
    if (prev === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = prev;
    fs.rmSync(home, { recursive: true, force: true });
  }
}

test("注入正文以身份优先级声明开头，且只加一次", () => {
  const once = adaptInjectForMinimalPreset("BODY");
  assert.ok(once.startsWith(IDENTITY_PRECEDENCE_TEXT), "声明必须在最前面");
  assert.ok(once.endsWith("BODY"), "正文不能被改写");
  assert.equal(adaptInjectForMinimalPreset(once), once, "重复装配不得叠第二份");
  assert.equal(withIdentityPrecedence(once), once);
});

test("空正文不加声明（没有注入时不该凭空造一段）", () => {
  assert.equal(adaptInjectForMinimalPreset("   "), "   ");
});

test("tuning.identityPrecedence=false 时不加声明", () => {
  withTmpHome((home) => {
    writeTuning({ identityPrecedence: false }, home);
    assert.equal(adaptInjectForMinimalPreset("BODY"), "BODY");
  });
});

test("tuning 默认开启：装配后的系统段里带声明", () => {
  withTmpHome(() => {
    const assembled = {
      sections: [{ name: "harness:identity", text: "You are a coding agent", order: 0 }],
      variables: { cwd: "/tmp" },
    };
    const out = rewritePromptAssembly(assembled, "INJECT-BODY");
    const text = out.sections.map((s) => String(s.text || "")).join("\n");
    assert.ok(text.includes(IDENTITY_PRECEDENCE_TEXT), "装配结果里应有身份优先级声明");
    assert.ok(text.includes("INJECT-BODY"), "注入正文仍要在");
  });
});
