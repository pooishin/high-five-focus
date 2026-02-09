;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="fa8bbfe9-1cfb-1ae9-0d87-55b1874fafe7")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,693241,e=>{"use strict";var t=e.i(478902),a=e.i(710483);let n=({resourceText:e,isFullPage:n=!1})=>{let r=()=>(0,t.jsx)(a.Admonition,{type:"warning",title:`You need additional permissions to ${e}`,description:"Contact your organization owner or administrator for assistance."});return n?(0,t.jsx)("div",{className:"flex h-full items-center justify-center",children:(0,t.jsx)("div",{className:"max-w-lg",children:(0,t.jsx)(r,{})})}):(0,t.jsx)(r,{})};e.s(["NoPermission",0,n,"default",0,n])},3259,100387,e=>{"use strict";var t=e.i(478902),a=e.i(153545),n=e.i(933505);e.s(["ChevronRightIcon",()=>n.default],100387);var n=n,r=e.i(389959),s=e.i(843778);let i=r.forwardRef(({...e},a)=>(0,t.jsx)("nav",{ref:a,"aria-label":"breadcrumb",...e}));i.displayName="Breadcrumb";let l=r.forwardRef(({className:e,...a},n)=>(0,t.jsx)("ol",{ref:n,className:(0,s.cn)("flex flex-wrap items-center gap-0.5 break-words text-sm text-muted-foreground sm:gap-1.5",e),...a}));l.displayName="BreadcrumbList";let o=r.forwardRef(({className:e,...a},n)=>(0,t.jsx)("li",{ref:n,className:(0,s.cn)("inline-flex text-foreground-lighter items-center gap-1.5 leading-5",e),...a}));o.displayName="BreadcrumbItem";let c=r.forwardRef(({asChild:e,className:n,...r},i)=>{let l=e?a.Slot:"a";return(0,t.jsx)(l,{ref:i,className:(0,s.cn)("transition-colors underline lg:no-underline hover:text-foreground",n),...r})});c.displayName="BreadcrumbLink";let d=r.forwardRef(({className:e,...a},n)=>(0,t.jsx)("span",{ref:n,role:"link","aria-disabled":"true","aria-current":"page",className:(0,s.cn)("no-underline text-foreground",e),...a}));d.displayName="BreadcrumbPage";let u=({children:e,className:a,...r})=>(0,t.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,s.cn)("[&>svg]:size-3.5 text-foreground-muted",a),...r,children:e??(0,t.jsx)(n.default,{})});u.displayName="BreadcrumbSeparator";let m=({className:e,...a})=>(0,t.jsxs)("span",{className:(0,s.cn)("flex h-4 w-4 items-center justify-center",e),...a,children:[(0,t.jsx)("svg",{role:"presentation","aria-hidden":"true",width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})}),(0,t.jsx)("span",{className:"sr-only",children:"More"})]});m.displayName="BreadcrumbEllipsis",e.s(["Breadcrumb",()=>i,"BreadcrumbEllipsis",()=>m,"BreadcrumbItem",()=>o,"BreadcrumbLink",()=>c,"BreadcrumbList",()=>l,"BreadcrumbPage",()=>d,"BreadcrumbSeparator",()=>u],3259)},744061,418638,e=>{"use strict";var t=e.i(478902),a=e.i(938933),n=e.i(843778);function r({children:e,className:a,tag:n="div",style:r}){let s=`${n}`;return(0,t.jsx)(s,{style:r,children:e})}r.Title=function({className:e,level:a=1,children:n,style:r}){let s=`h${a}`;return(0,t.jsx)(s,{style:r,children:n})},r.Text=function({className:e,children:a,style:n,type:r,disabled:s,mark:i,code:l,keyboard:o,underline:c,strikethrough:d,strong:u,small:m}){return l?(0,t.jsx)("code",{style:n,children:a}):i?(0,t.jsx)("mark",{style:n,children:a}):o?(0,t.jsx)("kbd",{style:n,children:a}):u?(0,t.jsx)("strong",{style:n,children:a}):(0,t.jsx)("span",{style:n,children:a})},r.Link=function({children:e,target:a="_blank",href:n,className:r,onClick:s,style:i}){return(0,t.jsx)("a",{onClick:s,href:n,target:a,rel:"noopener noreferrer",style:i,children:e})},e.s(["default",0,r],418638);var s=e.i(389959);let i=(0,s.createContext)({type:"text"}),l=e=>{let{type:a}=e;return(0,t.jsx)(i.Provider,{value:{type:a},children:e.children})},o=()=>{let e=(0,s.useContext)(i);if(void 0===e)throw Error("MenuContext must be used within a MenuContextProvider.");return e};function c({children:e,className:a,ulClassName:n,style:r,type:s="text"}){return(0,t.jsx)("nav",{role:"menu","aria-label":"Sidebar","aria-orientation":"vertical","aria-labelledby":"options-menu",className:a,style:r,children:(0,t.jsx)(l,{type:s,children:(0,t.jsx)("ul",{className:n,children:e})})})}c.Item=function({children:e,icon:r,active:s,rounded:i,onClick:l,doNotCloseOverlay:c=!1,showActiveBar:d=!1,style:u}){let m=(0,a.default)("menu"),{type:h}=o(),p=[m.item.base];p.push(m.item.variants[h].base),s?p.push(m.item.variants[h].active):p.push(m.item.variants[h].normal);let f=[m.item.content.base];s?f.push(m.item.content.active):f.push(m.item.content.normal);let g=[m.item.icon.base];return s?g.push(m.item.icon.active):g.push(m.item.icon.normal),(0,t.jsxs)("li",{role:"menuitem",className:(0,n.cn)("outline-none",p),style:u,onClick:l,"aria-current":s?"page":void 0,children:[r&&(0,t.jsx)("div",{className:`${g.join(" ")} min-w-fit`,children:r}),(0,t.jsx)("span",{className:f.join(" "),children:e})]})},c.Group=function({children:e,icon:n,title:r}){let s=(0,a.default)("menu"),{type:i}=o();return(0,t.jsxs)("div",{className:[s.group.base,s.group.variants[i]].join(" "),children:[n&&(0,t.jsx)("span",{className:s.group.icon,children:n}),(0,t.jsx)("span",{className:s.group.content,children:r}),e]})},c.Misc=function({children:e}){return(0,t.jsx)("div",{children:(0,t.jsx)(r.Text,{children:(0,t.jsx)("span",{children:e})})})},e.s(["default",0,c],744061)},862326,e=>{"use strict";var t=e.i(744061);e.s(["Menu",()=>t.default])},388147,799793,e=>{"use strict";var t=e.i(478902),a=e.i(587433),n=e.i(862326),r=e.i(210419),s=e.i(837710);let i=({item:e,isActive:i,target:l="_self",hoverText:o="",onClick:c})=>{let{name:d="",url:u="",icon:m,rightIcon:h,isExternal:p,label:f,disabled:g}=e,b=(0,t.jsx)(n.Menu.Item,{icon:m,active:i,onClick:c,children:(0,t.jsxs)("div",{className:"flex w-full items-center justify-between gap-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1 min-w-0 flex-1",title:o||("string"==typeof d?d:""),children:[(0,t.jsx)("span",{className:"truncate flex-1 min-w-0",children:d}),void 0!==f&&(0,t.jsx)(a.Badge,{className:"flex-shrink-0",variant:"new"===f.toLowerCase()?"success":"warning",children:f})]}),h&&(0,t.jsx)("div",{children:h})]})});return g?(0,t.jsx)("div",{className:"opacity-50 pointer-events-none",children:b}):u?p?(0,t.jsx)(s.Button,{asChild:!0,block:!0,className:"!justify-start",type:"text",size:"small",icon:m,children:(0,t.jsx)(r.default,{href:u,target:"_blank",rel:"noreferrer",children:d})}):(0,t.jsx)(r.default,{href:u,className:"block",target:l,children:b}):b};e.s(["ProductMenuItem",0,i],799793),e.s(["ProductMenu",0,({page:e,menu:r})=>(0,t.jsx)("div",{className:"flex flex-col space-y-8",children:(0,t.jsx)(n.Menu,{type:"pills",children:r.map((s,l)=>(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"my-6 space-y-8",children:(0,t.jsxs)("div",{className:"mx-3",children:[(0,t.jsx)(n.Menu.Group,{title:s.title?(0,t.jsxs)("div",{className:"flex flex-col space-y-2 uppercase font-mono",children:[(0,t.jsx)("span",{children:s.title}),s.isPreview&&(0,t.jsx)(a.Badge,{variant:"warning",children:"Not production ready"})]}):null}),(0,t.jsx)("div",{children:s.items.map(a=>{let n=a.pages?a.pages.includes(e??""):e===a.key;return(0,t.jsx)(i,{item:a,isActive:n,target:a.isExternal?"_blank":"_self"},a.key)})})]})}),l!==r.length-1&&(0,t.jsx)("div",{className:"h-px w-full bg-border-overlay"})]},s.key||s.title))})})],388147)},127739,e=>{"use strict";var t=e.i(478902),a=e.i(709520),n=e.i(389959),r=e.i(843778);let s=(0,a.cva)(["mx-auto w-full @container px-6 xl:px-10"],{variants:{size:{small:"max-w-[768px]",default:"max-w-[1200px]",large:"max-w-[1600px]",full:"max-w-none"}},defaultVariants:{size:"default"}}),i=(0,n.forwardRef)(({className:e,size:a,...n},i)=>(0,t.jsx)("div",{ref:i,...n,className:(0,r.cn)(s({size:a}),e)}));i.displayName="PageContainer",e.s(["PageContainer",0,i])},456050,e=>{"use strict";var t=e.i(478902),a=e.i(709520),n=e.i(389959),r=e.i(843778),s=e.i(3259),i=e.i(127739);let l=(0,a.cva)(["flex flex-col gap-4 w-full"],{variants:{size:{default:"pt-12",small:"pt-12",large:"pt-12",full:"pt-6"}},defaultVariants:{size:"default"}}),o=(0,n.createContext)({size:"default"}),c=()=>(0,n.useContext)(o),d=({className:e,size:a,children:n,...s})=>{let i=a??"default";return(0,t.jsx)(o.Provider,{value:{size:i},children:(0,t.jsx)("div",{"data-slot":"page-header","data-size":i,className:(0,r.cn)(l({size:i}),e),...s,children:n})})},u=({className:e,children:a,...n})=>{let{size:l}=c();return(0,t.jsx)(i.PageContainer,{size:l,children:(0,t.jsx)(s.Breadcrumb,{"data-slot":"page-header-breadcrumb",className:(0,r.cn)("flex items-center gap-4 [&_li]:text-xs",e),...n,children:a})})};u.displayName="PageHeaderBreadcrumb";let m=({className:e,...a})=>(0,t.jsx)("div",{"data-slot":"page-header-icon",className:(0,r.cn)("text-foreground-light",e),...a});m.displayName="PageHeaderIcon";let h=({className:e,children:a,...n})=>(0,t.jsx)("div",{"data-slot":"page-header-summary",className:(0,r.cn)("flex flex-col gap-1",e),...n,children:a});h.displayName="PageHeaderSummary";let p=({className:e,children:a,...n})=>(0,t.jsx)("h1",{"data-slot":"page-header-title",className:(0,r.cn)("heading-title",e),...n,children:a}),f=({className:e,children:a,...n})=>(0,t.jsx)("div",{"data-slot":"page-header-description",className:(0,r.cn)("heading-subSection text-foreground-light",e),...n,children:a}),g=({className:e,children:a,...n})=>{let{size:s}=c();return(0,t.jsx)(i.PageContainer,{size:s,children:(0,t.jsx)("div",{"data-slot":"page-header-meta",className:(0,r.cn)("flex flex-col @xl:flex-row @xl:justify-between @xl:items-center gap-4",'[&>[data-slot="page-header-icon"]]:shrink-0','[&>[data-slot="page-header-summary"]]:flex-1',e),...n,children:a})})};g.displayName="PageHeaderMeta";let b=({className:e,...a})=>(0,t.jsx)("div",{"data-slot":"page-header-actions",className:(0,r.cn)("flex items-center gap-2 shrink-0",e),...a});b.displayName="PageHeaderAside";let _=({className:e,...a})=>{let{size:n}=c();return(0,t.jsx)(i.PageContainer,{size:n,className:(0,r.cn)("full"===n&&"border-b"),children:(0,t.jsx)("div",{"data-slot":"page-header-footer",className:(0,r.cn)("w-full [&>nav]:border-b-0","full"!==n&&"border-b",e),...a})})};_.displayName="PageHeaderNavigationTabs",e.s(["PageHeader",()=>d,"PageHeaderAside",()=>b,"PageHeaderBreadcrumb",()=>u,"PageHeaderDescription",()=>f,"PageHeaderIcon",()=>m,"PageHeaderMeta",()=>g,"PageHeaderNavigationTabs",()=>_,"PageHeaderSummary",()=>h,"PageHeaderTitle",()=>p])},223600,e=>{"use strict";var t=e.i(478902),a=e.i(370410),n=e.i(816467),r=e.i(389959),s=e.i(837710),i=e.i(843778),l=e.i(375761);let o=(0,r.forwardRef)(({text:e,asyncText:o,iconOnly:c=!1,children:d,onClick:u,copyLabel:m="Copy",copiedLabel:h="Copied",...p},f)=>{let[g,b]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{if(!g)return;let e=setTimeout(()=>b(!1),2e3);return()=>clearTimeout(e)},[g]),(0,t.jsx)(s.Button,{ref:f,onClick:t=>{let a=o?o():e;b(!0),(0,l.copyToClipboard)(a),u?.(t)},...p,className:(0,i.cn)({"px-1":c},p.className),icon:g?(0,t.jsx)(a.Check,{strokeWidth:2,className:"text-brand"}):p.icon??(0,t.jsx)(n.Copy,{}),children:!c&&(0,t.jsx)(t.Fragment,{children:d??(g?h:m)})})});o.displayName="CopyButton",e.s(["default",0,o])},14703,e=>{"use strict";var t=e.i(242882),a=e.i(356003),n=e.i(234745),r=e.i(10429),s=e.i(389959),i=e.i(294285);async function l({projectRef:e},t){if(!e)throw Error("projectRef is required");let{data:a,error:r}=await (0,n.get)("/platform/auth/{ref}/config",{params:{path:{ref:e}},signal:t});return r&&(0,n.handleError)(r),a}e.s(["getProjectAuthConfig",()=>l,"useAuthConfigPrefetch",0,({projectRef:e})=>{let t=(0,a.useQueryClient)();return(0,s.useCallback)(()=>{e&&t.prefetchQuery({queryKey:i.authKeys.authConfig(e),queryFn:({signal:t})=>l({projectRef:e},t)})},[t,e])},"useAuthConfigQuery",0,({projectRef:e},{enabled:a=!0,...n}={})=>(0,t.useQuery)({queryKey:i.authKeys.authConfig(e),queryFn:({signal:t})=>l({projectRef:e},t),enabled:a&&r.IS_PLATFORM&&void 0!==e,...n})])},785951,e=>{"use strict";var t=e.i(478902),a=e.i(271226);e.i(128328);var n=e.i(657588),r=e.i(158639),s=e.i(388147),i=e.i(14703),l=e.i(912793),o=e.i(951138),c=e.i(825713),d=e.i(887902);let u=()=>{let e=(0,a.useRouter)(),{ref:o="default"}=(0,r.useParams)(),c=(0,n.useFlag)("authOverviewPage"),u=(0,n.useFlag)("EnableOAuth21"),{authenticationSignInProviders:m,authenticationRateLimits:h,authenticationEmails:p,authenticationMultiFactor:f,authenticationAttackProtection:g,authenticationPerformance:b}=(0,l.useIsFeatureEnabled)(["authentication:sign_in_providers","authentication:rate_limits","authentication:emails","authentication:multi_factor","authentication:attack_protection","authentication:performance"]);(0,i.useAuthConfigPrefetch)({projectRef:o});let _=e.pathname.split("/")[4];return(0,t.jsx)(s.ProductMenu,{page:_,menu:(0,d.generateAuthMenu)(o,{authenticationSignInProviders:m,authenticationRateLimits:h,authenticationEmails:p,authenticationMultiFactor:f,authenticationAttackProtection:g,authenticationShowOverview:c,authenticationOauth21:u,authenticationPerformance:b})})},m=(0,o.withAuth)(({children:e})=>(0,t.jsx)(c.ProjectLayout,{title:"Authentication",product:"Authentication",productMenu:(0,t.jsx)(u,{}),isBlocking:!1,children:e}));e.s(["default",0,m])},418029,e=>{"use strict";var t=e.i(478902),a=e.i(837710),n=e.i(843778);e.s(["NoSearchResults",0,({searchString:e,withinTableCell:r=!1,onResetFilter:s,className:i,label:l,description:o})=>(0,t.jsxs)("div",{className:(0,n.cn)("flex items-center justify-between",!r&&"bg-surface-100 px-4 md:px-6 py-4 rounded-md border border-default",i),children:[(0,t.jsxs)("div",{className:"text-sm flex flex-col gap-y-0.5",children:[(0,t.jsx)("p",{className:"text-foreground",children:l??"No results found"}),(0,t.jsx)("p",{className:"text-foreground-lighter",children:o??`Your search for “${e}” did not return any results`})]}),void 0!==s&&(0,t.jsx)(a.Button,{type:"default",onClick:()=>s(),children:"Reset filter"})]})])},670447,470754,291653,e=>{"use strict";var t=e.i(478902),a=e.i(975924),n=e.i(837710),r=e.i(627069),s=e.i(843778),i=e.i(10429);e.s(["BannerCard",0,({onDismiss:e,children:l,className:o})=>(0,t.jsxs)(r.Card,{className:(0,s.cn)("relative overflow-hidden shadow-lg rounded-2xl",o),children:[(0,t.jsxs)("div",{className:"absolute -inset-16 z-0 opacity-100 pointer-events-none",children:[(0,t.jsx)("img",{src:`${i.BASE_PATH}/img/reports/bg-grafana-dark.svg`,alt:"Background pattern",className:"w-full h-full object-cover object-right hidden dark:block"}),(0,t.jsx)("img",{src:`${i.BASE_PATH}/img/reports/bg-grafana-light.svg`,alt:"Background pattern",className:"w-full h-full object-cover object-right dark:hidden"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-background-alternative to-transparent"})]}),(0,t.jsxs)(r.CardContent,{className:"relative z-10 p-6",children:[e&&(0,t.jsx)("div",{className:"absolute top-4 right-4 z-20",children:(0,t.jsx)(n.Button,{type:"text",size:"tiny",htmlType:"button",icon:(0,t.jsx)(a.X,{size:16,strokeWidth:1.5}),onClick:t=>{t.preventDefault(),e()},className:"opacity-75 hover:opacity-100 px-1","aria-label":"Close banner"})}),l]})]})],670447);var l=e.i(389959);let o=(0,l.createContext)(void 0),c=()=>{let e=(0,l.useContext)(o);if(!e)throw Error("useBannerStack must be used within BannerStackProvider");return e};e.s(["BannerStackProvider",0,({children:e})=>{let[a,n]=(0,l.useState)([]),r=(0,l.useCallback)(e=>{n(t=>t.some(t=>t.id===e.id)?t:[...t,e].sort((e,t)=>(t.priority??0)-(e.priority??0)))},[]),s=(0,l.useCallback)(e=>{n(t=>t.map(t=>t.id===e?{...t,isDismissed:!0}:t)),setTimeout(()=>{n(t=>t.filter(t=>t.id!==e))},300)},[]);return(0,t.jsx)(o.Provider,{value:{banners:a,addBanner:r,dismissBanner:s},children:e})},"useBannerStack",0,c],470754);var d=e.i(265100),u=e.i(809323);e.s(["BannerStack",0,()=>{let{banners:e}=c(),[a,n]=(0,l.useState)(!1),r=e.filter(e=>!e.isDismissed);return 0===r.length?null:(0,t.jsx)(d.motion.div,{className:"fixed bottom-4 right-4 z-50",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),animate:{y:a?-8:0},transition:{type:"spring",stiffness:300,damping:25},children:(0,t.jsx)("div",{className:"relative",children:(0,t.jsx)(u.AnimatePresence,{mode:"popLayout",children:r.map((e,i)=>{let l=0===i,o=r.length-1-i;return(0,t.jsx)(d.motion.div,{initial:{opacity:0,scale:.99,y:8},animate:{opacity:1,scale:a?1:1-.07*i,x:0,y:a?-(216*i):-(4*i)},exit:{opacity:0,scale:.99,y:8},transition:{type:"spring",stiffness:300,damping:30,delay:.25},onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),style:{position:l?"relative":"absolute",bottom:l?void 0:0,right:l?void 0:0,zIndex:30+o,transformOrigin:"center bottom"},className:(0,s.cn)("w-full max-w-72",!a&&0===i&&"pointer-events-none"),children:e.content},e.id)})})})})}],291653)},839360,e=>{"use strict";let t=(0,e.i(388019).default)("PanelLeftClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]]);e.s(["PanelLeftClose",()=>t],839360)},300424,e=>{"use strict";var t=e.i(478902),a=e.i(902858),n=e.i(370410),r=e.i(365257),s=e.i(479232),i=e.i(389959),l=e.i(801834),o=e.i(2579),c=e.i(635494),d=e.i(206413),u=e.i(592360),m=e.i(178527),h=e.i(837710),p=e.i(703526),f=e.i(917007),g=e.i(920432),b=e.i(549815),_=e.i(911509),y=e.i(996960),x=e.i(866205),j=e.i(793912),v=e.i(135144),E=e.i(689805),w=e.i(396831),N=e.i(903248);let S=({className:e,disabled:S=!1,size:C="tiny",showError:k=!0,selectedSchemaName:T,supportSelectAll:R=!1,excludedSchemas:A=[],onSelectSchema:P,onSelectCreateSchema:L,align:I="start"})=>{let[O,D]=(0,i.useState)(!1),{can:B}=(0,o.useAsyncCheckPermissions)(a.PermissionAction.TENANT_SQL_ADMIN_WRITE,"schemas"),{data:q}=(0,c.useSelectedProjectQuery)(),{data:$,isPending:F,isSuccess:z,isError:M,error:G,refetch:Q}=(0,l.useSchemasQuery)({projectRef:q?.ref,connectionString:q?.connectionString}),U=($||[]).filter(e=>!A.includes(e.name)).sort((e,t)=>e.name.localeCompare(t.name));return(0,t.jsxs)("div",{className:e,children:[F&&(0,t.jsx)(h.Button,{type:"default",className:"w-full [&>span]:w-full",size:C,disabled:!0,children:(0,t.jsx)(N.Skeleton,{className:"w-full h-3 bg-foreground-muted"})},"schema-selector-skeleton"),k&&M&&(0,t.jsxs)(m.Alert_Shadcn_,{variant:"warning",className:"!px-3 !py-3",children:[(0,t.jsx)(u.AlertTitle_Shadcn_,{className:"text-xs text-amber-900",children:"Failed to load schemas"}),(0,t.jsxs)(d.AlertDescription_Shadcn_,{className:"text-xs mb-2 break-words",children:["Error: ",G?.message]}),(0,t.jsx)(h.Button,{type:"default",size:"tiny",onClick:()=>Q(),children:"Reload schemas"})]}),z&&(0,t.jsxs)(E.Popover_Shadcn_,{open:O,onOpenChange:D,modal:!1,children:[(0,t.jsx)(v.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsx)(h.Button,{size:C,disabled:S,type:"default","data-testid":"schema-selector",className:"w-full [&>span]:w-full !pr-1 space-x-1",iconRight:(0,t.jsx)(r.ChevronsUpDown,{className:"text-foreground-muted",strokeWidth:2,size:14}),children:T?(0,t.jsxs)("div",{className:"w-full flex gap-1",children:[(0,t.jsx)("p",{className:"text-foreground-lighter",children:"schema"}),(0,t.jsx)("p",{className:"text-foreground",children:"*"===T?"All schemas":T})]}):(0,t.jsx)("div",{className:"w-full flex gap-1",children:(0,t.jsx)("p",{className:"text-foreground-lighter",children:"Choose a schema..."})})})}),(0,t.jsx)(j.PopoverContent_Shadcn_,{className:"p-0 min-w-[200px] pointer-events-auto",side:"bottom",align:I,sameWidthAsTrigger:!0,children:(0,t.jsxs)(x.Command_Shadcn_,{children:[(0,t.jsx)(g.CommandInput_Shadcn_,{className:"text-xs",placeholder:"Find schema..."}),(0,t.jsxs)(_.CommandList_Shadcn_,{children:[(0,t.jsx)(p.CommandEmpty_Shadcn_,{children:"No schemas found"}),(0,t.jsx)(f.CommandGroup_Shadcn_,{children:(0,t.jsxs)(w.ScrollArea,{className:(U||[]).length>7?"h-[210px]":"",children:[R&&(0,t.jsxs)(b.CommandItem_Shadcn_,{className:"cursor-pointer flex items-center justify-between space-x-2 w-full",onSelect:()=>{P("*"),D(!1)},onClick:()=>{P("*"),D(!1)},children:[(0,t.jsx)("span",{children:"All schemas"}),"*"===T&&(0,t.jsx)(n.Check,{className:"text-brand",strokeWidth:2,size:16})]},"select-all"),U?.map(e=>(0,t.jsxs)(b.CommandItem_Shadcn_,{className:"cursor-pointer flex items-center justify-between space-x-2 w-full",onSelect:()=>{P(e.name),D(!1)},onClick:()=>{P(e.name),D(!1)},children:[(0,t.jsx)("span",{children:e.name}),T===e.name&&(0,t.jsx)(n.Check,{className:"text-brand",strokeWidth:2,size:16})]},e.id))]})}),void 0!==L&&B&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(y.CommandSeparator_Shadcn_,{}),(0,t.jsx)(f.CommandGroup_Shadcn_,{children:(0,t.jsxs)(b.CommandItem_Shadcn_,{className:"cursor-pointer flex items-center gap-x-2 w-full",onSelect:()=>{L(),D(!1)},onClick:()=>{L(),D(!1)},children:[(0,t.jsx)(s.Plus,{size:12}),"Create a new schema"]})})]})]})]})})]})]})};e.s(["SchemaSelector",0,S,"default",0,S])},892277,e=>{"use strict";var t=e.i(478902),a=e.i(389959),n=e.i(837710),r=e.i(253214),s=e.i(392491),i=e.i(710483);let l=({onClose:e})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.DialogHeader,{children:(0,t.jsx)(r.DialogTitle,{children:"Schemas managed by Supabase"})}),(0,t.jsx)(r.DialogSectionSeparator,{}),(0,t.jsxs)(r.DialogSection,{className:"space-y-2 prose",children:[(0,t.jsx)("p",{className:"text-sm",children:"The following schemas are managed by Supabase and are currently protected from write access through the dashboard."}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1",children:s.INTERNAL_SCHEMAS.map(e=>(0,t.jsx)("code",{className:"text-xs",children:e},e))}),(0,t.jsx)("p",{className:"text-sm !mt-4",children:"These schemas are critical to the functionality of your Supabase project and hence we highly recommend not altering them."}),(0,t.jsx)("p",{className:"text-sm",children:"You can, however, still interact with those schemas through the SQL Editor although we advise you only do so if you know what you are doing."})]}),(0,t.jsx)(r.DialogFooter,{children:(0,t.jsx)("div",{className:"flex items-center justify-end space-x-2",children:(0,t.jsx)(n.Button,{type:"default",onClick:e,children:"Understood"})})})]});e.s(["ProtectedSchemaWarning",0,({size:e="md",schema:o,entity:c})=>{let[d,u]=(0,a.useState)(!1),{isSchemaLocked:m,reason:h,fdwType:p}=(0,s.useIsProtectedSchema)({schema:o});return m?(0,t.jsx)(i.Admonition,{showIcon:"sm"!==e,layout:"sm"===e?"vertical":"horizontal",type:"note",title:"sm"===e?"Viewing protected schema":`Viewing ${c} from a protected schema`,description:"fdw"===h&&"iceberg"===p?(0,t.jsxs)("p",{children:["The ",(0,t.jsx)("code",{className:"text-code-inline",children:o})," schema is used by Supabase to connect to analytics buckets and is read-only through the dashboard."]}):"fdw"===h&&"s3_vectors"===p?(0,t.jsxs)("p",{children:["The ",(0,t.jsx)("code",{className:"text-code-inline",children:o})," schema is used by Supabase to connect to vector buckets and is read-only through the dashboard."]}):(0,t.jsxs)("p",{children:["The ",(0,t.jsx)("code",{className:"text-code-inline",children:o})," schema is managed by Supabase and is read-only through the dashboard."]}),actions:("fdw"!==h||"iceberg"!==p&&"s3_vectors"!==p)&&(0,t.jsxs)(r.Dialog,{open:d,onOpenChange:u,children:[(0,t.jsx)(r.DialogTrigger,{asChild:!0,children:(0,t.jsx)(n.Button,{type:"default",size:"tiny",onClick:()=>u(!0),children:"Learn more"})}),(0,t.jsx)(r.DialogContent,{children:(0,t.jsx)(l,{onClose:()=>u(!1)})})]})}):null}])},728975,e=>{"use strict";var t=e.i(478902),a=e.i(416050),n=e.i(585915),r=e.i(210419),s=e.i(389959),i=e.i(843778);e.s(["default",0,({title:e,description:l,children:o,footer:c,url:d="",linkHref:u="",imgUrl:m,imgAlt:h,icon:p,className:f,loading:g=!1,fixedHeight:b=!0,hideChevron:_=!1,titleClass:y="",containerElement:x,...j})=>{let v,E=d||u||j.onClick,w={},N=x&&s.default.isValidElement(x)?e=>(0,s.cloneElement)(x,{...e}):void 0;j.onClick?(v=N??"button",w=j):u?(v=N??r.default,w={href:u,...j}):d?(v=N??"a",w={href:d,...j}):(v=N??"div",w=j);let S=["group relative text-left","bg-surface-100","border border-surface","rounded-md p-5 flex flex-row","transition ease-in-out duration-150"];E&&(S=[...S,"cursor-pointer","hover:bg-surface-200","hover:border-control"]),b&&(S=[...S,"min-h-32 md:min-h-44"]);let C=({children:e})=>(0,t.jsx)("div",{className:"mr-4 flex flex-col",children:e}),k=(0,t.jsxs)(t.Fragment,{children:[m&&(0,t.jsx)(C,{children:(0,t.jsx)("img",{className:" transition-all group-hover:scale-110 ",src:`${m}`,alt:`${h}`,width:"26"})}),p&&(0,t.jsx)(C,{children:p}),(0,t.jsxs)("div",{className:"flex h-full w-full flex-col space-y-2",children:["string"==typeof e?(0,t.jsx)("h5",{className:`text-foreground pr-5 ${y}`,children:e}):e,(o||l)&&(0,t.jsxs)("div",{className:"flex w-full flex-1 flex-col",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:l}),(0,t.jsx)("div",{className:"w-full",children:o&&o})]}),c&&(0,t.jsx)("div",{className:"w-full !mt-auto",children:c})]}),E&&(0,t.jsx)("div",{className:" absolute right-4 top-4 text-foreground-lighter transition-all duration-200 group-hover:right-3 group-hover:text-foreground ",children:g?(0,t.jsx)(n.Loader,{className:"animate-spin"}):_?(0,t.jsx)(t.Fragment,{}):(0,t.jsx)(a.ChevronRight,{})})]});return(0,t.jsx)(v,{...w,className:(0,i.cn)(S,f),children:k})}])},974900,e=>{"use strict";var t=e.i(755216),a=e.i(242882),n=e.i(714403);let r=e=>["projects",e,"database-roles"],s=t.default.roles.list();async function i({projectRef:e,connectionString:t},a){let{result:r}=await (0,n.executeSql)({projectRef:e,connectionString:t,sql:s.sql,queryKey:["database-roles"]},a);return r}function l(e,t){return e.invalidateQueries({queryKey:r(t)})}e.s(["invalidateRolesQuery",()=>l,"useDatabaseRolesQuery",0,({projectRef:e,connectionString:t},{enabled:n=!0,...s}={})=>(0,a.useQuery)({queryKey:r(e),queryFn:({signal:a})=>i({projectRef:e,connectionString:t},a),enabled:n&&void 0!==e,...s})],974900)},180141,e=>{"use strict";function t(e){return e}e.s(["queryOptions",()=>t])},415190,e=>{"use strict";var t=e.i(180141),a=e.i(242882),n=e.i(714403),r=e.i(938343),s=e.i(305015);async function i({projectRef:e,connectionString:t,id:a},r){if(!a)throw Error("id is required");let i=a?(0,s.default)(`
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${a}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', case
                    when t.typtype = 'e' then
                        case
                            when nt.nspname <> 'public' then concat(nt.nspname, '.', coalesce(bt.typname, t.typname))
                            else coalesce(bt.typname, t.typname)
                        end
                    else
                        coalesce(bt.typname, t.typname)
                end,
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `):"",{result:l}=await (0,n.executeSql)({projectRef:e,connectionString:t,sql:i,queryKey:["table-editor",a]},r);return l[0]?.entity??null}function l(e,{projectRef:t,connectionString:a,id:n}){return e.fetchQuery(o({projectRef:t,connectionString:a,id:n}))}let o=({projectRef:e,connectionString:a,id:n})=>(0,t.queryOptions)({queryKey:r.tableEditorKeys.tableEditor(e,n),queryFn:({signal:t})=>i({projectRef:e,connectionString:a,id:n},t)});e.s(["getTableEditor",()=>i,"prefetchTableEditor",()=>l,"tableEditorQueryOptions",0,o,"useTableEditorQuery",0,({projectRef:e,connectionString:t,id:n},{enabled:r=!0,...s}={})=>(0,a.useQuery)({...o({projectRef:e,connectionString:t,id:n}),enabled:r&&void 0!==e&&void 0!==n&&!isNaN(n),refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:3e5,...s})],415190)},412385,e=>{"use strict";var t=e.i(389959),a=e.i(323796);e.s(["useConfirmOnClose",0,({checkIsDirty:e,onClose:n})=>{let[r,s]=(0,t.useState)(!1),i=(0,a.default)(e),l=(0,a.default)(n),o=(0,t.useCallback)(()=>{i.current()?s(!0):l.current()},[]),c=(0,t.useCallback)(()=>{s(!1),l.current()},[]),d=(0,t.useCallback)(()=>{s(!1)},[]),u=(0,t.useMemo)(()=>({visible:r,onClose:c,onCancel:d}),[r,c,d]);return(0,t.useMemo)(()=>({confirmOnClose:o,modalProps:u}),[o,u])}])},666050,(e,t,a)=>{var n=e.r(37958),r=e.r(650078),s=e.r(663792),i=e.r(413850),l=e.r(140023),o=e.r(127505),c=e.r(599901),d=e.r(374301),u=Object.prototype.hasOwnProperty;t.exports=function(e){if(null==e)return!0;if(l(e)&&(i(e)||"string"==typeof e||"function"==typeof e.splice||o(e)||d(e)||s(e)))return!e.length;var t=r(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(c(e))return!n(e).length;for(var a in e)if(u.call(e,a))return!1;return!0}},102631,e=>{"use strict";e.s(["generatePolicyUpdateSQL",0,e=>{let t="";return null!==e.definition&&void 0!==e.definition&&(t+=`using (${e.definition})${null===e.check||void 0===e.check?";":""}
`),null!==e.check&&void 0!==e.check&&(t+=`with check (${e.check});
`),`
alter policy "${e.name}" 
on "${e.schema}"."${e.table}"
to ${e.roles.join(", ")}
${t}
`.trim()}])},302372,e=>{"use strict";var t=e.i(242882),a=e.i(248593),n=e.i(234745),r=e.i(635494);e.i(10429);var s=e.i(837508),i=e.i(509847);async function l({projectRef:e,connectionString:t,schema:r},s,i){if(!e)throw Error("projectRef is required");let l=new Headers(i);t&&l.set("x-connection-encrypted",t);let{data:o,error:c}=await (0,n.get)("/platform/pg-meta/{ref}/policies",{params:{header:{"x-connection-encrypted":t,"x-pg-application-name":a.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e},query:{included_schemas:r||"",excluded_schemas:""}},headers:l,signal:s});return c&&(0,n.handleError)(c),o}e.s(["useDatabasePoliciesQuery",0,({projectRef:e,connectionString:a,schema:n},{enabled:o=!0,...c}={})=>{let{data:d}=(0,r.useSelectedProjectQuery)(),u=d?.status===s.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,t.useQuery)({queryKey:i.databasePoliciesKeys.list(e,n),queryFn:({signal:t})=>l({projectRef:e,connectionString:a,schema:n},t),enabled:o&&void 0!==e&&u,...c})}])},938343,e=>{"use strict";e.s(["tableEditorKeys",0,{tableEditor:(e,t)=>["projects",e,"table-editor",t].filter(Boolean)}])},847278,e=>{"use strict";var t=e.i(755216),a=e.i(38429),n=e.i(356003),r=e.i(355901),s=e.i(915993),i=e.i(714403),l=e.i(938343),o=e.i(138658);async function c({projectRef:e,connectionString:a,id:n,name:r,schema:s,payload:l}){let{sql:o}=t.default.tables.update({id:n,name:r,schema:s},l),{result:c}=await (0,i.executeSql)({projectRef:e,connectionString:a,sql:o,queryKey:["table","update",n]});return c}e.s(["updateTable",()=>c,"useTableUpdateMutation",0,({onSuccess:e,onError:t,...i}={})=>{let d=(0,n.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>c(e),async onSuccess(t,a,n){let{projectRef:r,schema:i,id:c}=a;await Promise.all([d.invalidateQueries({queryKey:l.tableEditorKeys.tableEditor(r,c)}),d.invalidateQueries({queryKey:o.tableKeys.list(r,i)}),d.invalidateQueries({queryKey:s.lintKeys.lint(r)})]),await e?.(t,a,n)},async onError(e,a,n){void 0===t?r.toast.error(`Failed to update database table: ${e.message}`):t(e,a,n)},...i})}])},310959,e=>{"use strict";var t=e.i(479084),a=e.i(721490);let n=10240,r=50,s=["text","varchar","char","character varying","character"],i=["json","jsonb"],l=new Set(i),o=new Set([...s,...i,"bytea","xml","hstore","clob","vector","geometry","geography","tsvector","tsquery","daterange","tsrange","tstzrange","numrange","int4range","int8range","cube","ltree","lquery","jsonpath","citext"]);e.s(["MAX_ARRAY_SIZE",0,r,"MAX_CHARACTERS",0,n,"THRESHOLD_COUNT",0,1e5,"getTableRowsSql",0,({table:e,filters:i=[],sorts:c=[],page:d,limit:u,maxCharacters:m=n,maxArraySize:h=r,sortExcludedColumns:p=[]})=>{if(!e||!e.columns)return"";let f=new a.Query().from(e.name,e.schema).select();i.forEach(t=>{let a=e.columns?.find(e=>e.name===t.column),n=!a||s.includes(a.format);f=f.filter(t.column,t.operator,n||""!==t.value?t.value:null)});let g=e.live_rows_estimate||0;if(0===c.length&&g<=1e5&&e.columns.length>0){let t=((e,{excludedColumns:t=[]}={})=>{let a=e.primary_keys?.map(e=>e.name);if(a&&a.length>0&&!a.every(e=>t.includes(e)))return a;if(e.columns&&e.columns.length>0){let a=e.columns.filter(e=>!e.data_type.includes("json")&&!t.includes(e.name));if(a.length>0)return[a[0].name]}return[]})(e,{excludedColumns:p});t.length>0&&t.forEach(t=>{f=f.order(e.name,t)})}else c.forEach(e=>{f=f.order(e.table,e.column,e.ascending,e.nullsFirst)});let{from:b,to:_}=function(e,t=100){let a=e?e*t:0;return{from:a,to:e?a+t-1:t-1}}((d??1)-1,u),y=`with _base_query as (${f.range(b,_).toSql({isCTE:!1,isFinal:!1})})`,x=e.columns.sort((e,t)=>e.ordinal_position-t.ordinal_position).map(e=>({name:e.name,format:e.format.toLowerCase()})),j=e.columns.filter(e=>{let t;return t=e.format,o.has(t.toLowerCase())}).map(e=>e.name),v=x.map(({name:e})=>{let a=(0,t.ident)(e);return j.includes(e)?`case
        when octet_length(${a}::text) > ${m} 
        then left(${a}::text, ${m}) || '...'
        else ${a}::text
      end as ${a}`:a});e.columns.filter(e=>"array"===e.data_type.toLowerCase()).map(e=>({name:e.name,format:e.format.toLowerCase().slice(1)})).forEach(({name:e,format:a})=>{let n=v.findIndex(a=>a===(0,t.ident)(e)),r=l.has(a)?`${a}[]`:"text[]";n>=0&&(v[n]=`
        case 
          when octet_length(${(0,t.ident)(e)}::text) > ${m} 
          then
            case
              when array_ndims(${(0,t.ident)(e)}) = 1
              then
                (select array_cat(${(0,t.ident)(e)}[1:${h}]::${r}, ${"text[]"===r?"array['...']":"array['{\"truncated\": true}'::json]"}::${r}))::${r}
              else
                ${(0,t.ident)(e)}[1:${h}]::${r}
            end
          else ${(0,t.ident)(e)}::${r}
        end
      `)});let E=v.join(","),w=new a.Query().from("_base_query").select(E);return`${y}
  ${w.toSql({isCTE:!0,isFinal:!0})}`}])},46974,585673,e=>{"use strict";let t=["smallint","integer","bigint","decimal","numeric","real","double precision","serial","bigserial","int2","int4","int8","float4","float8","smallserial","serial2","serial4","serial8"];function a(e){return t.indexOf(e.toLowerCase())>-1}let n=["json","jsonb","array"];function r(e){return n.indexOf(e.toLowerCase())>-1}let s=["array"];function i(e){return s.indexOf(e.toLowerCase())>-1}let l=["uuid","text","character varying"];function o(e){return l.indexOf(e.toLowerCase())>-1}let c=["citext"];function d(e){return c.indexOf(e.toLowerCase())>-1}let u=["timestamp","timestamptz"];function m(e){return u.indexOf(e.toLowerCase())>-1}let h=["date"];function p(e){return h.indexOf(e.toLowerCase())>-1}let f=["time","timetz"];function g(e){return f.indexOf(e.toLowerCase())>-1}let b=["boolean","bool"];function _(e){return b.indexOf(e.toLowerCase())>-1}let y=["user-defined"];function x(e){return y.indexOf(e.toLowerCase())>-1}let j=["bytea"];function v(e){return j.indexOf(e.toLowerCase())>-1}function E(e){let{targetTableSchema:t,targetTableName:a,targetColumnName:n}=e?.foreignKey??{};return!!t&&!!a&&!!n}e.s(["isArrayColumn",()=>i,"isBinaryColumn",()=>v,"isBoolColumn",()=>_,"isCiTextColumn",()=>d,"isDateColumn",()=>p,"isDateTimeColumn",()=>m,"isEnumColumn",()=>x,"isForeignKeyColumn",()=>E,"isJsonColumn",()=>r,"isNumericalColumn",()=>a,"isTextColumn",()=>o,"isTimeColumn",()=>g],585673);var w=e.i(962217);function N(e,t){let n=e.columns.find(e=>e.name==t.column);if(n&&a(n.format)){let e=Number(t.value);if(!Number.isNaN(e)&&!(e>Number.MAX_SAFE_INTEGER))return Number(t.value)}return t.value}function S({table:e}){if(!(0,w.isTableLike)(e))return{error:{message:"Only table rows can be updated or deleted"}};let t=e.primary_keys;return t&&0!=t.length?{primaryKeys:t.map(e=>e.name)}:{error:{message:"Please add a primary key column to your table to update or delete rows"}}}e.s(["formatFilterValue",()=>N,"getPrimaryKeys",()=>S],46974)},941381,70756,e=>{"use strict";var t=e.i(478902),a=e.i(356003),n=e.i(271226),r=e.i(389959),s=e.i(19583),i=e.i(415190);e.i(967533);var l=e.i(721490),o=e.i(310959),c=e.i(242882);e.i(128328);var d=e.i(86086),u=e.i(311827),m=e.i(962217),h=e.i(908937),p=e.i(201461);e.i(56031);var f=e.i(237948),g=e.i(234745),b=e.i(714403),_=e.i(790819),y=e.i(46974);async function x(e){return new Promise(t=>setTimeout(t,e))}async function j(e,t=3,a=1e3){for(let n=0;n<=t;n++)try{return await e()}catch(e){if(429===(e instanceof f.ResponseError?e.code:e.status)&&n<t){let t=function(e){if(e instanceof f.ResponseError)return e.retryAfter;let t=e.headers?.get("retry-after");if(t)return parseInt(t)}(e),r=t?1e3*t:a*Math.pow(2,n);await x(r);continue}throw e}throw Error("Max retries reached without success")}let v=({table:e,filters:t=[],sorts:a=[]})=>{let n,r,s,i,o,c=new l.Query,d=e.columns.filter(e=>(e?.enum??[]).length>0&&"array"===e.dataType.toLowerCase()).map(e=>`"${e.name}"::text[]`),m=c.from(e.name,e.schema??void 0).select(d.length>0?`*,${d.join(",")}`:"*");t.filter(e=>e.value&&""!==e.value).forEach(t=>{let a=(0,y.formatFilterValue)(e,t);m=m.filter(t.column,t.operator,a)});let h=!1,{cursorPaginationEligible:p,cursorPaginationNonEligible:f}=(n=[],r=[],(s=e.primaryKey)&&n.push(s),i=e.uniqueIndexes,(o=i?.filter(t=>t.every(t=>{let a=e.columns.find(e=>e.name===t);return!!a&&!a.isNullable})))&&n.push(...o),r.push(...e.columns.filter(e=>!e.dataType.includes("json")).map(e=>e.name)),{cursorPaginationEligible:n,cursorPaginationNonEligible:r}),g=e.type===u.ENTITY_TYPE.TABLE||e.type===u.ENTITY_TYPE.PARTITIONED_TABLE||e.type===u.ENTITY_TYPE.MATERIALIZED_VIEW;if(0===a.length)p.length>0?(h=p[0],p[0].forEach(t=>{m=m.order(e.name,t)})):(f.length>0&&(m=m.order(e.name,f[0])),g&&(m=m.order(e.name,"ctid")));else{a.forEach(e=>{m=m.order(e.table,e.column,e.ascending,e.nullsFirst)});let t=p[0];if(t){let n=new Set(a.filter(t=>t.table===e.name).map(e=>e.column));t.filter(e=>!n.has(e)).forEach(t=>{m=m.order(e.name,t)})}else g&&(m=m.order(e.name,"ctid"))}return{sql:m,cursorColumns:h}},E=async({projectRef:e,connectionString:t,table:a,filters:n=[],sorts:r=[],roleImpersonationState:s,progressCallback:i})=>{if(d.IS_PLATFORM&&!t)return console.error("Connection string is required"),[];let l=[],{sql:o,cursorColumns:c}=v({table:a,sorts:r,filters:n});if(c){let a=null;for(;;){let n=o.clone();a&&(n=n.filter(c,">",c.map(e=>a[e])));let r=(0,h.wrapWithRoleImpersonation)(n.range(0,499).toSql(),s);try{let{result:n}=await j(async()=>(0,b.executeSql)({projectRef:e,connectionString:t,sql:r}));for(let e of(l.push(...n),i?.(l.length),a={},c))a[e]=n[n.length-1]?.[e];if(n.length<500)break;await x(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}else{let a=-1;for(;;){let n=500*(a+=1),r=(a+1)*500-1,c=(0,h.wrapWithRoleImpersonation)(o.range(n,r).toSql(),s);try{let{result:a}=await j(async()=>(0,b.executeSql)({projectRef:e,connectionString:t,sql:c}));if(l.push(...a),i?.(l.length),a.length<500)break;await x(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}return l.filter(e=>1!==e[h.ROLE_IMPERSONATION_NO_RESULTS])};async function w({queryClient:e,projectRef:t,connectionString:a,tableId:n,roleImpersonationState:r,filters:l,sorts:c,limit:d,page:u},f){let _=await (0,i.prefetchTableEditor)(e,{projectRef:t,connectionString:a,id:n});if(!_)throw Error("Table not found");let y=(0,s.parseSupaTable)(_),x=l?.filter(e=>"="===e.operator||"is"===e.operator).flatMap(e=>e.column),j=(0,m.isMsSqlForeignTable)(_)?Array.from(new Set(x)):void 0,v=(0,h.wrapWithRoleImpersonation)((0,o.getTableRowsSql)({table:_,filters:l,sorts:c,limit:d,page:u,sortExcludedColumns:j}),r);try{let{result:e}=await (0,b.executeSql)({projectRef:t,connectionString:a,sql:v,queryKey:["table-rows",y?.id],isRoleImpersonationEnabled:(0,p.isRoleImpersonationEnabled)(r?.role),preflightCheck:!0},f);return{rows:e.map((e,t)=>({idx:t,...e}))}}catch(e){throw(0,g.handleError)(e)}}function N(e,{projectRef:t,connectionString:a,tableId:n,...r}){return e.fetchQuery({queryKey:_.tableRowKeys.tableRows(t,{table:{id:n},...r}),queryFn:({signal:s})=>w({queryClient:e,projectRef:t,connectionString:a,tableId:n,...r},s)})}e.s(["executeWithRetry",()=>j,"fetchAllTableRows",0,E,"getAllTableRowsSql",0,v,"prefetchTableRows",()=>N,"useTableRowsQuery",0,({projectRef:e,connectionString:t,tableId:n,...r},{enabled:s=!0,...i}={})=>{let l=(0,a.useQueryClient)();return(0,c.useQuery)({queryKey:_.tableRowKeys.tableRows(e,{table:{id:n},...r}),queryFn:({signal:a})=>w({queryClient:l,projectRef:e,connectionString:t,tableId:n,...r},a),enabled:s&&void 0!==e&&void 0!==n,...i})}],70756);var S=e.i(635494),C=e.i(636047),k=e.i(85626);function T({queryClient:e,projectRef:t,connectionString:a,id:n,sorts:r,filters:l,roleImpersonationState:o}){return(0,i.prefetchTableEditor)(e,{projectRef:t,connectionString:a,id:n}).then(i=>{if(i){let c=(0,s.parseSupaTable)(i),{sorts:d=[],filters:u=[]}=(0,s.loadTableEditorStateFromLocalStorage)(t,i.id)??{};N(e,{projectRef:t,connectionString:a,tableId:n,sorts:r??(0,s.formatSortURLParams)(c.name,d),filters:l??(0,s.formatFilterURLParams)(u),page:1,limit:C.TABLE_EDITOR_DEFAULT_ROWS_PER_PAGE,roleImpersonationState:o})}})}function R(){let e=(0,n.useRouter)(),t=(0,a.useQueryClient)(),{data:s}=(0,S.useSelectedProjectQuery)(),i=(0,p.useRoleImpersonationStateSnapshot)();return(0,r.useCallback)(({id:a,filters:n,sorts:r})=>{let l=a?Number(a):void 0;!s||!l||isNaN(l)||(e.prefetch(`/project/${s.ref}/editor/${l}`),T({queryClient:t,projectRef:s.ref,connectionString:s.connectionString,id:l,sorts:r,filters:n,roleImpersonationState:i}).catch(()=>{}))},[s,t,i,e])}function A({projectRef:e,id:a,sorts:n,filters:r,href:s,children:i,...l}){let o=R();return(0,t.jsx)(k.default,{href:s||`/project/${e}/editor/${a}`,prefetcher:()=>o({id:a,sorts:n,filters:r}),...l,children:i})}e.s(["EditorTablePageLink",()=>A,"prefetchEditorTablePage",()=>T,"usePrefetchEditorTablePage",()=>R],941381)},379565,(e,t,a)=>{var n=e.r(176211),r=e.r(99625),s=e.r(905799),i=e.r(632981),l=e.r(778436),o=e.r(737469);t.exports=function(e,t,a,c){var d=-1,u=r,m=!0,h=e.length,p=[],f=t.length;if(!h)return p;a&&(t=i(t,l(a))),c?(u=s,m=!1):t.length>=200&&(u=o,m=!1,t=new n(t));e:for(;++d<h;){var g=e[d],b=null==a?g:a(g);if(g=c||0!==g?g:0,m&&b==b){for(var _=f;_--;)if(t[_]===b)continue e;p.push(g)}else u(t,b,c)||p.push(g)}return p}},600760,(e,t,a)=>{var n=e.r(379565),r=e.r(239334),s=e.r(608435);t.exports=r(function(e,t){return s(e)?n(e,t):[]})},347595,(e,t,a)=>{var n=e.r(465838),r=e.r(413850);t.exports=function(e,t,a,s){return null==e?[]:(r(t)||(t=null==t?[]:[t]),r(a=s?void 0:a)||(a=null==a?[]:[a]),n(e,t,a))}},442338,e=>{"use strict";var t=e.i(478902),a=e.i(975924);e.s(["BadgeDisabled",0,({name:e})=>(0,t.jsx)("div",{className:"text-typography-body-light [[data-theme*=dark]_&]:text-typography-body-dark flex cursor-not-allowed items-center space-x-2 rounded bg-gray-600 py-0.5 px-2 text-sm",children:(0,t.jsx)("span",{className:"opacity-50",children:e})}),"BadgeSelected",0,({name:e,handleRemove:n})=>(0,t.jsxs)("div",{className:"text-typography-body-light [[data-theme*=dark]_&]:text-typography-body-dark flex items-center space-x-2 rounded bg-surface-300 py-0.5 px-2 text-sm",onClick:e=>e.preventDefault(),children:[(0,t.jsx)("span",{children:e}),(0,t.jsx)(a.X,{size:12,className:"cursor-pointer opacity-50 transition hover:opacity-100",onClick:e=>{e.preventDefault(),e.stopPropagation(),n()}})]})])},297396,e=>{"use strict";var t=e.i(478902),a=e.i(347595),n=e.i(600760),r=e.i(370410),s=e.i(88816),i=e.i(389959),l=e.i(843778),o=e.i(866205),c=e.i(703526),d=e.i(917007),u=e.i(920432),m=e.i(549815),h=e.i(911509),p=e.i(689805),f=e.i(793912),g=e.i(135144),b=e.i(396831),_=e.i(442338);e.s(["MultiSelectV2",0,({options:e,value:y,placeholder:x,searchPlaceholder:j="Search for option",disabled:v=!1,onChange:E=()=>{}})=>{let[w,N]=(0,i.useState)(!1),[S,C]=(0,i.useState)(y||[]),k=y||S,T=(0,a.default)(e,["disabled"],["desc"]),R=t=>{let a=void 0!==(k||[]).find(e=>e===t.value)?[...(0,n.default)(k,t.value)]:[...k.concat([t.value])],r=e.filter(e=>e.disabled).map(e=>e.name),s=[...new Set(a.concat(r))];C(s),E(s)};return(0,t.jsx)("div",{className:v?"pointer-events-none opacity-50":"",children:(0,t.jsxs)(p.Popover_Shadcn_,{open:w,onOpenChange:N,modal:!1,children:[(0,t.jsx)(g.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsxs)("div",{className:(0,l.cn)("relative border border-strong bg-control rounded","flex w-full flex-wrap items-start gap-1.5 p-1.5 cursor-pointer",`${0===k.length?"h-9":""}`),onClick:()=>N(!0),children:[0===k.length&&x&&(0,t.jsx)("div",{className:"px-2 text-sm text-foreground-light h-full flex items-center",children:x}),k.map((e,a)=>{let n=`${e}-${a}`,r=T.find(t=>t.value===e),s=r?.disabled??!1;return r?s?(0,t.jsx)(_.BadgeDisabled,{name:r.name},n):(0,t.jsx)(_.BadgeSelected,{name:r.name,handleRemove:()=>R(r)},n):(0,t.jsx)(t.Fragment,{})}),(0,t.jsx)("div",{className:"absolute inset-y-0 right-0 pl-3 pr-2 flex space-x-1 items-center cursor-pointer ",children:(0,t.jsx)(s.ChevronDown,{size:16,strokeWidth:2,className:"text-foreground-lighter"})})]})}),(0,t.jsx)(f.PopoverContent_Shadcn_,{className:"p-0 w-96 border-strong",side:"bottom",align:"start",children:(0,t.jsxs)(o.Command_Shadcn_,{children:[(0,t.jsx)(u.CommandInput_Shadcn_,{placeholder:j}),(0,t.jsxs)(h.CommandList_Shadcn_,{children:[(0,t.jsx)(c.CommandEmpty_Shadcn_,{children:"No options found"}),(0,t.jsx)(d.CommandGroup_Shadcn_,{children:(0,t.jsx)(b.ScrollArea,{className:(0,l.cn)(T.length>7?"h-[210px]":""),children:T?.map(e=>{let a=!!(k&&k.find(t=>t===e.value));return(0,t.jsx)(m.CommandItem_Shadcn_,{value:e.value,className:"cursor-pointer w-full",onClick:()=>R(e),onSelect:()=>R(e),children:(0,t.jsxs)("div",{className:"w-full flex items-center justify-between",children:[e.name,a&&(0,t.jsx)(r.Check,{size:14})]})},e.id)})})})]})]})})]})})}])},863562,e=>{"use strict";let t="undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__;e.s(["DEBUG_BUILD",()=>t])},390645,e=>{"use strict";let t=(0,e.i(388019).default)("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",()=>t],390645)},763013,e=>{"use strict";let t=`CREATE OR REPLACE FUNCTION event_trigger_fn()
RETURNS event_trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Add logic here
END;
$$;

DROP EVENT TRIGGER IF EXISTS event_trigger_name;
CREATE EVENT TRIGGER event_trigger_name
ON ddl_command_end
EXECUTE FUNCTION event_trigger_fn();
`,a=`
CREATE OR REPLACE FUNCTION rls_auto_enable()
RETURNS EVENT_TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;

DROP EVENT TRIGGER IF EXISTS ensure_rls;
CREATE EVENT TRIGGER ensure_rls
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
EXECUTE FUNCTION rls_auto_enable();`,n=[{name:"Auto enable RLS",description:"Enable RLS automatically on new tables in selected schemas.",content:a},{name:"Prevent table drops",description:"Block dropping tables using the sql_drop event trigger.",content:`-- Function
CREATE OR REPLACE FUNCTION dont_drop_function()
  RETURNS event_trigger LANGUAGE plpgsql AS $$
DECLARE
    obj record;
    tbl_name text;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
    LOOP
        IF obj.object_type = 'table' THEN
            RAISE EXCEPTION 'ERROR: All tables in this schema are protected and cannot be dropped';
        END IF;
    END LOOP;
END;
$$;
-- Event trigger
CREATE EVENT TRIGGER dont_drop_trigger
ON sql_drop
EXECUTE FUNCTION dont_drop_function();
`},{name:"Blank event trigger",description:"A minimal scaffold to start from.",content:t}];e.s(["AUTO_ENABLE_RLS_EVENT_TRIGGER_SQL",0,a,"DEFAULT_EVENT_TRIGGER_SQL",0,t,"EVENT_TRIGGER_TEMPLATES",0,n])},439416,541255,e=>{"use strict";let t={list:e=>["projects",e,"database-event-triggers"]};e.s(["databaseEventTriggerKeys",0,t],439416);var a=e.i(242882),n=e.i(714403);let r=`
select
  evt.oid,
  evt.evtname as name,
  evt.evtevent as event,
  case evt.evtenabled
    when 'O' then 'ORIGIN'
    when 'A' then 'ALWAYS'
    when 'R' then 'REPLICA'
    when 'D' then 'DISABLED'
  end as enabled_mode,
  evt.evttags as tags,
  proc.proname as function_name,
  namespace.nspname as function_schema,
  owner.rolname as owner,
  case
    when proc.oid is not null then pg_get_functiondef(proc.oid)
    else null
  end as function_definition
from pg_event_trigger as evt
left join pg_proc as proc on proc.oid = evt.evtfoid
left join pg_namespace as namespace on namespace.oid = proc.pronamespace
left join pg_roles as owner on owner.oid = evt.evtowner
order by evt.evtname;
`;async function s({projectRef:e,connectionString:a},s){let{result:i}=await (0,n.executeSql)({projectRef:e,connectionString:a,sql:r,queryKey:t.list(e)},s);return i}e.s(["useDatabaseEventTriggersQuery",0,({projectRef:e,connectionString:n},{enabled:r=!0,...i}={})=>(0,a.useQuery)({queryKey:t.list(e),queryFn:({signal:t})=>s({projectRef:e,connectionString:n},t),enabled:r&&void 0!==e,...i})],541255)},672296,e=>{"use strict";function t(e){return e.split("#")[0]}function a(e,t={}){let{maxDepth:n=3,redaction:r="[REDACTED]",truncationNotice:s="[REDACTED: max depth reached]",sensitiveKeys:i=[]}=t,l=new Set(["password","passwd","pwd","pass","secret","token","id_token","access_token","refresh_token","apikey","api_key","api-key","apiKey","key","privatekey","private_key","client_secret","clientSecret","auth","authorization","ssh_key","sshKey","bearer","session","cookie","csrf","xsrf","ip","ip_address","ipAddress","aws_access_key_id","aws_secret_access_key","gcp_service_account_key",...i].map(e=>e.toLowerCase())),o=[{re:/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,reason:"ip"},{re:/\b(?:[A-Fa-f0-9]{1,4}:){2,7}[A-Fa-f0-9]{1,4}\b/g,reason:"ip6"},{re:/\b(AKI|ASI)A[0-9A-Z]{16}\b/g,reason:"aws_access_key_id"},{re:/\b[0-9A-Za-z/+]{40}\b/g,reason:"aws_secret_access_key_like"},{re:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/g,reason:"bearer"},{re:/\b[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\b/g,reason:"jwt_like"},{re:/\b[A-Za-z0-9_\-]{24,64}\b/g,reason:"long_token"}],c=new WeakMap;function d(e){let t=e;for(let{re:e}of o)t=t.replace(e,r);return t}function u(e){return l.has(String(e).toLowerCase())}return e.map(e=>(function e(t,a){if(null==t||"number"==typeof t||"boolean"==typeof t||"bigint"==typeof t)return t;if("string"==typeof t)return d(t);if("function"==typeof t)return"[Function]";if(t instanceof Date)return t.toISOString();if(t instanceof RegExp)return t.toString();if(ArrayBuffer.isView(t)&&!(t instanceof DataView))return`[TypedArray byteLength=${t.byteLength}]`;if(t instanceof ArrayBuffer)return`[ArrayBuffer byteLength=${t.byteLength}]`;if(a>=n)return s;if("object"==typeof t){if(c.has(t))return"[Circular]";if(Array.isArray(t)){let n=[];c.set(t,n);for(let r=0;r<t.length;r++)n[r]=e(t[r],a+1);return n}if(function(e){if(null===e||"object"!=typeof e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}(t)){let n={};for(let[s,i]of(c.set(t,n),Object.entries(t)))u(s)?n[s]=r:n[s]=e(i,a+1);return n}if(t instanceof Map){let n=[];for(let[s,i]of(c.set(t,n),t.entries())){let t=u(s)?r:e(s,a+1),l=u(s)?r:e(i,a+1);n.push([t,l])}return n}if(t instanceof Set){let n=[];for(let r of(c.set(t,n),t.values()))n.push(e(r,a+1));return n}if(t instanceof URL)return t.toString();if(t instanceof Error){let e={name:t.name,message:d(t.message),stack:s};return c.set(t,e),e}try{return d(String(t))}catch{return d(Object.prototype.toString.call(t))}}return d(String(t))})(e,0))}e.s(["sanitizeArrayOfObjects",()=>a,"sanitizeUrlHashParams",()=>t])},963316,e=>{"use strict";var t=e.i(478902),a=e.i(902858),n=e.i(366652),r=e.i(975924),s=e.i(533488),i=e.i(389959),l=e.i(355901);e.i(128328);var o=e.i(947748),c=e.i(158639),d=e.i(198693),u=e.i(458084),m=e.i(931244),h=e.i(211761),p=e.i(376841),f=e.i(102631),g=e.i(785951),b=e.i(448710),_=e.i(215618),y=e.i(567558),x=e.i(390645);e.i(69870);var j=e.i(763013),v=e.i(215312),E=e.i(38429),w=e.i(356003),N=e.i(714403),S=e.i(439416);async function C({projectRef:e,connectionString:t,sql:a}){let{result:n}=await (0,N.executeSql)({projectRef:e,connectionString:t,sql:a,queryKey:["event-trigger","create"]});return n}var k=e.i(541255),T=e.i(2579),R=e.i(124416),A=e.i(635494),P=e.i(967052),L=e.i(210419),I=e.i(837710),O=e.i(843778),D=e.i(670447),B=e.i(470754);let q=()=>{let{ref:e}=(0,c.useParams)(),{dismissBanner:n}=(0,B.useBannerStack)(),{data:r}=(0,A.useSelectedProjectQuery)(),s=e??r?.ref,[d,u]=(0,i.useState)(!1),m=(0,P.useTrack)(),[,h]=(0,R.useLocalStorageQuery)(o.LOCAL_STORAGE_KEYS.RLS_EVENT_TRIGGER_BANNER_DISMISSED(s??"unknown"),!1),{can:p}=(0,T.useAsyncCheckPermissions)(a.PermissionAction.TENANT_SQL_ADMIN_WRITE,"triggers"),{data:f=[],isLoading:g}=(0,k.useDatabaseEventTriggersQuery)({projectRef:r?.ref,connectionString:r?.connectionString}),b=(0,i.useMemo)(()=>f.some(e=>"ensure_rls"===e.name||"rls_auto_enable"===e.function_name),[f]),{mutate:_,isPending:y}=(({onSuccess:e,onError:t,...a}={})=>{let n=(0,w.useQueryClient)();return(0,E.useMutation)({mutationFn:e=>C(e),async onSuccess(t,a,r){let{projectRef:s}=a;await n.invalidateQueries({queryKey:S.databaseEventTriggerKeys.list(s)}),await e?.(t,a,r)},async onError(e,a,n){void 0===t?l.toast.error(`Failed to create event trigger: ${e.message}`):t(e,a,n)},...a})})({onSuccess:()=>u(!0)});return((0,i.useEffect)(()=>{b&&u(!0)},[b]),!s||g)?null:(0,t.jsx)(D.BannerCard,{onDismiss:()=>{h(!0),n("rls-event-trigger-banner")},children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsx)("div",{className:"flex flex-col gap-y-2 items-start",children:(0,t.jsx)("div",{className:(0,O.cn)("p-2 rounded-lg bg-muted text-foreground-light",d&&"bg-brand-200 dark:bg-brand-400 text-brand"),children:(0,t.jsx)(x.ShieldCheck,{size:16})})}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1 mb-2",children:[(0,t.jsx)("p",{className:"text-sm font-medium",children:d?"RLS auto-enable trigger is active":"Auto-enable RLS for new tables"}),(0,t.jsx)("p",{className:"text-xs text-foreground-lighter text-balance",children:d?"New tables will have Row Level Security enabled automatically.":"Create an event trigger that enables Row Level Security on all new tables"})]}),(0,t.jsx)("div",{className:"flex gap-2",children:d?(0,t.jsx)(I.Button,{asChild:!0,type:"default",size:"tiny",children:(0,t.jsx)(L.default,{href:`/project/${s}/database/triggers/event`,children:"View triggers"})}):(0,t.jsx)(v.ButtonTooltip,{type:"primary",size:"tiny",loading:y,disabled:!p,onClick:()=>{r&&(m("rls_event_trigger_banner_create_button_clicked"),_({projectRef:r.ref,connectionString:r.connectionString,sql:j.AUTO_ENABLE_RLS_EVENT_TRIGGER_SQL}))},tooltip:{content:{side:"bottom",text:p?void 0:"You need additional permissions to create triggers"}},children:"Create ensure_rls trigger"})})]})})};var $=e.i(291653),F=e.i(513826),z=e.i(693241),M=e.i(300424),G=e.i(462142),Q=e.i(302372),U=e.i(738196),K=e.i(392491),H=e.i(10429),V=e.i(931942),W=e.i(441081),Y=e.i(746301),X=e.i(127739),Z=e.i(456050),J=e.i(228027),ee=e.i(108151);let et=()=>{let[e,g]=(0,s.useQueryState)("schema",s.parseAsString.withDefault("public").withOptions({history:"replace"})),[b,x]=(0,s.useQueryState)("search",s.parseAsString.withDefault("").withOptions({history:"replace",clearOnDefault:!0})),j=(0,i.useDeferredValue)(b),[v,E]=(0,s.useQueryState)("edit",s.parseAsString.withOptions({history:"push",clearOnDefault:!0})),{ref:w}=(0,c.useParams)(),{data:N}=(0,A.useSelectedProjectQuery)(),{data:S}=(0,G.useProjectPostgrestConfigQuery)({projectRef:N?.ref}),C=(0,d.useIsInlineEditorEnabled)(),{openSidebar:k}=(0,W.useSidebarManagerSnapshot)(),{setValue:P,setTemplates:L,setInitialPrompt:O}=(0,V.useEditorPanelStateSnapshot)(),[D,$]=(0,i.useState)(),[et,ea]=(0,s.useQueryState)("new",s.parseAsBoolean.withDefault(!1).withOptions({history:"push",clearOnDefault:!0})),{isSchemaLocked:en}=(0,K.useIsProtectedSchema)({schema:e,excludedSchemas:["realtime"]}),{addBanner:er,dismissBanner:es}=(0,B.useBannerStack)(),[ei]=(0,R.useLocalStorageQuery)(o.LOCAL_STORAGE_KEYS.RLS_EVENT_TRIGGER_BANNER_DISMISSED(w??""),!1),{data:el=[],isPending:eo,isError:ec,isSuccess:ed,error:eu}=(0,Q.useDatabasePoliciesQuery)({projectRef:N?.ref,connectionString:N?.connectionString}),em=el.find(e=>e.id.toString()===v),{data:eh,isPending:ep,isSuccess:ef,isError:eg,error:eb}=(0,U.useTablesQuery)({projectRef:N?.ref,connectionString:N?.connectionString,schema:e}),{tables:e_,visibleTableIds:ey}=(0,i.useMemo)(()=>((e,t,a)=>{let n=e.slice().sort((e,t)=>e.name.localeCompare(t.name)),r=new Set;if(!a)return n.forEach(e=>r.add(e.id)),{tables:n,visibleTableIds:r};let s=a.toLowerCase(),i=new Set(t.filter(e=>e.name.toLowerCase().includes(s)).map(e=>`${e.schema}.${e.table}`));return n.forEach(e=>{(e.name.toLowerCase().includes(s)||e.id.toString()===s||i.has(`${e.schema}.${e.name}`))&&r.add(e.id)}),{tables:n,visibleTableIds:r}})(eh??[],el??[],b),[eh,el,b]),ex=(0,i.useMemo)(()=>S?.db_schema?S.db_schema.split(",").map(e=>e.trim()).filter(e=>e.length>0):[],[S?.db_schema]),{can:ej,isSuccess:ev}=(0,T.useAsyncCheckPermissions)(a.PermissionAction.TENANT_SQL_ADMIN_READ,"policies"),{can:eE,isSuccess:ew}=(0,T.useAsyncCheckPermissions)(a.PermissionAction.TENANT_SQL_ADMIN_WRITE,"triggers"),eN=(0,i.useCallback)(t=>{if($(t),E(null),ea(!0),C){let a=`create policy "replace_with_policy_name"
  on ${e}.${t}
  for select
  to authenticated
  using (
    true  -- Write your policy condition here
);`;O("Create a new RLS policy that..."),P(a),L([]),k(_.SIDEBAR_KEYS.EDITOR_PANEL)}else ea(!0)},[C,k,e]),eS=(0,i.useCallback)(e=>{$(void 0),C?(O(`Update the RLS policy with name "${e.name}" that...`),P((0,f.generatePolicyUpdateSQL)(e)),L((0,h.getGeneralPolicyTemplates)(e.schema,e.table).map(e=>({name:e.templateName,description:e.description,content:e.statement}))),k(_.SIDEBAR_KEYS.EDITOR_PANEL)):E(e.id.toString())},[C,k]),eC=(0,i.useCallback)(()=>x(""),[x]);(0,i.useEffect)(()=>{if(ew)return eE&&!ei?er({id:"rls-event-trigger-banner",isDismissed:!1,content:(0,t.jsx)(q,{}),priority:2}):es("rls-event-trigger-banner"),()=>{es("rls-event-trigger-banner")}},[er,es,eE,ew,ei]),(0,i.useEffect)(()=>{v&&ed&&!em&&((0,l.toast)(`Policy ID ${v} cannot be found`),E(null))},[v,em,ed,E]);let ek=!!v;return ev&&!ej?(0,t.jsx)(z.default,{isFullPage:!0,resourceText:"view this project's RLS policies"}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Z.PageHeader,{size:"large",children:(0,t.jsxs)(Z.PageHeaderMeta,{children:[(0,t.jsxs)(Z.PageHeaderSummary,{children:[(0,t.jsx)(Z.PageHeaderTitle,{children:"Policies"}),(0,t.jsx)(Z.PageHeaderDescription,{children:"Manage Row Level Security policies for your tables"})]}),(0,t.jsx)(Z.PageHeaderAside,{children:(0,t.jsx)(F.DocsButton,{href:`${H.DOCS_URL}/learn/auth-deep-dive/auth-row-level-security`})})]})}),(0,t.jsx)(X.PageContainer,{size:"large",children:(0,t.jsx)(J.PageSection,{children:(0,t.jsxs)(J.PageSectionContent,{children:[(0,t.jsxs)("div",{className:"mb-4 flex flex-row gap-x-2",children:[(0,t.jsx)(M.SchemaSelector,{className:"w-full lg:w-[180px]",size:"tiny",align:"end",showError:!1,selectedSchemaName:e,onSelectSchema:e=>{g(e),x("")}}),(0,t.jsx)(Y.Input,{size:"tiny",placeholder:"Filter tables and policies",className:"block w-full lg:w-52",containerClassName:"[&>div>svg]:-mt-0.5",value:b||"",onChange:e=>{x(e.target.value)},icon:(0,t.jsx)(n.Search,{size:14}),actions:b?(0,t.jsx)(I.Button,{size:"tiny",type:"text",className:"p-0 h-5 w-5",icon:(0,t.jsx)(r.X,{}),onClick:()=>x("")}):null})]}),ep&&(0,t.jsx)(ee.GenericSkeletonLoader,{}),eg&&(0,t.jsx)(y.default,{error:eb,subject:"Failed to retrieve tables"}),ef&&(0,t.jsx)(m.PoliciesDataProvider,{policies:el??[],isPoliciesLoading:eo,isPoliciesError:ec,policiesError:eu??void 0,exposedSchemas:ex,children:(0,t.jsx)(u.Policies,{search:j,schema:e,tables:e_,hasTables:(eh??[]).length>0,isLocked:en,visibleTableIds:ey,onSelectCreatePolicy:eN,onSelectEditPolicy:eS,onResetSearch:eC})}),(0,t.jsx)(p.PolicyEditorPanel,{visible:et||ek&&!!em,schema:e,searchString:b,selectedTable:ek?void 0:D,selectedPolicy:ek?em:void 0,onSelectCancel:()=>{$(void 0),ek?E(null):ea(!1)},authContext:"database"})]})})})]})};et.getLayout=e=>(0,t.jsx)(b.DefaultLayout,{children:(0,t.jsxs)(B.BannerStackProvider,{children:[(0,t.jsx)(g.default,{children:e}),(0,t.jsx)($.BannerStack,{})]})}),e.s(["default",0,et],963316)},275115,(e,t,a)=>{let n="/project/[ref]/auth/policies";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(963316)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})},111410,e=>{e.v(t=>Promise.all(["static/chunks/a428d2b7e6671266.js","static/chunks/92a7c4be60dd12e3.js"].map(t=>e.l(t))).then(()=>t(677146)))},883471,e=>{e.v(t=>Promise.all(["static/chunks/69b2faaedd35af23.js"].map(t=>e.l(t))).then(()=>t(518769)))},774186,e=>{e.v(t=>Promise.all(["static/chunks/117b4e5883cfc423.js"].map(t=>e.l(t))).then(()=>t(376359)))},981889,e=>{e.v(t=>Promise.all(["static/chunks/e44cabdf5aea9bff.js"].map(t=>e.l(t))).then(()=>t(242525)))},730314,e=>{e.v(t=>Promise.all(["static/chunks/dcadd9d46d72282e.js","static/chunks/0860ba34f07162db.js","static/chunks/82dddbda1a808189.js","static/chunks/15e50b9d6c55f00a.js","static/chunks/87b9766a4d16d1da.js","static/chunks/cc8130a84ee9bc2c.css"].map(t=>e.l(t))).then(()=>t(686651)))},753940,e=>{e.v(t=>Promise.all(["static/chunks/046f60a3ac988a54.js"].map(t=>e.l(t))).then(()=>t(478124)))},724565,e=>{e.v(t=>Promise.all(["static/chunks/3ef67abf4c659c0b.js"].map(t=>e.l(t))).then(()=>t(341546)))},591393,e=>{e.v(t=>Promise.all(["static/chunks/e9ad074e72197584.js"].map(t=>e.l(t))).then(()=>t(217383)))},379416,e=>{e.v(t=>Promise.all(["static/chunks/031b0d6330b6fbae.js"].map(t=>e.l(t))).then(()=>t(931066)))},15732,e=>{e.v(t=>Promise.all(["static/chunks/0d5256e667945be4.js"].map(t=>e.l(t))).then(()=>t(760545)))},957083,e=>{e.v(t=>Promise.all(["static/chunks/e7d07ff1ae210964.js"].map(t=>e.l(t))).then(()=>t(667558)))},926327,e=>{e.v(t=>Promise.all(["static/chunks/a5f6425a6c20e9a8.js"].map(t=>e.l(t))).then(()=>t(72947)))},207969,e=>{e.v(t=>Promise.all(["static/chunks/8dd7282c22f923f6.js"].map(t=>e.l(t))).then(()=>t(427328)))},992842,e=>{e.v(t=>Promise.all(["static/chunks/d064a48a1c7cf778.js"].map(t=>e.l(t))).then(()=>t(793794)))},239573,e=>{e.v(t=>Promise.all(["static/chunks/edc5d84148401903.js"].map(t=>e.l(t))).then(()=>t(210246)))},963685,e=>{e.v(t=>Promise.all(["static/chunks/92b20126e5ca0919.js"].map(t=>e.l(t))).then(()=>t(983756)))},665811,e=>{e.v(t=>Promise.all(["static/chunks/e37e25f8b82619ef.js"].map(t=>e.l(t))).then(()=>t(544836)))},369256,e=>{e.v(t=>Promise.all(["static/chunks/8296dc618dae72f0.js"].map(t=>e.l(t))).then(()=>t(930239)))},16037,e=>{e.v(t=>Promise.all(["static/chunks/3251b4bc539a554b.js"].map(t=>e.l(t))).then(()=>t(397698)))},616788,e=>{e.v(t=>Promise.all(["static/chunks/c6b81ab43a1d5d23.js"].map(t=>e.l(t))).then(()=>t(7346)))},315750,e=>{e.v(t=>Promise.all(["static/chunks/32c236321136eb7c.js"].map(t=>e.l(t))).then(()=>t(531289)))},460510,e=>{e.v(t=>Promise.all(["static/chunks/d91062943e6a7c30.js"].map(t=>e.l(t))).then(()=>t(276898)))},550265,e=>{e.v(t=>Promise.all(["static/chunks/75ff0e62b8a31d26.js"].map(t=>e.l(t))).then(()=>t(259714)))},830960,e=>{e.v(t=>Promise.all(["static/chunks/b44aa26556fee7df.js"].map(t=>e.l(t))).then(()=>t(882885)))},336744,e=>{e.v(t=>Promise.all(["static/chunks/2b0767b5c008139a.js"].map(t=>e.l(t))).then(()=>t(955268)))},63631,e=>{e.v(t=>Promise.all(["static/chunks/21a4706e1f02d90b.js"].map(t=>e.l(t))).then(()=>t(853630)))},396476,e=>{e.v(t=>Promise.all(["static/chunks/265a0c1d143bd3f1.js"].map(t=>e.l(t))).then(()=>t(62943)))},912072,e=>{e.v(t=>Promise.all(["static/chunks/c17c80e5efc43419.js"].map(t=>e.l(t))).then(()=>t(311301)))}]);

//# debugId=fa8bbfe9-1cfb-1ae9-0d87-55b1874fafe7
//# sourceMappingURL=4cb1cc77583aa9bb.js.map