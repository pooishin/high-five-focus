;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="033dceab-aa28-099f-86ee-a9ce0df5aa79")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25123,e=>{"use strict";var t=e.i(265735);function s(){let{data:e}=(0,t.useSelectedOrganizationQuery)();return e?{plan:e?.plan,usageBillingEnabled:e?.usage_billing_enabled,isLoading:!1,isSuccess:!0}:{plan:null,usageBillingEnabled:null,isLoading:!0,isSuccess:!1}}e.s(["useCurrentOrgPlan",()=>s])},929461,e=>{"use strict";var t=e.i(242882),s=e.i(234745),r=e.i(718727);async function a({projectRef:e,type:t,name:r,limit:a=10},o){if(void 0===e)throw Error("projectRef is required for getContent");let{data:i,error:n}=await (0,s.get)("/platform/projects/{ref}/content",{params:{path:{ref:e},query:{type:t,name:r,limit:a.toString()}},signal:o});return n&&(0,s.handleError)(n),{cursor:i.cursor,content:i.data}}e.s(["useContentQuery",0,({projectRef:e,type:s,name:o,limit:i},{enabled:n=!0,...l}={})=>(0,t.useQuery)({queryKey:r.contentKeys.list(e,{type:s,name:o,limit:i}),queryFn:({signal:t})=>a({projectRef:e,type:s,name:o,limit:i},t),enabled:n&&void 0!==e,...l})])},586011,e=>{"use strict";var t=e.i(38429),s=e.i(356003),r=e.i(355901),a=e.i(234745),o=e.i(718727);async function i({projectRef:e,ids:t},s){let{data:r,error:o}=await (0,a.del)("/platform/projects/{ref}/content",{headers:{Version:"2"},params:{path:{ref:e},query:{ids:t.join(",")}},signal:s});return o&&(0,a.handleError)(o),r.map(e=>e.id)}e.s(["useContentDeleteMutation",0,({onSuccess:e,onError:a,...n}={})=>{let l=(0,s.useQueryClient)();return(0,t.useMutation)({mutationFn:e=>i(e),async onSuccess(t,s,r){let{projectRef:a}=s;await Promise.all([l.invalidateQueries({queryKey:o.contentKeys.allContentLists(a)}),l.invalidateQueries({queryKey:o.contentKeys.infiniteList(a)})]),await e?.(t,s,r)},async onError(e,t,s){void 0===a?r.toast.error(`Failed to delete contents: ${e.message}`):a(e,t,s)},...n})}])},271332,e=>{"use strict";var t=e.i(478902),s=e.i(389959),r=e.i(843778),a=e.i(837710),o=e.i(253214);let i=(0,s.forwardRef)(({children:e,customFooter:i,description:n,hideFooter:l=!1,alignFooter:d="left",layout:u="horizontal",loading:c=!1,cancelText:m="Cancel",onConfirm:g=()=>{},onCancel:p=()=>{},confirmText:h="Confirm",showCloseButton:f=!0,footerBackground:_,variant:b="success",visible:y=!1,size:S="large",style:v,overlayStyle:x,contentStyle:E,triggerElement:w,header:T,modal:N,defaultOpen:I,...j},R)=>{let[k,C]=s.default.useState(!!y&&y);(0,s.useEffect)(()=>{C(y)},[y]);let A=i||(0,t.jsxs)("div",{className:"flex w-full space-x-2",style:{width:"100%",justifyContent:"vertical"===u?"center":"right"===d?"flex-end":"flex-start"},children:[(0,t.jsx)(a.Button,{type:"default",onClick:p,disabled:c,children:m}),(0,t.jsx)(a.Button,{onClick:g,disabled:c,loading:c,type:"danger"===b?"danger":"warning"===b?"warning":"primary",children:h})]});return(0,t.jsxs)(o.Dialog,{open:k,defaultOpen:I,onOpenChange:function(e){void 0===y||e?C(e):p()},modal:N,children:[w&&(0,t.jsx)(o.DialogTrigger,{children:w}),(0,t.jsxs)(o.DialogContent,{ref:R,hideClose:!f,...j,size:S,children:[T||n?(0,t.jsxs)(o.DialogHeader,{className:(0,r.cn)("border-b"),padding:"small",children:[T&&(0,t.jsx)(o.DialogTitle,{children:T}),n&&(0,t.jsx)(o.DialogDescription,{children:n})]}):null,e,!l&&(0,t.jsx)(o.DialogFooter,{padding:"small",children:A})]})]})}),n=(0,s.forwardRef)(({...e},s)=>(0,t.jsx)(o.DialogSection,{ref:s,...e,padding:"small",className:(0,r.cn)(e.className)})),l=(0,s.forwardRef)(({...e},s)=>(0,t.jsx)(o.DialogSectionSeparator,{ref:s,...e}));i.Content=n,i.Separator=l,e.s(["default",0,i])},40892,e=>{"use strict";var t=e.i(271332);e.s(["Modal",()=>t.default])},441345,e=>{"use strict";var t=e.i(343563);e.s(["Form",()=>t.default])},95069,e=>{"use strict";let t=(0,e.i(388019).default)("ChevronsDown",[["path",{d:"m7 6 5 5 5-5",key:"1lc07p"}],["path",{d:"m7 13 5 5 5-5",key:"1d48rs"}]]);e.s(["ChevronsDown",()=>t],95069)},498377,e=>{"use strict";var t=e.i(478902),s=e.i(416050),r=e.i(95069),a=e.i(774803),o=e.i(366652),i=e.i(210419),n=e.i(389959),l=e.i(843778),d=e.i(925282),u=e.i(774234),c=e.i(554855),m=e.i(874311),g=e.i(378277);e.i(903248);var p=e.i(613580),h=e.i(792459);e.i(108151);let f=(0,n.forwardRef)(({...e},s)=>(0,t.jsx)(d.Collapsible_Shadcn_,{ref:s,...e,className:(0,l.cn)("w-full px-2 group",e.className)})),_=(0,n.forwardRef)(({...e},r)=>(0,t.jsxs)(c.CollapsibleTrigger_Shadcn_,{ref:r,...e,className:(0,l.cn)("w-full flex gap-1 items-center group px-3 text-sm font-normal font-mono uppercase text-lighter tracking-wide",e.className),children:[(0,t.jsx)(s.ChevronRight,{className:"transition-all text-foreground-muted group-data-[state=open]:rotate-90",size:16,strokeWidth:1.5}),(0,t.jsx)("span",{className:"group-hover:not-disabled:text-foreground",children:e.title})]})),b=(0,n.forwardRef)(({...e},s)=>(0,t.jsx)(u.CollapsibleContent_Shadcn_,{ref:s,...e,className:(0,l.cn)("w-full flex flex-col gap-0",e.className)})),y=(0,n.forwardRef)((e,s)=>(0,t.jsx)("div",{ref:s,...e,className:(0,l.cn)("h-px bg-border-muted",e.className)})),S=(0,n.forwardRef)(({className:e,isActive:s,forceHoverState:r,...a},o)=>(0,t.jsx)(i.default,{ref:o,...a,"aria-current":s,className:(0,l.cn)("text-sm","h-7 pl-3 pr-2","flex items-center justify-between rounded-md group relative",s?"bg-selection":"hover:bg-surface-200",r&&"bg-surface-200",s?"text-foreground":"text-foreground-light hover:text-foreground",e)})),v=(0,n.forwardRef)(({isActive:e=!0,forceHoverState:s,isPreview:r,isOpened:a=!0,...o},n)=>(0,t.jsxs)(i.default,{ref:n,...o,"aria-current":e,className:(0,l.cn)((0,h.TreeViewItemVariant)({isSelected:e&&!r,isOpened:a&&!r,isPreview:r}),"px-4",o.className),children:[!r&&e&&(0,t.jsx)("div",{className:"absolute left-0 h-full w-0.5 bg-foreground"}),o.children]})),x=(0,n.forwardRef)((e,s)=>(0,t.jsx)("div",{ref:s,...e,className:(0,l.cn)("flex px-2 gap-2 items-center",e.className)})),E=(0,n.forwardRef)(({children:e,isLoading:s=!1,...r},i)=>(0,t.jsxs)("label",{htmlFor:r.name,className:"relative w-full",children:[(0,t.jsx)("span",{className:"sr-only",children:r["aria-labelledby"]}),(0,t.jsx)(g.Input_Shadcn_,{ref:i,type:"text",className:(0,l.cn)("h-[32px] md:h-[28px] w-full","text-base md:text-xs","pl-7","pr-7","w-full","rounded",r.className),...r}),e,s?(0,t.jsx)(a.Loader2,{className:"animate-spin absolute left-2 text-foreground-muted",style:{top:7},size:14,strokeWidth:1.5}):(0,t.jsx)(o.Search,{className:"absolute left-2 top-0 bottom-0 my-auto text-foreground-muted",size:14,strokeWidth:1.5})]})),w=(0,n.forwardRef)(({value:e,onValueChange:s,contentClassName:a,triggerClassName:o,...i},n)=>(0,t.jsxs)(m.DropdownMenu,{modal:!1,children:[(0,t.jsxs)(p.Tooltip,{delayDuration:0,children:[(0,t.jsx)(m.DropdownMenuTrigger,{asChild:!0,className:(0,l.cn)("absolute right-1 top-[.4rem] md:top-[.3rem]","text-foreground transition-colors hover:text-foreground data-[state=open]:text-foreground",o),children:(0,t.jsx)(p.TooltipTrigger,{children:(0,t.jsx)(r.ChevronsDown,{size:18,strokeWidth:1})})}),(0,t.jsx)(p.TooltipContent,{side:"bottom",children:"Sort By"})]}),(0,t.jsx)(m.DropdownMenuContent,{side:"bottom",align:"end",className:(0,l.cn)("w-48",a),children:(0,t.jsx)(m.DropdownMenuRadioGroup,{value:e,onValueChange:s,children:i.children})})]})),T=(0,n.forwardRef)((e,s)=>(0,t.jsx)(m.DropdownMenuRadioItem,{ref:s,...e})),N=(0,n.forwardRef)(({illustration:e,title:s,description:r,actions:a,...o},i)=>(0,t.jsx)("div",{ref:i,...o,className:(0,l.cn)("border border-muted bg-surface-100 dark:bg-surface-75 flex flex-col gap-y-3 items-center justify-center rounded-md px-5 py-4",o.className),children:(0,t.jsxs)("div",{className:"w-full flex flex-col gap-y-1 items-center",children:[e,s&&(0,t.jsx)("p",{className:"text-xs text-foreground-light",children:s}),r&&(0,t.jsx)("p",{className:"text-xs text-foreground-lighter text-center",children:r}),a&&(0,t.jsx)("div",{className:"mt-2",children:a}),o.children]})}));e.s(["InnerSideBarEmptyPanel",()=>N,"InnerSideBarFilterSearchInput",()=>E,"InnerSideBarFilterSortDropdown",()=>w,"InnerSideBarFilterSortDropdownItem",()=>T,"InnerSideBarFilters",()=>x,"InnerSideMenuCollapsible",()=>f,"InnerSideMenuCollapsibleContent",()=>b,"InnerSideMenuCollapsibleTrigger",()=>_,"InnerSideMenuDataItem",()=>v,"InnerSideMenuItem",()=>S,"InnerSideMenuSeparator",()=>y])},223173,674742,843819,928253,993032,e=>{"use strict";var t=e.i(478902);e.i(481541);var s=e.i(33034),s=s,r=e.i(126200);e.s(["Datadog",()=>r.default],674742);var r=r,a=e.i(841231);e.s(["Grafana",()=>a.default],843819);var a=a,o=e.i(57349),o=o,i=e.i(660253);e.s(["Sentry",()=>i.default],928253);var i=i,n=e.i(388019);let l=(0,n.default)("Braces",[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]]);e.s(["BracesIcon",()=>l],993032);let d=(0,n.default)("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]),u={height:24,width:24,className:"text-foreground-light"},c=[{value:"webhook",name:"Custom Endpoint",description:"Forward logs as a POST request to a custom HTTP endpoint",icon:(0,t.jsx)(l,{...u})},{value:"datadog",name:"Datadog",description:"Datadog is a monitoring service for cloud-scale applications",icon:(0,t.jsx)(r.default,{...u,fill:"currentColor",strokeWidth:0})},{value:"loki",name:"Loki",description:"Loki is an open-source log aggregation system designed to store and query logs from multiple sources",icon:(0,t.jsx)(a.default,{...u,fill:"currentColor",strokeWidth:0})},{value:"s3",name:"Amazon S3",description:"Forward logs to an S3 bucket",icon:(0,t.jsx)(d,{...u})},{value:"sentry",name:"Sentry",description:"Sentry is an application monitoring service that helps developers identify and debug performance issues and errors",icon:(0,t.jsx)(i.default,{...u,fill:"currentColor",strokeWidth:0})},{value:"axiom",name:"Axiom",description:"Axiom is a data platform designed to efficiently collect, store, and analyze event and telemetry data at massive scale.",icon:(0,t.jsx)(s.default,{...u,fill:"currentColor",strokeWidth:0})},{value:"last9",name:"Last9",description:"Last9 is an observability platform for monitoring and telemetry data",icon:(0,t.jsx)(o.default,{...u,fill:"currentColor",strokeWidth:0})}];c.map(e=>e.value),e.s(["DATADOG_REGIONS",0,[{label:"AP1",value:"AP1"},{label:"AP2",value:"AP2"},{label:"EU",value:"EU"},{label:"US1",value:"US1"},{label:"US1-FED",value:"US1-FED"},{label:"US3",value:"US3"},{label:"US5",value:"US5"}],"LAST9_REGIONS",0,[{label:"US West 1",value:"US-WEST-1"},{label:"AP South 1",value:"AP-SOUTH-1"}],"LOG_DRAIN_TYPES",0,c],223173)},388034,e=>{"use strict";let t=(0,e.i(388019).default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["default",()=>t])},61187,e=>{"use strict";var t=e.i(388034);e.s(["RefreshCw",()=>t.default])},460988,e=>{"use strict";var t=e.i(156054),s=e.i(55956),r=e.i(784820),a=e.i(605031),o=e.i(389959);e.i(128328);var i=e.i(86086),n=e.i(884892),l=e.i(857054),d=e.i(993394);let u=e=>s.default.utc(Number(e)/1e3).toISOString(),c=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},m=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(s=>{let r=t?`${t}.${s}`:s;return"object"==typeof e[s]?m(e[s],r):[r]}),g=(e,t)=>{let s=Object.keys(t),a=d.SQL_FILTER_TEMPLATES[e],o=e=>{let s=a[e],o=(0,r.default)(t,e);if(void 0!==o&&"function"==typeof s)return s(o);if(void 0===s)if("string"==typeof o)return`${e} = '${o}'`;else return`${e} = ${o}`;return void 0===o&&"function"==typeof s?null:s&&!1===o?null:s},i=s.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let s=m(t[e],e).map(o).filter(Boolean);return s.length>0?`(${s.join(" or ")})`:null}{let t=o(e);return null===t?null:`(${t})`}}).filter(Boolean).join(" and ");return i?"where "+i:""},p=e=>{switch(e){case"edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return"cross join unnest(metadata) as metadata";case"function_edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return"cross join unnest(metadata) as m";default:return""}},h=i.IS_PLATFORM?"where ( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )":"where ( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )",f=e=>{let t=e.reduce((e,t)=>{let s=_(t);return e[s]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,s)=>t[e]>t[s]?e:s)},_=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function b(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function y(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function S(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let s=t?.payload?.[0];return s&&"HS256"===s.algorithm&&"supabase"===s.issuer&&["anon","service_role"].includes(s.role)&&!s.subject?s.role:"<unrecognized>"}function v(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`}function x(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let s=t?.payload?.[0];if(s&&s.role)return s.role}e.s(["apiKey",()=>v,"checkForILIKEClause",()=>y,"checkForWithClause",()=>b,"fillTimeseries",0,(e,t,r,a,o,i,n=20,l)=>{let d;if(0===e.length&&!(o&&i))return[];if(e.length>n)return e.map(e=>{let r=e[t],a=c(r)?u(r):s.default.utc(r).toISOString();return e[t]=a,e});if(e.length<=1&&!(o&&i))return e;let m=e.map(e=>s.default.utc(e[t])),g=i?s.default.utc(i):s.default.utc(Math.max.apply(null,m)),p=o?s.default.utc(o):s.default.utc(Math.min.apply(null,m)),h=e.length>0?m:[p,g],_=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(_=parseInt(e[1],10),d=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):d=f(h)}else d=f(h);0!==e.length||l||(d="minute");let b=e.map(e=>{let a=e[t],o=c(a)?u(a):s.default.utc(a).toISOString();return Array.isArray(r)&&0===r.length?{[t]:o}:(e[t]=o,e)}),y=p;for(;y.isBefore(g)||y.isSame(g);){if(!m.find(e=>e.year()===y.year()&&e.month()===y.month()&&e.date()===y.date()&&e.hour()===y.hour()&&e.minute()===y.minute()&&e.second()===y.second())){let e=("string"==typeof r?[r]:r).reduce((e,t)=>({...e,[t]:a}),{});b.push({[t]:y.toISOString(),...e})}y=y.add(_,d)}return b},"genChartQuery",0,(e,t,r)=>{let a,o,i,n,l,u,[c,m]=(a=t.iso_timestamp_end?(0,s.default)(t.iso_timestamp_end):(0,s.default)(),o=t.iso_timestamp_start?(0,s.default)(t.iso_timestamp_start):(0,s.default)(),i="minute",n=360,l=a.diff(o,"minute"),u=a.diff(o,"hour"),l>720?(i="hour",n=120):u>72&&(i="day",n=7),[o.add(-n,i),i]),f=g(e,r),_=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 500";case"postgres_logs":case"pg_cron_logs":return"parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')";case"auth_logs":return"metadata.level = 'error' OR SAFE_CAST(metadata.status AS INT64) >= 400";case"function_logs":return"metadata.level IN ('error', 'fatal')";default:return"false"}}(e),b=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 400 AND response.status_code < 500";case"postgres_logs":return"parsed.error_severity IN ('WARNING')";case"auth_logs":return"metadata.level = 'warning'";case"function_logs":return"metadata.level IN ('warning')";default:return"false"}}(e);e===d.LogsTableName.PG_CRON&&(e=d.LogsTableName.POSTGRES,f=h);let y=p(e);return`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${m}) as timestamp,
  count(CASE WHEN NOT (${_} OR ${b}) THEN 1 END) as ok_count,
  count(CASE WHEN ${_} THEN 1 END) as error_count,
  count(CASE WHEN ${b} THEN 1 END) as warning_count,
