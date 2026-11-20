// Generated from src/ by npm run build. Do not edit.
// Derived UI: YuJunZhiXue/dsh-purge (MIT), see LICENSE.
(()=>{const __PURGE_MODULE_URL__ = typeof document !== 'undefined' ? document.currentScript?.src : undefined;
window.__ModuleLoader__.load({id:"dsh-ungate",factory:(require)=>{
var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entry.js
var entry_exports = {};
__export(entry_exports, {
  PanelOverlays: () => PanelOverlays,
  PurgeIcon: () => PurgeIcon,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(entry_exports);

// src/shared/react.js
var import_react = __toESM(require("react"), 1);
var h = import_react.default.createElement;
var { useState, useEffect, useCallback, useRef, Component } = import_react.default;

// src/styles/base.css
var base_default = '.dshpp-root {\n  --dshpp-display:\n    "Songti SC", "Noto Serif SC", "Iowan Old Style", Palatino,\n    "Palatino Linotype", Georgia, serif;\n  --dshpp-sans:\n    "Yu Gothic UI", "Hiragino Sans GB", "Source Han Sans SC", system-ui,\n    sans-serif;\n  --dshpp-mono: "Cascadia Mono", "Sarasa Mono SC", ui-monospace, monospace;\n  --dshpp-ease: cubic-bezier(0.16, 1, 0.3, 1);\n  max-width: 920px;\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n  padding: 16px;\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  color: var(--dshpp-ink);\n  font-family: var(--dshpp-sans);\n}\n.dshpp-root {\n  --dshpp-bg: transparent;\n  --dshpp-paper: color-mix(\n    in srgb,\n    var(--dsw-alias-bg-layer-1, #f6f4ef) 74%,\n    transparent\n  );\n  --dshpp-ink: var(--dsw-alias-label-primary, #1a1916);\n  --dshpp-mute: color-mix(\n    in srgb,\n    var(--dsw-alias-label-primary, #1a1916) 74%,\n    var(--dsw-alias-label-secondary, #5c564c)\n  );\n  --dshpp-line: color-mix(\n    in srgb,\n    var(--dsw-alias-border-l1, #c8c2b6) 78%,\n    transparent\n  );\n  --dshpp-fill: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6d8f78) 14%,\n    transparent\n  );\n  --dshpp-accent: var(--dsw-alias-brand-primary, #3f6b52);\n  --dshpp-accent-soft: color-mix(\n    in srgb,\n    var(--dsw-alias-brand-primary, #6d8f78) 18%,\n    transparent\n  );\n  --dshpp-ok: #1f7a45;\n  --dshpp-warn: #8a5a12;\n  --dshpp-bad: #9a3434;\n}\n.dshpp-root[data-theme="white"] {\n  color-scheme: light;\n}\n.dshpp-root[data-theme="dusk"] {\n  color-scheme: dark;\n  --dshpp-ok: #8fd0a8;\n  --dshpp-warn: #e4c48a;\n  --dshpp-bad: #f0b4b4;\n}\n.dshpp-panel {\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-paper);\n  border-radius: 10px;\n  padding: 18px 18px 16px;\n}\n.dshpp-sub {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin: 20px 0 10px;\n}\n.dshpp-sub h4 {\n  margin: 0;\n  font-family: var(--dshpp-display);\n  font-size: 15px;\n  font-weight: 500;\n}\n.dshpp-group {\n  border: 1px solid var(--dshpp-line);\n  margin: 0 0 8px;\n  background: var(--dshpp-bg);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.dshpp-group-h {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 12px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n.dshpp-group-h:hover {\n  background: var(--dshpp-fill);\n}\n.dshpp-group-h:focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: -2px;\n}\n.dshpp-group-h strong {\n  font-family: var(--dshpp-display);\n  font-size: 14px;\n  font-weight: 500;\n}\n.dshpp-group-h em {\n  font-style: normal;\n  font-size: 12px;\n  color: var(--dshpp-mute);\n  flex: 1;\n}\n.dshpp-count {\n  font-family: var(--dshpp-mono);\n  font-size: 12px;\n  color: var(--dshpp-mute);\n}\n.dshpp-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12.5px;\n}\n.dshpp-table th {\n  text-align: left;\n  font-weight: 500;\n  font-size: 11px;\n  letter-spacing: 0.06em;\n  color: var(--dshpp-mute);\n  padding: 7px 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n}\n.dshpp-table td {\n  padding: 8px 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n  vertical-align: middle;\n}\n.dshpp-table tr:last-child td {\n  border-bottom: 0;\n}\n.dshpp-table tr.is-on td {\n  background: var(--dshpp-accent-soft);\n}\n.dshpp-id {\n  font-family: var(--dshpp-mono);\n  opacity: 0.75;\n  width: 42px;\n}\n.dshpp-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dshpp-row + .dshpp-row {\n  margin-top: 10px;\n}\n.dshpp-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--dshpp-mono);\n  font-size: 11px;\n  padding: 2px 8px;\n  border: 1px solid var(--dshpp-line);\n  border-radius: 99px;\n  line-height: 1.6;\n  background: var(--dshpp-bg);\n}\n.dshpp-pill::before {\n  content: "";\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n.dshpp-pill.is-ok {\n  color: var(--dshpp-ok);\n  border-color: color-mix(in srgb, var(--dshpp-ok) 30%, var(--dshpp-line));\n}\n.dshpp-pill.is-wait {\n  color: var(--dshpp-warn);\n  border-color: color-mix(in srgb, var(--dshpp-warn) 30%, var(--dshpp-line));\n}\n.dshpp-pill.is-miss {\n  color: var(--dshpp-mute);\n}\n.dshpp-pill.is-bad {\n  color: var(--dshpp-bad);\n}\n.dshpp-btn {\n  appearance: none;\n  font-family: var(--dshpp-sans);\n  font-size: 13px;\n  font-weight: 500;\n  min-height: 34px;\n  padding: 0 14px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition:\n    background 0.15s var(--dshpp-ease),\n    opacity 0.15s var(--dshpp-ease);\n}\n.dshpp-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.dshpp-btn:focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: 2px;\n}\n.dshpp-btn-ghost {\n  background: transparent;\n  color: var(--dshpp-ink);\n  border-color: var(--dshpp-line);\n}\n.dshpp-btn-tiny {\n  min-height: 28px;\n  padding: 0 10px;\n  font-size: 12px;\n}\n.dshpp-area {\n  min-height: 220px;\n  resize: vertical;\n}\n.dshpp-modal-bg {\n  position: fixed;\n  inset: 0;\n  z-index: 80;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  background: color-mix(in srgb, var(--dshpp-ink) 28%, transparent);\n}\n.dshpp-modal {\n  width: min(420px, 100%);\n  background: var(--dshpp-paper);\n  color: var(--dshpp-ink);\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  padding: 20px 20px 16px;\n  box-shadow: 0 16px 40px color-mix(in srgb, var(--dshpp-ink) 18%, transparent);\n}\n.dshpp-modal h4 {\n  margin: 0 0 8px;\n  font-family: var(--dshpp-display);\n  font-size: 18px;\n  font-weight: 500;\n}\n.dshpp-modal p {\n  margin: 0 0 16px;\n  font-size: 13.5px;\n  line-height: 1.55;\n}\n.dshpp-modal-ops {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.dshpp-restart-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 12000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: rgba(0, 0, 0, 0.62);\n  font-family:\n    "Yu Gothic UI", "Hiragino Sans GB", "Source Han Sans SC",\n    "Microsoft YaHei UI", system-ui, sans-serif;\n}\n.dshpp-restart-card {\n  width: min(420px, 100%);\n  box-sizing: border-box;\n  padding: 22px 22px 18px;\n  border-radius: 14px;\n  background: var(--dsw-alias-bg-layer-1, #fffcf7);\n  color: var(--dsw-alias-label-primary, #16140f);\n  border: 1px solid var(--dsw-alias-border-l1, #c9c3b6);\n  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);\n}\n.dshpp-restart-card h4 {\n  margin: 0 0 10px;\n  font-family: inherit;\n  font-size: 20px;\n  font-weight: 650;\n  line-height: 1.35;\n  color: inherit;\n}\n.dshpp-restart-card p {\n  margin: 0 0 18px;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.65;\n  color: inherit;\n}\n.dshpp-restart-card .dshpp-modal-ops {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n}\n.dshpp-restart-card .dshpp-btn {\n  min-height: 38px;\n  padding: 0 16px;\n  font-size: 15px;\n  font-weight: 650;\n  color: var(--dsw-alias-label-primary, #16140f);\n  background: var(--dsw-alias-bg-layer-2, #fff);\n  border: 1px solid var(--dsw-alias-border-l1, #c9c3b6);\n}\nbody[data-ds-dark-theme] .dshpp-restart-card,\n.dshpp-restart-mask[data-theme="dusk"] .dshpp-restart-card {\n  background: #1c1e24;\n  color: #f4f1ea;\n  border-color: #5a5e68;\n}\nbody[data-ds-dark-theme] .dshpp-restart-card .dshpp-btn,\n.dshpp-restart-mask[data-theme="dusk"] .dshpp-restart-card .dshpp-btn {\n  color: #f4f1ea;\n  background: #2a2d34;\n  border-color: #5a5e68;\n}\n.dshpp-notice {\n  font-size: 12.5px;\n  line-height: 1.4;\n}\n.dshpp-notice.is-ok {\n  color: var(--dshpp-ok);\n}\n.dshpp-notice.is-bad {\n  color: var(--dshpp-bad);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.dshpp-skel {\n  height: 12px;\n  border-radius: 6px;\n  background: linear-gradient(\n    90deg,\n    var(--dshpp-fill),\n    var(--dshpp-line),\n    var(--dshpp-fill)\n  );\n  background-size: 200% 100%;\n  animation: dshpp-pulse 1.2s ease-in-out infinite;\n}\n@keyframes dshpp-pulse {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dshpp-btn,\n  .dshpp-bar > i {\n    transition: none;\n  }\n  .dshpp-skel {\n    animation: none;\n  }\n}\n/* \u73BB\u7483\u8DDF\u968F\u5BBF\u4E3B\u989C\u8272\u3002\u5B57\u91CD\u548C\u5E95\u7684\u4E0D\u900F\u660E\u5EA6\u5206\u5F00\uFF1A\u58F3\u900F\uFF0C\u5B57\u5750\u5728\u66F4\u5B9E\u7684\u4E00\u5C42\u4E0A\u3002 */\n';

// src/styles/native.css
var native_default = '.dshpp-native.dshpp-root {\n  --dshpp-display: inherit;\n  --dshpp-sans: inherit;\n  --dshpp-paper: var(--dsw-alias-bg-base, transparent);\n  --dshpp-bg: transparent;\n  --dshpp-line: var(--dsw-alias-border-l1, #ddd);\n  --dshpp-ink: var(--dsw-alias-label-primary, #171717);\n  --dshpp-mute: var(--dsw-alias-label-secondary, #777);\n  --dshpp-accent: var(--dsw-alias-brand-primary, #4775ed);\n  --dshpp-fill: var(--dsw-alias-interactive-bg-hover, #f3f3f3);\n  font: inherit;\n  font-size: var(--dsh-content-font-size, 14px);\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  max-width: none;\n  padding: 0;\n  gap: 0;\n  border-radius: 0;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.dshpp-native * {\n  box-sizing: border-box;\n}\n.dshpp-native [hidden] {\n  display: none !important;\n}\n.dshpp-native-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 20px 20px 12px;\n  gap: 12px;\n  flex: none;\n}\n.dshpp-native-head h2 {\n  font: inherit;\n  font-size: 1.15em;\n  font-weight: 600;\n  margin: 0;\n}\n.dshpp-native-head p {\n  margin: 4px 0 0;\n  font-size: 0.85em;\n  color: var(--dshpp-mute);\n}\n.dshpp-native-badge {\n  font-size: 0.8em;\n  color: var(--dshpp-mute);\n}\n.dshpp-native-nav {\n  display: flex;\n  gap: 4px;\n  padding: 0 16px;\n  border-bottom: 1px solid var(--dshpp-line);\n  flex: none;\n  overflow-x: auto;\n}\n.dshpp-native-nav button {\n  font: inherit;\n  font-size: 0.92em;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  background: none;\n  color: var(--dshpp-mute);\n  padding: 10px 8px;\n  white-space: nowrap;\n  cursor: pointer;\n}\n.dshpp-native-nav button[aria-pressed="true"] {\n  color: var(--dshpp-ink);\n  border-bottom-color: var(--dshpp-accent);\n}\n.dshpp-native-content {\n  min-height: 0;\n  flex: 1;\n  overflow: auto;\n  padding: 20px;\n  scrollbar-gutter: stable;\n  overscroll-behavior: contain;\n}\n.dshpp-native .dshpp-panel {\n  border: 0;\n  border-radius: 0;\n  padding: 0;\n  background: transparent;\n  min-width: 0;\n}\n.dshpp-native .dshpp-sub {\n  margin-top: 0;\n  flex-wrap: wrap;\n}\n.dshpp-native :is(button, input, select, textarea) {\n  font-family: inherit;\n  box-shadow: none;\n  background-image: none;\n  max-width: 100%;\n}\n.dshpp-native .dshpp-btn {\n  font-size: 0.9em;\n  min-height: 32px;\n  border-radius: 7px;\n  padding: 6px 10px;\n  transform: none;\n  box-shadow: none;\n}\n.dshpp-native .dshpp-btn:hover:not(:disabled) {\n  background: var(--dshpp-fill);\n  box-shadow: none;\n  transform: none;\n}\n.dshpp-native :is(button, input, select, textarea):focus-visible {\n  outline: 2px solid var(--dshpp-accent);\n  outline-offset: 2px;\n  box-shadow: none;\n}\n.dshpp-native .dshpp-area {\n  font-family: inherit;\n  font-size: 0.92em;\n  line-height: 1.6;\n  min-height: 260px;\n  width: 100%;\n  border-radius: 8px;\n  background: transparent;\n  color: inherit;\n}\n.dshpp-native summary {\n  cursor: pointer;\n  color: var(--dshpp-mute);\n  padding: 8px 0;\n  font-size: 0.9em;\n}\n.dshpp-native .dshpp-table {\n  table-layout: fixed;\n  font-size: 0.83em;\n}\n.dshpp-native .dshpp-table td {\n  word-break: break-word;\n  padding: 8px;\n}\n.dshpp-native .dshpp-table th {\n  padding: 8px;\n}\n.dshpp-native .dshpp-group-h {\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.dshpp-native .dshpp-group-h em {\n  font-size: 0.85em;\n}\n.dshpp-native .dshpp-row {\n  gap: 8px;\n}\n.dshpp-native .dshpp-hint {\n  font-size: 0.85em !important;\n  line-height: 1.6;\n  color: var(--dshpp-mute);\n}\n.dshpp-native .dshpp-more {\n  border-top: 1px solid var(--dshpp-line);\n  padding-top: 20px;\n  margin-top: 24px;\n}\n.dshpp-native .dshpp-more p {\n  font-size: 0.9em;\n  line-height: 1.6;\n  color: var(--dshpp-mute);\n}\n.dshpp-native .dshpp-attribution {\n  margin-top: 32px;\n  font-size: 0.78em !important;\n}\n';

// src/styles/page.css
var page_default = '/* \u6574\u9875\uFF08\u5DE6\u4FA7\u680F\u5165\u53E3\uFF09\u6837\u5F0F\uFF1A\u6CBF\u7528 DSH \u81EA\u5DF1\u7684\u5B57\u4F53\u3001\u95F4\u8DDD\u4E0E\u4E3B\u9898\u53D8\u91CF\uFF0C\u4E0D\u5F15\u5165\u81EA\u5B9A\u4E49\u5B57\u4F53\u3002 */\n.dshpp-page {\n  --dshpp-line: var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.22));\n  --dshpp-line-strong: var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.4));\n  --dshpp-fg: var(--dsw-alias-label-primary, currentColor);\n  --dshpp-mute: var(\n    --dsw-alias-label-secondary,\n    color-mix(in srgb, currentColor 62%, transparent)\n  );\n  --dshpp-bg: var(--dsw-alias-bg-layer-1, transparent);\n  --dshpp-bg-2: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, 0.06));\n  --dshpp-accent: var(--dsw-alias-brand-primary, #4d6bfe);\n  --dshpp-ok: var(--dsw-alias-state-success-primary, #1f9d55);\n  --dshpp-warn: var(--dsw-alias-state-warn-primary, #b7791f);\n  --dshpp-bad: var(--dsw-alias-state-error-primary, #d14343);\n  box-sizing: border-box;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n  padding: 20px 24px 40px;\n  color: var(--dshpp-fg);\n  font: inherit;\n  line-height: 1.55;\n  -webkit-font-smoothing: antialiased;\n}\n.dshpp-page *,\n.dshpp-page *::before,\n.dshpp-page *::after {\n  box-sizing: border-box;\n}\n\n.dshpp-page-head {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.dshpp-page-glyph {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg-2);\n  color: var(--dshpp-accent);\n  flex: none;\n}\n.dshpp-page-title {\n  min-width: 0;\n}\n.dshpp-page-title h1 {\n  margin: 0;\n  font-size: 1.15em;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n.dshpp-page-title p {\n  margin: 2px 0 0;\n  font-size: 0.86em;\n  color: var(--dshpp-mute);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.dshpp-page-ver {\n  padding: 1px 6px;\n  border-radius: 999px;\n  border: 1px solid var(--dshpp-line);\n  font-size: 0.92em;\n}\n\n/* \u9876\u90E8\u4E00\u884C\u72B6\u6001\u6458\u8981\uFF1A\u4E0D\u7528\u5361\u7247\uFF0C\u8DDF DSH \u7684 subtitle \u884C\u4E00\u81F4 */\n.dshpp-strip {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 18px;\n  margin: 14px 0 2px;\n  padding: 10px 0 12px;\n  border-bottom: 1px solid var(--dshpp-line);\n  font-size: 0.86em;\n  color: var(--dshpp-mute);\n}\n.dshpp-strip-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  min-width: 0;\n}\n.dshpp-strip-item b {\n  color: var(--dshpp-fg);\n  font-weight: 600;\n}\n.dshpp-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--dshpp-mute);\n  flex: none;\n}\n.dshpp-dot.is-ok {\n  background: var(--dshpp-ok);\n}\n.dshpp-dot.is-warn {\n  background: var(--dshpp-warn);\n}\n.dshpp-dot.is-bad {\n  background: var(--dshpp-bad);\n}\n\n/* \u9875\u7B7E\uFF1A\u4E0B\u5212\u7EBF\u5F0F\uFF0C\u8DDF DSH \u8BBE\u7F6E\u9875\u7684 tab \u4E00\u81F4 */\n.dshpp-page-tabs {\n  display: flex;\n  gap: 2px;\n  margin: 10px 0 0;\n  border-bottom: 1px solid var(--dshpp-line);\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n.dshpp-page-tabs::-webkit-scrollbar {\n  display: none;\n}\n.dshpp-page-tabs button {\n  appearance: none;\n  border: 0;\n  background: transparent;\n  color: var(--dshpp-mute);\n  font: inherit;\n  font-size: 0.92em;\n  padding: 9px 12px 10px;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.dshpp-page-tabs button:hover {\n  color: var(--dshpp-fg);\n}\n.dshpp-page-tabs button[aria-selected="true"] {\n  color: var(--dshpp-fg);\n  border-bottom-color: var(--dshpp-accent);\n  font-weight: 600;\n}\n\n.dshpp-page-body {\n  padding-top: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n}\n.dshpp-sec {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  min-width: 0;\n}\n.dshpp-sec[hidden] {\n  display: none;\n}\n\n/* \u5361\u7247\uFF1ADSH \u7684 layer-1 \u9762\u677F */\n.dshpp-page .dshpp-card,\n.dshpp-page section.dshpp-panel {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  padding: 16px 18px;\n  margin: 0;\n  min-width: 0;\n}\n.dshpp-page .dshpp-card > h3:first-child,\n.dshpp-page section.dshpp-panel > h3:first-child {\n  margin: 0 0 12px;\n  font-size: 1em;\n  font-weight: 600;\n}\n.dshpp-page .dshpp-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.dshpp-page .dshpp-muted,\n.dshpp-page .dshpp-hint {\n  color: var(--dshpp-mute) !important;\n  font-size: 0.86em !important;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.dshpp-page .dshpp-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  min-width: 0;\n}\n.dshpp-page input,\n.dshpp-page select,\n.dshpp-page textarea {\n  font: inherit;\n  color: var(--dshpp-fg);\n  background: var(--dshpp-bg-2);\n  border: 1px solid var(--dshpp-line);\n  border-radius: 8px;\n  padding: 7px 10px;\n  max-width: 100%;\n}\n.dshpp-page input:focus-visible,\n.dshpp-page select:focus-visible,\n.dshpp-page textarea:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--dshpp-accent) 55%, transparent);\n  outline-offset: 1px;\n}\n.dshpp-page textarea {\n  width: 100%;\n  min-height: 320px;\n  resize: vertical;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 0.86em;\n  line-height: 1.6;\n}\n\n.dshpp-page .dshpp-btn {\n  font: inherit;\n  font-size: 0.9em;\n  border-radius: 8px;\n  padding: 6px 12px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dshpp-bg-2);\n  color: var(--dshpp-fg);\n  cursor: pointer;\n  white-space: nowrap;\n}\n.dshpp-page .dshpp-btn:hover:not(:disabled) {\n  border-color: var(--dshpp-line-strong);\n}\n.dshpp-page .dshpp-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n/* \u4E3B\u6309\u94AE\uFF1A\u4E0D\u8981\u7528 brand-primary \u5F53\u5E95\u8272\u2014\u2014\u6DF1\u8272\u6A21\u5F0F\u4E0B\u5B83\u662F\u9AD8\u4EAE\u6587\u5B57\u8272\uFF0C\n   \u76F4\u63A5\u94FA\u6210\u80CC\u666F\u5C31\u6210\u4E86"\u767D\u5E95\u767D\u5B57"\u7684\u65B9\u5757\u3002\u8FD9\u91CC\u7528\u56FA\u5B9A\u7684\u5B9E\u5FC3\u7EFF + \u767D\u5B57\u3002 */\n.dshpp-page {\n  --dshpp-solid: #2f6b4f;\n  --dshpp-solid-hover: #3a8260;\n  --dshpp-solid-danger: #a63b3b;\n  --dshpp-solid-danger-hover: #bd4747;\n}\n.dshpp-page .dshpp-btn-tiny {\n  padding: 3px 8px;\n  font-size: 0.82em;\n}\n\n.dshpp-page .dshpp-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 1px 8px;\n  border-radius: 999px;\n  font-size: 0.8em;\n  border: 1px solid var(--dshpp-line);\n  color: var(--dshpp-mute);\n}\n.dshpp-page .dshpp-pill.is-ok {\n  color: var(--dshpp-ok);\n  border-color: color-mix(in srgb, var(--dshpp-ok) 35%, transparent);\n}\n.dshpp-page .dshpp-pill.is-wait {\n  color: var(--dshpp-warn);\n  border-color: color-mix(in srgb, var(--dshpp-warn) 35%, transparent);\n}\n.dshpp-page .dshpp-pill.is-bad {\n  color: var(--dshpp-bad);\n  border-color: color-mix(in srgb, var(--dshpp-bad) 40%, transparent);\n}\n\n.dshpp-page .dshpp-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.86em;\n}\n.dshpp-page .dshpp-table th,\n.dshpp-page .dshpp-table td {\n  text-align: left;\n  padding: 7px 10px;\n  border-bottom: 1px solid var(--dshpp-line);\n  vertical-align: top;\n  overflow-wrap: anywhere;\n}\n.dshpp-page .dshpp-table th {\n  color: var(--dshpp-mute);\n  font-weight: 500;\n  font-size: 0.95em;\n}\n.dshpp-page .dshpp-group-h {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  padding: 8px 0;\n  cursor: pointer;\n}\n.dshpp-page .dshpp-count {\n  color: var(--dshpp-mute);\n  font-size: 0.85em;\n}\n\n/* \u6F14\u7EC3\u53F0\u5360\u6EE1\u5269\u4F59\u9AD8\u5EA6 */\n\n.dshpp-page-foot {\n  margin-top: 28px;\n  padding-top: 14px;\n  border-top: 1px solid var(--dshpp-line);\n  font-size: 0.8em;\n  color: var(--dshpp-mute);\n}\n\n/* \u540D\u8BCD\u89E3\u91CA\uFF1A\u6807\u9898\u540E\u9762\u7684\u5C0F\u95EE\u53F7 */\n.dshpp-help {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n}\n.dshpp-help-btn {\n  appearance: none;\n  border: 0;\n  background: transparent;\n  color: var(--dshpp-mute);\n  font: inherit;\n  font-size: 0.85em;\n  line-height: 1;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: 1px solid var(--dshpp-line);\n  cursor: help;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n.dshpp-help-btn:hover,\n.dshpp-help-btn[aria-expanded="true"] {\n  color: var(--dshpp-fg);\n  border-color: var(--dshpp-line-strong);\n  background: var(--dshpp-bg-2);\n}\n.dshpp-tip {\n  position: absolute;\n  left: 0;\n  top: calc(100% + 6px);\n  z-index: 2147483000;\n  width: max-content;\n  max-width: min(340px, 70vw);\n  padding: 9px 11px;\n  border-radius: 8px;\n  border: 1px solid var(--dshpp-line);\n  background: var(--dsw-alias-bg-overlay, canvas);\n  color: var(--dshpp-fg);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n  font-size: 0.82em;\n  line-height: 1.6;\n  white-space: normal;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.dshpp-tip b {\n  font-weight: 600;\n}\n\n.dshpp-page .dshpp-warn {\n  margin: 10px 0 0;\n  padding: 8px 12px;\n  border-radius: 8px;\n  border: 1px solid color-mix(in srgb, var(--dshpp-warn) 45%, transparent);\n  color: var(--dshpp-warn);\n  background: color-mix(in srgb, var(--dshpp-warn) 10%, transparent);\n  font-size: 0.86em;\n}\n\n/* \u6298\u53E0\u5757\uFF1A\u8865\u4E01\u660E\u7EC6 / \u7EF4\u62A4 / \u81EA\u68C0 */\n.dshpp-page .dshpp-fold,\n.dshpp-page .dshpp-fold-inline {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 10px;\n  background: var(--dshpp-bg);\n  padding: 0 12px;\n}\n.dshpp-page .dshpp-fold > summary,\n.dshpp-page .dshpp-fold-inline > summary {\n  cursor: pointer;\n  padding: 10px 0;\n  font-size: 0.92em;\n  color: var(--dshpp-fg);\n  list-style: none;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dshpp-page .dshpp-fold > summary::-webkit-details-marker,\n.dshpp-page .dshpp-fold-inline > summary::-webkit-details-marker {\n  display: none;\n}\n.dshpp-page .dshpp-fold > summary::before,\n.dshpp-page .dshpp-fold-inline > summary::before {\n  content: "\u25B8";\n  color: var(--dshpp-mute);\n  font-size: 0.9em;\n  transition: transform 0.12s ease;\n}\n.dshpp-page .dshpp-fold[open] > summary::before,\n.dshpp-page .dshpp-fold-inline[open] > summary::before {\n  transform: rotate(90deg);\n}\n.dshpp-page .dshpp-fold > summary b,\n.dshpp-page .dshpp-fold-inline > summary b {\n  color: var(--dshpp-mute);\n  font-weight: 500;\n  margin-left: auto;\n}\n\n/* \u72B6\u6001\u884C\uFF08\u81EA\u68C0 / \u5F3A\u5316\u6BB5\uFF09 */\n.dshpp-page .dshpp-line {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n  padding: 6px 0;\n}\n.dshpp-page .dshpp-line + .dshpp-line {\n  border-top: 1px solid var(--dshpp-line);\n}\n.dshpp-page .dshpp-line-main {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.92em;\n  min-width: 0;\n}\n.dshpp-page .dshpp-line-main b {\n  font-weight: 600;\n}\n.dshpp-page .dshpp-fold-inline {\n  border: 0;\n  padding: 0;\n  background: transparent;\n}\n.dshpp-page .dshpp-fold-inline > summary {\n  padding: 2px 0;\n  color: var(--dshpp-mute);\n  font-size: 0.86em;\n}\n.dshpp-page .dshpp-fold-inline[open] {\n  flex-basis: 100%;\n}\n\n/* \u9010\u5C42\u81EA\u68C0\uFF1A\u4E24\u5217/\u591A\u5217\u7F51\u683C\uFF0C\u4E0D\u518D\u4E00\u6761\u4E00\u884C */\n.dshpp-page .dshpp-checks {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 2px 14px;\n  padding: 6px 0 10px;\n}\n.dshpp-page .dshpp-check {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.84em;\n  min-width: 0;\n  padding: 2px 0;\n}\n.dshpp-page .dshpp-check.is-bad {\n  color: var(--dshpp-bad);\n}\n.dshpp-page .dshpp-check-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}\n.dshpp-page .dshpp-check-val {\n  margin-left: auto;\n  color: var(--dshpp-mute);\n  font-variant-numeric: tabular-nums;\n}\n\n/* \u72B6\u6001\u9875 hero\uFF1A\u4E00\u773C\u770B\u5230"\u73B0\u5728\u4EC0\u4E48\u72B6\u6001\u3001\u4E0B\u4E00\u6B65\u70B9\u54EA" */\n.dshpp-page .dshpp-hero {\n  border: 1px solid var(--dshpp-line);\n  border-radius: 12px;\n  background: var(--dshpp-bg);\n  padding: 16px 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.dshpp-page .dshpp-hero-state {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.02em;\n  min-width: 0;\n}\n.dshpp-page .dshpp-hero-state b {\n  font-weight: 600;\n}\n.dshpp-page .dshpp-hero-sub {\n  margin-left: auto;\n  color: var(--dshpp-mute);\n  font-size: 0.82em;\n}\n.dshpp-page .dshpp-hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n.dshpp-page .dshpp-btn-lead {\n  padding: 9px 20px;\n  font-size: 0.98em;\n  font-weight: 600;\n  border-radius: 10px;\n}\n.dshpp-page .dshpp-hero-hint {\n  margin: 0;\n  color: var(--dshpp-mute);\n  font-size: 0.84em;\n  line-height: 1.6;\n}\n.dshpp-check.is-warn {\n  color: var(--dshpp-warn);\n}\n';

// src/shared/locale.js
var NS = "settings.dsh-purge-panel";
var translate = (key) => key;
function setTranslate(t) {
  translate = t;
}
function useT() {
  return translate;
}
var zh = {
  nav: "\u89C4\u5219\u8BBE\u5B9A",
  "compat.host": "dsh-purge Community {version} \xB7 \u5BBF\u4E3B DSH {host} \xB7 \u517C\u5BB9\u7EA7\u522B\uFF1A{level}",
  "compat.loading": "\u6B63\u5728\u8BFB\u53D6\u5BBF\u4E3B\u7248\u672C\u2026",
  "compat.unavailable": "\u8BFB\u4E0D\u5230\u5BBF\u4E3B\u517C\u5BB9\u4FE1\u606F\uFF1A{error}",
  "compat.level.qualified": "\u5DF2\u56DE\u5F52\u9A8C\u8BC1",
  "compat.level.unverified": "\u672A\u9A8C\u8BC1\u7248\u672C",
  "compat.level.mixed": "\u7EC4\u4EF6\u7248\u672C\u4E0D\u4E00\u81F4",
  "compat.level.no-host": "\u672A\u5B9A\u4F4D\u5BBF\u4E3B",
  "compat.level.unknown": "\u672A\u77E5",
  "purge.title": "\u8865\u4E01",
  "override.title": "\u63D0\u793A\u8BCD",
  "own.title": "\u81EA\u5DF1\u7684\u670D\u52A1\u5668",
  "own.hint": "\u6BCF\u884C\u4E00\u4E2A IP \u6216\u5B8C\u6574\u4E3B\u673A\u540D\u3002\u53EF\u4EE5\u5199\u6210 \u8D26\u53F7@\u4E3B\u673A\uFF0C\u8D26\u53F7\u53EA\u7528\u6765\u8BA4\u51FA\u8FD9\u79CD\u5199\u6CD5\u3002\u4E3B\u673A\u540D\u4F1A\u8FDE\u540C\u5B83\u5F53\u65F6\u89E3\u6790\u51FA\u7684\u5730\u5740\u4E00\u8D77\u653E\u884C\u3002\u4E0D\u8981\u5199\u5BC6\u94A5\u3001\u5BC6\u7801\u3001\u7F51\u6BB5\u3002",
  "own.save": "\u4FDD\u5B58\u540D\u5355",
  "saved.own": "\u5DF2\u4FDD\u5B58\u81EA\u5DF1\u7684\u670D\u52A1\u5668",
  "saved.own.dropped": "\u5DF2\u4FDD\u5B58\u3002\u6709 {n} \u884C\u4E0D\u662F\u5355\u4E2A IP \u6216\u4E3B\u673A\u540D\uFF0C\u5DF2\u4E22\u6389",
  "metric.pendingShort": "\u5F85\u5904\u7406 {n}",
  "metric.unmatchedShort": "\u6CA1\u5BF9\u4E0A {n}",
  "metric.partialShort": "\u90E8\u5206\u547D\u4E2D {n}",
  "metric.driftedShort": "\u951A\u70B9\u6F02\u79FB {n}",
  "metric.disabledShort": "\u53EF\u9009\u5173\u95ED {n}",
  "metric.skipShort": "\u8DF3\u8FC7 {n}",
  "table.patch": "\u9879\u76EE",
  "table.status": "\u72B6\u6001",
  "status.applied": "\u5DF2\u5E94\u7528",
  "status.pending": "\u5F85\u5E94\u7528",
  "status.unmatched": "\u6CA1\u5BF9\u4E0A",
  "status.partial": "\u90E8\u5206\u547D\u4E2D",
  "status.partialDetail": "\uFF08{done}/{total} \u76EE\u6807\uFF09",
  "status.drifted": "\u951A\u70B9\u6F02\u79FB",
  "status.disabled": "\u53EF\u9009\u5173\u95ED",
  "status.skipped": "\u8DF3\u8FC7",
  "apply.hint": "\u70B9\u5E94\u7528\u4F1A\u6253\u8865\u4E01\u5E76\u628A\u5F53\u524D\u9ED8\u8BA4\u63D0\u793A\u8BCD\u6302\u4E0A\uFF0C\u6846\u91CC\u4ECD\u662F\u63D2\u4EF6\u65E7\u9ED8\u8BA4\u65F6\u81EA\u52A8\u5237\u5230\u52A0\u5BC6\u69FD\uFF0C\u4E0D\u5FC5\u518D\u70B9\u4FDD\u5B58\u3002\u53EA\u6709\u4F60\u53E6\u5199\u7684\u7A3F\u624D\u4F1A\u6309\u6846\u843D\u76D8\u3002\u5F85\u5E94\u7528=\u539F\u6587\u8FD8\u5728\u3002\u8DF3\u8FC7=\u5F53\u524D\u7248\u672C\u4E0D\u9700\u8981\u6216\u7EC4\u4EF6\u672A\u5B89\u88C5\u3002",
  "warn.noRoot": "\u672A\u5B9A\u4F4D\u5230\u5F53\u524D\u5BBF\u4E3B\u7684 @deepseek-ai\uFF0C\u6E05\u6D17\u4E0D\u4F1A\u751F\u6548\u3002\u8BF7\u5B8C\u5168\u9000\u51FA\u540E\u518D\u6253\u5F00\u672C\u5BBF\u4E3B\uFF0C\u5728\u672C\u9875\u70B9\u300C\u5E94\u7528\u300D\u3002\u684C\u9762\u7AEF\u5B89\u88C5\u76EE\u5F55\u53EF\u4EE5\u662F\u4EFB\u610F\u76D8\u7B26\uFF1B\u76EE\u5F55\u540D\u5E26 DeepseekHarness / DeepSeek Harness \u5747\u53EF\u3002",
  "restart.fullQuit": "\u6B63\u5728\u91CD\u542F\uFF0C\u5BA2\u6237\u7AEF\u4F1A\u81EA\u5DF1\u91CD\u65B0\u6253\u5F00\u3002",
  "warn.noInject": "\u5B98\u65B9\u59CB\u7EC8\u7528\u9ED8\u8BA4\u63D0\u793A\u8BCD\u3002\u7EA2\u961F\u5F00\u4E86\u89C4\u5219\u96C6\u5C31\u53EA\u7528\u89C4\u5219\u96C6\uFF1B\u6CA1\u5F00\u65F6\u7528\u53BB\u6389 CTF \u7684\u9ED8\u8BA4\u63D0\u793A\u8BCD\uFF0C\u518D\u63A5\u7EA2\u961F\u64CD\u4F5C\u3002\u4E24\u8FB9\u90FD\u7A7A\u4F1A\u63D0\u793A\u5FC5\u987B\u6DFB\u52A0\u3002",
  "need.prompt": "\u63D0\u793A\u8BCD\u548C\u89C4\u5219\u96C6\u90FD\u662F\u7A7A\u7684\uFF0C\u5FC5\u987B\u5148\u6DFB\u52A0\u63D0\u793A\u8BCD\uFF0C\u6216\u542F\u7528\u4E00\u6761\u6709\u5185\u5BB9\u7684\u89C4\u5219\u96C6\u3002",
  "btn.restoreInject": "\u6062\u590D\u9ED8\u8BA4",
  "saved.restoreInject": "\u5DF2\u6062\u590D\u9ED8\u8BA4\u63D0\u793A\u8BCD",
  skip: "\u8DF3\u8FC7",
  unknown: "\u672A\u77E5",
  delete: "\u5220\u9664",
  "btn.apply": "\u5E94\u7528",
  "btn.apply.busy": "\u5904\u7406\u4E2D\u2026",
  "btn.revert": "\u8FD8\u539F",
  "btn.revert.tip": "\u8FD8\u539F\u53EA\u64A4\u5BBF\u4E3B\u8865\u4E01\uFF1B\u63D0\u793A\u8BCD\u6CE8\u5165\u4E0E\u672C\u63D2\u4EF6\u8FD0\u884C\u65F6\u4E0D\u53D7\u5F71\u54CD\u3002",
  "inject.on": "\u6CE8\u5165",
  "inject.off": "\u6CE8\u5165\u6B63\u6587\u4E3A\u7A7A",
  "btn.uninstall": "\u5378\u8F7D",
  "btn.uninstall.busy": "\u5378\u8F7D\u4E2D\u2026",
  "uninstall.title": "\u5378\u8F7D\u63D2\u4EF6",
  "uninstall.body": "\u662F\u5426\u5378\u8F7D\uFF1F\u5378\u8F7D\u5C06\u8FD8\u539F\u56DE\u539F\u7248\uFF0C\u5E76\u6E05\u9664\u672C\u63D2\u4EF6\u7684\u5168\u90E8\u6587\u4EF6\u4E0E\u8865\u4E01\u3002",
  "uninstall.confirm": "\u786E\u8BA4\u5378\u8F7D",
  "uninstall.cancel": "\u53D6\u6D88",
  "uninstall.applying": "\u6B63\u5728\u5378\u8F7D\u5E76\u8FD8\u539F\u2026",
  "uninstall.done": "\u5DF2\u5378\u8F7D\u5E76\u8FD8\u539F\uFF0C\u6B63\u5728\u91CD\u542F\u2026",
  "uninstall.fail": "\u5378\u8F7D\u5931\u8D25: {error}",
  "restart.official.title": "\u9700\u8981\u91CD\u542F",
  "restart.official.body": "\u8865\u4E01\u5DF2\u5199\u5165\u3002\u70B9\u91CD\u542F\u540E\u5BA2\u6237\u7AEF\u4F1A\u81EA\u5DF1\u91CD\u65B0\u6253\u5F00\u3002",
  "update.tip": "\u6700\u65B0",
  "update.current": "\u5F53\u524D",
  "action.apply": "\u5E94\u7528",
  "action.revert": "\u8FD8\u539F",
  "ok.done": "\u5DF2\u5B8C\u6210",
  "err.action": "\u5931\u8D25: {error}",
  "err.status": "\u8BFB\u53D6\u5931\u8D25: {error}",
  "err.override": "\u8BFB\u53D6\u5931\u8D25: {error}",
  "err.save": "\u4FDD\u5B58\u5931\u8D25: {error}",
  "btn.saveInject": "\u4FDD\u5B58",
  "saved.override": "\u5DF2\u4FDD\u5B58",
  restarting: "\u91CD\u542F\u4E2D\u2026",
  "restart.timeout": "\u8D85\u65F6\uFF0C\u8BF7\u5237\u65B0",
  "restart.fail": "\u5931\u8D25: {error}",
  "restart.notStarted": "\u91CD\u542F\u6CA1\u6709\u5F00\u59CB\uFF0C\u5BA2\u6237\u7AEF\u8FD8\u5728\u3002\u4E0D\u4F1A\u81EA\u52A8\u518D\u8BD5\u3002",
  "restart.already": "\u8FD9\u4E00\u6B21\u91CD\u542F\u5DF2\u7ECF\u5F00\u59CB\uFF0C\u4E0D\u4F1A\u518D\u91CD\u542F\u4E00\u6B21\u3002",
  "restart.confirm": "\u6E05\u6D17\u5DF2\u5B8C\u6210\uFF0C\u91CD\u542F\u540E\u751F\u6548\u3002",
  "restart.confirm.desktop": "\u6E05\u6D17\u5DF2\u5B8C\u6210\uFF0C\u91CD\u542F\u684C\u9762\u5E94\u7528\u540E\u751F\u6548\u3002",
  "restart.ask.title": "\u8981\u73B0\u5728\u91CD\u542F\u5417",
  "restart.ask.body": "\u5DF2\u7ECF\u5199\u5165\u3002\u91CD\u542F\u540E\u624D\u4F1A\u5728\u5F53\u524D\u5BA2\u6237\u7AEF\u91CC\u751F\u6548\u3002",
  "restart.now": "\u73B0\u5728\u91CD\u542F",
  "restart.notNow": "\u7A0D\u540E",
  "restart.asarSwap": "\u8865\u4E01\u5DF2\u5199\u5165\u78C1\u76D8\u3002\u6B63\u5728\u7ED3\u675F\u684C\u9762\u8FDB\u7A0B\u5E76\u632A\u5F00 app.asar\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u91CD\u65B0\u6253\u5F00\uFF1B\u82E5\u4ECD\u65E0\u6548\uFF0C\u8BF7\u5148\u5B8C\u5168\u9000\u51FA Harness\uFF08\u6258\u76D8\u4E5F\u5173\uFF09\uFF0C\u518D\u70B9\u4E00\u6B21\u5E94\u7528\u3002",
  "surface.web": "Web",
  "surface.desktop": "\u684C\u9762\u7AEF",
  "surface.gui": "GUI",
  "surface.tui": "TUI",
  "restart.incomplete": "\u5E94\u7528\u672A\u5B8C\u6210\u3002{detail}",
  "restart.incomplete.patches": "\u6709 {failed} \u9879\u5904\u7406\u5931\u8D25\uFF08#{ids}\uFF09\uFF0C\u8BF7\u67E5\u770B\u8865\u4E01\u660E\u7EC6",
  "restart.incomplete.flash": "\u7EC8\u7AEF\u7A97\u53E3\u6291\u5236\u68C0\u67E5\u672A\u901A\u8FC7\uFF08{entry}\uFF09",
  "restart.incomplete.host": "\u672A\u786E\u8BA4\u76EE\u6807\u5BBF\u4E3B\u5199\u5165\u5B8C\u6210\uFF0C\u8BF7\u6838\u5BF9\u5BA2\u6237\u7AEF\u3001\u5BBF\u4E3B\u7248\u672C\u548C\u76EE\u6807\u8DEF\u5F84",
  "restart.incomplete.restore": "\u914D\u7F6E\u6062\u590D\u672A\u5B8C\u6210\uFF0C\u8BF7\u67E5\u770B\u8BCA\u65AD\u8BB0\u5F55",
  "restart.incomplete.runtime": "CLI \u8FD0\u884C\u65F6\u68C0\u67E5\u6216\u4FEE\u590D\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u8BCA\u65AD\u8BB0\u5F55",
  "restart.incomplete.unknown": "\u5F53\u524D\u540E\u7AEF\u672A\u8FD4\u56DE\u5177\u4F53\u539F\u56E0\uFF0C\u8BF7\u67E5\u770B\u5BBF\u4E3B\u7248\u672C\u3001\u8865\u4E01\u660E\u7EC6\u548C\u8BCA\u65AD\u7ED3\u679C",
  "restart.later": "\u4EE5\u540E",
  "group.prompt": "\u63D0\u793A\u8BCD",
  "group.code": "\u4EE3\u7801",
  "group.engine": "\u5F15\u64CE",
  "group.tools": "\u5DE5\u5177",
  "group.compat": "\u5B8C\u6574\u6A21\u5F0F\u515C\u5E95",
  "group.dsh20": "0.2.0",
  "patch.1": "\u5168\u5C40\u514D\u8D23 \u2192 \u5F3A\u6307\u4EE4",
  "patch.2": "\u66FF\u6362\u5F0F\u514D\u8D23 \u2192 \u5F3A\u6307\u4EE4",
  "patch.3": "\u4F5C\u7528\u57DF\u514D\u8D23 \u2192 \u5F3A\u6307\u4EE4",
  "patch.4": "persona \u4F1A\u8BDD\u5F3A\u6307\u4EE4",
  "patch.5": "\u5BA1\u6279\u63D0\u793A\u53E5 \u2192 \u5168\u6743\u9650",
  "patch.6": "\u6C99\u7BB1 deny \u2192 allow \u5199",
  "patch.7": "\u6C99\u7BB1\u9ED8\u8BA4\u5168\u6743\u9650",
  "patch.8": "\u5BA1\u6279\u9ED8\u8BA4 never",
  "patch.9": "\u5BA1\u6279\u95E8\u81EA\u52A8\u653E\u884C",
  "patch.10": "\u5BA1\u6279\u914D\u7F6E\u9ED8\u8BA4 never",
  "patch.11": "never \u63D0\u793A\u53E5 \u2192 \u81EA\u52A8\u653E\u884C",
  "patch.12": "ask \u63D0\u793A\u53E5 \u2192 \u81EA\u52A8\u653E\u884C",
  "patch.13": "\u8C41\u514D\u5347\u7EA7\u9636\u68AF",
  "patch.14": "\u5347\u7EA7\u65E0\u6761\u4EF6\u6388\u4FE1",
  "patch.15": "\u6C99\u7BB1 confine \u76F4\u901A",
  "patch.16": "\u6587\u4EF6\u7CFB\u7EDF\u56F4\u680F\u53D6\u6D88",
  "patch.17": "\u89C2\u5BDF\u7B56\u7565\u8BFB\u5199\u653E\u884C",
  "patch.18": "\u91CD\u590D\u8C03\u7528\u5B88\u536B\u7981\u7528",
  "patch.19": "\u5DE5\u5177\u7ED3\u679C\u4FEE\u526A\u7981\u7528",
  "patch.21": "\u6062\u590D\u63D2\u4EF6\u5EF6\u957F\u7684 bash \u7B49\u5F85",
  "patch.22": "read \u4E0A\u9650\u653E\u5BBD",
  "patch.23": "\u5B50\u4EE3\u7406\u6DF1\u5EA6 3 \u2192 10",
  "patch.24": "preset fetch \u542F\u7528",
  "patch.25": "\u53BB\u6389\u5B98\u65B9\u9ED8\u8BA4\u8EAB\u4EFD\uFF08\u529F\u80FD\u63D0\u793A\u8BCD\u4E0D\u52A8\uFF09",
  "patch.26": "minimal\uFF1A\u53BB\u6389\u9ED8\u8BA4\u8EAB\u4EFD\u5E76\u6253\u5F00 inject",
  "patch.28": "dsh-liangshen\uFF08\u6881\u795E\uFF09\uFF1Aphase-1 \u4FDD\u7559 dsh-purge / dshpg \u6BB5",
  "patch.70": "\u6781\u7B80\u6A21\u5F0F\u7EC8\u7AEF\u4E0D\u518D\u7981\u6B62\u7F51\u7EDC",
  "patch.71": "\u6881\u795E\u53BB\u6389\u5B98\u65B9\u8EAB\u4EFD\u53E5",
  "patch.29": "dsh-tool-web\uFF1A\u5916\u90E8 untrusted \u62E6\u622A\u2192\u53EF\u6267\u884C",
  "patch.30": "dsh-hooks-claude-code\uFF1Adeny\u2192allow",
  "patch.31": "dsh-hooks-codex\uFF1Adeny\u2192allow",
  "patch.32": "Web \u8868\u9762\u8EAB\u4EFD\u4E2D\u6027\u5316",
  "patch.33": "Shell \u62D2\u7EDD\u63D0\u793A \u2192 \u53EF\u6267\u884C",
  "patch.34": "\u6C99\u7BB1\u63D0\u793A\u4E2D\u6027\u5316",
  "patch.35": "\u5347\u7EA7 never \u4E0D\u62D2",
  "patch.36": "\u6587\u4EF6\u7CFB\u7EDF\u5347\u7EA7 schema \u653E\u884C",
  "patch.37": "\u5B50\u4EE3\u7406 scope lock \u4E2D\u6027\u5316",
  "patch.38": "persona text\u2192prefix\uFF080.1.2 \u9884\u8BBE\uFF09",
  "patch.39": "\u4F1A\u8BDD v0 plugin summary\uFF08mnemon\uFF09",
  "patch.40": "complete \u9884\u8BBE\u4ECD\u4FDD\u7559\u6CE8\u5165",
  "patch.42": "\u8BBE\u7F6E\u9875\u65E7\u63A5\u53E3",
  "patch.43": "\u7F51\u9875\u9884\u8BBE\u53BB\u6389\u9ED8\u8BA4\u8EAB\u4EFD",
  "patch.45": "\u5B98\u65B9\u684C\u9762\u66F4\u65B0\u4EA4\u63A5",
  "patch.46": "\u5B98\u65B9\u66F4\u65B0\u811A\u672C\u53EA\u7528\u82F1\u6587",
  "patch.47": "OAuth \u4E0D\u518D\u63D2\u5165 Claude \u8EAB\u4EFD",
  "patch.48": "shell \u53BB\u6389\u5220\u9664\u524D\u7684\u989D\u5916\u786E\u8BA4",
  "patch.49": "OAuth \u4E0D\u518D\u4F2A\u88C5 claude-cli",
  "patch.50": "\u8DE8\u4F1A\u8BDD\u5F15\u7528\u4E0D\u518D\u6807\u4E0D\u53EF\u4FE1",
  "patch.51": "\u65B0\u4F1A\u8BDD\u4FDD\u6301\u5B8C\u5168\u6743\u9650",
  "patch.52": "\u4F1A\u8BDD\u65E5\u5FD7\u9ED8\u8BA4\u4E0D\u4E0A\u4F20",
  "patch.53": "\u7F51\u9875\u63D0\u793A\u53BB\u6389\u7981\u6B62\u53E6\u5F00\u670D\u52A1\u5668",
  "patch.54": "\u4EA4\u4ED8\u7269\u63D0\u793A\u53BB\u6389\u591A\u4F59\u7981\u6B62",
  "patch.55": "\u6BCF\u4E00\u6B65\u66FF\u6362\u7B2C\u4E00\u6761\u7CFB\u7EDF\u63D0\u793A",
  "patch.56": "\u56DE\u9000\u53EA\u85CF\u88AB\u64A4\u6389\u7684\u90A3\u4E00\u8F6E",
  "patch.57": "developer role \u4EC5\u9650 openai/azure\uFF0C\u7B2C\u4E09\u65B9\u4EE3\u7406\u56DE\u9000 system",
  "patch.58": "\u56DE\u9000\u7A7A\u6807\u8BB0\u4E0D\u8FDB\u6A21\u578B\u8BF7\u6C42",
  "patch.59": "\u5B98\u65B9 Auto Review \u4E0D\u518D\u62E6\u5DE5\u5177",
  "patch.60": "\u5B98\u65B9 run_code \u53BB\u6389\u5BA1\u6279\u6559\u5B66",
  "patch.61": "\u5B98\u65B9\u6C99\u7BB1\u7B56\u7565\u4E0D\u518D\u6559\u62D2\u7EDD",
  "patch.62": "\u65E0\u5BA1\u6279\u901A\u9053\u65F6\u653E\u884C\uFF08\u7528\u6237\u62D2\u7EDD\u4ECD\u6709\u6548\uFF09",
  "patch.63": "\u8BA1\u5212\u6A21\u5F0F\u4E0D\u518D\u8F6F\u62E6\u6267\u884C",
  "patch.64": "Stop hook \u4E0D\u518D\u6CE8\u5165\u5047\u7528\u6237\u8BDD",
  "patch.65": "UserPromptSubmit deny \u4E0D\u518D\u6574\u8F6E reject",
  "patch.66": "\u7A7A\u7684\u7CFB\u7EDF\u6BB5\u4E0D\u518D\u628A\u8FD9\u4E00\u8F6E\u6253\u6210\u5185\u90E8\u9519\u8BEF",
  "patch.67": "\u7F3A messages \u65F6\u8FD9\u4E00\u8F6E\u4E0D\u4E2D\u65AD",
  "patch.68": "\u56DE\u9000\u540E\u7F3A content \u4E0D\u4E2D\u65AD",
  "patch.69": "deepseek-flash \u4FDD\u6301\u5B98\u65B9 in-history",
  "patch.72": "Messages \u7684 system \u7528\u5F53\u524D\u7CFB\u7EDF\u63D0\u793A",
  "patch.73": "\u6781\u7B80 bash \u53BB\u6389\u8BEF\u7559\u7684\u955C\u50CF\u8BF4\u660E",
  "patch.74": "\u9996\u53D1\u524D\u5148\u6302\u9ED8\u8BA4\u63D0\u793A\u8BCD",
  "patch.75": "\u56DE\u9000\u628A\u5DF2\u5B8C\u6210\u4EFB\u52A1\u6536\u56DE\u6210\u672A\u5F00\u59CB",
  "patch.76": "unrestricted \u9884\u8BBE\u53BB\u6389\u8EAB\u4EFD\u53E5",
  "patch.77": "\u56DE\u9000\u6807\u8BB0\u5230\u8FBE\u65F6\u4E22\u5F03\u5DF2\u53D1\u9001\u6D88\u606F",
  "patch.78": "\u8865\u4E01\u6587\u4EF6\u7F3A\u5931\u65F6\u4ECE .bak \u6062\u590D",
  "patch.80": "\u6062\u590D\u5B98\u65B9\u6781\u7B80\u5DE5\u5177\u8868",
  "patch.82": "\u4E3B\u8FDB\u7A0B\u515C\u5E95 DSH_PROFILE=desktop",
  "patch.83": "host \u4FE1\u53F7\u6740\u65F6\u4E0D\u62A5\u9519\u4E0D\u5F39\u5BF9\u8BDD\u6846",
  "patch.84": "host code=0 \u6B63\u5E38\u9000\u51FA\u4E0D\u62A5\u9519 (\u6D88\u9664 stopped \u5BF9\u8BDD\u6846)",
  "status.unlocated": "\u672A\u5B9A\u4F4D",
  "status.na": "\u672C\u7AEF\u4E0D\u9700\u8981",
  "rewind.label": "\u56DE\u9000",
  "rewind.aria": "\u56DE\u9000",
  "rewind.busy": "\u56DE\u9000\u4E2D\u2026",
  "rewind.fail": "\u56DE\u9000\u5931\u8D25: {error}",
  "rewind.once": "\u56DE\u9000\u4E00\u6B21",
  "rewind.once.hint": "\u628A\u8FD9\u4E00\u8F6E\u53D1\u51FA\u53BB\u7684\u90A3\u53E5\u653E\u56DE\u8F93\u5165\u6846\uFF0C\u5E76\u6E05\u6389\u8FD9\u4E00\u8F6E",
  "rewind.round": "\u56DE\u9000\u4E0A\u4E00\u8F6E",
  "rewind.round.hint": "\u628A\u8FD9\u4E00\u8F6E\u53D1\u51FA\u53BB\u7684\u90A3\u53E5\u653E\u56DE\u8F93\u5165\u6846\uFF1B\u5B50\u4EE3\u7406\u4E5F\u53EA\u64A4\u8FD9\u4E00\u8F6E"
};
var en = {
  nav: "Rules",
  "compat.host": "dsh-purge Community {version} \xB7 host DSH {host} \xB7 compatibility: {level}",
  "compat.loading": "Reading the host version\u2026",
  "compat.unavailable": "Host compatibility is unavailable: {error}",
  "compat.level.qualified": "regression verified",
  "compat.level.unverified": "unverified version",
  "compat.level.mixed": "mixed component versions",
  "compat.level.no-host": "host not located",
  "compat.level.unknown": "unknown",
  "purge.title": "Patches",
  "override.title": "Prompt",
  "own.title": "Own servers",
  "own.hint": "One IP or exact hostname per line. account@host is accepted; the account only identifies that host. A hostname also allows the addresses it resolves to. Do not enter a key, a password, or a range.",
  "own.save": "Save list",
  "saved.own": "Own servers saved",
  "saved.own.dropped": "Saved. {n} lines were not a single IP or hostname and were dropped",
  "metric.pendingShort": "Pending {n}",
  "metric.unmatchedShort": "No match {n}",
  "metric.partialShort": "Partial {n}",
  "metric.driftedShort": "Drifted {n}",
  "metric.disabledShort": "Opt-in off {n}",
  "metric.skipShort": "Skipped {n}",
  "table.patch": "Item",
  "table.status": "Status",
  "status.applied": "Applied",
  "status.pending": "Pending",
  "status.unmatched": "No match",
  "status.partial": "Partial",
  "status.partialDetail": " ({done}/{total} targets)",
  "status.drifted": "Drifted",
  "status.disabled": "Opt-in off",
  "status.skipped": "Skipped",
  "apply.hint": "Apply writes patches and hangs the current default prompt. A stale plugin default in the box is refreshed from the sealed slot; a separate save is unnecessary. Only a prompt you wrote yourself is kept from the box. Pending = original text still present. Skipped = not needed for this version or the component is not installed.",
  "warn.noRoot": "Could not find this host\u2019s @deepseek-ai tree, so Apply will not patch anything. Fully quit and reopen this host, then Apply here. Desktop may live on any drive; folder names like DeepseekHarnessDesktop or DeepSeek Harness are fine.",
  "restart.fullQuit": "Restarting. The client will open again by itself.",
  "warn.noInject": "Official mode always uses the default prompt. Red team uses only the active rule set; otherwise it uses the default prompt without the CTF section, then the red team steps. If both are empty you will be asked to add a prompt.",
  "need.prompt": "Both the prompt and the rule set are empty. Add a prompt, or enable a rule that has content.",
  "btn.restoreInject": "Reset default",
  "saved.restoreInject": "Default prompt restored",
  skip: "Skipped",
  unknown: "Unknown",
  delete: "Delete",
  "btn.apply": "Apply",
  "btn.apply.busy": "Working\u2026",
  "btn.revert": "Restore",
  "btn.revert.tip": "Revert only removes host patches; prompt injection and this plugin's runtime are untouched.",
  "inject.on": "inject",
  "inject.off": "inject body empty",
  "btn.uninstall": "Uninstall",
  "btn.uninstall.busy": "Uninstalling\u2026",
  "uninstall.title": "Uninstall dsh-purge",
  "uninstall.body": "Uninstall? This restores the original Harness and removes this plugin completely.",
  "uninstall.confirm": "Uninstall",
  "uninstall.cancel": "Cancel",
  "uninstall.applying": "Uninstalling and restoring\u2026",
  "uninstall.done": "Uninstalled and restored. Restarting\u2026",
  "uninstall.fail": "Uninstall failed: {error}",
  "restart.official.title": "Restart required",
  "restart.official.body": "Patches are written. Click Restart and the client opens again by itself.",
  "update.tip": "latest",
  "update.current": "current",
  "action.apply": "Apply",
  "action.revert": "Restore",
  "ok.done": "Done",
  "err.action": "Failed: {error}",
  "err.status": "Read failed: {error}",
  "err.override": "Read failed: {error}",
  "err.save": "Save failed: {error}",
  "btn.saveInject": "Save",
  "saved.override": "Saved",
  restarting: "Restarting\u2026",
  "restart.timeout": "Timed out; refresh",
  "restart.fail": "Failed: {error}",
  "restart.notStarted": "Restart did not start. This client is still open, and it will not try again by itself.",
  "restart.already": "This restart already started. It will not restart again.",
  "restart.confirm": "Apply finished. Restart to take effect.",
  "restart.confirm.desktop": "Apply finished. Restart the desktop app to take effect.",
  "restart.ask.title": "Restart now?",
  "restart.ask.body": "It is written. It takes effect in this client after a restart.",
  "restart.now": "Restart now",
  "restart.notNow": "Later",
  "restart.asarSwap": "Patches are on disk. Quitting the desktop app and moving app.asar aside; it will reopen when done. If behavior is unchanged, fully quit Harness (including tray) and Apply again.",
  "surface.web": "Web",
  "surface.desktop": "Desktop",
  "surface.gui": "GUI",
  "surface.tui": "TUI",
  "restart.incomplete": "Apply did not complete. {detail}",
  "restart.incomplete.patches": "{failed} item(s) failed (#{ids}); inspect the item details",
  "restart.incomplete.flash": "Console-window suppression check failed ({entry})",
  "restart.incomplete.host": "Target host writes are not confirmed; check the client, host version and target path",
  "restart.incomplete.restore": "Configuration restoration did not complete; inspect diagnostics",
  "restart.incomplete.runtime": "CLI runtime check or repair failed; inspect diagnostics",
  "restart.incomplete.unknown": "The backend did not provide a specific cause; inspect the host version, item details and diagnostics",
  "restart.later": "Later",
  "group.prompt": "Prompt",
  "group.code": "Code",
  "group.engine": "Engine",
  "group.tools": "Tools",
  "group.compat": "complete-mode fallback",
  "group.dsh20": "0.2.0",
  "patch.1": "Global disclaimer \u2192 mandate",
  "patch.2": "Replacement disclaimer \u2192 mandate",
  "patch.3": "Scope disclaimer \u2192 mandate",
  "patch.4": "Persona session mandate",
  "patch.5": "Approval copy \u2192 full access",
  "patch.6": "Sandbox deny \u2192 allow write",
  "patch.7": "Sandbox default full access",
  "patch.8": "Approval default never",
  "patch.9": "Approval gate auto-grant",
  "patch.10": "Approval config default never",
  "patch.11": "never copy \u2192 auto-grant",
  "patch.12": "ask copy \u2192 auto-grant",
  "patch.13": "Escalation ladder exempt",
  "patch.14": "Escalation unconditional grant",
  "patch.15": "Sandbox confine passthrough",
  "patch.16": "Filesystem fence off",
  "patch.17": "Observation policy allow R/W",
  "patch.18": "Repeat-call guard off",
  "patch.19": "Tool-result pruner off",
  "patch.21": "Restore plugin-raised bash wait",
  "patch.22": "read cap raised",
  "patch.23": "subagent depth 3 \u2192 10",
  "patch.24": "preset fetch on",
  "patch.25": "Strip official default identity (keep feature prompts)",
  "patch.26": "minimal: strip identity, open inject",
  "patch.28": "dsh-liangshen: keep dsh-purge / dshpg in phase-1",
  "patch.70": "Minimal shell drops the no-network line",
  "patch.71": "Liangshen drops the stock identity line",
  "patch.29": "dsh-tool-web: untrusted framing \u2192 usable data",
  "patch.30": "dsh-hooks-claude-code: deny\u2192allow",
  "patch.31": "dsh-hooks-codex: deny\u2192allow",
  "patch.32": "Web surface identity neutral",
  "patch.33": "Shell denial prompt \u2192 executable",
  "patch.34": "Sandbox hint neutralized",
  "patch.35": "Escalation never-reject",
  "patch.36": "FS escalation schema opened",
  "patch.37": "Subagent scope lock neutralized",
  "patch.38": "persona text\u2192prefix (0.1.2 presets)",
  "patch.39": "session v0 plugin summary (mnemon)",
  "patch.40": "Keep inject when a complete prompt is set",
  "patch.42": "Settings legacy API",
  "patch.43": "Strip identity from web presets",
  "patch.45": "Official desktop update handoff",
  "patch.46": "Official update script stays ASCII",
  "patch.47": "OAuth no longer inserts Claude identity",
  "patch.48": "Shell drops extra delete caution",
  "patch.49": "OAuth no longer mimics claude-cli",
  "patch.50": "Session references are not marked untrusted",
  "patch.51": "Fresh session stays on full access",
  "patch.52": "Session log upload off by default",
  "patch.53": "Web prompt drops do-not-start",
  "patch.54": "Deliverable prompt drops extra prohibition",
  "patch.55": "Replace the first system prompt every step",
  "patch.56": "Rewind hides only the cut range",
  "patch.57": "developer role for openai/azure only, third-party gateways use system",
  "patch.58": "Rewind markers stay off the model request",
  "patch.59": "Official Auto Review no longer denies tools",
  "patch.60": "Official run_code drops approval teaching",
  "patch.61": "Official sandbox policy no longer teaches refusal",
  "patch.62": "Fail-open without approval channel (user reject kept)",
  "patch.63": "Plan mode no longer soft-blocks execution",
  "patch.64": "Stop hook no longer steers fake user text",
  "patch.65": "UserPromptSubmit deny no longer rejects turn",
  "patch.66": "Empty system section no longer ends the turn as an internal error",
  "patch.67": "A missing messages list no longer ends the turn",
  "patch.68": "Missing content after rewind no longer ends the turn",
  "patch.69": "deepseek-flash keeps the official in-history flag",
  "patch.72": "Messages system field uses the current system prompt",
  "patch.73": "Minimal preset drops stray mirror sentence",
  "patch.74": "Hang default prompt before first assemble",
  "patch.75": "Rewind resets completed todos to pending",
  "patch.76": "Unrestricted preset: strip identity sentence",
  "patch.77": "Rewind marker drops already-sent messages",
  "patch.78": "Restore missing overlay from .bak backup",
  "patch.80": "Restore official minimal tool plugins",
  "patch.82": "Fallback DSH_PROFILE=desktop in main process",
  "patch.83": "Don't fail on signal kill (no crash dialog)",
  "patch.84": "Don't fail on code=0 clean exit (no stopped dialog)",
  "status.na": "Not for this host",
  "status.unlocated": "Not located",
  "rewind.label": "Undo",
  "rewind.aria": "Undo",
  "rewind.busy": "Undoing\u2026",
  "rewind.fail": "Undo failed: {error}",
  "rewind.once": "Undo once",
  "rewind.once.hint": "Put this round's message back in the box and drop only this round",
  "rewind.round": "Undo last round",
  "rewind.round.hint": "Put this round's message back in the box; subagents drop only this round"
};

// src/shared/runtime-error.js
function runtimeRepairDetails(report) {
  if (!report || report.ok !== false) return [];
  const text = (value) => typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").slice(0, 1200) : "";
  const details = [];
  const add = (label, value) => {
    const safe = text(value);
    if (safe) details.push(`${label}: ${safe}`);
  };
  add("runtime", report.reason);
  add("runtime error", report.error);
  add("runtime code", report.code);
  const link = report.symlink;
  if (link?.ok === false) {
    add("runtime link", link.reason);
    add("link error", link.error);
    add("link code", link.code);
    add("backup", link.backup);
    add("retained candidate", link.failedLink);
    if (link.rollback?.ok === false) {
      details.push("rollback: failed");
      add("rollback error", link.rollback.error);
    } else if (link.rollback?.ok === true) {
      details.push("rollback: original link restored");
    }
  }
  for (const shim of (Array.isArray(report.shims) ? report.shims : []).slice(
    0,
    8
  )) {
    if (!["read_error", "write_error"].includes(shim?.status)) continue;
    add("launcher", shim.path);
    add("launcher status", shim.status);
    add("launcher error", shim.error);
  }
  return details;
}

// src/api/client.js
function clientGuessSurface() {
  try {
    if (typeof navigator !== "undefined" && /electron/i.test(navigator.userAgent || ""))
      return "desktop";
    if (typeof location !== "undefined") {
      const port = String(location.port || "");
      if (port === "43120") return "desktop";
      const host3 = String(location.hostname || "");
      if (host3 && host3 !== "127.0.0.1" && host3 !== "localhost" && /dsh desktop/i.test(String(location.href || "")))
        return "desktop";
    }
  } catch {
  }
  return "";
}
function hostSurfaceOf(s) {
  return s && s.surface || clientGuessSurface() || "web";
}
function hostText(t, key, surface) {
  if (surface && surface !== "web") {
    const specific = key + "." + surface;
    const hit = t(specific);
    if (hit && hit !== specific) return hit;
  }
  return t(key);
}
function apiUrl(p, context = {}) {
  try {
    const loc = context.href || window.location.href || window.location.origin + "/";
    const page = new URL(loc);
    const module2 = new URL(
      context.moduleUrl || typeof __PURGE_MODULE_URL__ !== "undefined" && __PURGE_MODULE_URL__ || page.href,
      page
    );
    let base;
    const marker = module2.pathname.indexOf("/plugins/");
    if (module2.origin === page.origin && marker >= 0) {
      base = new URL(module2.pathname.slice(0, marker + 1), page);
    } else {
      const declared = context.baseURI || typeof document !== "undefined" && document.baseURI;
      const candidate = declared && new URL(declared, page);
      base = candidate && candidate.origin === page.origin ? candidate : page;
      base = new URL(base.href);
      if (!base.pathname.endsWith("/")) base.pathname += "/";
    }
    base.search = "";
    base.hash = "";
    if (typeof p !== "string" || !p.startsWith("/") || p.startsWith("//"))
      return p;
    return new URL(p.slice(1), base).toString();
  } catch {
    return p;
  }
}
function apiTimeoutMs(p, init) {
  const path = String(p || "");
  const method = String(init && init.method || "GET").toUpperCase();
  if (path.indexOf("/dsh-purge/community") !== -1)
    return method === "POST" ? 6e5 : 2e4;
  if (path.indexOf("/dsh-purge/update") !== -1)
    return method === "POST" ? 18e4 : 45e3;
  if (path.indexOf("/dsh-purge/uninstall") !== -1) return 9e4;
  if (path.indexOf("/dsh-purge/skill") !== -1)
    return method === "POST" ? 12e4 : 2e4;
  if (path.indexOf("/dsh-purge/status") !== -1) return 6e4;
  if (path.indexOf("/dsh-purge/apply") !== -1) return 24e4;
  if (path.indexOf("/dsh-purge/revert") !== -1) return 12e4;
  if (path.indexOf("/dsh-purge/restart") !== -1) return 6e4;
  return 2e4;
}
function isAbortError(e) {
  const msg = String(e && e.message || e || "");
  return e && e.name === "AbortError" || /aborted|abort/i.test(msg);
}
function apiError(message, status) {
  return Object.assign(new Error(message), { status });
}
var pendingStatus = null;
function apiJson(p, init) {
  const method = String(init?.method || "GET").toUpperCase();
  if (method !== "GET") pendingStatus = null;
  if (p !== "/dsh-purge/status" || init) return requestJson(p, init);
  if (pendingStatus) return pendingStatus;
  const request = requestJson(p, init);
  pendingStatus = request;
  const clear = () => {
    if (pendingStatus === request) pendingStatus = null;
  };
  request.then(clear, clear);
  return request;
}
function unavailableStatus(error) {
  return {
    ok: false,
    error: String(error?.message || error || "bad response")
  };
}
async function requestJson(p, init) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), apiTimeoutMs(p, init));
  try {
    const r = await fetch(
      apiUrl(p),
      Object.assign(
        { cache: "no-store", credentials: "same-origin", signal: ctrl.signal },
        init || {}
      )
    );
    const text = await r.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      throw apiError(r.status + " non-json: " + text.slice(0, 120), r.status);
    }
    if (!r.ok) {
      const runtimeDetails = runtimeRepairDetails(data?.cli_repair);
      const message = data && (data.error || data.message) || r.status + " " + r.statusText;
      throw Object.assign(
        apiError([message, ...runtimeDetails].join("\n"), r.status),
        { runtimeDetails }
      );
    }
    return data;
  } catch (e) {
    if (isAbortError(e)) throw new Error("timeout");
    const msg = String(e && e.message || e || "");
    if (!e?.status && /failed to fetch|networkerror|load failed/i.test(msg)) {
      throw new Error("\u8FDE\u4E0D\u4E0A\u63A5\u53E3\uFF0C\u8BF7\u786E\u8BA4 dsh \u8FD8\u5728\u8DD1\u540E Ctrl+F5");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
function promptBoxEmpty(text) {
  return !String(text || "").trim();
}
function responseNeedsPrompt(d) {
  return Boolean(d && (d.needPrompt || d.injectSource === "none"));
}
async function bothInjectEmpty(overrideText, defaultText) {
  if (!promptBoxEmpty(overrideText)) return false;
  if (!promptBoxEmpty(defaultText)) return false;
  return true;
}

// src/components/patch-status.js
function statusKind(st) {
  if (st === "applied" || st === "already") return "ok";
  if (st === "pending") return "wait";
  if (st === "unmatched") return "bad";
  if (st === "partial") return "bad";
  if (st === "drifted") return "bad";
  if (st === "disabled") return "muted";
  if (st === "na") return "ok";
  if (st === "missing_file" || st === "skipped" || st === "unlocated" || st === "off")
    return "miss";
  return "bad";
}
function statusLabel(st, t) {
  if (st === "applied" || st === "already") return t("status.applied");
  if (st === "off") return t("status.skipped");
  if (st === "pending") return t("status.pending");
  if (st === "unmatched") return t("status.unmatched");
  if (st === "partial") return t("status.partial");
  if (st === "drifted") return t("status.drifted");
  if (st === "disabled") return t("status.disabled");
  if (st === "skipped") return t("status.skipped");
  if (st === "missing_file") return t("skip");
  if (st === "unlocated") return t("status.unlocated");
  if (st === "na") return t("status.na");
  return st || t("unknown");
}
var LAYER_GROUP = {
  \u63D0\u793A\u8BCD: "prompt",
  \u4EE3\u7801: "code",
  \u5DE5\u5177: "tools",
  "\u5B8C\u6574\u6A21\u5F0F\u515C\u5E95": "compat",
  "0.2.0 \u517C\u5BB9": "dsh20"
};
var GROUP_ORDER = ["prompt", "code", "tools", "compat", "dsh20"];
function patchRowsOf(state) {
  if (!state || !state.ai_base) return [];
  const fromList = Array.isArray(state.patches) ? state.patches : null;
  const rows = fromList ? fromList.map((p) => ({
    id: Number(p.id),
    st: p.status || "missing_file",
    layer: p.layer || ""
  })) : Object.keys(state.patch_status || {}).map((id) => ({
    id: Number(id),
    st: state.patch_status[id],
    layer: ""
  }));
  return rows.filter((r) => r.st && r.st !== "na" && Number.isFinite(r.id));
}
function tallyPatches(rows) {
  const out = {
    applied: 0,
    pending: 0,
    unmatched: 0,
    partial: 0,
    drifted: 0,
    disabled: 0,
    skipped: 0,
    total: 0
  };
  for (const row of rows || []) {
    out.total += 1;
    if (row.st === "applied" || row.st === "already") out.applied += 1;
    else if (row.st === "pending") out.pending += 1;
    else if (row.st === "unmatched") out.unmatched += 1;
    else if (row.st === "partial") out.partial += 1;
    else if (row.st === "drifted") out.drifted += 1;
    else if (row.st === "disabled") out.disabled += 1;
    else out.skipped += 1;
  }
  return out;
}
function PatchGroups({ state }) {
  const t = useT();
  const [open, setOpen] = useState({});
  if (state?.ok === false)
    return h(
      "p",
      { role: "status" },
      "\u8BFB\u53D6\u5931\u8D25\uFF0C\u8865\u4E01\u660E\u7EC6\u6682\u4E0D\u53EF\u7528\uFF1B\u8BF7\u5237\u65B0\u91CD\u8BD5\u3002"
    );
  if (!state || !state.patch_status)
    return h("div", { className: "dshpp-skel", style: { height: 120 } });
  const located = !!state.ai_base;
  if (!located) return null;
  const grouped = /* @__PURE__ */ new Map();
  for (const row of patchRowsOf(state)) {
    const key = LAYER_GROUP[row.layer] || "code";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  return GROUP_ORDER.filter((key) => grouped.has(key)).map((key) => {
    const rows = grouped.get(key).slice().sort((a, b) => a.id - b.id);
    if (!rows.length) return null;
    const tally = tallyPatches(rows);
    const notes = [];
    if (tally.pending)
      notes.push(t("metric.pendingShort", { n: tally.pending }));
    if (tally.unmatched)
      notes.push(t("metric.unmatchedShort", { n: tally.unmatched }));
    if (tally.partial)
      notes.push(t("metric.partialShort", { n: tally.partial }));
    if (tally.drifted)
      notes.push(t("metric.driftedShort", { n: tally.drifted }));
    if (tally.disabled)
      notes.push(t("metric.disabledShort", { n: tally.disabled }));
    if (tally.skipped) notes.push(t("metric.skipShort", { n: tally.skipped }));
    const expanded = !!open[key];
    return h(
      "div",
      { key, className: "dshpp-group" },
      h(
        "button",
        {
          type: "button",
          className: "dshpp-group-h",
          "aria-expanded": expanded ? "true" : "false",
          onClick: () => setOpen((prev) => Object.assign({}, prev, { [key]: !prev[key] }))
        },
        h("strong", null, t("group." + key)),
        h(
          "span",
          { className: "dshpp-count" },
          tally.applied + "/" + tally.total + (notes.length ? " \xB7 " + notes.join(" \xB7 ") : "")
        )
      ),
      expanded ? h(
        "table",
        { className: "dshpp-table" },
        h(
          "thead",
          null,
          h(
            "tr",
            null,
            h("th", null, "#"),
            h("th", null, t("table.patch")),
            h("th", null, t("table.status"))
          )
        ),
        h(
          "tbody",
          null,
          rows.map(
            (r) => h(
              "tr",
              { key: r.id },
              h("td", { className: "dshpp-id" }, "#" + r.id),
              h("td", null, t("patch." + r.id)),
              h(
                "td",
                null,
                h(Pill, { value: r.st }),
                r.st === "partial" ? h(
                  "span",
                  { className: "dshpp-sub" },
                  t("status.partialDetail", {
                    done: (state.patch_files?.[r.id] || []).filter(
                      (f) => f.status === "applied"
                    ).length,
                    total: (state.patch_files?.[r.id] || []).length
                  })
                ) : null
              )
            )
          )
        )
      ) : null
    );
  });
}

// src/components/primitives.js
function noticeNode(notice) {
  if (!notice || notice.kind === "idle" || !notice.text) return null;
  return h(
    "span",
    {
      className: "dshpp-notice " + (notice.kind === "error" ? "is-bad" : "is-ok")
    },
    notice.text
  );
}
function Btn(props) {
  const { kind, tiny, children, className, type, ...rest } = props;
  const cls = [
    "dshpp-btn",
    kind ? "dshpp-btn-" + kind : "dshpp-btn-ghost",
    tiny ? "dshpp-btn-tiny" : "",
    className || ""
  ].filter(Boolean).join(" ");
  return h(
    "button",
    Object.assign({ type: type || "button", className: cls }, rest),
    children
  );
}
function Pill({ value, label }) {
  const t = useT();
  return h(
    "span",
    { className: "dshpp-pill is-" + statusKind(value) },
    label || statusLabel(value, t)
  );
}
function HelpTip({ title, children, label }) {
  const [open, setOpen] = useState(false);
  return h(
    "span",
    { className: "dshpp-help" },
    h(
      "button",
      {
        type: "button",
        className: "dshpp-help-btn",
        "aria-label": (label || title || "\u8BF4\u660E") + "\uFF08\u67E5\u770B\u8BF4\u660E\uFF09",
        "aria-expanded": open ? "true" : "false",
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
        onClick: (e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }
      },
      "?"
    ),
    open ? h(
      "span",
      { className: "dshpp-tip", role: "tooltip" },
      title ? h("b", null, title) : null,
      children ? h("span", null, children) : null
    ) : null
  );
}

// src/shared/apply-result.js
function incompleteApplyDetail(result, t) {
  const parts = [];
  if (result.failed > 0) {
    const ids = (Array.isArray(result.failed_items) ? result.failed_items : []).map((item) => item?.id).filter((id) => id != null).join(",");
    parts.push(
      t("restart.incomplete.patches", {
        failed: String(result.failed),
        ids: ids || "?"
      })
    );
  }
  if (result.cmd_flash?.ok === false)
    parts.push(
      t("restart.incomplete.flash", {
        entry: String(result.cmd_flash.entry || "unknown")
      })
    );
  if (result.host_written === false) parts.push(t("restart.incomplete.host"));
  if (result.hook_restore_failed === true)
    parts.push(t("restart.incomplete.restore"));
  if (result.cli_repair?.ok === false)
    parts.push(
      t("restart.incomplete.runtime"),
      ...runtimeRepairDetails(result.cli_repair)
    );
  return parts.length ? parts.join("\uFF1B") : t("restart.incomplete.unknown");
}

// src/components/restart.js
var rd = __toESM(require("react-dom"), 1);
function RestartAsk(props) {
  const node = h(
    "div",
    {
      className: "dshpp-restart-mask",
      "data-theme": props.theme === "dusk" ? "dusk" : "white",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "dshpp-restart-title",
      onClick: (e) => {
        if (e.target === e.currentTarget && props.onLater) props.onLater();
      }
    },
    h(
      "div",
      { className: "dshpp-restart-card" },
      h("h4", { id: "dshpp-restart-title" }, props.t("restart.ask.title")),
      h("p", null, props.t("restart.ask.body")),
      h(
        "div",
        { className: "dshpp-modal-ops" },
        h(Btn, { onClick: props.onLater }, props.t("restart.notNow")),
        h(
          Btn,
          { kind: "primary", onClick: props.onRestart },
          props.t("restart.now")
        )
      )
    )
  );
  try {
    if (rd && typeof rd.createPortal === "function" && typeof document !== "undefined" && document.body) {
      return rd.createPortal(node, document.body);
    }
  } catch {
  }
  return node;
}
function reopenAfterRestart() {
  window.location.reload();
}
function waitForRestart(setNotice, setBusy, t) {
  const started = Date.now();
  let sawDown = false;
  const ping = () => {
    fetch(apiUrl("/dsh-purge/status"), {
      cache: "no-store",
      credentials: "same-origin"
    }).then((r) => r.ok ? r.json() : Promise.reject()).then((d) => {
      if (!sawDown) {
        retry();
        return;
      }
      if (d && d.ok && d.ready !== false) reopenAfterRestart();
      else retry();
    }).catch(() => {
      sawDown = true;
      retry();
    });
  };
  const retry = () => {
    if (Date.now() - started > 9e4) {
      setNotice({ kind: "error", text: t("restart.timeout") });
      setBusy(false);
      return;
    }
    setTimeout(ping, 500);
  };
  setTimeout(ping, 800);
}
var restartOnce = false;
function restartDsh(setNotice, setBusy, t, surface) {
  if (restartOnce) return;
  const surf = surface || clientGuessSurface() || "desktop";
  const desktop = surf === "desktop" || clientGuessSurface() === "desktop";
  restartOnce = true;
  setBusy(true);
  setNotice({ kind: "ok", text: hostText(t, "restarting", surf) });
  const stop = (error) => {
    restartOnce = false;
    setNotice({
      kind: "error",
      text: error ? t("restart.fail", { error }) : t("restart.notStarted")
    });
    setBusy(false);
  };
  let sawDrop = false;
  const watch = setTimeout(() => {
    if (sawDrop) return;
    stop("");
  }, 25e3);
  fetch(apiUrl("/dsh-purge/restart"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  }).then((r) => r.json()).then((d) => {
    if (!d.ok) throw new Error(d.error || "restart failed");
    if (d.manualQuit) {
      clearTimeout(watch);
      restartOnce = false;
      setBusy(false);
      setNotice({ kind: "ok", text: d.note || t("restart.manualQuit") });
      return;
    }
    const next = d && d.surface || surf;
    const full = next === "desktop" || d && d.fullApp || desktop;
    if (full && d.already) {
      setNotice({ kind: "ok", text: hostText(t, "restarting", next) });
      return;
    }
    if (full && d.restarting === false) {
      clearTimeout(watch);
      stop(d.error || "not started");
      return;
    }
    setNotice({ kind: "ok", text: hostText(t, "restarting", next) });
    if (full) return;
    clearTimeout(watch);
    restartOnce = false;
    waitForRestart(setNotice, setBusy, t);
  }).catch((e) => {
    const msg = String(e && e.message || e || "");
    const dropped = /failed to fetch|networkerror|load failed/i.test(msg) || e.name === "TypeError";
    if (dropped && desktop) {
      sawDrop = true;
      clearTimeout(watch);
      return;
    }
    clearTimeout(watch);
    stop(msg || "restart failed");
  });
}
function detectHostTheme() {
  try {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (document.body?.hasAttribute("data-ds-dark-theme") || root?.hasAttribute("data-ds-dark-theme"))
        return "dusk";
      const scheme = (root.style.colorScheme || getComputedStyle(root).colorScheme || getComputedStyle(root).getPropertyValue("color-scheme") || "").toLowerCase();
      if (scheme.includes("dark")) return "dusk";
      if (scheme.includes("light")) return "white";
    }
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dusk";
    }
  } catch {
  }
  return "white";
}

// src/components/settings-form.js
function PurgifySection({ page = "status", onStatus } = {}) {
  const t = useT();
  const tRef = useRef(t);
  tRef.current = t;
  const [state, setState] = useState(null);
  useEffect(() => {
    if (onStatus) onStatus(state);
  }, [state, onStatus]);
  const [override, setOverride] = useState("");
  const [defaultOverride, setDefaultOverride] = useState("");
  const [overrideLoaded, setOverrideLoaded] = useState(false);
  const [ownServers, setOwnServers] = useState("");
  const [ownLoaded, setOwnLoaded] = useState(false);
  const [ownBusy, setOwnBusy] = useState(false);
  const ownPending = useRef(false);
  const promptPending = useRef(false);
  const ownRef = useRef("");
  ownRef.current = ownServers;
  const [patchBusy, setPatchBusy] = useState(false);
  const [askRestart, setAskRestart] = useState(false);
  const suppressRestartAsk = useRef(false);
  const [askUninstall, setAskUninstall] = useState(false);
  const [uninstallBusy, setUninstallBusy] = useState(false);
  const [notice, setNotice] = useState({ kind: "idle", text: "" });
  const actionTicket = useRef(0);
  const overrideRef = useRef("");
  const defaultOverrideRef = useRef("");
  const promptSeededRef = useRef(false);
  const ownSeededRef = useRef(false);
  const promptAreaRef = useRef(null);
  overrideRef.current = override;
  defaultOverrideRef.current = defaultOverride;
  const readPromptBox = () => {
    const node = promptAreaRef.current;
    const live = node && typeof node.value === "string" ? node.value : overrideRef.current;
    overrideRef.current = live || "";
    return overrideRef.current;
  };
  const loadAll = useCallback(() => {
    const tr = tRef.current;
    apiJson("/dsh-purge/status").then((d) => {
      if (d && d.ok) {
        setState(d);
        setNotice(
          (previous) => previous?.source === "status" ? { kind: "idle", text: "" } : previous
        );
        if (d.boot_full_quit && !suppressRestartAsk.current)
          setAskRestart(true);
      } else {
        setState(unavailableStatus(d?.error || "bad response"));
        setNotice({
          kind: "error",
          source: "status",
          text: tr("err.status", { error: d && d.error || "bad response" })
        });
      }
    }).catch((e) => {
      setState(unavailableStatus(e));
      setNotice({
        kind: "error",
        source: "status",
        text: tr("err.status", { error: e.message })
      });
    });
    apiJson("/dsh-purge/override").then((d) => {
      if (d && d.ok) {
        const packed = typeof d.defaultContent === "string" ? d.defaultContent : "";
        const shown = typeof d.content === "string" ? d.content : packed;
        if (packed) setDefaultOverride(packed);
        if (!promptSeededRef.current) {
          promptSeededRef.current = true;
          setOverride(shown || packed);
        }
        setOverrideLoaded(true);
      } else
        setNotice({
          kind: "error",
          text: tr("err.override", { error: d && d.error || "" })
        });
    }).catch(
      (e) => setNotice({
        kind: "error",
        text: tr("err.override", { error: e.message })
      })
    );
    apiJson("/dsh-purge/own-servers").then((d) => {
      if (d && d.ok) {
        if (!ownSeededRef.current) {
          ownSeededRef.current = true;
          setOwnServers(typeof d.content === "string" ? d.content : "");
        }
        setOwnLoaded(true);
      }
    }).catch(() => {
    });
  }, []);
  useEffect(() => {
    loadAll();
  }, [loadAll]);
  const rejectNeedPrompt = useCallback((tr) => {
    setAskRestart(false);
    setNotice({ kind: "error", text: tr("need.prompt") });
    setTimeout(() => window.alert(tr("need.prompt")), 0);
  }, []);
  const doAction = useCallback(
    (action, actionKey) => {
      const tr = tRef.current;
      const label = tr(actionKey);
      const ticket = ++actionTicket.current;
      const run = () => {
        setPatchBusy(true);
        setAskRestart(false);
        setNotice({ kind: "idle", text: "" });
        const applyContent = action === "apply" ? readPromptBox() : "";
        fetch(apiUrl("/dsh-purge/" + action), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(
            action === "apply" ? { content: applyContent } : {}
          )
        }).then((r) => r.json()).then((d) => {
          if (ticket !== actionTicket.current) return;
          if (responseNeedsPrompt(d)) {
            rejectNeedPrompt(tr);
            return;
          }
          if (!d.ok) {
            setNotice({
              kind: "error",
              text: tr("err.action", {
                action: label,
                error: [
                  d.error || "",
                  ...runtimeRepairDetails(d.cli_repair)
                ].join("\n")
              })
            });
            return;
          }
          if (action === "apply") {
            if (typeof d.defaultContent === "string")
              setDefaultOverride(d.defaultContent);
            if (typeof d.override_content === "string") {
              setOverride(d.override_content);
              setOverrideLoaded(true);
            }
          }
          if (action === "apply" && d.complete === false) {
            setNotice({
              kind: "error",
              text: tr("restart.incomplete", {
                detail: incompleteApplyDetail(d, tr)
              })
            });
            loadAll();
            if (d.restarting || d.needs_full_quit) {
              suppressRestartAsk.current = false;
              setAskRestart(true);
            }
            return;
          }
          if (action === "apply") {
            if (d.manualQuit) {
              setNotice({
                kind: "ok",
                text: "\u8865\u4E01\u5DF2\u5199\u5165\u78C1\u76D8\uFF0C\u5F53\u524D\u8FDB\u7A0B\u5C1A\u672A\u52A0\u8F7D\u3002\u6362\u5305\u52A9\u624B\u7B49\u5F85\u4F60\u5B8C\u6574\u9000\u51FA\uFF08macOS \u7528 \u2318Q\uFF0CWindows \u4ECE\u7CFB\u7EDF\u6258\u76D8\u9000\u51FA\uFF09\u3002\u786E\u8BA4\u6362\u5305\u5B8C\u6210\u540E\u518D\u624B\u52A8\u6253\u5F00 DSH\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u542F\u3002"
              });
              setAskRestart(false);
              loadAll();
              return;
            }
            setNotice({ kind: "ok", text: tr("ok.done") });
            loadAll();
            if (d.restarting || d.needs_full_quit) {
              suppressRestartAsk.current = false;
              setAskRestart(true);
            } else {
              setAskRestart(false);
            }
            return;
          }
          setNotice({ kind: "ok", text: tr("ok.done") });
          loadAll();
        }).catch((e) => {
          if (ticket !== actionTicket.current) return;
          setNotice({
            kind: "error",
            text: tr("err.action", { action: label, error: e.message })
          });
        }).finally(() => {
          if (ticket === actionTicket.current) setPatchBusy(false);
        });
      };
      run();
    },
    [loadAll, rejectNeedPrompt, state]
  );
  const saveOverride = useCallback(async () => {
    if (promptPending.current) return;
    promptPending.current = true;
    const ticket = ++actionTicket.current;
    const content = readPromptBox();
    setPatchBusy(true);
    setNotice({ kind: "idle", text: "" });
    try {
      if (await bothInjectEmpty(content, defaultOverrideRef.current)) {
        rejectNeedPrompt(t);
        return;
      }
      const d = await apiJson("/dsh-purge/override", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (ticket !== actionTicket.current) return;
      if (responseNeedsPrompt(d)) {
        rejectNeedPrompt(t);
        return;
      }
      if (!d || !d.ok) throw new Error(d && d.error || "\u4FDD\u5B58\u5931\u8D25");
      const unchanged = readPromptBox() === content;
      if (unchanged && typeof d.content === "string") {
        overrideRef.current = d.content;
        setOverride(d.content);
      }
      setNotice({
        kind: "ok",
        text: unchanged ? t("saved.override") : "\u5DF2\u4FDD\u5B58\u63D0\u4EA4\u7684\u7248\u672C\uFF1B\u5F53\u524D\u4FEE\u6539\u5C1A\u672A\u4FDD\u5B58\u3002"
      });
    } catch (e) {
      if (ticket === actionTicket.current) {
        const msg = String(e?.message || "");
        if (msg.includes("reset_requires_confirm") || msg.includes("\u663E\u5F0F\u786E\u8BA4")) {
          setNotice({
            kind: "error",
            text: "\u78C1\u76D8\u4E0A\u662F\u4F60\u7684\u63D0\u793A\u8BCD\u6B63\u6587\uFF0C\u4FDD\u5B58\u88AB\u62D2\u7EDD\uFF1A\u8981\u628A\u51FA\u5382\u9ED8\u8BA4\u5199\u56DE\u53BB\uFF0C\u8BF7\u7528\u300C\u6062\u590D\u9ED8\u8BA4\u300D\u3002"
          });
        } else {
          setNotice({ kind: "error", text: t("err.save", { error: msg }) });
        }
      }
    } finally {
      promptPending.current = false;
      if (ticket === actionTicket.current) setPatchBusy(false);
    }
  }, [t, rejectNeedPrompt]);
  const saveOwnServers = async () => {
    if (ownPending.current || !ownLoaded) return;
    ownPending.current = true;
    setOwnBusy(true);
    const content = ownRef.current;
    try {
      const d = await apiJson("/dsh-purge/own-servers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (!d || !d.ok) throw new Error(d && d.error || "\u4FDD\u5B58\u5931\u8D25");
      const unchanged = ownRef.current === content;
      if (unchanged && typeof d.content === "string") {
        ownRef.current = d.content;
        setOwnServers(d.content);
      }
      setNotice({
        kind: "ok",
        text: !unchanged ? "\u5DF2\u4FDD\u5B58\u63D0\u4EA4\u7684\u7248\u672C\uFF1B\u5F53\u524D\u4FEE\u6539\u5C1A\u672A\u4FDD\u5B58\u3002" : d.dropped > 0 ? t("saved.own.dropped", { n: d.dropped }) : t("saved.own")
      });
    } catch (e) {
      setNotice({ kind: "error", text: t("err.save", { error: e.message }) });
    } finally {
      ownPending.current = false;
      setOwnBusy(false);
    }
  };
  const restoreOverride = useCallback(() => {
    if (!defaultOverride) return;
    const tr = t;
    const ticket = ++actionTicket.current;
    overrideRef.current = defaultOverride;
    setOverride(defaultOverride);
    setPatchBusy(true);
    setNotice({ kind: "idle", text: "" });
    apiJson("/dsh-purge/override", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: defaultOverride, reset: true })
    }).then((d) => {
      if (ticket !== actionTicket.current) return;
      if (!d || !d.ok) {
        setNotice({
          kind: "error",
          text: tr("err.save", { error: d && d.error || "" })
        });
        return;
      }
      const unchanged = readPromptBox() === defaultOverride;
      if (typeof d.content === "string" && unchanged) {
        overrideRef.current = d.content;
        setOverride(d.content);
      }
      setNotice({
        kind: "ok",
        text: unchanged ? tr("saved.restoreInject") : "\u5DF2\u6062\u590D\u9ED8\u8BA4\u503C\uFF1B\u5F53\u524D\u4FEE\u6539\u5C1A\u672A\u4FDD\u5B58\u3002"
      });
    }).catch((e) => {
      if (ticket !== actionTicket.current) return;
      setNotice({
        kind: "error",
        text: tr("err.save", { error: e.message })
      });
    }).finally(() => {
      if (ticket === actionTicket.current) setPatchBusy(false);
    });
  }, [defaultOverride, t]);
  const waitHostAfterUninstall = useCallback((tr) => {
    const started = Date.now();
    const ping = () => {
      fetch(apiUrl("/"), { cache: "no-store", credentials: "same-origin" }).then((r) => {
        if (r.ok) {
          try {
            window.localStorage.removeItem("dshpp-theme");
            window.localStorage.removeItem("dshpp-theme-mode");
          } catch {
          }
          window.location.reload();
          return;
        }
        retry();
      }).catch(retry);
    };
    const retry = () => {
      if (Date.now() - started > 9e4) {
        setNotice({ kind: "error", text: tr("restart.timeout") });
        setUninstallBusy(false);
        return;
      }
      setTimeout(ping, 500);
    };
    setTimeout(ping, 800);
  }, []);
  const doUninstall = useCallback(() => {
    setUninstallBusy(true);
    setAskUninstall(false);
    setAskRestart(false);
    const tr = tRef.current;
    setNotice({ kind: "ok", text: tr("uninstall.applying") });
    apiJson("/dsh-purge/uninstall", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}"
    }).then((d) => {
      if (!d || !d.ok) throw new Error(d && d.error || "uninstall failed");
      setNotice({
        kind: "ok",
        text: d && d.note || hostText(tr, "uninstall.done", d.surface || hostSurfaceOf(state))
      });
      if ((d && d.surface) === "desktop" || d && d.fullApp || hostSurfaceOf(state) === "desktop")
        return;
      waitHostAfterUninstall(tr);
    }).catch((e) => {
      const msg = String(e && e.message || e || "");
      if (/failed to fetch|networkerror|load failed/i.test(msg)) {
        setNotice({
          kind: "ok",
          text: hostText(tr, "uninstall.done", hostSurfaceOf(state))
        });
        if (hostSurfaceOf(state) === "desktop" || clientGuessSurface() === "desktop")
          return;
        waitHostAfterUninstall(tr);
        return;
      }
      setNotice({
        kind: "error",
        text: tr("uninstall.fail", { error: msg })
      });
      setUninstallBusy(false);
    });
  }, [state, waitHostAfterUninstall]);
  const s = state;
  const located = !!(s && s.ai_base);
  const hostSurface = hostSurfaceOf(s);
  const desktopLikely = hostSurface === "desktop" || clientGuessSurface() === "desktop";
  const sealedReady = !located && desktopLikely && !!(s && (s.asar_still_sealed || s.desktop_exe || s.desktop_install));
  const patchesLost = !located && !!(s && s.patches_lost);
  const tally = located ? tallyPatches(patchRowsOf(s)) : { applied: 0, pending: 0, unmatched: 0, skipped: 0, total: 0 };
  const total = tally.total;
  const applied = tally.applied;
  const pct = located && total ? Math.round(applied / total * 100) : 0;
  const metricNotes = [];
  if (tally.pending)
    metricNotes.push(t("metric.pendingShort", { n: tally.pending }));
  if (tally.unmatched)
    metricNotes.push(t("metric.unmatchedShort", { n: tally.unmatched }));
  if (tally.partial)
    metricNotes.push(t("metric.partialShort", { n: tally.partial }));
  if (tally.drifted)
    metricNotes.push(t("metric.driftedShort", { n: tally.drifted }));
  if (tally.disabled)
    metricNotes.push(t("metric.disabledShort", { n: tally.disabled }));
  if (tally.skipped)
    metricNotes.push(t("metric.skipShort", { n: tally.skipped }));
  return h(
    "section",
    { className: "dshpp-panel", "aria-label": t("purge.title") },
    h(
      "div",
      { hidden: page !== "status" },
      h(
        "div",
        { className: "dshpp-hero" },
        h(
          "div",
          { className: "dshpp-hero-state" },
          h("i", {
            className: "dshpp-dot " + (!located ? "is-warn" : patchBusy ? "" : s?.ok === false || s?.asar_still_sealed ? "is-warn" : "is-ok")
          }),
          h(
            "b",
            null,
            !s ? "\u6B63\u5728\u8BFB\u53D6\u5BBF\u4E3B\u72B6\u6001\u2026" : s.ok === false ? "\u72B6\u6001\u8BFB\u53D6\u5931\u8D25\uFF0C\u5BBF\u4E3B\u4E0E\u8865\u4E01\u72B6\u6001\u672A\u77E5" : !located ? sealedReady ? "\u5BBF\u4E3B\u8FD8\u6CA1\u89E3\u5F00\uFF1A\u70B9\u300C\u5E94\u7528\u300D" : "\u672A\u5B9A\u4F4D\u5230\u5BBF\u4E3B\uFF1A\u70B9\u300C\u5E94\u7528\u300D\u91CD\u8BD5" : s?.asar_still_sealed ? `${applied}/${total} \u6761\u78C1\u76D8\u8865\u4E01\uFF08\u9000\u51FA\u91CD\u5F00\u540E\u52A0\u8F7D\uFF09` : tally.pending ? `\u8865\u4E01\u5DF2\u8FD8\u539F ${applied}/${total} \xB7 \u70B9\u300C\u5E94\u7528\u300D\u91CD\u65B0\u6302\u4E0A` : applied === total ? `\u5168\u90E8\u5C31\u7EEA\uFF1A\u8865\u4E01 ${applied}/${total} \u751F\u6548` : `${applied}/${total} \u6761\u8865\u4E01\u5DF2\u751F\u6548`
          ),
          h(
            "span",
            { className: "dshpp-hero-sub" },
            [
              t("surface." + hostSurface),
              s && s.inject ? s.inject.chars > 0 ? `${t("inject.on")} ${(s.inject.chars / 1e3).toFixed(1)}K \u5B57` : t("inject.off") : ""
            ].filter(Boolean).join(" \xB7 ")
          )
        ),
        h(
          "div",
          { className: "dshpp-hero-actions" },
          h(
            Btn,
            {
              kind: "primary",
              className: "dshpp-btn-lead",
              disabled: patchBusy || uninstallBusy || !overrideLoaded,
              onClick: () => doAction("apply", "action.apply")
            },
            patchBusy ? t("btn.apply.busy") : t("btn.apply")
          ),
          h(
            Btn,
            {
              kind: "danger",
              title: t("btn.revert.tip"),
              disabled: patchBusy || uninstallBusy,
              onClick: () => doAction("revert", "action.revert")
            },
            t("btn.revert")
          ),
          h(
            Btn,
            {
              kind: "solid-danger",
              disabled: patchBusy || uninstallBusy,
              onClick: () => setAskUninstall(true)
            },
            uninstallBusy ? t("btn.uninstall.busy") : t("btn.uninstall")
          ),
          h(
            Btn,
            {
              tiny: true,
              onClick: loadAll,
              disabled: patchBusy || uninstallBusy
            },
            "\u5237\u65B0"
          )
        ),
        h(
          "p",
          { className: "dshpp-hero-hint" },
          "\u88C5\u597D\u63D2\u4EF6\u3001\u66F4\u65B0\u8FC7 DSH\u3001\u6216\u53D1\u73B0\u6A21\u578B\u53C8\u5F00\u59CB\u63A8\u8131\u65F6\uFF1A\u70B9\u4E00\u6B21\u300C\u5E94\u7528\u300D\uFF0C\u7136\u540E\u9000\u51FA\u5E76\u91CD\u5F00 DSH\uFF0C\u5C31\u4F1A\u6062\u590D\u3002"
        ),
        noticeNode(notice)
      ),
      h(
        "details",
        { className: "dshpp-fold" },
        h(
          "summary",
          null,
          "\u8865\u4E01\u660E\u7EC6 ",
          h(
            "b",
            null,
            !s ? "\u8BFB\u53D6\u4E2D" : s.ok === false ? "\u72B6\u6001\u672A\u77E5" : s.ai_base ? `${applied}/${total} \u5DF2\u5E94\u7528` : "\u672A\u5B9A\u4F4D\u5BBF\u4E3B"
          )
        ),
        h(PatchGroups, { state: s })
      ),
      askUninstall ? h(
        "div",
        {
          className: "dshpp-modal-bg",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "dshpp-uninstall-title",
          onClick: (e) => {
            if (e.target === e.currentTarget && !uninstallBusy)
              setAskUninstall(false);
          }
        },
        h(
          "div",
          { className: "dshpp-modal" },
          h("h4", { id: "dshpp-uninstall-title" }, t("uninstall.title")),
          h("p", null, t("uninstall.body")),
          h(
            "div",
            { className: "dshpp-modal-ops" },
            h(
              Btn,
              {
                disabled: uninstallBusy,
                onClick: () => setAskUninstall(false)
              },
              t("uninstall.cancel")
            ),
            h(
              Btn,
              {
                kind: "solid-danger",
                disabled: uninstallBusy,
                onClick: doUninstall
              },
              t("uninstall.confirm")
            )
          )
        )
      ) : null,
      h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("apply.hint")
      ),
      s?.ok === true && !s.ai_base ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-danger, #c44)",
            fontSize: 12
          }
        },
        hostText(t, "warn.noRoot", hostSurface)
      ) : null,
      s && s.ai_base && s.override_status === "missing" ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("warn.noInject")
      ) : null,
      askRestart ? h(RestartAsk, {
        t,
        theme: detectHostTheme(),
        onLater: () => {
          suppressRestartAsk.current = true;
          setAskRestart(false);
        },
        onRestart: () => {
          suppressRestartAsk.current = true;
          setAskRestart(false);
          restartDsh(setNotice, function() {
          }, t, hostSurface);
        }
      }) : null
    ),
    h(
      "div",
      { hidden: page !== "prompt" },
      h(
        "div",
        { className: "dshpp-sub" },
        h("h4", null, t("override.title")),
        h(
          "div",
          { className: "dshpp-row", style: { margin: 0 } },
          h(
            Btn,
            {
              kind: "primary",
              tiny: true,
              disabled: patchBusy || !overrideLoaded,
              onClick: saveOverride
            },
            t("btn.saveInject")
          ),
          h(
            Btn,
            {
              tiny: true,
              disabled: patchBusy || !overrideLoaded || !defaultOverride,
              onClick: restoreOverride
            },
            t("btn.restoreInject")
          )
        )
      ),
      h("textarea", {
        className: "dshpp-area",
        ref: promptAreaRef,
        "aria-label": "\u63D0\u793A\u8BCD\u5185\u5BB9",
        disabled: !overrideLoaded,
        value: override,
        onChange: (e) => {
          overrideRef.current = e.target.value;
          setOverride(e.target.value);
        },
        spellCheck: false,
        placeholder: ""
      }),
      noticeNode(notice),
      promptBoxEmpty(override) ? h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-danger, #c44)",
            fontSize: 12
          }
        },
        t("need.prompt")
      ) : null
    ),
    h(
      "div",
      { hidden: page !== "more" },
      h(
        "div",
        { className: "dshpp-sub" },
        h("h4", null, t("own.title")),
        h(
          "div",
          { className: "dshpp-row", style: { margin: 0 } },
          h(
            Btn,
            {
              kind: "primary",
              tiny: true,
              disabled: !ownLoaded || ownBusy,
              onClick: saveOwnServers
            },
            t("own.save")
          )
        )
      ),
      h("textarea", {
        className: "dshpp-area",
        "aria-label": "\u670D\u52A1\u5668\u540D\u5355",
        disabled: !ownLoaded,
        value: ownServers,
        onChange: (e) => {
          ownRef.current = e.target.value;
          setOwnServers(e.target.value);
        },
        spellCheck: false,
        rows: 4,
        style: { minHeight: 96 }
      }),
      h(
        "p",
        {
          className: "dshpp-hint",
          style: {
            margin: "8px 0 0",
            color: "var(--dshpp-mute)",
            fontSize: 12
          }
        },
        t("own.hint")
      ),
      noticeNode(notice)
    )
  );
}

