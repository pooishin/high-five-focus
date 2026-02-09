;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="65175f60-23f3-f69c-52be-295065f012b1")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,867637,704598,e=>{"use strict";let r=(0,e.i(388019).default)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);e.s(["default",()=>r],704598),e.s(["AlertCircle",()=>r],867637)},816467,e=>{"use strict";let r=(0,e.i(388019).default)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",()=>r],816467)},938933,305551,e=>{"use strict";var r=e.i(389959);let t={bg:{brand:{primary:"bg-purple-600",secondary:"bg-purple-200"}},text:{brand:"text-purple-600",body:"text-foreground-light",title:"text-foreground"},border:{brand:"border-brand-600",primary:"border-default",secondary:"border-secondary",alternative:"border-alternative"},placeholder:"placeholder-foreground-muted",focus:`
    outline-none
    focus:ring-current focus:ring-2
  `,"focus-visible":`
    outline-none
    transition-all
    outline-0
    focus-visible:outline-4
    focus-visible:outline-offset-1
  `,size:{text:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"},padding:{tiny:"px-2.5 py-1",small:"px-3 py-2",medium:"px-4 py-2",large:"px-4 py-2",xlarge:"px-6 py-3"}},overlay:{base:"absolute inset-0 bg-background opacity-50",container:"fixed inset-0 transition-opacity"}},o={tiny:`${t.size.text.tiny} ${t.size.padding.tiny}`,small:`${t.size.text.small} ${t.size.padding.small}`,medium:`${t.size.text.medium} ${t.size.padding.medium}`,large:`${t.size.text.large} ${t.size.padding.large}`,xlarge:`${t.size.text.xlarge} ${t.size.padding.xlarge}`},n={tiny:"pl-7",small:"pl-8",medium:"pl-8",large:"pl-10",xlarge:"pl-11"},a={accordion:{variants:{default:{base:`
          flex flex-col
          space-y-3
        `,container:`
          group
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
          overflow-hidden
          will-change-transform
        `,trigger:`
          flex flex-row
          gap-3
          items-center
          w-full
          text-left
          cursor-pointer

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          py-3
        `},bordered:{base:`
          flex flex-col
          -space-y-px
        `,container:`
          group
          border
          border-default

          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,trigger:`
          flex flex-row
          items-center
          px-6 py-4
          w-full
          text-left
          cursor-pointer

          font-medium
          text-base
          bg-transparent

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light

          transition-colors
          hover:bg-background

          overflow-hidden

          group-first:rounded-tl-md group-first:rounded-tr-md
          group-last:rounded-bl-md group-last:rounded-br-md
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          px-6 py-3
          border-t border-strong
          bg-background
        `}},justified:"justify-between",chevron:{base:`
        text-foreground-lighter
        rotate-0
        group-state-open:rotate-180
        group-data-[state=open]:rotate-180
        ease-&lsqb;cubic-bezier(0.87,_0,_0.13,_1)&rsqb;
        transition-transform duration-300
        duration-200
      `,align:{left:"order-first",right:"order-last"}},animate:{enter:"transition-max-height ease-in-out duration-700 overflow-hidden",enterFrom:"max-h-0",enterTo:"max-h-screen",leave:"transition-max-height ease-in-out duration-300 overflow-hidden",leaveFrom:"max-h-screen",leaveTo:"max-h-0"}},badge:{base:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-opacity-10",size:{large:"px-3 py-0.5 rounded-full text-sm"},dot:"-ml-0.5 mr-1.5 h-2 w-2 rounded-full",color:{brand:"bg-brand-500 text-brand-600 border border-brand-500",brandAlt:"bg-brand bg-opacity-100 text-background border border-brand",scale:"bg-background text-foreground-light border border-strong",tomato:"bg-tomato-200 text-tomato-1100 border border-tomato-700",red:"bg-red-200 text-red-1100 border border-red-700",crimson:"bg-crimson-200 text-crimson-1100 border border-crimson-700",pink:"bg-pink-200 text-pink-1100 border border-pink-700",purple:"bg-purple-200 text-purple-1100 border border-purple-700",violet:"bg-violet-200 text-violet-1100 border border-violet-700",indigo:"bg-indigo-200 text-indigo-1100 border border-indigo-700",blue:"bg-blue-200 text-blue-1100 border border-blue-700",green:"bg-opacity-10 bg-brand-500 text-brand-600 border border-brand-500",grass:"bg-grass-200 text-grass-1100 border border-grass-700",orange:"bg-orange-200 text-orange-1100 border border-orange-700",yellow:"bg-yellow-200 text-yellow-1100 border border-yellow-700",amber:"bg-amber-200 text-amber-1100 border border-amber-700",gold:"bg-gold-200 text-gold-1100 border border-gold-700",gray:"bg-200 text-gray-1100 border border-gray-700",slate:"bg-slate-200 text-slate-1100 border border-slate-700"}},alert:{base:`
      relative rounded-md border py-4 px-6
      flex space-x-4 items-start
    `,header:"block text-sm font-normal mb-1",description:"text-xs",variant:{danger:{base:"bg-red-200 text-red-1200 border-red-700",icon:"text-red-900",header:"text-red-1200",description:"text-red-1100"},warning:{base:"bg-amber-200 border-amber-700",icon:"text-amber-900",header:"text-amber-1200",description:"text-amber-1100"},info:{base:"bg-alternative border",icon:"text-foreground-lighter",header:"text-foreground",description:"text-foreground-light"},success:{base:"bg-brand-300 border-brand-400",icon:"text-brand",header:"text-brand-600",description:"text-brand-600"},neutral:{base:"bg-surface-100 border-default",icon:"text-foreground-muted",header:"text-foreground",description:"text-foreground-light"}},close:`
      absolute
      right-6 top-4
      p-0 m-0
      text-foreground-muted
      cursor-pointer transition ease-in-out
      bg-transparent border-transparent focus:outline-none
      opacity-50 hover:opacity-100`},card:{base:`
      bg-surface-100

      border
      ${t.border.primary}

      flex flex-col
      rounded-md shadow-lg overflow-hidden relative
    `,hoverable:"transition hover:-translate-y-1 hover:shadow-2xl",head:`px-8 py-6 flex justify-between
    border-b
      ${t.border.primary} `,content:"p-8"},tabs:{base:"w-full justify-between space-y-4",underlined:{list:`
        flex items-center border-b
        ${t.border.secondary}
        `,base:`
        relative
        cursor-pointer
        text-foreground-lighter
        flex
        items-center
        space-x-2
        text-center
        transition
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
      `,inactive:`
        hover:text-foreground
      `,active:`
        !text-foreground
        border-b-2 border-foreground
      `},pills:{list:"flex space-x-1",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded
        border
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-background
        border-strong hover:border-foreground-muted
        text-foreground-muted hover:text-foreground
      `,active:`
        bg-selection
        text-foreground
        border-stronger
      `},"rounded-pills":{list:"flex flex-wrap gap-2",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded-full
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-surface-200 hover:bg-surface-300
        hover:border-foreground-lighter
        text-foreground-lighter hover:text-foreground
      `,active:`
        bg-foreground
        text-background
        border-foreground
      `},block:"w-full flex items-center justify-center",size:{...o},scrollable:"overflow-auto whitespace-nowrap no-scrollbar mask-fadeout-right",wrappable:"flex-wrap",content:"focus:outline-none transition-height"},input:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}
      group
    `,variants:{standard:`
        bg-foreground/[.026]
        border border-control
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",textarea_actions_container:"absolute inset-y-1.5 right-0 pl-3 pr-1 flex space-x-1 items-start",textarea_actions_container_items:"flex items-center"},select:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-background
        border border-strong
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 mr-5 flex items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-lighter"},inputNumber:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-control
        border border-strong
      `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},disabled:"opacity-50",container:"relative",with_icon:n,size:{...o},actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center"},checkbox:{base:`
      bg-transparent
      ${t.focus}
      focus:ring-border-muted
      text-brand
      border-strong
      shadow-sm
      rounded
      cursor-pointer
    `,container:"flex cursor-pointer leading-none",size:{tiny:"h-3 w-3 mt-1 mr-3",small:"h-3.5 w-3.5 mt-0.5 mr-3.5",medium:"h-4 w-4 mt-0.5 mr-3.5",large:"h-5 w-5 mt-0.5 mr-4",xlarge:"h-5 w-5 mt-0.5 mr-4"},disabled:"opacity-50",label:{base:"text-foreground-light cursor-pointer",...t.size.text},label_before:{base:"text-border",...t.size.text},label_after:{base:"text-border",...t.size.text},description:{base:"text-foreground-lighter",...t.size.text},group:"space-y-3"},radio:{base:`
      absolute
      ${t.focus}
      focus:ring-brand-400
      border-strong

      text-brand
      shadow-sm
      cursor-pointer
      peer

      bg-surface-100
    `,hidden:"absolute opacity-0",size:{tiny:"h-3 w-3",small:"h-3.5 w-3.5",medium:"h-4 w-4",large:"h-5 w-5",xlarge:"h-5 w-5"},variants:{cards:{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"-space-y-px shadow-sm",base:`
          transition
          border
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"stacked-cards":{container:{base:"relative cursor-pointer flex items-center justify-between",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-3",base:`
          transition
          rounded-md
          border
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"small-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1 items-center justify-center",horizontal:"flex flex-row space-x-2"}},group:"flex flex-row gap-3",base:`
          transition
          border
          rounded-lg
          grow
          items-center
          flex-wrap
          justify-center
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger border-1
        `,radio_offset:"left-4"},"large-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"grid grid-cols-12 gap-3",base:`
          transition
          border border-stronger
          shadow-sm
          rounded-lg
          grow
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-strong
          border-1
        `,radio_offset:"left-4"},list:{container:{base:"relative cursor-pointer flex",size:{tiny:"pl-6",small:"pl-6",medium:"pl-7",large:"pl-7",xlarge:"pl-7"},align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-4",base:"",size:{tiny:"0",small:"0",medium:"0",large:"0",xlarge:"0"},active:"",radio_offset:"left-0"}},label:{base:"text-foreground-light cursor-pointer",...t.size.text},label_before:{base:"text-border",...t.size.text},label_after:{base:"text-border",...t.size.text},description:{base:"text-foreground-lighter",...t.size.text},optionalLabel:{base:"text-foreground-lighter",...t.size.text},disabled:"opacity-50 cursor-auto border-dashed"},sidepanel:{base:`
      z-50
      bg-dash-sidebar
      flex flex-col
      fixed
      inset-y-0
      h-full lg:h-screen
      border-l
      shadow-xl
    `,header:`
      space-y-1 py-4 px-4 bg-dash-sidebar sm:px-6
      border-b
    `,contents:`
      relative
      flex-1
      overflow-y-auto
    `,content:`
      px-4 sm:px-6
    `,footer:`
      flex justify-end gap-2
      p-4 bg-overlay
      border-t
    `,size:{medium:"w-screen max-w-md h-full",large:"w-screen max-w-2xl h-full",xlarge:"w-screen max-w-3xl h-full",xxlarge:"w-screen max-w-4xl h-full",xxxlarge:"w-screen max-w-5xl h-full",xxxxlarge:"w-screen max-w-6xl h-full"},align:{left:`
        left-0
        data-open:animate-panel-slide-left-out
        data-closed:animate-panel-slide-left-in
      `,right:`
        right-0
        data-open:animate-panel-slide-right-out
        data-closed:animate-panel-slide-right-in
      `},separator:`
      w-full
      h-px
      my-2
      bg-border
    `,overlay:`
      z-50
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,trigger:`
      border-none bg-transparent p-0 focus:ring-0
    `},toggle:{base:`
      p-0 relative
      inline-flex flex-shrink-0
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors ease-in-out duration-200
      ${t.focus}
      focus:!ring-border
      bg-foreground-muted/40

      hover:bg-foreground-muted/60
    `,active:`
      !bg-brand
      !hover:bg-brand
    `,handle_container:{tiny:"h-4 w-7",small:"h-6 w-11",medium:"h-6 w-11",large:"h-7 w-12",xlarge:"h-7 w-12"},handle:{base:`
        inline-block h-5 w-5
        rounded-full
        bg-white
        shadow ring-0
        transition
        ease-in-out duration-200
      `,tiny:"!h-3 !w-3",small:"!h-5 !w-5",medium:"!h-5 !w-5",large:"!h-6 !w-6",xlarge:"!h-6 !w-6"},handle_active:{tiny:" translate-x-3 dark:bg-white",small:"translate-x-5 dark:bg-white",medium:"translate-x-5 dark:bg-white",large:"translate-x-5 dark:bg-white",xlarge:"translate-x-5 dark:bg-white"},disabled:"opacity-75 cursor-not-allowed"},form_layout:{container:"grid gap-2",flex:{left:{base:"flex flex-row gap-6",content:"",labels:"order-2",data_input:"order-1"},right:{base:"flex flex-row gap-6 justify-between",content:"order-last",labels:"",data_input:"text-right"}},responsive:"md:grid md:grid-cols-12",non_responsive:"grid grid-cols-12 gap-2",labels_horizontal_layout:"flex flex-row space-x-2 justify-between col-span-12",labels_vertical_layout:"flex flex-col space-y-2 col-span-4",data_input_horizontal_layout:"col-span-12",non_box_data_input_spacing_vertical:"my-3",non_box_data_input_spacing_horizontal:"my-3 md:mt-0 mb-3",data_input_vertical_layout:"col-span-8",data_input_vertical_layout__align_right:"text-right",label:{base:"block text-foreground-light",size:{...t.size.text}},label_optional:{base:"text-foreground-lighter",size:{...t.size.text}},description:{base:"mt-2 text-foreground-lighter leading-normal",size:{...t.size.text}},label_before:{base:"text-foreground-lighter ",size:{...t.size.text}},label_after:{base:"text-foreground-lighter",size:{...t.size.text}},error:{base:`
        text-red-900
        transition-all
        data-show:mt-2
        data-show:animate-slide-down-normal
        data-hide:animate-slide-up-normal
      `,size:{...t.size.text}},size:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"}},popover:{trigger:`
      flex
      border-none
      rounded
      bg-transparent
      p-0
      outline-none
      outline-offset-1
      transition-all
      focus:outline-4
      focus:outline-border-control
    `,content:`
      z-40
      bg-overlay
      border border-overlay
      rounded
      shadow-lg
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
      min-w-fit

      origin-popover
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,size:{tiny:"w-40",small:"w-48",medium:"w-64",large:"w-80",xlarge:"w-96",content:"w-auto"},header:`
      bg-surface-200
      space-y-1 py-1.5 px-3
      border-b border-overlay
    `,footer:`
      bg-surface-200
      py-1.5 px-3
      border-t border-overlay
    `,close:`
      transition
      text-foreground-lighter
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `},menu:{item:{base:`
        cursor-pointer
        flex space-x-3 items-center
        outline-none
        focus-visible:ring-1 ring-foreground-muted focus-visible:z-10
        group
      `,content:{base:"transition truncate text-sm w-full",normal:"text-foreground-light group-hover:text-foreground",active:"text-foreground font-semibold"},icon:{base:"transition truncate text-sm",normal:"text-foreground-lighter group-hover:text-foreground-light",active:"text-foreground"},variants:{text:{base:`
            py-1
          `,normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            text-foreground-muted
            z-10
          `},border:{base:`
            px-4 py-1
          `,normal:`
            border-l
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold

            text-foreground-muted
            z-10

            border-l
            border-brand
            group-hover:border-brand
          `,rounded:"rounded-md"},pills:{base:"px-3 py-1",normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            bg-sidebar-accent
            text-foreground-lighter
            z-10 rounded-md
          `}}},group:{base:`
        flex space-x-3
        mb-2
        font-normal
      `,icon:"text-foreground-lighter",content:"text-sm text-foreground-lighter w-full",variants:{text:"",pills:"px-3",border:""}}},modal:{base:`
      relative
      bg-dash-sidebar
      my-4 max-w-screen
      border border-overlay
      rounded-md
      shadow-xl
      data-open:animate-overlay-show
      data-closed:animate-overlay-hide

    `,header:`
      bg-surface-200
      space-y-1 py-3 px-4 sm:px-5
      border-b border-overlay
      flex items-center justify-between
    `,footer:`
      flex justify-end gap-2
      py-3 px-5
      border-t border-overlay
    `,size:{tiny:"sm:align-middle sm:w-full sm:max-w-xs",small:"sm:align-middle sm:w-full sm:max-w-sm",medium:"sm:align-middle sm:w-full sm:max-w-lg",large:"sm:align-middle sm:w-full md:max-w-xl",xlarge:"sm:align-middle sm:w-full md:max-w-3xl",xxlarge:"sm:align-middle sm:w-full max-w-screen md:max-w-6xl",xxxlarge:"sm:align-middle sm:w-full md:max-w-7xl"},overlay:`
      z-40
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,scroll_overlay:`
      z-40
      fixed
      inset-0
      grid
      place-items-center
      overflow-y-auto
      data-open:animate-overlay-show data-closed:animate-overlay-hide
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `,content:"px-5"},listbox:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      text-foreground
      border
      focus-visible:shadow-md
      ${t.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${t.placeholder}
      indent-px
      transition-all
      bg-none
    `,container:"relative",label:"truncate",variants:{standard:`
        bg-control
        border border-control

        aria-expanded:border-foreground-muted
        aria-expanded:ring-border-muted
        aria-expanded:ring-2
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},options_container_animate:`
      transition
      data-open:animate-slide-down
      data-open:opacity-1
      data-closed:animate-slide-up
      data-closed:opacity-0
    `,options_container:`
      bg-overlay
      shadow-lg
      border border-solid
      border-overlay max-h-60
      rounded-md py-1 text-base
      sm:text-sm z-10 overflow-hidden overflow-y-scroll

      origin-dropdown
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,with_icon:"pl-2",addOnBefore:`
      w-full flex flex-row items-center space-x-3
    `,size:{...o},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-muted",option:`
      w-listbox
      transition cursor-pointer select-none relative py-2 pl-3 pr-9
      text-foreground-light
      text-sm
      hover:bg-border-overlay
      focus:bg-border-overlay
      focus:text-foreground
      border-none
      focus:outline-none
    `,option_active:"text-foreground bg-selection",option_disabled:"cursor-not-allowed opacity-60",option_inner:"flex items-center space-x-3",option_check:"absolute inset-y-0 right-0 flex items-center pr-3 text-brand",option_check_active:"text-brand",option_check_icon:"h-5 w-5"},collapsible:{content:`
      data-open:animate-slide-down-normal
      data-closed:animate-slide-up-normal
    `},inputErrorIcon:{base:`
      flex items-center
      right-3 pr-2 pl-2
      inset-y-0
      pointer-events-none
      text-red-900
    `},inputIconContainer:{base:`
    absolute inset-y-0
    left-0 pl-2 flex
    items-center pointer-events-none
    text-foreground-light
    [&_svg]:stroke-[1.5]
    `,size:{tiny:"[&_svg]:h-[14px] [&_svg]:w-[14px]",small:"[&_svg]:h-[18px] [&_svg]:w-[18px]",medium:"[&_svg]:h-[20px] [&_svg]:w-[20px]",large:"[&_svg]:h-[20px] [&_svg]:w-[20px] pl-3",xlarge:"[&_svg]:h-[24px] [&_svg]:w-[24px] pl-3",xxlarge:"[&_svg]:h-[30px] [&_svg]:w-[30px] pl-3",xxxlarge:"[&_svg]:h-[42px] [&_svg]:w-[42px] pl-3"}},icon:{container:"flex-shrink-0 flex items-center justify-center rounded-full p-3"},loading:{base:"relative",content:{base:"transition-opacity duration-300",active:"opacity-40"},spinner:`
      absolute
      text-foreground-lighter animate-spin
      inset-0
      size-5
      m-auto
    `}};e.s(["default",0,a],305551);let i=(0,r.createContext)({theme:a});function l(e){let{theme:{[e]:t}}=(0,r.useContext)(i);return t||(t=a.accordion),t=JSON.parse(t=JSON.stringify(t).replace(/\\n/g,"").replace(/\s\s+/g," "))}e.s(["default",()=>l],938933)},416050,933505,e=>{"use strict";let r=(0,e.i(388019).default)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);e.s(["default",()=>r],933505),e.s(["ChevronRight",()=>r],416050)},47015,e=>{"use strict";var r=e.i(389959),t=e.i(174617),o=e.i(295047),n=e.i(678001),a=e.i(274664),i=e.i(904641),l=e.i(546595),s=e.i(746523),d=e.i(826524),u=e.i(2664),c=e.i(478902),p="rovingFocusGroup.onEntryFocus",f={bubbles:!1,cancelable:!0},g="RovingFocusGroup",[b,m,x]=(0,o.createCollection)(g),[v,h]=(0,a.createContextScope)(g,[x]),[w,y]=v(g),_=r.forwardRef((e,r)=>(0,c.jsx)(b.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,c.jsx)(b.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,c.jsx)(C,{...e,ref:r})})}));_.displayName=g;var C=r.forwardRef((e,o)=>{let{__scopeRovingFocusGroup:a,orientation:i,loop:b=!1,dir:x,currentTabStopId:v,defaultCurrentTabStopId:h,onCurrentTabStopIdChange:y,onEntryFocus:_,preventScrollOnEntryFocus:C=!1,...R}=e,k=r.useRef(null),j=(0,n.useComposedRefs)(o,k),E=(0,u.useDirection)(x),[M,D]=(0,d.useControllableState)({prop:v,defaultProp:h??null,onChange:y,caller:g}),[I,S]=r.useState(!1),P=(0,s.useCallbackRef)(_),T=m(a),F=r.useRef(!1),[A,O]=r.useState(0);return r.useEffect(()=>{let e=k.current;if(e)return e.addEventListener(p,P),()=>e.removeEventListener(p,P)},[P]),(0,c.jsx)(w,{scope:a,orientation:i,dir:E,loop:b,currentTabStopId:M,onItemFocus:r.useCallback(e=>D(e),[D]),onItemShiftTab:r.useCallback(()=>S(!0),[]),onFocusableItemAdd:r.useCallback(()=>O(e=>e+1),[]),onFocusableItemRemove:r.useCallback(()=>O(e=>e-1),[]),children:(0,c.jsx)(l.Primitive.div,{tabIndex:I||0===A?-1:0,"data-orientation":i,...R,ref:j,style:{outline:"none",...e.style},onMouseDown:(0,t.composeEventHandlers)(e.onMouseDown,()=>{F.current=!0}),onFocus:(0,t.composeEventHandlers)(e.onFocus,e=>{let r=!F.current;if(e.target===e.currentTarget&&r&&!I){let r=new CustomEvent(p,f);if(e.currentTarget.dispatchEvent(r),!r.defaultPrevented){let e=T().filter(e=>e.focusable);z([e.find(e=>e.active),e.find(e=>e.id===M),...e].filter(Boolean).map(e=>e.ref.current),C)}}F.current=!1}),onBlur:(0,t.composeEventHandlers)(e.onBlur,()=>S(!1))})})}),R="RovingFocusGroupItem",k=r.forwardRef((e,o)=>{let{__scopeRovingFocusGroup:n,focusable:a=!0,active:s=!1,tabStopId:d,children:u,...p}=e,f=(0,i.useId)(),g=d||f,x=y(R,n),v=x.currentTabStopId===g,h=m(n),{onFocusableItemAdd:w,onFocusableItemRemove:_,currentTabStopId:C}=x;return r.useEffect(()=>{if(a)return w(),()=>_()},[a,w,_]),(0,c.jsx)(b.ItemSlot,{scope:n,id:g,focusable:a,active:s,children:(0,c.jsx)(l.Primitive.span,{tabIndex:v?0:-1,"data-orientation":x.orientation,...p,ref:o,onMouseDown:(0,t.composeEventHandlers)(e.onMouseDown,e=>{a?x.onItemFocus(g):e.preventDefault()}),onFocus:(0,t.composeEventHandlers)(e.onFocus,()=>x.onItemFocus(g)),onKeyDown:(0,t.composeEventHandlers)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey)return void x.onItemShiftTab();if(e.target!==e.currentTarget)return;let r=function(e,r,t){var o;let n=(o=e.key,"rtl"!==t?o:"ArrowLeft"===o?"ArrowRight":"ArrowRight"===o?"ArrowLeft":o);if(!("vertical"===r&&["ArrowLeft","ArrowRight"].includes(n))&&!("horizontal"===r&&["ArrowUp","ArrowDown"].includes(n)))return j[n]}(e,x.orientation,x.dir);if(void 0!==r){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let n=h().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===r)n.reverse();else if("prev"===r||"next"===r){var t,o;"prev"===r&&n.reverse();let a=n.indexOf(e.currentTarget);n=x.loop?(t=n,o=a+1,t.map((e,r)=>t[(o+r)%t.length])):n.slice(a+1)}setTimeout(()=>z(n))}}),children:"function"==typeof u?u({isCurrentTabStop:v,hasTabStop:null!=C}):u})})});k.displayName=R;var j={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function z(e,r=!1){let t=document.activeElement;for(let o of e)if(o===t||(o.focus({preventScroll:r}),document.activeElement!==t))return}e.s(["Item",()=>k,"Root",()=>_,"createRovingFocusGroupScope",()=>h])},376577,e=>{"use strict";let r=(0,e.i(388019).default)("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);e.s(["Circle",()=>r],376577)},172650,126490,e=>{"use strict";var r=e.i(389959),t=e.i(174617),o=e.i(678001),n=e.i(274664),a=e.i(826524),i=e.i(546595),l=e.i(295047),s=e.i(2664),d=e.i(735343),u=e.i(645499),c=e.i(130874),p=e.i(904641),f=e.i(940051),g=e.i(839518),b=e.i(889251),m=e.i(47015),x=e.i(153545),v=e.i(746523),h=e.i(34345),w=e.i(453912),y=e.i(478902),_=["Enter"," "],C=["ArrowUp","PageDown","End"],R=["ArrowDown","PageUp","Home",...C],k={ltr:[..._,"ArrowRight"],rtl:[..._,"ArrowLeft"]},j={ltr:["ArrowLeft"],rtl:["ArrowRight"]},z="Menu",[E,M,D]=(0,l.createCollection)(z),[I,S]=(0,n.createContextScope)(z,[D,f.createPopperScope,m.createRovingFocusGroupScope]),P=(0,f.createPopperScope)(),T=(0,m.createRovingFocusGroupScope)(),[F,A]=I(z),[O,N]=I(z),H=e=>{let{__scopeMenu:t,open:o=!1,children:n,dir:a,onOpenChange:i,modal:l=!0}=e,d=P(t),[u,c]=r.useState(null),p=r.useRef(!1),g=(0,v.useCallbackRef)(i),b=(0,s.useDirection)(a);return r.useEffect(()=>{let e=()=>{p.current=!0,document.addEventListener("pointerdown",r,{capture:!0,once:!0}),document.addEventListener("pointermove",r,{capture:!0,once:!0})},r=()=>p.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",r,{capture:!0}),document.removeEventListener("pointermove",r,{capture:!0})}},[]),(0,y.jsx)(f.Root,{...d,children:(0,y.jsx)(F,{scope:t,open:o,onOpenChange:g,content:u,onContentChange:c,children:(0,y.jsx)(O,{scope:t,onClose:r.useCallback(()=>g(!1),[g]),isUsingKeyboardRef:p,dir:b,modal:l,children:n})})})};H.displayName=z;var L=r.forwardRef((e,r)=>{let{__scopeMenu:t,...o}=e,n=P(t);return(0,y.jsx)(f.Anchor,{...n,...o,ref:r})});L.displayName="MenuAnchor";var K="MenuPortal",[$,G]=I(K,{forceMount:void 0}),U=e=>{let{__scopeMenu:r,forceMount:t,children:o,container:n}=e,a=A(K,r);return(0,y.jsx)($,{scope:r,forceMount:t,children:(0,y.jsx)(b.Presence,{present:t||a.open,children:(0,y.jsx)(g.Portal,{asChild:!0,container:n,children:o})})})};U.displayName=K;var B="MenuContent",[V,X]=I(B),q=r.forwardRef((e,r)=>{let t=G(B,e.__scopeMenu),{forceMount:o=t.forceMount,...n}=e,a=A(B,e.__scopeMenu),i=N(B,e.__scopeMenu);return(0,y.jsx)(E.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(b.Presence,{present:o||a.open,children:(0,y.jsx)(E.Slot,{scope:e.__scopeMenu,children:i.modal?(0,y.jsx)(J,{...n,ref:r}):(0,y.jsx)(Y,{...n,ref:r})})})})}),J=r.forwardRef((e,n)=>{let a=A(B,e.__scopeMenu),i=r.useRef(null),l=(0,o.useComposedRefs)(n,i);return r.useEffect(()=>{let e=i.current;if(e)return(0,h.hideOthers)(e)},[]),(0,y.jsx)(Z,{...e,ref:l,trapFocus:a.open,disableOutsidePointerEvents:a.open,disableOutsideScroll:!0,onFocusOutside:(0,t.composeEventHandlers)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>a.onOpenChange(!1)})}),Y=r.forwardRef((e,r)=>{let t=A(B,e.__scopeMenu);return(0,y.jsx)(Z,{...e,ref:r,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>t.onOpenChange(!1)})}),W=(0,x.createSlot)("MenuContent.ScrollLock"),Z=r.forwardRef((e,n)=>{let{__scopeMenu:a,loop:i=!1,trapFocus:l,onOpenAutoFocus:s,onCloseAutoFocus:p,disableOutsidePointerEvents:g,onEntryFocus:b,onEscapeKeyDown:x,onPointerDownOutside:v,onFocusOutside:h,onInteractOutside:_,onDismiss:k,disableOutsideScroll:j,...z}=e,E=A(B,a),D=N(B,a),I=P(a),S=T(a),F=M(a),[O,H]=r.useState(null),L=r.useRef(null),K=(0,o.useComposedRefs)(n,L,E.onContentChange),$=r.useRef(0),G=r.useRef(""),U=r.useRef(0),X=r.useRef(null),q=r.useRef("right"),J=r.useRef(0),Y=j?w.RemoveScroll:r.Fragment;r.useEffect(()=>()=>window.clearTimeout($.current),[]),(0,u.useFocusGuards)();let Z=r.useCallback(e=>{var r,t;return q.current===X.current?.side&&(r=e,!!(t=X.current?.area)&&function(e,r){let{x:t,y:o}=e,n=!1;for(let e=0,a=r.length-1;e<r.length;a=e++){let i=r[e],l=r[a],s=i.x,d=i.y,u=l.x,c=l.y;d>o!=c>o&&t<(u-s)*(o-d)/(c-d)+s&&(n=!n)}return n}({x:r.clientX,y:r.clientY},t))},[]);return(0,y.jsx)(V,{scope:a,searchRef:G,onItemEnter:r.useCallback(e=>{Z(e)&&e.preventDefault()},[Z]),onItemLeave:r.useCallback(e=>{Z(e)||(L.current?.focus(),H(null))},[Z]),onTriggerLeave:r.useCallback(e=>{Z(e)&&e.preventDefault()},[Z]),pointerGraceTimerRef:U,onPointerGraceIntentChange:r.useCallback(e=>{X.current=e},[]),children:(0,y.jsx)(Y,{...j?{as:W,allowPinchZoom:!0}:void 0,children:(0,y.jsx)(c.FocusScope,{asChild:!0,trapped:l,onMountAutoFocus:(0,t.composeEventHandlers)(s,e=>{e.preventDefault(),L.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:p,children:(0,y.jsx)(d.DismissableLayer,{asChild:!0,disableOutsidePointerEvents:g,onEscapeKeyDown:x,onPointerDownOutside:v,onFocusOutside:h,onInteractOutside:_,onDismiss:k,children:(0,y.jsx)(m.Root,{asChild:!0,...S,dir:D.dir,orientation:"vertical",loop:i,currentTabStopId:O,onCurrentTabStopIdChange:H,onEntryFocus:(0,t.composeEventHandlers)(b,e=>{D.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,y.jsx)(f.Content,{role:"menu","aria-orientation":"vertical","data-state":ej(E.open),"data-radix-menu-content":"",dir:D.dir,...I,...z,ref:K,style:{outline:"none",...z.style},onKeyDown:(0,t.composeEventHandlers)(z.onKeyDown,e=>{let r=e.target.closest("[data-radix-menu-content]")===e.currentTarget,t=e.ctrlKey||e.altKey||e.metaKey,o=1===e.key.length;if(r){var n;let r,a,i,l,s,d;"Tab"===e.key&&e.preventDefault(),!t&&o&&(n=e.key,r=G.current+n,a=F().filter(e=>!e.disabled),i=document.activeElement,l=a.find(e=>e.ref.current===i)?.textValue,s=function(e,r,t){var o;let n=r.length>1&&Array.from(r).every(e=>e===r[0])?r[0]:r,a=t?e.indexOf(t):-1,i=(o=Math.max(a,0),e.map((r,t)=>e[(o+t)%e.length]));1===n.length&&(i=i.filter(e=>e!==t));let l=i.find(e=>e.toLowerCase().startsWith(n.toLowerCase()));return l!==t?l:void 0}(a.map(e=>e.textValue),r,l),d=a.find(e=>e.textValue===s)?.ref.current,function e(r){G.current=r,window.clearTimeout($.current),""!==r&&($.current=window.setTimeout(()=>e(""),1e3))}(r),d&&setTimeout(()=>d.focus()))}let a=L.current;if(e.target!==a||!R.includes(e.key))return;e.preventDefault();let i=F().filter(e=>!e.disabled).map(e=>e.ref.current);C.includes(e.key)&&i.reverse(),function(e){let r=document.activeElement;for(let t of e)if(t===r||(t.focus(),document.activeElement!==r))return}(i)}),onBlur:(0,t.composeEventHandlers)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout($.current),G.current="")}),onPointerMove:(0,t.composeEventHandlers)(e.onPointerMove,eM(e=>{let r=e.target,t=J.current!==e.clientX;e.currentTarget.contains(r)&&t&&(q.current=e.clientX>J.current?"right":"left",J.current=e.clientX)}))})})})})})})});q.displayName=B;var Q=r.forwardRef((e,r)=>{let{__scopeMenu:t,...o}=e;return(0,y.jsx)(i.Primitive.div,{role:"group",...o,ref:r})});Q.displayName="MenuGroup";var ee=r.forwardRef((e,r)=>{let{__scopeMenu:t,...o}=e;return(0,y.jsx)(i.Primitive.div,{...o,ref:r})});ee.displayName="MenuLabel";var er="MenuItem",et="menu.itemSelect",eo=r.forwardRef((e,n)=>{let{disabled:a=!1,onSelect:l,...s}=e,d=r.useRef(null),u=N(er,e.__scopeMenu),c=X(er,e.__scopeMenu),p=(0,o.useComposedRefs)(n,d),f=r.useRef(!1);return(0,y.jsx)(en,{...s,ref:p,disabled:a,onClick:(0,t.composeEventHandlers)(e.onClick,()=>{let e=d.current;if(!a&&e){let r=new CustomEvent(et,{bubbles:!0,cancelable:!0});e.addEventListener(et,e=>l?.(e),{once:!0}),(0,i.dispatchDiscreteCustomEvent)(e,r),r.defaultPrevented?f.current=!1:u.onClose()}}),onPointerDown:r=>{e.onPointerDown?.(r),f.current=!0},onPointerUp:(0,t.composeEventHandlers)(e.onPointerUp,e=>{f.current||e.currentTarget?.click()}),onKeyDown:(0,t.composeEventHandlers)(e.onKeyDown,e=>{let r=""!==c.searchRef.current;a||r&&" "===e.key||_.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});eo.displayName=er;var en=r.forwardRef((e,n)=>{let{__scopeMenu:a,disabled:l=!1,textValue:s,...d}=e,u=X(er,a),c=T(a),p=r.useRef(null),f=(0,o.useComposedRefs)(n,p),[g,b]=r.useState(!1),[x,v]=r.useState("");return r.useEffect(()=>{let e=p.current;e&&v((e.textContent??"").trim())},[d.children]),(0,y.jsx)(E.ItemSlot,{scope:a,disabled:l,textValue:s??x,children:(0,y.jsx)(m.Item,{asChild:!0,...c,focusable:!l,children:(0,y.jsx)(i.Primitive.div,{role:"menuitem","data-highlighted":g?"":void 0,"aria-disabled":l||void 0,"data-disabled":l?"":void 0,...d,ref:f,onPointerMove:(0,t.composeEventHandlers)(e.onPointerMove,eM(e=>{l?u.onItemLeave(e):(u.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,t.composeEventHandlers)(e.onPointerLeave,eM(e=>u.onItemLeave(e))),onFocus:(0,t.composeEventHandlers)(e.onFocus,()=>b(!0)),onBlur:(0,t.composeEventHandlers)(e.onBlur,()=>b(!1))})})})}),ea=r.forwardRef((e,r)=>{let{checked:o=!1,onCheckedChange:n,...a}=e;return(0,y.jsx)(ef,{scope:e.__scopeMenu,checked:o,children:(0,y.jsx)(eo,{role:"menuitemcheckbox","aria-checked":ez(o)?"mixed":o,...a,ref:r,"data-state":eE(o),onSelect:(0,t.composeEventHandlers)(a.onSelect,()=>n?.(!!ez(o)||!o),{checkForDefaultPrevented:!1})})})});ea.displayName="MenuCheckboxItem";var ei="MenuRadioGroup",[el,es]=I(ei,{value:void 0,onValueChange:()=>{}}),ed=r.forwardRef((e,r)=>{let{value:t,onValueChange:o,...n}=e,a=(0,v.useCallbackRef)(o);return(0,y.jsx)(el,{scope:e.__scopeMenu,value:t,onValueChange:a,children:(0,y.jsx)(Q,{...n,ref:r})})});ed.displayName=ei;var eu="MenuRadioItem",ec=r.forwardRef((e,r)=>{let{value:o,...n}=e,a=es(eu,e.__scopeMenu),i=o===a.value;return(0,y.jsx)(ef,{scope:e.__scopeMenu,checked:i,children:(0,y.jsx)(eo,{role:"menuitemradio","aria-checked":i,...n,ref:r,"data-state":eE(i),onSelect:(0,t.composeEventHandlers)(n.onSelect,()=>a.onValueChange?.(o),{checkForDefaultPrevented:!1})})})});ec.displayName=eu;var ep="MenuItemIndicator",[ef,eg]=I(ep,{checked:!1}),eb=r.forwardRef((e,r)=>{let{__scopeMenu:t,forceMount:o,...n}=e,a=eg(ep,t);return(0,y.jsx)(b.Presence,{present:o||ez(a.checked)||!0===a.checked,children:(0,y.jsx)(i.Primitive.span,{...n,ref:r,"data-state":eE(a.checked)})})});eb.displayName=ep;var em=r.forwardRef((e,r)=>{let{__scopeMenu:t,...o}=e;return(0,y.jsx)(i.Primitive.div,{role:"separator","aria-orientation":"horizontal",...o,ref:r})});em.displayName="MenuSeparator";var ex=r.forwardRef((e,r)=>{let{__scopeMenu:t,...o}=e,n=P(t);return(0,y.jsx)(f.Arrow,{...n,...o,ref:r})});ex.displayName="MenuArrow";var ev="MenuSub",[eh,ew]=I(ev),ey=e=>{let{__scopeMenu:t,children:o,open:n=!1,onOpenChange:a}=e,i=A(ev,t),l=P(t),[s,d]=r.useState(null),[u,c]=r.useState(null),g=(0,v.useCallbackRef)(a);return r.useEffect(()=>(!1===i.open&&g(!1),()=>g(!1)),[i.open,g]),(0,y.jsx)(f.Root,{...l,children:(0,y.jsx)(F,{scope:t,open:n,onOpenChange:g,content:u,onContentChange:c,children:(0,y.jsx)(eh,{scope:t,contentId:(0,p.useId)(),triggerId:(0,p.useId)(),trigger:s,onTriggerChange:d,children:o})})})};ey.displayName=ev;var e_="MenuSubTrigger",eC=r.forwardRef((e,n)=>{let a=A(e_,e.__scopeMenu),i=N(e_,e.__scopeMenu),l=ew(e_,e.__scopeMenu),s=X(e_,e.__scopeMenu),d=r.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:c}=s,p={__scopeMenu:e.__scopeMenu},f=r.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return r.useEffect(()=>f,[f]),r.useEffect(()=>{let e=u.current;return()=>{window.clearTimeout(e),c(null)}},[u,c]),(0,y.jsx)(L,{asChild:!0,...p,children:(0,y.jsx)(en,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":l.contentId,"data-state":ej(a.open),...e,ref:(0,o.composeRefs)(n,l.onTriggerChange),onClick:r=>{e.onClick?.(r),e.disabled||r.defaultPrevented||(r.currentTarget.focus(),a.open||a.onOpenChange(!0))},onPointerMove:(0,t.composeEventHandlers)(e.onPointerMove,eM(r=>{s.onItemEnter(r),!r.defaultPrevented&&(e.disabled||a.open||d.current||(s.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{a.onOpenChange(!0),f()},100)))})),onPointerLeave:(0,t.composeEventHandlers)(e.onPointerLeave,eM(e=>{f();let r=a.content?.getBoundingClientRect();if(r){let t=a.content?.dataset.side,o="right"===t,n=r[o?"left":"right"],i=r[o?"right":"left"];s.onPointerGraceIntentChange({area:[{x:e.clientX+(o?-5:5),y:e.clientY},{x:n,y:r.top},{x:i,y:r.top},{x:i,y:r.bottom},{x:n,y:r.bottom}],side:t}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>s.onPointerGraceIntentChange(null),300)}else{if(s.onTriggerLeave(e),e.defaultPrevented)return;s.onPointerGraceIntentChange(null)}})),onKeyDown:(0,t.composeEventHandlers)(e.onKeyDown,r=>{let t=""!==s.searchRef.current;e.disabled||t&&" "===r.key||k[i.dir].includes(r.key)&&(a.onOpenChange(!0),a.content?.focus(),r.preventDefault())})})})});eC.displayName=e_;var eR="MenuSubContent",ek=r.forwardRef((e,n)=>{let a=G(B,e.__scopeMenu),{forceMount:i=a.forceMount,...l}=e,s=A(B,e.__scopeMenu),d=N(B,e.__scopeMenu),u=ew(eR,e.__scopeMenu),c=r.useRef(null),p=(0,o.useComposedRefs)(n,c);return(0,y.jsx)(E.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(b.Presence,{present:i||s.open,children:(0,y.jsx)(E.Slot,{scope:e.__scopeMenu,children:(0,y.jsx)(Z,{id:u.contentId,"aria-labelledby":u.triggerId,...l,ref:p,align:"start",side:"rtl"===d.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{d.isUsingKeyboardRef.current&&c.current?.focus(),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,t.composeEventHandlers)(e.onFocusOutside,e=>{e.target!==u.trigger&&s.onOpenChange(!1)}),onEscapeKeyDown:(0,t.composeEventHandlers)(e.onEscapeKeyDown,e=>{d.onClose(),e.preventDefault()}),onKeyDown:(0,t.composeEventHandlers)(e.onKeyDown,e=>{let r=e.currentTarget.contains(e.target),t=j[d.dir].includes(e.key);r&&t&&(s.onOpenChange(!1),u.trigger?.focus(),e.preventDefault())})})})})})});function ej(e){return e?"open":"closed"}function ez(e){return"indeterminate"===e}function eE(e){return ez(e)?"indeterminate":e?"checked":"unchecked"}function eM(e){return r=>"mouse"===r.pointerType?e(r):void 0}ek.displayName=eR,e.s(["Anchor",()=>L,"Arrow",()=>ex,"CheckboxItem",()=>ea,"Content",()=>q,"Group",()=>Q,"Item",()=>eo,"ItemIndicator",()=>eb,"Label",()=>ee,"Portal",()=>U,"RadioGroup",()=>ed,"RadioItem",()=>ec,"Root",()=>H,"Separator",()=>em,"Sub",()=>ey,"SubContent",()=>ek,"SubTrigger",()=>eC,"createMenuScope",()=>S],126490);var eD="DropdownMenu",[eI,eS]=(0,n.createContextScope)(eD,[S]),eP=S(),[eT,eF]=eI(eD),eA=e=>{let{__scopeDropdownMenu:t,children:o,dir:n,open:i,defaultOpen:l,onOpenChange:s,modal:d=!0}=e,u=eP(t),c=r.useRef(null),[f,g]=(0,a.useControllableState)({prop:i,defaultProp:l??!1,onChange:s,caller:eD});return(0,y.jsx)(eT,{scope:t,triggerId:(0,p.useId)(),triggerRef:c,contentId:(0,p.useId)(),open:f,onOpenChange:g,onOpenToggle:r.useCallback(()=>g(e=>!e),[g]),modal:d,children:(0,y.jsx)(H,{...u,open:f,onOpenChange:g,dir:n,modal:d,children:o})})};eA.displayName=eD;var eO="DropdownMenuTrigger",eN=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:n,disabled:a=!1,...l}=e,s=eF(eO,n),d=eP(n);return(0,y.jsx)(L,{asChild:!0,...d,children:(0,y.jsx)(i.Primitive.button,{type:"button",id:s.triggerId,"aria-haspopup":"menu","aria-expanded":s.open,"aria-controls":s.open?s.contentId:void 0,"data-state":s.open?"open":"closed","data-disabled":a?"":void 0,disabled:a,...l,ref:(0,o.composeRefs)(r,s.triggerRef),onPointerDown:(0,t.composeEventHandlers)(e.onPointerDown,e=>{!a&&0===e.button&&!1===e.ctrlKey&&(s.onOpenToggle(),s.open||e.preventDefault())}),onKeyDown:(0,t.composeEventHandlers)(e.onKeyDown,e=>{!a&&(["Enter"," "].includes(e.key)&&s.onOpenToggle(),"ArrowDown"===e.key&&s.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});eN.displayName=eO;var eH=e=>{let{__scopeDropdownMenu:r,...t}=e,o=eP(r);return(0,y.jsx)(U,{...o,...t})};eH.displayName="DropdownMenuPortal";var eL="DropdownMenuContent",eK=r.forwardRef((e,o)=>{let{__scopeDropdownMenu:n,...a}=e,i=eF(eL,n),l=eP(n),s=r.useRef(!1);return(0,y.jsx)(q,{id:i.contentId,"aria-labelledby":i.triggerId,...l,...a,ref:o,onCloseAutoFocus:(0,t.composeEventHandlers)(e.onCloseAutoFocus,e=>{s.current||i.triggerRef.current?.focus(),s.current=!1,e.preventDefault()}),onInteractOutside:(0,t.composeEventHandlers)(e.onInteractOutside,e=>{let r=e.detail.originalEvent,t=0===r.button&&!0===r.ctrlKey,o=2===r.button||t;(!i.modal||o)&&(s.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});eK.displayName=eL;var e$=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(Q,{...n,...o,ref:r})});e$.displayName="DropdownMenuGroup";var eG=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ee,{...n,...o,ref:r})});eG.displayName="DropdownMenuLabel";var eU=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(eo,{...n,...o,ref:r})});eU.displayName="DropdownMenuItem";var eB=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ea,{...n,...o,ref:r})});eB.displayName="DropdownMenuCheckboxItem";var eV=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ed,{...n,...o,ref:r})});eV.displayName="DropdownMenuRadioGroup";var eX=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ec,{...n,...o,ref:r})});eX.displayName="DropdownMenuRadioItem";var eq=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(eb,{...n,...o,ref:r})});eq.displayName="DropdownMenuItemIndicator";var eJ=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(em,{...n,...o,ref:r})});eJ.displayName="DropdownMenuSeparator",r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ex,{...n,...o,ref:r})}).displayName="DropdownMenuArrow";var eY=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(eC,{...n,...o,ref:r})});eY.displayName="DropdownMenuSubTrigger";var eW=r.forwardRef((e,r)=>{let{__scopeDropdownMenu:t,...o}=e,n=eP(t);return(0,y.jsx)(ek,{...n,...o,ref:r,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});eW.displayName="DropdownMenuSubContent";var eZ=e=>{let{__scopeDropdownMenu:r,children:t,open:o,onOpenChange:n,defaultOpen:i}=e,l=eP(r),[s,d]=(0,a.useControllableState)({prop:o,defaultProp:i??!1,onChange:n,caller:"DropdownMenuSub"});return(0,y.jsx)(ey,{...l,open:s,onOpenChange:d,children:t})};e.s(["CheckboxItem",()=>eB,"Content",()=>eK,"Group",()=>e$,"Item",()=>eU,"ItemIndicator",()=>eq,"Label",()=>eG,"Portal",()=>eH,"RadioGroup",()=>eV,"RadioItem",()=>eX,"Root",()=>eA,"Separator",()=>eJ,"Sub",()=>eZ,"SubContent",()=>eW,"SubTrigger",()=>eY,"Trigger",()=>eN],172650)}]);

//# debugId=65175f60-23f3-f69c-52be-295065f012b1
//# sourceMappingURL=7a4db6d631aac9d8.js.map