FROM
  ${e} t
  ${y}
  ${f?f+` and t.timestamp > '${c.toISOString()}'`:`where t.timestamp > '${c.toISOString()}'`}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let s=g(e,t);e===d.LogsTableName.PG_CRON&&(e=d.LogsTableName.POSTGRES,s=h);let r=p(e);return`SELECT count(*) as count FROM ${e} ${r} ${s}`},"genDefaultQuery",0,(e,t,s=100)=>{let r=g(e,t),a=p(e),o="order by timestamp desc";switch(e){case"edge_logs":if(!i.IS_PLATFORM)return`
-- local dev edge_logs query
select id, edge_logs.timestamp, event_message, request.method, request.path, request.search, response.status_code
from edge_logs
${a}
${r}
${o}
limit ${s};
`;return`select id, identifier, timestamp, event_message, request.method, request.path, request.search, response.status_code
  from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"postgres_logs":if(!i.IS_PLATFORM)return`
select postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint
from postgres_logs
${a}
${r}
${o}
limit ${s}
  `;return`select identifier, postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"function_logs":return`select id, ${e}.timestamp, event_message, metadata.event_type, metadata.function_id, metadata.level from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
    `;case"auth_logs":return`select id, ${e}.timestamp, event_message, metadata.level, metadata.status, metadata.path, metadata.msg as msg, metadata.error from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
    `;case"function_edge_logs":if(!i.IS_PLATFORM)return`
select id, function_edge_logs.timestamp, event_message
from function_edge_logs
${o}
limit ${s}
`;return`select id, ${e}.timestamp, event_message, response.status_code, request.method, m.function_id, m.execution_time_ms, m.deployment_id, m.version from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"supavisor_logs":return`select id, ${e}.timestamp, event_message from ${e} ${a} ${r} ${o} limit ${s}`;case"pg_upgrade_logs":return`select id, ${e}.timestamp, event_message from ${e} ${a} ${r} ${o} limit 100`;default:return`select id, ${e}.timestamp, event_message from ${e}
  ${r}
  ${o}
  limit ${s}
  `;case"pg_cron_logs":let n=r?`${h} AND ${r.substring(6)}`:h;return`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${a}
${n}
${o}
limit ${s}
`}},"genSingleLogQuery",0,(e,t)=>`select id, timestamp, event_message, metadata from ${e} where id = '${t}' limit 1`,"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,c,"jwtAPIKey",()=>S,"maybeShowUpgradePrompt",0,(e,t)=>{let r=Math.abs((0,s.default)().diff((0,s.default)(e),"day"));return r>1&&"free"===t||r>7&&"pro"===t||r>28&&"team"===t||r>90&&"enterprise"===t},"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,s.default)().diff((0,s.default)(e),"day"))>t,"role",()=>x,"unixMicroToIsoTimestamp",0,u,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,o.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,s,r){let o=new n.default(t,s.column-2,s.lineNumber-1);if(o.isNextDQuote())return{suggestions:[]};let i=[],d=l.default.schemas.filter(e=>o._text.includes(e.reference));if(0===d.length&&(d=l.default.schemas),o.isNextPeriod()){let t=d.flatMap(e=>e.fields).flatMap(e=>{let[t,...s]=e.path.split(".");return s}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=i.concat(t)}if("`"===r.triggerCharacter||" "===r.triggerCharacter){let t=l.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),s=d.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=(i=i.concat(s)).concat(t)}return{suggestions:(0,a.default)(i,"label")}}});return()=>{t.dispose()}}},[e])}])},993394,e=>{"use strict";var t,s=e.i(55956),r=e.i(10429);e.i(128328);var a=e.i(86086);let o=`${r.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,i=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
  p.user_name,
  count(*) as count
from postgres_logs
  left join unnest(metadata) as m on true
  left join unnest(m.parsed) as p on true
where
  regexp_contains(event_message, 'COMMIT')
group by
  p.user_name
  `,for:["database"]},{label:"Metadata IP",description:"List all IP addresses that used the Supabase API",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  h.x_real_ip
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.headers) as h on true
where h.x_real_ip is not null
`,for:["api"]},{label:"Requests by Geography",description:"List all ISO 3166-1 alpha-2 country codes that used the Supabase API",mode:"custom",searchString:`select
  cf.country,
  count(*) as count
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.cf) as cf on true
group by
  cf.country
order by
  count desc
`,for:["api"]},{label:"Slow Response Time",mode:"custom",description:"List all Supabase API requests that are slow",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.origin_time
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.origin_time > 1000
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"500 Request Codes",description:"List all Supabase API requests that responded witha 5XX status code",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.status_code
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.status_code >= 500
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Top Paths",description:"List the most requested Supabase API paths",mode:"custom",searchString:`select
  r.path as path,
  r.search as params,
  count(timestamp) as c
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
group by
  path,
  params
order by
  c desc
limit 100
`,for:["api"]},{label:"REST Requests",description:"List all PostgREST requests",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
where
  path like '%rest/v1%'
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Errors",description:"List all Postgres error messages with ERROR, FATAL, or PANIC severity",mode:"custom",searchString:`select
  cast(t.timestamp as datetime) as timestamp,
  p.error_severity,
  event_message
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
order by
  timestamp desc
limit 100
`,for:["database"]},{label:"Error Count by User",description:"Count of errors by users",mode:"custom",searchString:`select
  count(t.timestamp) as count,
  p.user_name,
  p.error_severity
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
group by
  p.user_name,
  p.error_severity
order by
  count desc
limit 100
`,for:["database"]},{label:"Auth Endpoint Events",description:"Endpoint events filtered by path",mode:"custom",searchString:`select
  t.timestamp,
  event_message
from auth_logs as t
where
  regexp_contains(event_message,"level.{3}(info|warning||error|fatal)")
  -- and regexp_contains(event_message,"path.{3}(/token|/recover|/signup|/otp)")
limit 100
`,for:["database"]},{label:"Auth Audit Logs",description:"Audit logs for auth events",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message, metadata 
from auth_audit_logs 
limit 10
`,for:["database"]},{label:"Storage Object Requests",description:"Number of requests done on Storage Objects",mode:"custom",searchString:`select
  r.method as http_verb,
  r.path as filepath,
  count(*) as num_requests
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) AS r
  cross join unnest(r.headers) AS h
where
  path like '%storage/v1/object/%'
group by
  r.path, r.method
order by
  num_requests desc
limit 100
`,for:["api"]},{label:"Storage Egress Requests",description:"Check the number of requests done on Storage Affecting Egress",mode:"custom",searchString:`select
  request.method as http_verb,
  request.path as filepath,
  (responseHeaders.cf_cache_status = 'HIT') as cached,
  count(*) as num_requests
from
  edge_logs
  cross join unnest(metadata) as metadata
  cross join unnest(metadata.request) as request
  cross join unnest(metadata.response) as response
  cross join unnest(response.headers) as responseHeaders
where
  (path like '%storage/v1/object/%' or path like '%storage/v1/render/%')
  and request.method = 'GET'
group by 1, 2, 3
order by num_requests desc
limit 100;
`,for:["api"]},{label:"Storage Top Cache Misses",description:"The top Storage requests that miss caching",mode:"custom",searchString:`select
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
group by path, search
order by count desc
limit 100;
`,for:["api"]}],n={search_query:e=>`regexp_contains(event_message, '${e}')`},l={postgres_logs:{...n,database:e=>`identifier = '${e}'`,"severity.error":"parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')","severity.noError":"parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')","severity.log":"parsed.error_severity = 'LOG'"},edge_logs:{...n,database:e=>`identifier = '${e}'`,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499","product.database":"request.path like '/rest/%' or request.path like '/graphql/%'","product.storage":"request.path like '/storage/%'","product.auth":"request.path like '/auth/%'","product.realtime":"request.path like '/realtime/%'","method.get":"request.method = 'GET'","method.post":"request.method = 'POST'","method.put":"request.method = 'PUT'","method.patch":"request.method = 'PATCH'","method.delete":"request.method = 'DELETE'","method.options":"request.method = 'OPTIONS'"},function_edge_logs:{...n,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499"},function_logs:{...n,"severity.error":"metadata.level = 'error'","severity.notError":"metadata.level != 'error'","severity.log":"metadata.level = 'log'","severity.info":"metadata.level = 'info'","severity.debug":"metadata.level = 'debug'","severity.warn":"metadata.level = 'warn'"},auth_logs:{...n,"severity.error":"metadata.level = 'error' or metadata.level = 'fatal'","severity.warning":"metadata.level = 'warning'","severity.info":"metadata.level = 'info'","status_code.server_error":"cast(metadata.status as int64) between 500 and 599","status_code.client_error":"cast(metadata.status as int64) between 400 and 499","status_code.redirection":"cast(metadata.status as int64) between 300 and 399","status_code.success":"cast(metadata.status as int64) between 200 and 299","endpoints.admin":'REGEXP_CONTAINS(metadata.path, "/admin")',"endpoints.signup":'REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")',"endpoints.authentication":'REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")',"endpoints.recover":'REGEXP_CONTAINS(metadata.path, "/recover")',"endpoints.user":'REGEXP_CONTAINS(metadata.path, "/user")',"endpoints.logout":'REGEXP_CONTAINS(metadata.path, "/logout")'},realtime_logs:{...n},storage_logs:{...n},postgrest_logs:{...n,database:e=>`identifier = '${e}'`},pgbouncer_logs:{...n},supavisor_logs:{...n,database:e=>`m.project like '${e}%'`},pg_upgrade_logs:{...n},pg_cron_logs:{...n},etl_replication_logs:{...n,pipeline_id:e=>`pipeline_id = ${e}`}};var d=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t);let u={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...a.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},c=[{text:"Last 15 minutes",calcFrom:()=>(0,s.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,s.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,s.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,s.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],m=[{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,s.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["EXPLORER_DATEPICKER_HELPERS",0,m,"FILTER_OPTIONS",0,u,"LOGS_EXPLORER_DOCS_URL",0,o,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>d,"PREVIEWER_DATEPICKER_HELPERS",0,c,"SQL_FILTER_TEMPLATES",0,l,"TEMPLATES",0,i,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0]])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,s){this.model=e,this.offset=t,this.lineNumber=s,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[s]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,s=0,r=0;for(;this.hasNext();){let a=this.next();switch(a){case 40:if(--e<0)return r;break;case 41:e++;break;case 123:s--;break;case 125:s++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&a!==this.next(););break;case 44:!e&&!t&&!s&&r++}}return -1}readIdent(){let e=!1,t=!1,s="";for(;this.hasNext();){let r=this.peekNext();if(e&&!t&&!this._isIdentPart(r))break;if(r=this.next(),!e&&t&&34===r){e=!0;continue}if(e||32!==r&&9!==r&&10!=r){if(!e&&(34===r||this._isIdentPart(r)))e=!0,t=34===r,s=String.fromCharCode(r)+s;else if(e)if(t){if(0===r||(s=String.fromCharCode(r)+s,34===r))break}else s=String.fromCharCode(r)+s}}return s}readIdents(e){let t=[];for(;e>0;){e--;let s=this.readIdent();if(!s||(t.push(s),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},520124,e=>{"use strict";var t=e.i(460988),s=e.i(389959);e.s(["useFillTimeseriesSorted",0,e=>{let{data:r,timestampKey:a,valueKey:o,defaultValue:i,startDate:n,endDate:l,minPointsToFill:d=20,interval:u}=e;return(0,s.useMemo)(()=>{var e;if(!r[0]?.[a])return{data:r,error:null,isError:!1};try{return{data:(e=(0,t.fillTimeseries)(r,a,o,i,n,l,d,u),[...e].sort((e,t)=>new Date(e[a]).getTime()-new Date(t[a]).getTime())),error:null,isError:!1}}catch(e){return{data:[],error:e instanceof Error?e:Error(String(e)),isError:!0}}},[JSON.stringify(r),a,JSON.stringify(o),i,n,l,d,u])}])}]);

//# debugId=033dceab-aa28-099f-86ee-a9ce0df5aa79
//# sourceMappingURL=f998a9317598542b.js.map