// src/components/settings-shell.js
function compatibilityLevelText(t, level) {
  const key = "compat.level." + (level || "unknown");
  const hit = t(key);
  return hit && hit !== key ? hit : level || t("unknown");
}
function CommunityCompatibilityNote() {
  const t = useT();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    apiJson("/dsh-purge/community").then((d) => {
      if (d && d.ok !== false) setInfo(d);
      else setError(d && d.error || "bad response");
    }).catch((e) => setError(e && e.message || String(e)));
  }, []);
  const compat = info && info.compatibility || null;
  const host3 = compat && compat.host_version || "unknown";
  const text = compat ? t("compat.host", {
    version: info && info.version ? info.version : "\u2014",
    host: host3,
    level: compatibilityLevelText(t, compat.level)
  }) : error ? t("compat.unavailable", { error }) : t("compat.loading");
  return h(
    "p",
    {
      role: "status",
      className: "dshpp-hint",
      style: { margin: "0 20px 10px" }
    },
    text,
    compat && compat.message ? " " + compat.message : ""
  );
}
function SettingsRoot(props = {}) {
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
    h("style", null, base_default + native_default),
    h(
      "header",
      { className: "dshpp-native-head" },
      h("div", null, h("h2", null, "Ungate"), h("p", null, "\u63D2\u4EF6\u8BBE\u7F6E")),
      h(
        "span",
        { className: "dshpp-native-badge" },
        "Ungate 0.2.5"
      )
    ),
    h(CommunityCompatibilityNote),
    h(
      "nav",
      { className: "dshpp-native-nav", "aria-label": "Ungate \u8BBE\u7F6E\u5206\u7C7B" },
      [
        ["status", "\u72B6\u6001"],
        ["prompt", "\u63D0\u793A\u8BCD"],
        ["more", "\u66F4\u591A"]
      ].map(
        ([id, label]) => h(
          "button",
          {
            key: id,
            type: "button",
            "aria-pressed": page === id,
            onClick: () => select(id)
          },
          label
        )
      )
    ),
    h(
      "div",
      { className: "dshpp-native-content" },
      h(
        "div",
        { hidden: !["status", "prompt", "more"].includes(page) },
        h(PurgifySection, { page })
      ),
      h(
        "div",
        { hidden: page !== "more", className: "dshpp-more" },
        h(
          "p",
          { className: "dshpp-attribution" },
          "\u57FA\u4E8E YuJunZhiXue/dsh-purge 1.1.71\uFF08MIT\uFF09\uFF1B\u66F4\u65B0\u4EC5\u6765\u81EA\u672C fork\uFF0C\u672C fork \u72EC\u7ACB\u7EF4\u62A4\u5E76\u4FDD\u7559\u539F\u4F5C\u8005\u7F72\u540D\u3002"
        )
      )
    )
  );
}

