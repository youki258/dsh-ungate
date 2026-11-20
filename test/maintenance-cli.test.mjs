import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
const cli=pathToFileURL(path.resolve('bin/host-commands.js')).href;
const core=pathToFileURL(path.resolve('lib/core.js')).href;
function run(mode, report=[], shim='missing', errors=[], flash=true) {
 const code=`import {hostMain as main} from ${JSON.stringify(cli)};import {summarizeApplyReport} from ${JSON.stringify(core)};
 const state={ai_base:'/fixture',files:{},patch_status:{},shim_dir:'/fixture/bin'};
 await main([${JSON.stringify(mode)}],{rules:{resolveInjectText:()=>({text:'ordinary test'})},core:{
 ALL_PATCHES:[], gatherState:async()=>state,applyPatchesAllHosts:async()=>({hosts:[{aiBase:'/fixture'}],report:${JSON.stringify(report)}}),summarizeApplyReport,
 silenceCmdFlash:()=>({ok:${flash}}),patchShim:async()=>({dsh:${JSON.stringify(shim)}}),
 revertAllHosts:async()=>({reverted:[],errors:${JSON.stringify(errors)}}),revertShim:async()=>({dsh:${JSON.stringify(shim)}})}});`;
 return spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
}
test('CLI process returns failure for actual write/anchor/partial errors, not optional disabled',()=>{
 for(const status of ['error:EACCES','hit_mismatch:1!=2','partial','unreadable','unknown']) {
  const r=run('apply',[{patch_id:1,status}]);assert.equal(r.status,1,r.stderr);assert.match(r.stderr,/Apply incomplete/);assert.doesNotMatch(r.stdout,/All done/);
 }
 const r=run('apply',[{patch_id:18,status:'disabled'},{patch_id:1,status:'already'}]);assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/All done/);
});
test('CLI process reports shim and restore failures without false completion',()=>{
 for(const r of [run('apply',[],'error:EACCES'),run('apply',[],'missing',[],false),run('revert',[],'error:blocked'),run('revert',[],'missing',[['/fixture','Invalid backup']])]) {
  assert.equal(r.status,1,r.stderr);assert.doesNotMatch(r.stdout,/All done|Revert done/);
 }
 assert.equal(run('revert').status,0);
});

test('actual CLI help works through npm-style executable symlink', {skip:process.platform==='win32'},()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'purge-cli-alias-'));
 try {const bin=path.join(root,'purge');fs.symlinkSync(path.resolve('bin/community.js'),bin);
 const r=spawnSync(process.execPath,[bin,'help'],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/ungate 用法[\s\S]*ungate apply/s);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

// audit-cli #1/#4: --no-shim 必须读 args（不是父进程 argv），且 toggle 方向不碰共享 shim。
test('revert honors --no-shim from args and leaves shared shim untouched', () => {
 const code=`import {hostMain as main} from ${JSON.stringify(cli)};
 const state={ai_base:'/fixture',files:{},patch_status:{},shim_dir:'/fixture/bin'};
 let shimCalls=0;
 await main(['revert','--no-shim'],{core:{
  ALL_PATCHES:[],gatherState:async()=>state,revertAllHosts:async()=>({reverted:[],errors:[]}),
  revertShim:async()=>{shimCalls++;return {dsh:'no_backup'};},
  patchStatus:async()=>({}),missingAiBaseMessage:()=>''}});
 console.log('SHIM_CALLS='+shimCalls);`;
 const r=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/SHIM_CALLS=0/,`--no-shim 没有阻止 revertShim: ${r.stdout}`);
});
test('plain revert still restores shim (backward compatible)', () => {
 const code=`import {hostMain as main} from ${JSON.stringify(cli)};
 const state={ai_base:'/fixture',files:{},patch_status:{},shim_dir:'/fixture/bin'};
 let shimCalls=0;
 await main(['revert'],{core:{
  ALL_PATCHES:[],gatherState:async()=>state,revertAllHosts:async()=>({reverted:[],errors:[]}),
  revertShim:async()=>{shimCalls++;return {dsh:'no_backup'};},
  patchStatus:async()=>({}),missingAiBaseMessage:()=>''}});
 console.log('SHIM_CALLS='+shimCalls);`;
 const r=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/SHIM_CALLS=1/);
});
// audit-cli #2: 旧 flag 在生产入口上真的可用（不是死表）。
test('legacy flags and help exit codes on the only bin', () => {
 const bin=path.resolve('bin/community.js');
 const call=(...args)=>spawnSync(process.execPath,[bin,...args],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 for(const a of ['--status','-h','--help','help']) assert.equal(call(a).status,0,`${a} should exit 0`);
 assert.equal(call('bogus').status,1);
 assert.match(call('bogus').stderr,/未知子命令/);
});
// audit-cli #4/#1: toggle 在单一入口上仍输出结构化 JSON，且回滚方向带 --no-shim。
test('toggle routes through hostMain with --no-shim on revert direction', {skip:process.platform==='win32'},()=>{
 const src=fs.readFileSync(path.resolve('bin/community.js'),'utf8');
 assert.match(src,/action === "revert"\s*\?\s*\[action,\s*"--no-shim"\]/, 'toggle 回滚方向必须显式传 --no-shim');
});

// audit-invariants: optional/softSettle/native-state 补丁天然 applied 不能被误报为回滚失败。
test('revert recheck ignores optional/soft/native patches that read applied by default', () => {
 const code=`import {hostMain as main} from ${JSON.stringify(cli)};
 const state={ai_base:'/fixture',files:{},patch_status:{},shim_dir:''};
 await main(['revert','--no-shim'],{core:{
  ALL_PATCHES:[], hardPatchIds:()=>[91],
  gatherState:async()=>state,revertAllHosts:async()=>({reverted:[],errors:[]}),
  // #48 softSettle / #92 optional 天然 applied；只有硬补丁 #91 才是真残留。
  patchStatus:async()=>({48:'applied',92:'applied',90:'applied',91:'applied'}),
  revertShim:async()=>({}),missingAiBaseMessage:()=>''}});
 console.log('DONE');`;
 const r=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 assert.match(r.stderr,/还有 1 条硬补丁在宿主里（#91@/,`误报或漏报: ${r.stdout}\n${r.stderr}`);
 assert.match(r.stderr,/Revert incomplete/);
});
test('revert recheck passes when only soft/optional patches are applied', () => {
 const code=`import {hostMain as main} from ${JSON.stringify(cli)};
 const state={ai_base:'/fixture',files:{},patch_status:{},shim_dir:''};
 await main(['revert','--no-shim'],{core:{
  ALL_PATCHES:[], hardPatchIds:()=>[91],
  gatherState:async()=>state,revertAllHosts:async()=>({reverted:[],errors:[]}),
  patchStatus:async()=>({48:'applied',92:'applied',90:'applied'}),
  revertShim:async()=>({}),missingAiBaseMessage:()=>''}});
 console.log('DONE');`;
 const r=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',env:{...process.env,ELECTRON_RUN_AS_NODE:'1'}});
 assert.equal(r.status,0,r.stderr);
 assert.doesNotMatch(r.stderr,/还有.*硬补丁/);
 assert.match(r.stdout,/Revert done/);
});
