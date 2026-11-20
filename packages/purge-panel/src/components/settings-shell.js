// UI derived from YuJunZhiXue/dsh-purge 1.1.71 (MIT). See LICENSE.
import { h, useState, useEffect } from "../shared/react.js";
import { setTranslate, useT } from "../shared/locale.js";
import { apiJson } from "../api/client.js";
import { PURGE_CSS, NATIVE_CSS } from "../styles/index.js";
import { Btn } from "./primitives.js";
import { PurgifySection } from "./settings-form.js";

export function compatibilityLevelText(t, level) {
  const key = "compat.level." + (level || "unknown");
  const hit = t(key);
  return hit && hit !== key ? hit : level || t("unknown");
}

/**
 * 社区版兼容提示：读取后端 /dsh-purge/community 报告的宿主版本与兼容级别。
 * 原版 1.1.71 的 CompatibilityNote 只对官方接口版本告警；这里换成本 fork
 * 真实的宿主版本/兼容级别，且永远渲染（不再无条件 return null）。
 */
export function CommunityCompatibilityNote() {
  const t = useT();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiJson("/dsh-purge/community")
      .then((d) => {
        if (d && d.ok !== false) setInfo(d);
        else setError((d && d.error) || "bad response");
      })
      .catch((e) => setError((e && e.message) || String(e)));
  }, []);
  const compat = (info && info.compatibility) || null;
  const host = (compat && compat.host_version) || "unknown";
  const text = compat
    ? t("compat.host", {
        version: info && info.version ? info.version : "—",
        host,
        level: compatibilityLevelText(t, compat.level),
      })
    : error
      ? t("compat.unavailable", { error })
      : t("compat.loading");
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" },
    },
    text,
    compat && compat.message ? " " + compat.message : "",
  );
}

export function SettingsRoot(props = {}) {
  const t = typeof props.t === "function" ? props.t : useT();
  const [page, setPage] = useState("status");
  const [visited, setVisited] = useState({ status: true });
  const select = (id) => {
    setPage(id);
    setVisited((v) => ({ ...v, [id]: true }));
  };
  setTranslate(t);
  return h(
    "div",
    { className: "dshpp-native dshpp-root" },
    h("style", null, PURGE_CSS + NATIVE_CSS),
    h(
      "header",
      { className: "dshpp-native-head" },
      h("div", null, h("h2", null, "Ungate"), h("p", null, "插件设置")),
      h(
        "span",
        { className: "dshpp-native-badge" },
        "Ungate " + __PANEL_VERSION__,
      ),
    ),
    h(CommunityCompatibilityNote),
    h(
      "nav",
      { className: "dshpp-native-nav", "aria-label": "Ungate 设置分类" },
      [
        ["status", "状态"],
        ["prompt", "提示词"],
        ["more", "更多"],
      ].map(([id, label]) =>
        h(
          "button",
          {
            key: id,
            type: "button",
            "aria-pressed": page === id,
            onClick: () => select(id),
          },
          label,
        ),
      ),
    ),
    h(
      "div",
      { className: "dshpp-native-content" },
      h(
        "div",
        { hidden: !["status", "prompt", "more"].includes(page) },
        h(PurgifySection, { page }),
      ),
      h(
        "div",
        { hidden: page !== "more", className: "dshpp-more" },
        h(
          "p",
          { className: "dshpp-attribution" },
          "基于 YuJunZhiXue/dsh-purge 1.1.71（MIT）；更新仅来自本 fork，本 fork 独立维护并保留原作者署名。",
        ),
      ),
    ),
  );
}