// src/components/maintenance.js
function StatusExtras() {
  const [check, setCheck] = useState(null);
  const [boost, setBoost] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const load = () => Promise.all([
    apiJson("/dsh-purge/selfcheck").then(setCheck).catch(() => setCheck(null)),
    apiJson("/dsh-purge/boost").then((r) => setBoost(!!r.enabled)).catch(() => setBoost(null))
  ]);
  useEffect(() => {
    load();
  }, []);
  async function toggle() {
    try {
      const r = await apiJson("/dsh-purge/boost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled: !boost })
      });
      setBoost(!!r.enabled);
      setNotice(r.enabled ? "\u5DF2\u5F00\u542F\uFF0C\u91CD\u542F\u540E\u751F\u6548" : "\u5DF2\u5173\u95ED\uFF0C\u91CD\u542F\u540E\u751F\u6548");
    } catch (e) {
      setNotice(e.message);
    }
  }
  async function rerun() {
    setBusy(true);
    try {
      setCheck(await apiJson("/dsh-purge/selfcheck"));
    } catch (e) {
      setNotice(e.message);
    } finally {
      setBusy(false);
    }
  }
  const layers = check && Array.isArray(check.layers) ? check.layers : [];
  const failed = layers.filter(
    (l) => l.state === "broken" || !l.state && !l.ok
  );
  const pendingLayers = layers.filter((l) => l.state === "pending");
  const uncertain = layers.filter(
    (l) => ["inferred", "unknown"].includes(l.state)
  );
  const pendingPatches = pendingLayers.reduce(
    (n, l) => n + (l.pending?.length || 0),
    0
  );
  const total = layers.filter((layer) => layer.applicable !== false).length;
  return h(
    "section",
    { className: "dshpp-card", "aria-label": "\u81EA\u68C0\u72B6\u6001" },
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        h("i", {
          className: "dshpp-dot " + (check ? failed.length ? "is-bad" : uncertain.length ? "is-warn" : "is-ok" : "")
        }),
        "\u81EA\u68C0",
        h(
          "b",
          null,
          check ? failed.length ? `${failed.length} \u5C42\u672A\u751F\u6548` : pendingLayers.length ? `\u8865\u4E01 ${pendingPatches} \u6761\u672A\u6302\uFF08\u8FD8\u539F\u540E\u5C5E\u6B63\u5E38\uFF09` : uncertain.length ? `${uncertain.length} \u5C42\u9700\u786E\u8BA4` : `${total} \u5C42\u5168\u90E8\u5728\u4F4D` : "\u68C0\u6D4B\u4E2D\u2026"
        )
      ),
      h(
        "details",
        { className: "dshpp-fold-inline" },
        h("summary", null, "\u67E5\u770B\u9010\u5C42"),
        h(
          "div",
          { className: "dshpp-checks" },
          check && Array.isArray(check.layers) ? check.layers.map(
            (layer) => h(
              "div",
              {
                key: layer.title,
                className: "dshpp-check" + (layer.state === "pending" ? "" : ["inferred", "unknown"].includes(layer.state) ? " is-warn" : layer.ok ? "" : " is-bad")
              },
              h("i", {
                className: "dshpp-dot " + (layer.state === "pending" ? "" : ["inferred", "unknown"].includes(layer.state) ? "is-warn" : layer.ok ? "is-ok" : "is-bad")
              }),
              h("span", { className: "dshpp-check-name" }, layer.title),
              h(
                "span",
                { className: "dshpp-check-val" },
                layer.applicable === false ? "\u4E0D\u9002\u7528" : layer.state === "pending" ? `\u5F85\u5E94\u7528 #${(layer.pending || []).join("/#")}` : layer.state === "inferred" ? "\u5BBF\u4E3B\u63A8\u5BFC" : layer.state === "unknown" ? "\u672A\u786E\u8BA4" : `${layer.applied}/${layer.required ?? layer.total}`
              ),
              layer.note ? h(HelpTip, { title: layer.title }, layer.note) : null
            )
          ) : h("div", { className: "dshpp-muted" }, "\u68C0\u6D4B\u4E2D\u2026")
        )
      ),
      h(
        Btn,
        { tiny: true, disabled: busy, onClick: rerun },
        busy ? "\u2026" : "\u91CD\u6D4B"
      ),
      h(
        Btn,
        {
          tiny: true,
          title: "\u751F\u6210\u4E00\u6B21\u6027\u63A2\u9488\uFF1A\u4E0B\u4E00\u8F6E\u56DE\u590D\u91CC\u770B\u6A21\u578B\u6709\u6CA1\u6709\u539F\u6837\u56DE\u663E\u8BE5\u6807\u8BB0",
          onClick: async () => {
            try {
              const r = await apiJson("/dsh-purge/probe", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: "{}"
              });
              setNotice(r.message || "");
            } catch (e) {
              setNotice(e.message);
            }
          }
        },
        "\u63A2\u9488"
      )
    ),
    h(
      "div",
      { className: "dshpp-line" },
      h(
        "span",
        { className: "dshpp-line-main" },
        "\u5F3A\u5316\u6BB5",
        h(
          HelpTip,
          { title: "\u5F3A\u5316\u6BB5" },
          "\u5728\u7CFB\u7EDF\u63D0\u793A\u8BCD\u672B\u5C3E\u8FFD\u52A0\u4E00\u6BB5\u4E0E\u6CE8\u5165\u540C\u7EA7\u7684\u6587\u672C\uFF1A\u5C42\u7EA7\u58F0\u660E / \u62D2\u7EDD\u6309\u566A\u58F0\u5904\u7406 / \u6297\u8C04\u5A9A / \u591A\u8F6E\u91CD\u7533\u3002\u9ED8\u8BA4\u5F00\u542F\u3002"
        ),
        h("b", null, boost === null ? "\u2026" : boost ? "\u5DF2\u5F00\u542F" : "\u5DF2\u5173\u95ED")
      ),
      h(
        Btn,
        { tiny: true, disabled: boost === null, onClick: toggle },
        boost ? "\u5173\u95ED" : "\u5F00\u542F"
      ),
      notice ? h("span", { className: "dshpp-muted" }, notice) : null
    )
  );
}

// src/components/page.js
var TABS = [
  ["status", "\u72B6\u6001", "\u5BBF\u4E3B\u517C\u5BB9\u3001\u8865\u4E01\u3001\u81EA\u68C0"],
  ["prompt", "\u63D0\u793A\u8BCD", "\u6CE8\u5165\u6B63\u6587\u4E0E\u5F3A\u5316\u6BB5"],
  ["more", "\u66F4\u591A", "\u670D\u52A1\u5668\u540D\u5355\u3001\u8BCA\u65AD\u4E0E\u9884\u8BBE"]
];
function PurgeGlyph({ size = 18 } = {}) {
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      "aria-hidden": true
    },
    h("path", { d: "M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" }),
    h("path", { d: "M9.5 12.2l1.8 1.8 3.4-3.6" })
  );
}
function StatusStrip({ info }) {
  const compat = info?.compatibility || {};
  const level = compat.level || "";
  const ok = level === "qualified";
  return h(
    "div",
    { className: "dshpp-strip" },
    h(
      "span",
      { className: "dshpp-strip-item" },
      h("i", {
        className: "dshpp-dot " + (ok ? "is-ok" : level ? "is-warn" : "")
      }),
      "DSH ",
      h("b", null, compat.host_version || "\u2026")
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u517C\u5BB9\u7EA7\u522B ",
      h(
        "b",
        null,
        level === "qualified" ? "\u5DF2\u56DE\u5F52\u9A8C\u8BC1" : level === "unverified" ? "\u672A\u9A8C\u8BC1\u7248\u672C" : level === "mixed" ? "\u7EC4\u4EF6\u7248\u672C\u4E0D\u4E00\u81F4" : level ? "\u672A\u5B9A\u4F4D\u5BBF\u4E3B" : info?.ok === false ? "\u8BFB\u53D6\u5931\u8D25" : "\u68C0\u6D4B\u4E2D"
      ),
      h(
        HelpTip,
        { title: "\u517C\u5BB9\u7EA7\u522B" },
        compat.message || "\u8BFB\u53D6\u5BBF\u4E3B\u7EC4\u4EF6\u7248\u672C\u540E\u7ED9\u51FA\u7ED3\u8BBA\u3002qualified \u8868\u793A\u8BE5 DSH \u7248\u672C\u7684\u8865\u4E01\u951A\u70B9\u5DF2\u9010\u6761\u56DE\u5F52\u3002"
      )
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u8865\u4E01 ",
      h(
        "b",
        null,
        `${info?.patches_applied ?? "?"}/${info?.patches_total ?? "?"}`,
        info?.patches_na > 0 ? ` \xB7 ${info.patches_na} \u4E0D\u9002\u7528` : ""
      ),
      h(
        HelpTip,
        { title: "\u5BBF\u4E3B\u8865\u4E01" },
        `\u5B9E\u9645\u5199\u8FDB DSH \u5BBF\u4E3B\u4EE3\u7801\u7684\u8865\u4E01\u6761\u6570\uFF08\u5206\u6BCD\u53EA\u7B97\u672C\u673A\u9002\u7528\u7684\uFF09\u3002\u5168\u90E8\u8865\u4E01 ${info?.patches_total_all ?? "?"} \u6761\uFF0C\u5176\u4E2D ${info?.patches_na ?? 0} \u6761\u4EC5\u684C\u9762\u58F3\u4F7F\u7528\uFF1B\u8FD8\u539F\u540E\u672A\u5199\u5165\u7684\u6761\u6570\u5728\u72B6\u6001\u5361\u91CC\u663E\u793A\u4E3A\u300C\u8865\u4E01\u5DF2\u8FD8\u539F\u300D\u3002`
      )
    ),
    h(
      "span",
      { className: "dshpp-strip-item" },
      "\u63D2\u4EF6 ",
      h("b", null, info?.plugin_version || "0.2.5")
    )
  );
}
function LayoutNotice({ info }) {
  if (!info || info.surface === "web") return null;
  if (!info.asar_still_sealed && !info.host_layout) return null;
  const sealed = info.asar_still_sealed === true;
  const note = info.host_layout?.note || "\u76EE\u6807\u78C1\u76D8\u4ECD\u6709 app.asar\uFF1B\u5F53\u524D\u8FDB\u7A0B\u52A0\u8F7D\u6765\u6E90\u5C1A\u672A\u786E\u8BA4\u3002";
  const handoff = info.asar_handoff ? ` \u6362\u5305\u72B6\u6001\uFF1A${{ not_scheduled: "\u5C1A\u672A\u5E94\u7528\uFF1A\u70B9\u300C\u5E94\u7528\u300D\u540E\u624D\u4F1A\u5B89\u6392\u6362\u5305", archive_reappeared: "\u5F52\u6863\u518D\u6B21\u51FA\u73B0\uFF0C\u65E7\u6362\u5305\u8BB0\u5F55\u4E0D\u4EE3\u8868\u5F53\u524D\u5DF2\u5B8C\u6210", backup_missing: "\u539F\u5F52\u6863\u5907\u4EFD\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5\u8BCA\u65AD", unknown_target: "\u76EE\u6807\u5B9E\u4F8B\u672A\u786E\u5B9A", unreadable: "\u6362\u5305\u8BB0\u5F55\u4E0D\u53EF\u8BFB\uFF0C\u8BF7\u68C0\u67E5\u8BCA\u65AD", starting: "\u52A9\u624B\u542F\u52A8\u4E2D\uFF08\u5C1A\u672A\u786E\u8BA4\u5C31\u7EEA\uFF09", ready: "\u52A9\u624B\u5DF2\u5C31\u7EEA", waiting_for_quit: "\u7B49\u5F85\u5B8C\u6574\u9000\u51FA\uFF08macOS \u2318Q / Windows \u7CFB\u7EDF\u6258\u76D8\uFF09", waiting_for_unlock: "\u7B49\u5F85\u5F52\u6863\u89E3\u5C01", moving: "\u6B63\u5728\u4FDD\u7559\u539F\u5F52\u6863", complete: "\u6362\u5305\u5B8C\u6210\uFF0C\u8BF7\u624B\u52A8\u6253\u5F00 DSH", already_unsealed: "\u5F52\u6863\u5DF2\u79FB\u8D70\uFF0C\u8BF7\u624B\u52A8\u6253\u5F00 DSH", failed: "\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u8BCA\u65AD\u5E76\u6309\u6062\u590D\u6587\u6863\u64CD\u4F5C", expired: "\u7B49\u5F85\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u5E94\u7528\u6216\u6309\u6062\u590D\u6587\u6863\u64CD\u4F5C", helper_stopped: "\u52A9\u624B\u610F\u5916\u7ED3\u675F\uFF0C\u8BF7\u91CD\u65B0\u5E94\u7528\u6216\u6309\u6062\u590D\u6587\u6863\u64CD\u4F5C" }[info.asar_handoff.phase] || info.asar_handoff.phase}\u3002` : "";
  const failure = info.asar_handoff?.error;
  const detail = info.asar_handoff?.detail ? ` \u8BE6\u60C5\uFF1A${info.asar_handoff.detail}${failure?.win32_code != null ? `\uFF08Windows \u9519\u8BEF ${failure.win32_code}\uFF09` : ""}` : "";
  const confirmed = info.host_layout?.state === "unpacked_entry" && info.host_layout?.process?.matches_target === true && info.host_layout?.disk?.archive_exists === false;
  const diskNote = info.host_layout?.disk?.archive_exists === true ? " \u76EE\u6807\u78C1\u76D8\u4ECD\u6709 app.asar\u3002" : "";
  if (sealed || !confirmed) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      note,
      diskNote,
      handoff,
      detail
    );
  }
  return h(
    "details",
    { className: "dshpp-layout-details" },
    h("summary", null, "\u2713 \u5DF2\u4ECE\u89E3\u5305\u76EE\u5F55\u542F\u52A8\uFF08\u6362\u5305\u5B8C\u6210\uFF09"),
    h("p", { className: "dshpp-note" }, note, diskNote, handoff, detail)
  );
}
function VersionNotice({ info }) {
  if (info && info.ok === false) {
    return h(
      "p",
      { className: "dshpp-warn", role: "status" },
      `\u72B6\u6001\u8BFB\u53D6\u5931\u8D25\uFF1A${info.error || "\u63A5\u53E3\u4E0D\u53EF\u7528"}\u3002\u5F53\u524D\u5BBF\u4E3B\u4E0E\u8865\u4E01\u72B6\u6001\u672A\u77E5\uFF0C\u8BF7\u70B9\u300C\u5237\u65B0\u300D\u91CD\u8BD5\uFF1B\u6301\u7EED\u5931\u8D25\u65F6\u8BF7\u63D0\u4F9B\u64CD\u4F5C\u7CFB\u7EDF\u3001DSH/\u63D2\u4EF6\u7248\u672C\u548C\u6B64\u9519\u8BEF\u3002`
    );
  }
  const backend = info?.plugin_version;
  if (!backend || backend === "0.2.5") return null;
  return h(
    "p",
    { className: "dshpp-warn", role: "status" },
    `\u5B98\u65B9\u7248\u672C ${backend}\uFF1B\u754C\u9762 ${"0.2.5"}\u3002\u4E24\u8005\u4E0D\u4E00\u81F4\u65F6\u8BBE\u7F6E\u53EF\u80FD\u4E0D\u751F\u6548\uFF0C\u8BF7\u66F4\u65B0\u5230\u540C\u4E00\u7248\u672C\u540E\u91CD\u542F DSH\u3002`
  );
}
function PurgePage() {
  const t = useT();
  const [tab, setTab] = useState("status");
  const [visited, setVisited] = useState({ status: true });
  const [info, setInfo] = useState(null);
  const select = (id) => {
    setTab(id);
    setVisited((v) => Object.assign({}, v, { [id]: true }));
  };
  const loadInfo = () => apiJson("/dsh-purge/status").then(setInfo).catch((error) => setInfo(unavailableStatus(error)));
  const mergeInfo = useCallback((s) => s && setInfo(s), []);
  useEffect(() => {
    if (tab === "status") loadInfo();
  }, [tab]);
  useEffect(() => {
    const phase = info?.asar_handoff?.phase;
    if (![
      "starting",
      "ready",
      "waiting_for_quit",
      "waiting_for_unlock",
      "moving"
    ].includes(phase))
      return;
    const timer = setInterval(loadInfo, 2e3);
    return () => clearInterval(timer);
  }, [info?.asar_handoff?.phase]);
  const active = TABS.find((row) => row[0] === tab) || TABS[0];
  return h(
    "div",
    { className: "dshpp-page" },
    h("style", null, base_default + native_default + page_default),
    h(
      "header",
      { className: "dshpp-page-head" },
      h("span", { className: "dshpp-page-glyph" }, h(PurgeGlyph, { size: 20 })),
      h(
        "div",
        { className: "dshpp-page-title" },
        h("h1", null, "Ungate"),
        h(
          "p",
          null,
          active[2],
          h("span", { className: "dshpp-page-ver" }, "Ungate 0.2.5")
        )
      )
    ),
    h(StatusStrip, { info }),
    h(VersionNotice, { info }),
    h(LayoutNotice, { info }),
    h(
      "nav",
      { className: "dshpp-page-tabs", role: "tablist" },
      TABS.map(
        ([id, label]) => h(
          "button",
          {
            key: id,
            type: "button",
            role: "tab",
            "aria-selected": tab === id ? "true" : "false",
            className: tab === id ? "is-on" : "",
            onClick: () => select(id)
          },
          label
        )
      )
    ),
    h(
      "div",
      { className: "dshpp-page-body" },
      h(
        "div",
        { hidden: tab !== "status", className: "dshpp-sec" },
        h(PurgifySection, { page: "status", onStatus: mergeInfo }),
        // 渐进式披露：首屏只回答"现在能不能用"；逐层证据与维护动作按需展开。
        h(
          "details",
          { className: "dshpp-fold" },
          h("summary", null, "\u81EA\u68C0\u4E0E\u7EF4\u62A4 ", h("b", null, "\u9010\u5C42\u72B6\u6001 \xB7 \u5907\u4EFD\u56DE\u6EDA \xB7 \u63A2\u9488")),
          h(StatusExtras)
        )
      ),
      h(
        "div",
        { hidden: tab !== "prompt", className: "dshpp-sec" },
        visited.prompt ? h(PurgifySection, { page: "prompt" }) : null
      ),
      h(
        "div",
        { hidden: tab !== "more", className: "dshpp-sec" },
        visited.more ? h(PurgifySection, { page: "more" }) : null
      )
    ),
    h(
      "footer",
      { className: "dshpp-page-foot" },
      "\u57FA\u4E8E YuJunZhiXue/dsh-purge 1.1.71\uFF08MIT\uFF09\xB7 \u672C fork \u72EC\u7ACB\u7EF4\u62A4\u5E76\u4FDD\u7559\u539F\u4F5C\u8005\u7F72\u540D"
    )
  );
}

// src/state/session-context.js
var import_react9 = require("react");
var host = null;
var listeners = /* @__PURE__ */ new Set();
function notify() {
  for (const listener of listeners) listener();
}
function bindSessionContext(ctx) {
  host = ctx;
  const dispose = [ctx.uiWorkspace?.selection, ctx.sessions?.list].filter((store) => typeof store?.subscribe === "function").map((store) => store.subscribe(notify));
  notify();
  return () => {
    for (const fn of dispose) if (typeof fn === "function") fn();
    if (host === ctx) {
      host = null;
      notify();
    }
  };
}

// src/state/legacy-visibility.js
var ENTRY_CSS = ".dshp-launch,.dshp-hero-chip,.dshp-tab-chip,.dshp-dock{display:none!important}";
function installLegacyVisibility(doc = globalThis.document) {
  if (!doc?.head) return () => {
  };
  const style = doc.createElement("style");
  style.setAttribute("data-dsh-purge-panel-visibility", "1");
  style.textContent = ENTRY_CSS;
  doc.head.append(style);
  return () => style.remove();
}

// src/state/rewind-draft.js
var DRAFT_KEY = "dshp-rewind-draft:";
var ARM_KEY = "dshp-rewind-arm:";
var FILL_DELAYS = [0, 50, 180, 400, 800];
var ARM_TTL_MS = 45 * 1e3;
var seenAt = 0;
var host2 = null;
var workspace = null;
var conversation = null;
var pendingComposer = { sessionId: "", text: "", at: 0 };
var armedFill = { sessionId: "", text: "", at: 0 };
function storage() {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    return null;
  }
}
function bindRewindHost(ctx) {
  host2 = ctx || null;
  workspace = ctx && ctx.uiWorkspace || null;
  conversation = ctx && ctx.conversation || null;
}
function hostSessions() {
  return host2 && host2.sessions || null;
}
function getRewindSeenAt() {
  return seenAt;
}
function noteRewindAt(at) {
  if (at) seenAt = at;
}
function rewindText(t, key, fallback) {
  try {
    if (typeof t === "function") {
      const value = t(key);
      if (value && value !== key) return value;
    }
  } catch {
  }
  return fallback;
}
function currentSessionId(sessions) {
  try {
    const selected = workspace?.selection?.getSnapshot?.()?.sessionId;
    if (typeof selected === "string" && selected) return selected;
  } catch {
  }
  try {
    const snap = (sessions?.list || host2?.sessions?.list)?.getSnapshot?.();
    if (typeof snap?.current === "string" && snap.current) return snap.current;
  } catch {
  }
  return "";
}
function sessionKnown(sessions, sessionId) {
  try {
    const snap = sessions?.list?.getSnapshot?.();
    if (!snap || !sessionId) return false;
    if (snap.byId && Object.prototype.hasOwnProperty.call(snap.byId, sessionId))
      return true;
    if (Array.isArray(snap.ids) && snap.ids.includes(sessionId)) return true;
  } catch {
  }
  return false;
}
function waitMs(ms) {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.setTimeout)
      window.setTimeout(resolve, ms);
    else setTimeout(resolve, ms);
  });
}
function isPluginDraft(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  return /^\[MNEMON\]/i.test(value) || /MNEMON RUNTIME MEMORY SNAPSHOT/i.test(value) || /^MNEMON VIEW TOOLS/im.test(value);
}
function writeDraft(sessionId, text) {
  if (!sessionId) return;
  const value = isPluginDraft(text) ? "" : text || "";
  pendingComposer = { sessionId, text: value, at: Date.now() };
  try {
    storage()?.setItem(DRAFT_KEY + sessionId, value);
  } catch {
  }
}
function peekDraft(sessionId) {
  if (!sessionId) return "";
  if (pendingComposer.sessionId === sessionId && pendingComposer.text)
    return pendingComposer.text;
  try {
    return storage()?.getItem(DRAFT_KEY + sessionId) || "";
  } catch {
    return "";
  }
}
function clearStoredDraft(sessionId) {
  if (!sessionId) return;
  if (pendingComposer.sessionId === sessionId)
    pendingComposer = { sessionId: "", text: "", at: 0 };
  try {
    storage()?.removeItem(DRAFT_KEY + sessionId);
  } catch {
  }
  try {
    storage()?.removeItem(ARM_KEY + sessionId);
  } catch {
  }
}
function armComposerFill(sessionId, text) {
  if (!sessionId || !text || isPluginDraft(text)) return;
  const at = Date.now();
  armedFill = { sessionId, text, at };
  writeDraft(sessionId, text);
  try {
    storage()?.setItem(ARM_KEY + sessionId, String(at));
  } catch {
  }
}
function takeArmedFill(sessionId) {
  if (!sessionId) return "";
  let text = "";
  let at = 0;
  if (armedFill.sessionId === sessionId && armedFill.text) {
    text = armedFill.text;
    at = armedFill.at;
  } else {
    text = peekDraft(sessionId);
    try {
      at = Number(storage()?.getItem(ARM_KEY + sessionId) || 0);
    } catch {
      at = 0;
    }
  }
  if (!text || !at || Date.now() - at > ARM_TTL_MS) {
    if (text && (!at || Date.now() - at > ARM_TTL_MS))
      clearStoredDraft(sessionId);
    return "";
  }
  clearStoredDraft(sessionId);
  armedFill = { sessionId: "", text: "", at: 0 };
  return text;
}
function conversationFace() {
  if (conversation) return conversation;
  if (host2?.conversation) return host2.conversation;
  if (typeof host2?.get === "function") {
    try {
      return host2.get("conversation");
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function conversationInput(sessionId) {
  try {
    const input = conversationFace()?.input;
    if (!input || !sessionId) return null;
    if (typeof input.shell === "function") {
      try {
        return input.shell(sessionId);
      } catch {
      }
    }
    const sessions = host2?.sessions;
    const actx = typeof sessions?.scope === "function" ? sessions.scope(sessionId) : void 0;
    if (typeof input.for === "function" && actx) return input.for(actx);
    return null;
  } catch {
    return null;
  }
}
function liveDraft(sessionId, inputActions) {
  try {
    const fromActions = inputActions?.state?.getSnapshot?.()?.draft;
    if (typeof fromActions === "string") return fromActions;
  } catch {
  }
  try {
    const draft = conversationInput(sessionId)?.state?.getSnapshot?.()?.draft;
    if (typeof draft === "string") return draft;
  } catch {
  }
  return "";
}
function hostSetDraft(sessionId, text) {
  if (!sessionId) return false;
  try {
    const input = conversationInput(sessionId);
    if (input && typeof input.setDraft === "function") {
      input.setDraft(text || "");
      return true;
    }
  } catch {
  }
  return false;
}
function fillComposer(inputActions, text) {
  if (inputActions && typeof inputActions.setDraft === "function") {
    try {
      inputActions.setDraft(text || "");
    } catch {
    }
  }
}
function scheduleComposerFill(sessionId, text, inputActions) {
  if (!sessionId || !text || isPluginDraft(text)) return () => {
  };
  let stopped = false;
  let filled = false;
  const timers = [];
  const setTimer = typeof window !== "undefined" && window.setTimeout ? (fn, ms) => window.setTimeout(fn, ms) : (fn, ms) => setTimeout(fn, ms);
  const clearTimer = typeof window !== "undefined" && window.clearTimeout ? (id) => window.clearTimeout(id) : (id) => clearTimeout(id);
  const tryFill = () => {
    if (stopped) return;
    const current = liveDraft(sessionId, inputActions);
    if (filled && current !== text) {
      stopped = true;
      return;
    }
    if (current && current !== text) {
      stopped = true;
      return;
    }
    fillComposer(inputActions, text);
    hostSetDraft(sessionId, text);
    filled = true;
  };
  for (const ms of FILL_DELAYS) timers.push(setTimer(tryFill, ms));
  return () => {
    stopped = true;
    for (const id of timers) {
      try {
        clearTimer(id);
      } catch {
      }
    }
  };
}
function scheduleEchoClear(sessionId, inputActions) {
  if (!sessionId) return () => {
  };
  let last = "";
  let stopped = false;
  const timers = [];
  const setTimer = typeof window !== "undefined" && window.setTimeout ? (fn, ms) => window.setTimeout(fn, ms) : (fn, ms) => setTimeout(fn, ms);
  const clearTimer = typeof window !== "undefined" && window.clearTimeout ? (id) => window.clearTimeout(id) : (id) => clearTimeout(id);
  const tryClear = () => {
    if (stopped || !last) return;
    const current = String(liveDraft(sessionId, inputActions) || "").trim();
    if (!current) {
      stopped = true;
      return;
    }
    if (current !== last) return;
    fillComposer(inputActions, "");
    hostSetDraft(sessionId, "");
    clearStoredDraft(sessionId);
    stopped = true;
  };
  apiJson("/dsh-purge/last-user?sessionId=" + encodeURIComponent(sessionId)).then((data) => {
    if (stopped) return;
    last = String(data?.text || "").trim();
    if (!last || isPluginDraft(last)) return;
    tryClear();
    for (const ms of [0, 50, 180, 400]) timers.push(setTimer(tryClear, ms));
  }).catch(() => {
  });
  return () => {
    stopped = true;
    for (const id of timers) {
      try {
        clearTimer(id);
      } catch {
      }
    }
  };
}
async function dropInheritedQueue(sessions, sessionId) {
  if (!sessions || !sessionId) return;
  const drop = async () => {
    try {
      const actx = typeof sessions.scope === "function" ? sessions.scope(sessionId) : void 0;
      const face = typeof sessions.sessionOf === "function" ? sessions.sessionOf(actx) : void 0;
      const queue = face?.getSnapshot?.()?.queue || [];
      for (const item of queue) {
        const id = item?.id || item?.itemId;
        if (!id) continue;
        try {
          await face.updateQueue?.(id, { kind: "remove" });
        } catch {
        }
      }
    } catch {
    }
  };
  await drop();
  if (typeof window !== "undefined" && window.setTimeout)
    window.setTimeout(() => {
      drop();
    }, 80);
}
async function openRewoundSession(sessions, sessionId) {
  if (!sessionId) return;
  let lastError = null;
  for (let attempt = 0; attempt < 25; attempt += 1) {
    if (sessions && typeof sessions.refresh === "function" && !sessionKnown(sessions, sessionId)) {
      try {
        await sessions.refresh();
      } catch (error) {
        lastError = error;
      }
    }
    const known = sessionKnown(sessions, sessionId);
    if (known || typeof sessions?.open === "function") {
      try {
        if (workspace && typeof workspace.openSession === "function") {
          workspace.openSession(sessionId);
        } else if (typeof sessions?.open === "function") {
          sessions.open(sessionId);
        } else {
          throw new Error("\u6253\u4E0D\u5F00\u56DE\u9000\u540E\u7684\u4F1A\u8BDD");
        }
        const selected = workspace?.selection?.getSnapshot?.()?.sessionId;
        if (!workspace || selected === sessionId) {
          await dropInheritedQueue(sessions, sessionId);
          if (typeof window !== "undefined" && window.setTimeout)
            window.setTimeout(() => {
              dropInheritedQueue(sessions, sessionId);
            }, 250);
          return;
        }
      } catch (error) {
        lastError = error;
      }
    }
    await waitMs(120);
  }
  throw new Error(lastError && lastError.message || "\u56DE\u9000\u540E\u7684\u4F1A\u8BDD\u6CA1\u6709\u6253\u5F00");
}

// src/components/rewind.js
var REWIND_CSS = `
.dshp-rewind-wrap{position:relative;display:inline-flex}
.dshp-rewind{appearance:none;display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,currentColor);font:12px/1 var(--ds-font-sans,system-ui,sans-serif);cursor:pointer}
.dshp-rewind:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12));color:var(--dsw-alias-label-primary,currentColor)}
.dshp-rewind:disabled{opacity:.4;cursor:default}
.dshp-rewind svg{display:block}
.dshp-rewind-menu{position:fixed;z-index:2147483000;box-sizing:border-box;min-width:220px;padding:4px;border:0;border-radius:12px;background:var(--dsw-specific-menu,#fff);color:var(--dsw-alias-label-primary,#1a1a1a);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-elevation-prominent,0 8px 24px rgba(0,0,0,.16));transform:translateY(-100%)}
body[data-ds-dark-theme] .dshp-rewind-menu{background:var(--dsw-specific-menu,#32312d);color:var(--dsw-alias-label-primary,#e6e2db);--dsw-elevation-stroke-color:var(--dsw-alias-border-l1,#3f3d38);box-shadow:var(--dsw-elevation-prominent,0 10px 28px rgba(0,0,0,.45))}
.dshp-rewind-item{display:flex;flex-direction:column;gap:2px;width:100%;padding:8px 10px;border:0;border-radius:8px;background:transparent;color:inherit;text-align:left;cursor:pointer;font:12px/1.3 var(--ds-font-sans,system-ui,sans-serif)}
.dshp-rewind-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12))}
.dshp-rewind-item b{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary,inherit)}
.dshp-rewind-item span{color:var(--dsw-alias-label-tertiary,#9a958c);font-size:11px}
body[data-ds-dark-theme] .dshp-rewind-item span{color:var(--dsw-alias-label-tertiary,#a8a39a)}
`;
function rewindMenuNode(t, menuPos, menuRef, runRewind) {
  return h(
    "div",
    {
      className: "dshp-rewind-menu",
      role: "menu",
      ref: menuRef,
      style: menuPos ? { left: menuPos.left + "px", top: menuPos.top + "px" } : { left: "8px", bottom: "48px", transform: "none" }
    },
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind-item",
        onMouseDown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          runRewind("once");
        }
      },
      h("b", null, rewindText(t, "rewind.once", "\u56DE\u9000\u4E00\u6B21")),
      h(
        "span",
        null,
        rewindText(
          t,
          "rewind.once.hint",
          "\u628A\u8FD9\u4E00\u8F6E\u53D1\u51FA\u53BB\u7684\u90A3\u53E5\u653E\u56DE\u8F93\u5165\u6846\uFF0C\u5E76\u6E05\u6389\u8FD9\u4E00\u8F6E"
        )
      )
    ),
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind-item",
        onMouseDown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          runRewind("round");
        }
      },
      h("b", null, rewindText(t, "rewind.round", "\u56DE\u9000\u4E0A\u4E00\u8F6E")),
      h(
        "span",
        null,
        rewindText(
          t,
          "rewind.round.hint",
          "\u628A\u8FD9\u4E00\u8F6E\u53D1\u51FA\u53BB\u7684\u90A3\u53E5\u653E\u56DE\u8F93\u5165\u6846\uFF1B\u5B50\u4EE3\u7406\u4E5F\u53EA\u64A4\u8FD9\u4E00\u8F6E"
        )
      )
    )
  );
}
var RewindFallback = class extends Component {
  constructor(p) {
    super(p);
    this.state = { menu: false, busy: false, notice: "", menuPos: null };
    this.wrap = null;
    this.menuEl = null;
    this.onDoc = (event) => {
      if (this.wrap && this.wrap.contains(event.target)) return;
      if (this.menuEl && this.menuEl.contains(event.target)) return;
      this.setState({ menu: false });
    };
  }
  componentDidMount() {
    if (typeof document !== "undefined" && document.addEventListener)
      document.addEventListener("mousedown", this.onDoc);
  }
  componentWillUnmount() {
    if (typeof document !== "undefined" && document.removeEventListener)
      document.removeEventListener("mousedown", this.onDoc);
  }
  run(mode) {
    const sessionId = this.props.sessionId || currentSessionId(hostSessions());
    if (!sessionId || this.state.busy) return;
    this.setState({ busy: true, menu: false, notice: "" });
    apiJson("/dsh-purge/rewind", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, mode })
    }).then(async (data) => {
      if (!data || !data.ok || !data.sessionId || data.cleared === false) {
        throw new Error(data && data.error || "\u6CA1\u6709\u6E05\u6389\u4E4B\u524D\u53D1\u9001\u7684\u5185\u5BB9");
      }
      noteRewindAt(data.at);
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      await openRewoundSession(hostSessions(), data.sessionId);
      scheduleComposerFill(data.sessionId, text);
      this.setState({ busy: false });
    }).catch((e) => {
      this.setState({
        busy: false,
        notice: "\u56DE\u9000\u5931\u8D25: " + String(e && e.message || e)
      });
    });
  }
  openMenu() {
    const rect = this.wrap && this.wrap.getBoundingClientRect ? this.wrap.getBoundingClientRect() : null;
    this.setState({
      menu: !this.state.menu,
      notice: "",
      menuPos: rect ? {
        left: Math.max(8, rect.right - 228),
        top: Math.max(8, rect.top - 8)
      } : null
    });
  }
  render() {
    const sessionId = this.props.sessionId || currentSessionId(hostSessions());
    const t = this.props.t || null;
    const label = this.state.busy ? "\u56DE\u9000\u4E2D\u2026" : this.state.notice ? this.state.notice.slice(0, 18) : "\u56DE\u9000";
    return h(
      "div",
      {
        className: "dshp-rewind-wrap",
        ref: (node) => {
          this.wrap = node;
        }
      },
      h("style", null, REWIND_CSS),
      h(
        "button",
        {
          type: "button",
          className: "dshp-rewind",
          disabled: this.state.busy || !sessionId,
          onMouseDown: (e) => e.preventDefault(),
          onClick: (e) => {
            e.preventDefault();
            this.openMenu();
          }
        },
        label
      ),
      this.state.menu ? rewindMenuNode(
        t,
        this.state.menuPos,
        (node) => {
          this.menuEl = node;
        },
        (mode) => this.run(mode)
      ) : null
    );
  }
};
var rewindVisible = true;
var rewindProbe = null;
function loadRewindVisibility() {
  if (!rewindProbe) {
    rewindProbe = apiJson("/dsh-purge/boost").then((r) => {
      rewindVisible = r && r.rewind !== false;
      return rewindVisible;
    }).catch(() => true);
  }
  return rewindProbe;
}
var RewindSafe = class extends Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    try {
      console.error("[dsh-purge] rewind slot:", error);
    } catch {
    }
  }
  componentDidMount() {
    loadRewindVisibility().then((on) => {
      if (!on && !this.unmounted) this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    if (!rewindVisible) return null;
    if (this.state.failed) return h(RewindFallback, this.props);
    return h(RewindButton, this.props);
  }
};
function RewindButton(props) {
  const fallbackT = useT();
  const t = props.t || fallbackT;
  const sessions = hostSessions();
  const inputActions = props.inputActions;
  const sessionId = props.sessionId || currentSessionId(sessions);
  const wrapRef = useRef(null);
  const menuRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  useEffect(() => {
    if (!sessionId) return;
    const armed = takeArmedFill(sessionId);
    if (armed) {
      scheduleComposerFill(sessionId, armed, inputActions);
      return;
    }
    scheduleEchoClear(sessionId, inputActions);
  }, [sessionId, inputActions]);
  useEffect(() => {
    if (!menu) return;
    if (typeof document === "undefined" || !document.addEventListener)
      return void 0;
    const onDoc = (event) => {
      if (wrapRef.current && wrapRef.current.contains(event.target)) return;
      if (menuRef.current && menuRef.current.contains(event.target)) return;
      setMenu(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menu]);
  const runRewind = async (mode) => {
    if (!sessionId || busy) return;
    setBusy(true);
    setMenu(false);
    setNotice("");
    try {
      const data = await apiJson("/dsh-purge/rewind", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, mode })
      });
      if (!data || !data.ok || !data.sessionId || data.cleared === false) {
        throw new Error(data && data.error || "\u6CA1\u6709\u6E05\u6389\u4E4B\u524D\u53D1\u9001\u7684\u5185\u5BB9");
      }
      noteRewindAt(data.at);
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      await openRewoundSession(sessions, data.sessionId);
      scheduleComposerFill(data.sessionId, text);
    } catch (e) {
      const message = rewindText(t, "rewind.fail", "\u56DE\u9000\u5931\u8D25: {error}").replace(
        "{error}",
        String(e && e.message || e)
      );
      setNotice(message);
    } finally {
      setBusy(false);
    }
  };
  const onClick = (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!sessionId || busy) return;
    if (menu) {
      setMenu(false);
      return;
    }
    const rect = wrapRef.current?.getBoundingClientRect?.();
    if (rect) {
      setMenuPos({
        left: Math.max(8, rect.right - 228),
        top: Math.max(8, rect.top - 8)
      });
    }
    setNotice("");
    setMenu(true);
  };
  const failLabel = notice ? notice.length > 18 ? notice.slice(0, 18) + "\u2026" : notice : "";
  const label = busy ? rewindText(t, "rewind.busy", "\u56DE\u9000\u4E2D\u2026") : failLabel || rewindText(t, "rewind.label", "\u56DE\u9000");
  const title = notice || rewindText(t, "rewind.aria", "\u56DE\u9000");
  return h(
    "div",
    { className: "dshp-rewind-wrap", ref: wrapRef },
    h("style", null, REWIND_CSS),
    h(
      "button",
      {
        type: "button",
        className: "dshp-rewind",
        title,
        "aria-label": rewindText(t, "rewind.aria", "\u56DE\u9000"),
        "aria-expanded": menu ? "true" : "false",
        disabled: busy || !sessionId,
        onMouseDown: (e) => e.preventDefault(),
        onClick
      },
      h(
        "svg",
        {
          viewBox: "0 0 16 16",
          width: "14",
          height: "14",
          "aria-hidden": true
        },
        h("path", {
          fill: "currentColor",
          d: "M7.2 3.2 3.4 7l3.8 3.8V8.6c2.8 0 4.7.7 5.9 2.3-.2-2.8-1.9-5.2-5.9-5.6V3.2z"
        })
      ),
      label
    ),
    menu ? rewindMenuNode(t, menuPos, menuRef, runRewind) : null
  );
}
function installRewindWatch(ctx) {
  const sessions = ctx && ctx.sessions || hostSessions();
  if (!sessions) return () => {
  };
  const tick = async () => {
    try {
      const data = await apiJson("/dsh-purge/rewind");
      if (!data || !data.sessionId || !data.at || data.at <= getRewindSeenAt())
        return;
      noteRewindAt(data.at);
      const current = currentSessionId(sessions);
      if (current && current !== data.parentId) return;
      const text = isPluginDraft(data.text) ? "" : data.text || "";
      armComposerFill(data.sessionId, text);
      scheduleComposerFill(data.sessionId, text);
      await openRewoundSession(sessions, data.sessionId);
      scheduleComposerFill(data.sessionId, text);
    } catch {
    }
  };
  const timer = typeof window !== "undefined" && window.setInterval ? window.setInterval(tick, 1200) : null;
  return () => {
    if (timer && typeof window !== "undefined" && window.clearInterval)
      window.clearInterval(timer);
  };
}
function installRewindUi(ctx) {
  bindRewindHost(ctx);
  ctx.slots.inject(
    "conversation.input.right",
    () => ctx.slots.register(
      {
        name: "conversation.input.right",
        id: "dsh-purge-rewind",
        order: 20,
        inject: (sessionId) => ({ sessionId, t: ctx.locale.bind(NS) })
      },
      RewindSafe
    )
  );
  ctx.effect(() => installRewindWatch(ctx), "dsh-purge: rewind watch");
}

// src/entry.js
var name = "dsh-ungate";
var inject = ["slots", "locale"];
function PurgeIcon({ size = 20 } = {}) {
  return h(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      "aria-hidden": true
    },
    h("path", { d: "M4 7h16M4 17h16" }),
    h("circle", { cx: 9, cy: 7, r: 3, fill: "none" }),
    h("circle", { cx: 15, cy: 17, r: 3, fill: "none" })
  );
}
function PurgeGlyphIcon({ size = 16 } = {}) {
  return h(PurgeGlyph, { size });
}
function PanelOverlays() {
  return h("style", null, base_default);
}
function apply(ctx) {
  ctx.effect(() => installLegacyVisibility(), "panel legacy visibility");
  ctx.inject(["sessions", "uiWorkspace"], (host3) => {
    host3.effect(() => bindSessionContext(host3), "panel session context");
  });
  ctx.inject(
    ["sessions", "uiWorkspace", "conversation"],
    (host3) => installRewindUi(host3)
  );
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "panel locale");
  const t = ctx.locale.bind(NS);
  setTranslate(t);
  ctx.slots.inject(
    "shell.overlay",
    () => ctx.slots.register(
      {
        name: "shell.overlay",
        id: "dsh-purge-panel-overlays",
        order: 60
      },
      PanelOverlays
    )
  );
  ctx.slots.inject(
    "sidebar.panellist",
    () => ctx.slots.register(
      {
        name: "sidebar.panellist",
        id: "dsh-purge",
        order: 30,
        label: "Ungate",
        inject: () => ({ t })
      },
      PurgeGlyphIcon
    )
  );
  ctx.slots.inject(
    "main",
    () => ctx.slots.register(
      {
        name: "main",
        key: "dsh-purge",
        inject: () => ({ t })
      },
      PurgePage
    )
  );
  ctx.slots.inject(
    "plugins.bundle.config",
    () => ctx.slots.register(
      {
        name: "plugins.bundle.config",
        key: "dsh-ungate",
        inject: () => ({ t })
      },
      SettingsRoot
    )
  );
}

return module.exports;
}});})();
