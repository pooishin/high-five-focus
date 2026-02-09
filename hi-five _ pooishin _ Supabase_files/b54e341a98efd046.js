;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="2ce83819-75fe-18b8-4db1-5b36e85314c8")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,323203,e=>{"use strict";e.i(240788);var t=e.i(234745);function s(e){switch(e){case"1m":case"5m":case"10m":case"30m":return"minute";case"1h":default:return"hour";case"1d":return"day"}}async function a(e,s,a,r){let{data:n,error:o}=await (0,t.get)("/platform/projects/{ref}/analytics/endpoints/logs.all",{params:{path:{ref:e},query:{sql:s,iso_timestamp_start:a,iso_timestamp_end:r}}});if(o)throw o;return n}e.s(["REPORT_STATUS_CODE_COLORS",0,{400:{light:"#FFD54F",dark:"#FFF176"},401:{light:"#FF8A65",dark:"#FFAB91"},403:{light:"#FFB74D",dark:"#FFCC80"},404:{light:"#90A4AE",dark:"#B0BEC5"},409:{light:"#BA68C8",dark:"#CE93D8"},410:{light:"#A1887F",dark:"#BCAAA4"},422:{light:"#FF9800",dark:"#FFB74D"},429:{light:"#E65100",dark:"#F57C00"},500:{light:"#B71C1C",dark:"#D32F2F"},502:{light:"#9575CD",dark:"#B39DDB"},503:{light:"#0097A7",dark:"#4DD0E1"},504:{light:"#C0CA33",dark:"#D4E157"},default:{light:"#757575",dark:"#9E9E9E"}},"analyticsIntervalToGranularity",()=>s,"fetchLogs",()=>a])},156442,e=>{"use strict";var t=e.i(820308),s=e.i(460988),a=e.i(55956),r=e.i(25123),n=e.i(533488),o=e.i(389959);let i=e=>(0,n.createParser)({parse:t=>t??e,serialize:e=>e||""});function l(e,t,s,a){return(0,o.useCallback)(async()=>{if(e.isHelper&&e.text){let a=t.find(t=>t.text===e.text);a&&s({from:a.calcFrom(),to:a.calcTo(),isHelper:!0,text:a.text})}await a()},[e,t,s,a])}e.s(["useRefreshHandler",()=>l,"useReportDateRange",0,(e=t.REPORT_DATERANGE_HELPER_LABELS.LAST_60_MINUTES,l=!1)=>{let{plan:_,isLoading:u}=(0,r.useCurrentOrgPlan)(),[c,d]=(0,o.useState)(!1),E=(0,o.useMemo)(()=>t.REPORTS_DATEPICKER_HELPERS.map(e=>({...e,disabled:!1})),[]),[m,S]=(0,n.useQueryState)("its",i("")),[R,h]=(0,n.useQueryState)("ite",i("")),[p,A]=(0,n.useQueryState)("isHelper",(0,n.createParser)({parse:e=>"true"===e,serialize:e=>String(e)})),[T,f]=(0,n.useQueryState)("helperText",i("")),g=(0,o.useCallback)(()=>{let s;if("string"==typeof e?s=t.REPORTS_DATEPICKER_HELPERS.find(t=>t.text===e):e&&"object"==typeof e&&"text"in e&&(s=e),s&&s.availableIn?.includes(_?.id||"free"))return{start:s.calcFrom(),end:s.calcTo(),helper:{isHelper:!0,text:s.text}};let r=t.REPORTS_DATEPICKER_HELPERS.find(e=>e.default&&e.availableIn?.includes(_?.id||"free"));if(r)return{start:r.calcFrom(),end:r.calcTo(),helper:{isHelper:!0,text:r.text}};let n=t.REPORTS_DATEPICKER_HELPERS.find(e=>e.availableIn?.includes(_?.id||"free"));return n?{start:n.calcFrom(),end:n.calcTo(),helper:{isHelper:!0,text:n.text}}:{start:(0,a.default)().subtract(1,"hour").toISOString(),end:(0,a.default)().toISOString(),helper:{isHelper:!1}}},[e,_?.id]),N=(0,o.useMemo)(()=>{if(m){let e=(0,a.default)(m),t=(0,a.default)();if(e.isValid()&&e.isAfter(t.subtract(90,"day"))&&e.isBefore(t.add(1,"day")))return m}return g().start},[m,g]),O=(0,o.useMemo)(()=>{if(R){let e=(0,a.default)(R),t=(0,a.default)();if(e.isValid()&&e.isAfter(t.subtract(90,"day"))&&e.isBefore(t.add(1,"day")))return R}return g().end},[R,g]),I=(0,o.useMemo)(()=>m&&R?!!p:g().helper.isHelper,[m,R,p,g]),C=(0,o.useMemo)(()=>m&&R?T||void 0:g().helper.text,[m,R,T,g]),y=(0,o.useMemo)(()=>({period_start:{date:N,time_period:"1d"},period_end:{date:O,time_period:"today"},interval:((e,t)=>{let s=(0,a.default)(t).diff(e,"day",!0),r=(0,a.default)(t).diff(e,"hour",!0);if(l)return r<=1?"1m":r<=12?"2m":r<=24?"10m":s<=7?"1h":"1d";let n={"1m":r<1.1,"5m":r<3.1,"10m":r<6.1,"30m":r<25};switch(!0){case n["1m"]:return"1m";case n["5m"]:return"5m";case n["10m"]:return"10m";case n["30m"]:return"30m";default:return"1h"}})(N,O)}),[N,O,l]),b=(0,o.useCallback)((e,t)=>{S(e),h(t),A(!1),f("")},[S,h,A,f]),L=(0,o.useCallback)(e=>{S(e.period_start.date),h(e.period_end.date),A(!1),f("")},[S,h,A,f]);return{selectedDateRange:y,setSelectedDateRange:L,updateDateRange:b,datePickerValue:(0,o.useMemo)(()=>({from:N,to:O,isHelper:I,text:C}),[N,O,I,C]),datePickerHelpers:E,isOrgPlanLoading:u,orgPlan:_,showUpgradePrompt:c,setShowUpgradePrompt:d,handleDatePickerChange:e=>(0,s.maybeShowUpgradePrompt)(e.from,_?.id)?(d(!0),!0):(e.from&&e.to&&(S(e.from),h(e.to),A(e.isHelper||!1),f(e.text||"")),!1)}}])},554344,e=>{"use strict";var t=e.i(55956),s=e.i(460988),a=e.i(323203),r=e.i(749199),n=e.i(924529),o={"1xx":"Informational","1xx_NAME":"INFORMATIONAL","1xx_MESSAGE":"Indicates an interim response for communicating connection status or request progress prior to completing the requested action and sending a final response.",INFORMATIONAL:"1xx","2xx":"Successful","2xx_NAME":"SUCCESSFUL","2xx_MESSAGE":"Indicates that the client's request was successfully received, understood, and accepted.",SUCCESSFUL:"2xx","3xx":"Redirection","3xx_NAME":"REDIRECTION","3xx_MESSAGE":"Indicates that further action needs to be taken by the user agent in order to fulfill the request.",REDIRECTION:"3xx","4xx":"Client Error","4xx_NAME":"CLIENT_ERROR","4xx_MESSAGE":"Indicates that the client seems to have erred.",CLIENT_ERROR:"4xx","5xx":"Server Error","5xx_NAME":"SERVER_ERROR","5xx_MESSAGE":"Indicates that the server is aware that it has erred or is incapable of performing the requested method.",SERVER_ERROR:"5xx"},i={classes:o,100:"Continue","100_NAME":"CONTINUE","100_MESSAGE":"The server has received the request headers and the client should proceed to send the request body.","100_CLASS":o.INFORMATIONAL,CONTINUE:100,101:"Switching Protocols","101_NAME":"SWITCHING_PROTOCOLS","101_MESSAGE":"The requester has asked the server to switch protocols and the server has agreed to do so.","101_CLASS":o.INFORMATIONAL,SWITCHING_PROTOCOLS:101,102:"Processing","102_NAME":"PROCESSING","102_MESSAGE":"A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet.[7] This prevents the client from timing out and assuming the request was lost.","102_CLASS":o.INFORMATIONAL,PROCESSING:102,103:"Early Hints","103_NAME":"EARLY_HINTS","103_MESSAGE":"Used to return some response headers before final HTTP message.","103_CLASS":o.INFORMATIONAL,EARLY_HINTS:103,200:"OK","200_NAME":"OK","200_MESSAGE":"Standard response for successful HTTP requests.","200_CLASS":o.SUCCESSFUL,OK:200,201:"Created","201_NAME":"CREATED","201_MESSAGE":"The request has been fulfilled, resulting in the creation of a new resource.","201_CLASS":o.SUCCESSFUL,CREATED:201,202:"Accepted","202_NAME":"ACCEPTED","202_MESSAGE":"The request has been accepted for processing, but the processing has not been completed.","202_CLASS":o.SUCCESSFUL,ACCEPTED:202,203:"Non-Authoritative Information","203_NAME":"NON_AUTHORITATIVE_INFORMATION","203_MESSAGE":"The server is a transforming proxy (e.g. a Web accelerator) that received a 200 OK from its origin, but is returning a modified version of the origin's response.","203_CLASS":o.SUCCESSFUL,NON_AUTHORITATIVE_INFORMATION:203,204:"No Content","204_NAME":"NO_CONTENT","204_MESSAGE":"The server successfully processed the request and is not returning any content.","204_CLASS":o.SUCCESSFUL,NO_CONTENT:204,205:"Reset Content","205_NAME":"RESET_CONTENT","205_MESSAGE":"The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.","205_CLASS":o.SUCCESSFUL,RESET_CONTENT:205,206:"Partial Content","206_NAME":"PARTIAL_CONTENT","206_MESSAGE":"The server is delivering only part of the resource (byte serving) due to a range header sent by the client.","206_CLASS":o.SUCCESSFUL,PARTIAL_CONTENT:206,207:"Multi Status","207_NAME":"MULTI_STATUS","207_MESSAGE":"The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.","207_CLASS":o.SUCCESSFUL,MULTI_STATUS:207,208:"Already Reported","208_NAME":"ALREADY_REPORTED","208_MESSAGE":"The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.","208_CLASS":o.SUCCESSFUL,ALREADY_REPORTED:208,226:"IM Used","226_NAME":"IM_USED","226_MESSAGE":"The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.","226_CLASS":o.SUCCESSFUL,IM_USED:226,300:"Multiple Choices","300_NAME":"MULTIPLE_CHOICES","300_MESSAGE":"Indicates multiple options for the resource from which the client may choose.","300_CLASS":o.REDIRECTION,MULTIPLE_CHOICES:300,301:"Moved Permanently","301_NAME":"MOVED_PERMANENTLY","301_MESSAGE":"This and all future requests should be directed to the given URI.","301_CLASS":o.REDIRECTION,MOVED_PERMANENTLY:301,302:"Found","302_NAME":"FOUND","302_MESSAGE":'This is an example of industry practice contradicting the standard. The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302 with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the two behaviours.',"302_CLASS":o.REDIRECTION,FOUND:302,303:"See Other","303_NAME":"SEE_OTHER","303_MESSAGE":"The response to the request can be found under another URI using the GET method.","303_CLASS":o.REDIRECTION,SEE_OTHER:303,304:"Not Modified","304_NAME":"NOT_MODIFIED","304_MESSAGE":"Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.","304_CLASS":o.REDIRECTION,NOT_MODIFIED:304,305:"Use Proxy","305_NAME":"USE_PROXY","305_MESSAGE":"The requested resource is available only through a proxy, the address for which is provided in the response.","305_CLASS":o.REDIRECTION,USE_PROXY:305,306:"Switch Proxy","306_NAME":"SWITCH_PROXY","306_MESSAGE":'No longer used. Originally meant "Subsequent requests should use the specified proxy.',"306_CLASS":o.REDIRECTION,SWITCH_PROXY:306,307:"Temporary Redirect","307_NAME":"TEMPORARY_REDIRECT","307_MESSAGE":"In this case, the request should be repeated with another URI; however, future requests should still use the original URI.","307_CLASS":o.REDIRECTION,TEMPORARY_REDIRECT:307,308:"Permanent Redirect","308_NAME":"PERMANENT_REDIRECT","308_MESSAGE":"The request and all future requests should be repeated using another URI.","308_CLASS":o.REDIRECTION,PERMANENT_REDIRECT:308,400:"Bad Request","400_NAME":"BAD_REQUEST","400_MESSAGE":"The server cannot or will not process the request due to an apparent client error.","400_CLASS":o.CLIENT_ERROR,BAD_REQUEST:400,401:"Unauthorized","401_NAME":"UNAUTHORIZED","401_MESSAGE":"Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.","401_CLASS":o.CLIENT_ERROR,UNAUTHORIZED:401,402:"Payment Required","402_NAME":"PAYMENT_REQUIRED","402_MESSAGE":"Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme, as proposed for example by GNU Taler, but that has not yet happened, and this code is not usually used.","402_CLASS":o.CLIENT_ERROR,PAYMENT_REQUIRED:402,403:"Forbidden","403_NAME":"FORBIDDEN","403_MESSAGE":"The request was valid, but the server is refusing action.","403_CLASS":o.CLIENT_ERROR,FORBIDDEN:403,404:"Not Found","404_NAME":"NOT_FOUND","404_MESSAGE":"The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.","404_CLASS":o.CLIENT_ERROR,NOT_FOUND:404,405:"Method Not Allowed","405_NAME":"METHOD_NOT_ALLOWED","405_MESSAGE":"A request method is not supported for the requested resource.","405_CLASS":o.CLIENT_ERROR,METHOD_NOT_ALLOWED:405,406:"Not Acceptable","406_NAME":"NOT_ACCEPTABLE","406_MESSAGE":"The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.","406_CLASS":o.CLIENT_ERROR,NOT_ACCEPTABLE:406,407:"Proxy Authentication Required","407_NAME":"PROXY_AUTHENTICATION_REQUIRED","407_MESSAGE":"The client must first authenticate itself with the proxy.","407_CLASS":o.CLIENT_ERROR,PROXY_AUTHENTICATION_REQUIRED:407,408:"Request Time-out","408_NAME":"REQUEST_TIMEOUT","408_MESSAGE":"The server timed out waiting for the request.","408_CLASS":o.CLIENT_ERROR,REQUEST_TIMEOUT:408,409:"Conflict","409_NAME":"CONFLICT","409_MESSAGE":"Indicates that the request could not be processed because of conflict in the request, such as an edit conflict between multiple simultaneous updates.","409_CLASS":o.CLIENT_ERROR,CONFLICT:409,410:"Gone","410_NAME":"GONE","410_MESSAGE":"Indicates that the resource requested is no longer available and will not be available again.","410_CLASS":o.CLIENT_ERROR,GONE:410,411:"Length Required","411_NAME":"LENGTH_REQUIRED","411_MESSAGE":"The request did not specify the length of its content, which is required by the requested resource.","411_CLASS":o.CLIENT_ERROR,LENGTH_REQUIRED:411,412:"Precondition Failed","412_NAME":"PRECONDITION_FAILED","412_MESSAGE":"The server does not meet one of the preconditions that the requester put on the request.","412_CLASS":o.CLIENT_ERROR,PRECONDITION_FAILED:412,413:"Request Entity Too Large","413_NAME":"REQUEST_ENTITY_TOO_LARGE","413_MESSAGE":'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".',"413_CLASS":o.CLIENT_ERROR,REQUEST_ENTITY_TOO_LARGE:413,414:"Request-URI Too Large","414_NAME":"REQUEST_URI_TOO_LONG","414_MESSAGE":"The URI provided was too long for the server to process.","414_CLASS":o.CLIENT_ERROR,REQUEST_URI_TOO_LONG:414,415:"Unsupported Media Type","415_NAME":"UNSUPPORTED_MEDIA_TYPE","415_MESSAGE":"The request entity has a media type which the server or resource does not support.","415_CLASS":o.CLIENT_ERROR,UNSUPPORTED_MEDIA_TYPE:415,416:"Requested Range not Satisfiable","416_NAME":"REQUESTED_RANGE_NOT_SATISFIABLE","416_MESSAGE":"The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.","416_CLASS":o.CLIENT_ERROR,REQUESTED_RANGE_NOT_SATISFIABLE:416,417:"Expectation Failed","417_NAME":"EXPECTATION_FAILED","417_MESSAGE":"The server cannot meet the requirements of the Expect request-header field.","417_CLASS":o.CLIENT_ERROR,EXPECTATION_FAILED:417,418:"I'm a teapot","418_NAME":"IM_A_TEAPOT","418_MESSAGE":'Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout.',"418_CLASS":o.CLIENT_ERROR,IM_A_TEAPOT:418,421:"Misdirected Request","421_NAME":"MISDIRECTED_REQUEST","421_MESSAGE":"The request was directed at a server that is not able to produce a response.","421_CLASS":o.CLIENT_ERROR,MISDIRECTED_REQUEST:421,422:"Unprocessable Entity","422_NAME":"UNPROCESSABLE_ENTITY","422_MESSAGE":"The request was well-formed but was unable to be followed due to semantic errors.","422_CLASS":o.CLIENT_ERROR,UNPROCESSABLE_ENTITY:422,423:"Locked","423_NAME":"LOCKED","423_MESSAGE":"The resource that is being accessed is locked.","423_CLASS":o.CLIENT_ERROR,LOCKED:423,424:"Failed Dependency","424_NAME":"FAILED_DEPENDENCY","424_MESSAGE":"The request failed because it depended on another request and that request failed.","424_CLASS":o.CLIENT_ERROR,FAILED_DEPENDENCY:424,425:"Too Early","425_NAME":"TOO_EARLY","425_MESSAGE":"The server is unwilling to risk processing a request that might be replayed.","425_CLASS":o.CLIENT_ERROR,TOO_EARLY:425,426:"Upgrade Required","426_NAME":"UPGRADE_REQUIRED","426_MESSAGE":"The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.","426_CLASS":o.CLIENT_ERROR,UPGRADE_REQUIRED:426,428:"Precondition Required","428_NAME":"PRECONDITION_REQUIRED","428_MESSAGE":"The origin server requires the request to be conditional.","428_CLASS":o.CLIENT_ERROR,PRECONDITION_REQUIRED:428,429:"Too Many Requests","429_NAME":"TOO_MANY_REQUESTS","429_MESSAGE":"The user has sent too many requests in a given amount of time.","429_CLASS":o.CLIENT_ERROR,TOO_MANY_REQUESTS:429,431:"Request Header Fields Too Large","431_NAME":"REQUEST_HEADER_FIELDS_TOO_LARGE","431_MESSAGE":"The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.","431_CLASS":o.CLIENT_ERROR,REQUEST_HEADER_FIELDS_TOO_LARGE:431,451:"Unavailable For Legal Reasons","451_NAME":"UNAVAILABLE_FOR_LEGAL_REASONS","451_MESSAGE":"A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.","451_CLASS":o.CLIENT_ERROR,UNAVAILABLE_FOR_LEGAL_REASONS:451,500:"Internal Server Error","500_NAME":"INTERNAL_SERVER_ERROR","500_MESSAGE":"A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.","500_CLASS":o.SERVER_ERROR,INTERNAL_SERVER_ERROR:500,501:"Not Implemented","501_NAME":"NOT_IMPLEMENTED","501_MESSAGE":"The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability.","501_CLASS":o.SERVER_ERROR,NOT_IMPLEMENTED:501,502:"Bad Gateway","502_NAME":"BAD_GATEWAY","502_MESSAGE":"The server was acting as a gateway or proxy and received an invalid response from the upstream server.","502_CLASS":o.SERVER_ERROR,BAD_GATEWAY:502,503:"Service Unavailable","503_NAME":"SERVICE_UNAVAILABLE","503_MESSAGE":"The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.","503_CLASS":o.SERVER_ERROR,SERVICE_UNAVAILABLE:503,504:"Gateway Time-out","504_NAME":"GATEWAY_TIMEOUT","504_MESSAGE":"The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.","504_CLASS":o.SERVER_ERROR,GATEWAY_TIMEOUT:504,505:"HTTP Version not Supported","505_NAME":"HTTP_VERSION_NOT_SUPPORTED","505_MESSAGE":"The server does not support the HTTP protocol version used in the request.","505_CLASS":o.SERVER_ERROR,HTTP_VERSION_NOT_SUPPORTED:505,506:"Variant Also Negotiates","506_NAME":"VARIANT_ALSO_NEGOTIATES","506_MESSAGE":"Transparent content negotiation for the request results in a circular reference.","506_CLASS":o.SERVER_ERROR,VARIANT_ALSO_NEGOTIATES:506,507:"Insufficient Storage","507_NAME":"INSUFFICIENT_STORAGE","507_MESSAGE":"The server is unable to store the representation needed to complete the request.","507_CLASS":o.SERVER_ERROR,INSUFFICIENT_STORAGE:507,508:"Loop Detected","508_NAME":"LOOP_DETECTED","508_MESSAGE":"The server detected an infinite loop while processing the request.","508_CLASS":o.SERVER_ERROR,LOOP_DETECTED:508,510:"Not Extended","510_NAME":"NOT_EXTENDED","510_MESSAGE":"Further extensions to the request are required for the server to fulfil it.","510_CLASS":o.SERVER_ERROR,NOT_EXTENDED:510,511:"Network Authentication Required","511_NAME":"NETWORK_AUTHENTICATION_REQUIRED","511_MESSAGE":"The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network.","511_CLASS":o.SERVER_ERROR,NETWORK_AUTHENTICATION_REQUIRED:511,extra:{unofficial:{103:"Checkpoint","103_NAME":"CHECKPOINT","103_MESSAGE":"Used in the resumable requests proposal to resume aborted PUT or POST requests.","103_CLASS":o.INFORMATIONAL,CHECKPOINT:103,419:"Page Expired","419_NAME":"PAGE_EXPIRED","419_MESSAGE":"Used by the Laravel Framework when a CSRF Token is missing or expired.","419_CLASS":o.CLIENT_ERROR,PAGE_EXPIRED:419,218:"This is fine","218_NAME":"THIS_IS_FINE","218_MESSAGE":"Used as a catch-all error condition for allowing response bodies to flow through Apache when ProxyErrorOverride is enabled. When ProxyErrorOverride is enabled in Apache, response bodies that contain a status code of 4xx or 5xx are automatically discarded by Apache in favor of a generic response or a custom response specified by the ErrorDocument directive.","218_CLASS":o.SUCCESSFUL,THIS_IS_FINE:218,420:"Enhance Your Calm","420_NAME":"ENHANCE_YOUR_CALM","420_MESSAGE":"Returned by version 1 of the Twitter Search and Trends API when the client is being rate limited; versions 1.1 and later use the 429 Too Many Requests response code instead.","420_CLASS":o.CLIENT_ERROR,ENHANCE_YOUR_CALM:420,450:"Blocked by Windows Parental Controls","450_NAME":"BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS","450_MESSAGE":"The Microsoft extension code indicated when Windows Parental Controls are turned on and are blocking access to the requested webpage.","450_CLASS":o.CLIENT_ERROR,BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS:450,498:"Invalid Token","498_NAME":"INVALID_TOKEN","498_MESSAGE":"Returned by ArcGIS for Server. Code 498 indicates an expired or otherwise invalid token.","498_CLASS":o.CLIENT_ERROR,INVALID_TOKEN:498,499:"Token Required","499_NAME":"TOKEN_REQUIRED","499_MESSAGE":"Returned by ArcGIS for Server. Code 499 indicates that a token is required but was not submitted.","499_CLASS":o.CLIENT_ERROR,TOKEN_REQUIRED:499,509:"Bandwidth Limit Exceeded","509_NAME":"BANDWIDTH_LIMIT_EXCEEDED","509_MESSAGE":"The server has exceeded the bandwidth specified by the server administrator.","509_CLASS":o.SERVER_ERROR,BANDWIDTH_LIMIT_EXCEEDED:509,530:"Site is frozen","530_NAME":"SITE_IS_FROZEN","530_MESSAGE":"Used by the Pantheon web platform to indicate a site that has been frozen due to inactivity.","530_CLASS":o.SERVER_ERROR,SITE_IS_FROZEN:530,598:"Network read timeout error","598_NAME":"NETWORK_READ_TIMEOUT_ERROR","598_MESSAGE":"Used by some HTTP proxies to signal a network read timeout behind the proxy to a client in front of the proxy.","598_CLASS":o.SERVER_ERROR,NETWORK_READ_TIMEOUT_ERROR:598},iis:{440:"Login Time-out","440_NAME":"LOGIN_TIME_OUT","440_MESSAGE":"The client's session has expired and must log in again.","440_CLASS":o.CLIENT_ERROR,LOGIN_TIME_OUT:440,449:"Retry With","449_NAME":"RETRY_WITH","449_MESSAGE":"The server cannot honour the request because the user has not provided the required information.","449_CLASS":o.CLIENT_ERROR,RETRY_WITH:449,451:"Redirect","451_NAME":"REDIRECT","451_MESSAGE":"Used in Exchange ActiveSync when either a more efficient server is available or the server cannot access the users' mailbox.","451_CLASS":o.CLIENT_ERROR,REDIRECT:451},nginx:{444:"No Response","444_NAME":"NO_RESPONSE","444_MESSAGE":"Used internally to instruct the server to return no information to the client and close the connection immediately.","444_CLASS":o.CLIENT_ERROR,NO_RESPONSE:444,494:"Request header too large","494_NAME":"REQUEST_HEADER_TOO_LARGE","494_MESSAGE":"Client sent too large request or too long header line.","494_CLASS":o.CLIENT_ERROR,REQUEST_HEADER_TOO_LARGE:494,495:"SSL Certificate Error","495_NAME":"SSL_CERTIFICATE_ERROR","495_MESSAGE":"An expansion of the 400 Bad Request response code, used when the client has provided an invalid client certificate.","495_CLASS":o.CLIENT_ERROR,SSL_CERTIFICATE_ERROR:495,496:"SSL Certificate Required","496_NAME":"SSL_CERTIFICATE_REQUIRED","496_MESSAGE":"An expansion of the 400 Bad Request response code, used when a client certificate is required but not provided.","496_CLASS":o.CLIENT_ERROR,SSL_CERTIFICATE_REQUIRED:496,497:"HTTP Request Sent to HTTPS Port","497_NAME":"HTTP_REQUEST_SENT_TO_HTTPS_PORT","497_MESSAGE":"An expansion of the 400 Bad Request response code, used when the client has made a HTTP request to a port listening for HTTPS requests.","497_CLASS":o.CLIENT_ERROR,HTTP_REQUEST_SENT_TO_HTTPS_PORT:497,499:"Client Closed Request","499_NAME":"CLIENT_CLOSED_REQUEST","499_MESSAGE":"Used when the client has closed the request before the server could send a response.","499_CLASS":o.CLIENT_ERROR,CLIENT_CLOSED_REQUEST:499},cloudflare:{520:"Unknown Error","520_NAME":"UNKNOWN_ERROR","520_MESSAGE":'The 520 error is used as a "catch-all response for when the origin server returns something unexpected", listing connection resets, large headers, and empty or invalid responses as common triggers.',"520_CLASS":o.SERVER_ERROR,UNKNOWN_ERROR:520,521:"Web Server Is Down","521_NAME":"WEB_SERVER_IS_DOWN","521_MESSAGE":"The origin server has refused the connection from Cloudflare.","521_CLASS":o.SERVER_ERROR,WEB_SERVER_IS_DOWN:521,522:"Connection Timed Out","522_NAME":"CONNECTION_TIMED_OUT","522_MESSAGE":"Cloudflare could not negotiate a TCP handshake with the origin server.","522_CLASS":o.SERVER_ERROR,CONNECTION_TIMED_OUT:522,523:"Origin Is Unreachable","523_NAME":"ORIGIN_IS_UNREACHABLE","523_MESSAGE":"Cloudflare could not reach the origin server.","523_CLASS":o.SERVER_ERROR,ORIGIN_IS_UNREACHABLE:523,524:"A Timeout Occurred","524_NAME":"A_TIMEOUT_OCCURRED","524_MESSAGE":"Cloudflare was able to complete a TCP connection to the origin server, but did not receive a timely HTTP response.","524_CLASS":o.SERVER_ERROR,A_TIMEOUT_OCCURRED:524,525:"SSL Handshake Failed","525_NAME":"SSL_HANDSHAKE_FAILED","525_MESSAGE":"Cloudflare could not negotiate a SSL/TLS handshake with the origin server.","525_CLASS":o.SERVER_ERROR,SSL_HANDSHAKE_FAILED:525,526:"Invalid SSL Certificate","526_NAME":"INVALID_SSL_CERTIFICATE","526_MESSAGE":"Cloudflare could not validate the SSL/TLS certificate that the origin server presented.","526_CLASS":o.SERVER_ERROR,INVALID_SSL_CERTIFICATE:526,527:"Railgun Error","527_NAME":"RAILGUN_ERROR","527_MESSAGE":"Error 527 indicates that the request timed out or failed after the WAN connection had been established.","527_CLASS":o.SERVER_ERROR,RAILGUN_ERROR:527}}};function l(e){let t=new Set;return e.forEach(e=>{void 0!==e.status_code&&null!==e.status_code&&t.add(String(e.status_code))}),Array.from(t).sort()}function _(e){return e.map(e=>({attribute:e,label:`${e} ${function(e){if(!(e in i))return{code:e,name:"UNKNOWN",message:"Unknown status code",label:"Unknown"};let t=i[e],s=i[`${e}_MESSAGE`],a=i[`${e}_NAME`];return{code:e,name:a,label:t,message:s}}(parseInt(e,10)).label}`,color:a.REPORT_STATUS_CODE_COLORS[e]||a.REPORT_STATUS_CODE_COLORS.default}))}function u(e,a){return Object.values(e.reduce((e,r)=>{let n=(0,s.isUnixMicro)(r.timestamp)?(0,s.unixMicroToIsoTimestamp)(r.timestamp):t.default.utc(r.timestamp).toISOString();e[n]||(e[n]={timestamp:n},a.forEach(t=>{e[n][t]=0}));let o=String(r.status_code);return o in e[n]&&(e[n][o]=r.count),e},{}))}function c(e,a,r){return Object.values(e.reduce((e,n)=>{let o=(0,s.isUnixMicro)(n.timestamp)?(0,s.unixMicroToIsoTimestamp)(n.timestamp):t.default.utc(n.timestamp).toISOString();e[o]||(e[o]={timestamp:o},r.forEach(t=>{e[o][t]=0}));let i=String(n[a]);return i in e[o]&&(e[o][i]=n.count),e},{}))}e.s(["extractStatusCodesFromData",()=>l,"generateStatusCodeAttributes",()=>_,"queriesFactory",0,(e,t)=>Object.entries(e).reduce((e,[s,{sql:a,queryType:o}])=>"db"===o?{...e,[s]:()=>(0,r.default)({sql:a})}:{...e,[s]:()=>(0,n.default)(t)},{}),"queryParamsToObject",0,e=>Object.fromEntries(new URLSearchParams(e)),"transformCategoricalCountData",()=>c,"transformStatusCodeData",()=>u],554344)},749199,e=>{"use strict";var t=e.i(242882),s=e.i(820308),a=e.i(150671),r=e.i(714403),n=e.i(635494),o=e.i(189329);e.s(["default",0,({sql:e,params:i=s.DEFAULT_QUERY_PARAMS,where:l,orderBy:_})=>{let{data:u}=(0,n.useSelectedProjectQuery)(),c=(0,o.useDatabaseSelectorStateSnapshot)(),{data:d}=(0,a.useReadReplicasQuery)({projectRef:u?.ref}),E=(d||[]).find(e=>e.identifier===c.selectedDatabaseId)?.connectionString,m=c.selectedDatabaseId,S="function"==typeof e?e([]):e,{data:R,error:h,isPending:p,isRefetching:A,refetch:T}=(0,t.useQuery)({queryKey:["projects",u?.ref,"db",{...i,sql:S,identifier:m},l,_],queryFn:({signal:e})=>(0,r.executeSql)({projectRef:u?.ref,connectionString:E||u?.connectionString,sql:S},e).then(e=>e.result),enabled:!!S,refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{error:h||("object"==typeof R?R?.error:""),data:R,isLoading:p,isRefetching:A,params:i,runQuery:T,resolvedSql:S}}])},298625,e=>{"use strict";var t=e.i(242882),s=e.i(714403),a=e.i(584258);async function r({projectRef:e,connectionString:t},a){let r=`
    select
      s.oid as "id",
      w.fdwname as "name",
      s.srvname as "server_name",
      s.srvoptions as "server_options",
      c.proname as "handler",
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', c.oid::bigint,
            'schema', relnamespace::regnamespace::text,
            'name', c.relname,
            'columns', (
              select jsonb_agg(
                jsonb_build_object(
                  'name', a.attname,
                  'type', pg_catalog.format_type(a.atttypid, a.atttypmod)
                )
              )
              from pg_catalog.pg_attribute a
              where a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
            ),
            'options', t.ftoptions
          )
        )
        from pg_catalog.pg_class c
        join pg_catalog.pg_foreign_table t on c.oid = t.ftrelid
        where c.oid = any (select t.ftrelid from pg_catalog.pg_foreign_table t where t.ftserver = s.oid)
      ) as "tables"
    from pg_catalog.pg_foreign_server s
    join pg_catalog.pg_foreign_data_wrapper w on s.srvfdw = w.oid
    join pg_catalog.pg_proc c on w.fdwhandler = c.oid;
  `,{result:n}=await (0,s.executeSql)({projectRef:e,connectionString:t,sql:r,queryKey:["fdws"]},a);return n}e.s(["getFDWs",()=>r,"useFDWsQuery",0,({projectRef:e,connectionString:s},{enabled:n=!0,...o}={})=>(0,t.useQuery)({queryKey:a.fdwKeys.list(e),queryFn:({signal:t})=>r({projectRef:e,connectionString:s},t),enabled:n&&void 0!==e,...o})])},450972,e=>{"use strict";var t=e.i(248593),s=e.i(242882),a=e.i(234745),r=e.i(635494);e.i(10429);var n=e.i(837508),o=e.i(667286);async function i({projectRef:e,connectionString:s},r,n){if(!e)throw Error("projectRef is required");let o=new Headers(n);s&&o.set("x-connection-encrypted",s);let{data:i,error:l}=await (0,a.get)("/platform/pg-meta/{ref}/extensions",{params:{header:{"x-connection-encrypted":s,"x-pg-application-name":t.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e}},headers:o,signal:r});return l&&(0,a.handleError)(l),i}e.s(["useDatabaseExtensionsQuery",0,({projectRef:e,connectionString:t},{enabled:a=!0,...l}={})=>{let{data:_}=(0,r.useSelectedProjectQuery)(),u=_?.status===n.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,s.useQuery)({queryKey:o.databaseExtensionsKeys.list(e),queryFn:({signal:s})=>i({projectRef:e,connectionString:t},s),enabled:a&&void 0!==e&&u,...l})}])},12214,e=>{"use strict";var t=e.i(615515);let s=e=>Object.fromEntries(e.map(e=>e.split("=")));function a(e,t){if("wasm_fdw_handler"===e.handlerName){let a=s(t?.server_options??[]);return e.server.options.find(e=>"fdw_package_name"===e.name)?.defaultValue===a.fdw_package_name}return e.handlerName===t?.handler}function r(e){return t.WRAPPERS.find(t=>a(t,e))}e.s(["convertKVStringArrayToJson",0,s,"formatWrapperTables",0,(e,s)=>(e?.tables??[]).map(a=>{let r=0,n=Object.fromEntries(a.options.map(e=>e.split("=")));switch(e.handler){case t.WRAPPER_HANDLERS.STRIPE:r=s?.tables.findIndex(e=>e.options.find(e=>"object"===e.name)?.defaultValue===n.object)??0;break;case t.WRAPPER_HANDLERS.FIREBASE:r="auth/users"===n.object?s?.tables.findIndex(e=>e.options.find(e=>"auth/users"===e.defaultValue))??0:s?.tables.findIndex(e=>"Firestore Collection"===e.label)??0;case t.WRAPPER_HANDLERS.S3:case t.WRAPPER_HANDLERS.AIRTABLE:case t.WRAPPER_HANDLERS.LOGFLARE:case t.WRAPPER_HANDLERS.BIG_QUERY:case t.WRAPPER_HANDLERS.CLICK_HOUSE:}return{...n,index:r,id:a.id,columns:a.columns,is_new_schema:!1,schema:a.schema,schema_name:a.schema,table_name:a.name}}),"getWrapperMetaForWrapper",()=>r,"makeValidateRequired",0,e=>{let t=new Set(e.filter(e=>e.required).map(e=>e.name)),s=new Set(Array.from(t).filter(e=>e.includes("."))),a=Array.from(s);return e=>Object.fromEntries(Object.entries(e).flatMap(([e,t])=>Array.isArray(t)?[[e,t],...t.map((t,s)=>[`${e}.${s}`,t])]:[[e,t]]).filter(([e,r])=>{let[n,o]=e.split(".");if(void 0!==o&&t.has(n)&&Object.keys(r).some(e=>s.has(`${n}.${e}`))){let e=a.find(e=>e.startsWith(`${n}.`));return!!e&&!r[e.split(".")[1]]}return t.has(n)&&(Array.isArray(r)?r.length<1:!r)}).map(([e])=>"table_name"===e?[e,"Please provide a name for your table"]:"columns"===e?[e,"Please select at least one column"]:[e,"This field is required"]))},"wrapperMetaComparator",()=>a])},584258,e=>{"use strict";e.s(["fdwKeys",0,{list:e=>["projects",e,"fdws"]}])},610144,e=>{"use strict";var t=e.i(755216),s=e.i(479084),a=e.i(38429),r=e.i(356003),n=e.i(355901),o=e.i(78162),i=e.i(714403),l=e.i(667286);async function _({projectRef:e,connectionString:a,schema:r,name:n,version:o,cascade:l=!1,createSchema:_=!1}){let u=new Headers;a&&u.set("x-connection-encrypted",a);let{sql:c}=t.default.extensions.create({schema:r,name:n,version:o,cascade:l}),{result:d}=await (0,i.executeSql)({projectRef:e,connectionString:a,sql:_?`create schema if not exists ${(0,s.ident)(r)}; ${c}`:c,queryKey:["extension","create"]});return d}e.s(["useDatabaseExtensionEnableMutation",0,({onSuccess:e,onError:t,...s}={})=>{let i=(0,r.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>_(e),async onSuccess(t,s,a){let{projectRef:r}=s;await Promise.all([i.invalidateQueries({queryKey:l.databaseExtensionsKeys.list(r)}),i.invalidateQueries({queryKey:o.configKeys.upgradeEligibility(r)})]),await e?.(t,s,a)},async onError(e,s,a){void 0===t?n.toast.error(`Failed to enable database extension: ${e.message}`):t(e,s,a)},...s})}])},888525,760255,284399,e=>{"use strict";var t=e.i(355901),s=e.i(714403),a=e.i(392491);function r(e=[]){return{hypopg:e.find(e=>"hypopg"===e.name),indexAdvisor:e.find(e=>"index_advisor"===e.name)}}function n(e,t){return void 0===e||void 0===t||e<=0||e<=t?0:(e-t)/e*100}async function o({projectRef:e,connectionString:a,indexStatements:r,onSuccess:n,onError:o}){if(!e){let e=Error("Project ref is required");return o&&o(e),Promise.reject(e)}if(0===r.length){let e=Error("No index statements provided");return o&&o(e),Promise.reject(e)}try{return await (0,s.executeSql)({projectRef:e,connectionString:a,sql:r.join(";\n")+";"}),t.toast.success("Successfully created index"),n&&n(),Promise.resolve()}catch(e){return t.toast.error(`Failed to create index: ${e.message}`),o&&o(e),Promise.reject(e)}}function i(e,t){return!!(t&&e?.index_statements&&e.index_statements.length>0)}function l(e){return e&&0!==e.length?e.filter(e=>{let t=e.match(/ON\s+(?:"?(\w+)"?\.|(\w+)\.)/i);if(!t)return!0;let s=t[1]||t[2];return!s||!a.INTERNAL_SCHEMAS.includes(s.toLowerCase())}):[]}function _(e){if(!e||!e.index_statements)return e??null;let t=l(e.index_statements);return 0===t.length?null:{...e,index_statements:t}}function u(e){if(!e)return!1;let t=e.toLowerCase();return a.INTERNAL_SCHEMAS.some(e=>RegExp(`(?:from|join|update|insert\\s+into|delete\\s+from)\\s+(?:${e}\\.|"${e}"\\.)`,"i").test(t))}e.s(["calculateImprovement",()=>n,"createIndexes",()=>o,"filterProtectedSchemaIndexAdvisorResult",()=>_,"filterProtectedSchemaIndexStatements",()=>l,"getIndexAdvisorExtensions",()=>r,"hasIndexRecommendations",()=>i,"queryInvolvesProtectedSchemas",()=>u],760255);var c=e.i(450972),d=e.i(635494);function E(){let{data:e}=(0,d.useSelectedProjectQuery)(),{data:t}=(0,c.useDatabaseExtensionsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{hypopg:s,indexAdvisor:a}=r(t??[]),n=!!s&&!!a,o=n&&null!==s.installed_version&&null!==a.installed_version;return{isIndexAdvisorAvailable:n,isIndexAdvisorEnabled:o}}e.s(["useIndexAdvisorStatus",()=>E],888525);var m=e.i(478902),S=e.i(389959),R=e.i(610144),h=e.i(967052),p=e.i(232520),A=e.i(837710);e.s(["EnableIndexAdvisorButton",0,()=>{let e=(0,h.useTrack)(),{data:s}=(0,d.useSelectedProjectQuery)(),[a,n]=(0,S.useState)(!1),{data:o}=(0,c.useDatabaseExtensionsQuery)({projectRef:s?.ref,connectionString:s?.connectionString}),{hypopg:i,indexAdvisor:l}=r(o),{mutateAsync:_,isPending:u}=(0,R.useDatabaseExtensionEnableMutation)(),E=async()=>{if(void 0===s)return t.toast.error("Project is required");try{i?.installed_version===null&&await _({projectRef:s?.ref,connectionString:s?.connectionString,name:i.name,schema:i?.schema??"extensions",version:i.default_version}),l?.installed_version===null&&await _({projectRef:s?.ref,connectionString:s?.connectionString,name:l.name,schema:l?.schema??"extensions",version:l.default_version}),t.toast.success("Successfully enabled Index Advisor!"),n(!1)}catch(e){t.toast.error(`Failed to enable Index Advisor: ${e.message}`)}};return(0,m.jsxs)(p.AlertDialog,{open:a,onOpenChange:()=>n(!a),children:[(0,m.jsx)(p.AlertDialogTrigger,{asChild:!0,children:(0,m.jsx)(A.Button,{type:"primary",onClick:()=>e("index_advisor_banner_enable_button_clicked"),children:"Enable"})}),(0,m.jsxs)(p.AlertDialogContent,{children:[(0,m.jsxs)(p.AlertDialogHeader,{children:[(0,m.jsx)(p.AlertDialogTitle,{children:"Enable Index Advisor"}),(0,m.jsxs)(p.AlertDialogDescription,{children:["This will enable the ",(0,m.jsx)("code",{className:"text-code-inline",children:"index_advisor"})," and"," ",(0,m.jsx)("code",{className:"text-code-inline",children:"hypopg"})," Postgres extensions so Index Advisor can analyse queries and suggest performance-improving indexes."]})]}),(0,m.jsxs)(p.AlertDialogFooter,{children:[(0,m.jsx)(p.AlertDialogCancel,{children:"Cancel"}),(0,m.jsx)(p.AlertDialogAction,{onClick:t=>{t.preventDefault(),E(),e("index_advisor_dialog_enable_button_clicked")},disabled:u,children:u?"Enabling...":"Enable"})]})]})]})}],284399)},232520,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(274664),r=e.i(678001),n=e.i(217027),o=e.i(174617),i=e.i(153545),l="AlertDialog",[_,u]=(0,a.createContextScope)(l,[n.createDialogScope]),c=(0,n.createDialogScope)(),d=e=>{let{__scopeAlertDialog:s,...a}=e,r=c(s);return(0,t.jsx)(n.Root,{...r,...a,modal:!0})};d.displayName=l;var E=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...r}=e,o=c(a);return(0,t.jsx)(n.Trigger,{...o,...r,ref:s})});E.displayName="AlertDialogTrigger";var m=e=>{let{__scopeAlertDialog:s,...a}=e,r=c(s);return(0,t.jsx)(n.Portal,{...r,...a})};m.displayName="AlertDialogPortal";var S=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...r}=e,o=c(a);return(0,t.jsx)(n.Overlay,{...o,...r,ref:s})});S.displayName="AlertDialogOverlay";var R="AlertDialogContent",[h,p]=_(R),A=(0,i.createSlottable)("AlertDialogContent"),T=s.forwardRef((e,a)=>{let{__scopeAlertDialog:i,children:l,..._}=e,u=c(i),d=s.useRef(null),E=(0,r.useComposedRefs)(a,d),m=s.useRef(null);return(0,t.jsx)(n.WarningProvider,{contentName:R,titleName:f,docsSlug:"alert-dialog",children:(0,t.jsx)(h,{scope:i,cancelRef:m,children:(0,t.jsxs)(n.Content,{role:"alertdialog",...u,..._,ref:E,onOpenAutoFocus:(0,o.composeEventHandlers)(_.onOpenAutoFocus,e=>{e.preventDefault(),m.current?.focus({preventScroll:!0})}),onPointerDownOutside:e=>e.preventDefault(),onInteractOutside:e=>e.preventDefault(),children:[(0,t.jsx)(A,{children:l}),(0,t.jsx)(b,{contentRef:d})]})})})});T.displayName=R;var f="AlertDialogTitle",g=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...r}=e,o=c(a);return(0,t.jsx)(n.Title,{...o,...r,ref:s})});g.displayName=f;var N="AlertDialogDescription",O=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...r}=e,o=c(a);return(0,t.jsx)(n.Description,{...o,...r,ref:s})});O.displayName=N;var I=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...r}=e,o=c(a);return(0,t.jsx)(n.Close,{...o,...r,ref:s})});I.displayName="AlertDialogAction";var C="AlertDialogCancel",y=s.forwardRef((e,s)=>{let{__scopeAlertDialog:a,...o}=e,{cancelRef:i}=p(C,a),l=c(a),_=(0,r.useComposedRefs)(s,i);return(0,t.jsx)(n.Close,{...l,...o,ref:_})});y.displayName=C;var b=({contentRef:e})=>{let t=`\`${R}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${R}\` by passing a \`${N}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${R}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return s.useEffect(()=>{document.getElementById(e.current?.getAttribute("aria-describedby"))||console.warn(t)},[t,e]),null},L=e.i(709520),M=e.i(843778),x=e.i(837710);let q=({children:e,...s})=>(0,t.jsx)(m,{...s,children:(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-end justify-center sm:items-center",children:e})});q.displayName=m.displayName;let v=s.forwardRef(({className:e,centered:s=!0,...a},r)=>(0,t.jsx)(S,{ref:r,className:(0,M.cn)("bg-black/40 backdrop-blur-sm","z-50 fixed inset-0 grid place-items-center overflow-y-auto data-closed:animate-overlay-hide py-8",!s&&"flex flex-col flex-start pb-8 sm:pt-12 md:pt-20 lg:pt-32 xl:pt-40 px-5",e),...a}));v.displayName=S.displayName;let D=(0,L.cva)((0,M.cn)("relative z-50 w-full max-w-screen border shadow-md dark:shadow-sm","data-[state=open]:animate-in data-[state=closed]:animate-out","data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95","data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%]","data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%]","sm:rounded-lg md:w-full","bg-dash-sidebar"),{variants:{size:{tiny:"sm:align-middle sm:w-full sm:max-w-xs",small:"sm:align-middle sm:w-full sm:max-w-sm",medium:"sm:align-middle sm:w-full sm:max-w-lg",large:"sm:align-middle sm:w-full md:max-w-xl",xlarge:"sm:align-middle sm:w-full md:max-w-3xl",xxlarge:"sm:align-middle sm:w-full md:max-w-6xl",xxxlarge:"sm:align-middle sm:w-full md:max-w-7xl"}},defaultVariants:{size:"small"}}),w=s.forwardRef(({className:e,children:s,size:a,dialogOverlayProps:r,centered:n=!0,...o},i)=>(0,t.jsx)(q,{children:(0,t.jsx)(v,{centered:n,...r,children:(0,t.jsx)(T,{ref:i,className:(0,M.cn)(D({size:a}),e),...o,children:s})})}));w.displayName=T.displayName;let P=({className:e,...s})=>(0,t.jsx)("div",{className:(0,M.cn)("flex flex-col text-left",e),...s});P.displayName="AlertDialogHeader";let U=({className:e,...s})=>(0,t.jsx)("div",{className:(0,M.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t py-3 px-5",e),...s});U.displayName="AlertDialogFooter";let G=s.forwardRef(({className:e,...s},a)=>(0,t.jsx)(g,{ref:a,className:(0,M.cn)("text-base text-foreground border-b px-5 py-3",e),...s}));G.displayName=g.displayName;let F=s.forwardRef(({className:e,...s},a)=>(0,t.jsx)(O,{ref:a,className:(0,M.cn)("text-sm text-foreground-light px-5"," pt-3.5 pb-4",e),...s}));F.displayName=O.displayName;let j=s.forwardRef(({className:e,variant:s="primary",type:a="button",...r},n)=>(0,t.jsx)(I,{ref:n,type:a,className:(0,M.cn)((0,x.buttonVariants)({type:s,size:"tiny"}),e),...r}));j.displayName=I.displayName;let k=s.forwardRef(({className:e,...s},a)=>(0,t.jsx)(y,{ref:a,className:(0,M.cn)((0,x.buttonVariants)({type:"default",size:"tiny"}),"mt-2 sm:mt-0",e),...s}));k.displayName=y.displayName,e.s(["AlertDialog",()=>d,"AlertDialogAction",()=>j,"AlertDialogCancel",()=>k,"AlertDialogContent",()=>w,"AlertDialogDescription",()=>F,"AlertDialogFooter",()=>U,"AlertDialogHeader",()=>P,"AlertDialogTitle",()=>G,"AlertDialogTrigger",()=>E],232520)},820308,775159,e=>{"use strict";var t,s,a=e.i(55956),r=((t={}).API="api",t.STORAGE="storage",t.AUTH="auth",t.QUERY_PERFORMANCE="query_performance",t.DATABASE="database",t);e.s(["Presets",()=>r],775159);var n=((s={}).LAST_10_MINUTES="Last 10 minutes",s.LAST_30_MINUTES="Last 30 minutes",s.LAST_60_MINUTES="Last 60 minutes",s.LAST_3_HOURS="Last 3 hours",s.LAST_24_HOURS="Last 24 hours",s.LAST_7_DAYS="Last 7 days",s.LAST_14_DAYS="Last 14 days",s.LAST_28_DAYS="Last 28 days",s);let o=[{text:"Last 10 minutes",calcFrom:()=>(0,a.default)().subtract(10,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 30 minutes",calcFrom:()=>(0,a.default)().subtract(30,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 60 minutes",calcFrom:()=>(0,a.default)().subtract(1,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),default:!0,availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 3 hours",calcFrom:()=>(0,a.default)().subtract(3,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 24 hours",calcFrom:()=>(0,a.default)().subtract(1,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 7 days",calcFrom:()=>(0,a.default)().subtract(7,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["pro","team","enterprise"]},{text:"Last 14 days",calcFrom:()=>(0,a.default)().subtract(14,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]},{text:"Last 28 days",calcFrom:()=>(0,a.default)().subtract(28,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]}],i={iso_timestamp_start:o[0].calcFrom(),iso_timestamp_end:o[0].calcTo()},l=(e,t=!0)=>{if(0===e.length)return"";let s=e.map(e=>{let t=e.key.split("."),s=[t[t.length-2],t[t.length-1]].join("."),a=e.key.includes(".")?s:e.key,r=e.value.toString().includes('"')||e.value.toString().includes("'"),n=!isNaN(Number(e.value)),o=!n&&r?e.value:`'${e.value}'`,i=!n&&String(o).toLowerCase(),l=n?e.value:i;switch(e.compare){case"matches":return`REGEXP_CONTAINS(${a}, ${l})`;case"is":default:return`${a} = ${l}`;case"!=":return`${a} != ${l}`;case">=":return`${a} >= ${l}`;case"<=":return`${a} <= ${l}`;case">":return`${a} > ${l}`;case"<":return`${a} < ${l}`}}).filter(Boolean).join(" AND ");return""===s?"":t?"WHERE "+s:"AND "+s},_={[r.API]:{title:"API",queries:{totalRequests:{queryType:"logs",sql:e=>`
        -- reports-api-total-requests
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC`},topRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},errorCounts:{queryType:"logs",sql:e=>`
        -- reports-api-error-counts
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        WHERE
          response.status_code >= 400
        ${l(e,!1)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},topErrorRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-error-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        where
          response.status_code >= 400
        ${l(e,!1)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},responseSpeed:{queryType:"logs",sql:e=>`
        -- reports-api-response-speed
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          avg(response.origin_time) as avg
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
      `},topSlowRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-slow-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count,
          avg(response.origin_time) as avg
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          avg desc
        limit 10
        `},networkTraffic:{queryType:"logs",sql:e=>`
        -- reports-api-network-traffic
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as ingress_mb,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(resp_headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as egress_mb,
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(response.headers) as resp_headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},requestsByCountry:{queryType:"logs",sql:e=>`
        -- reports-api-requests-by-country
        select
          cf.country as country,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(request.cf) as cf
        where
          cf.country is not null
        ${l(e,!1)}
        group by
          cf.country
        `}}},[r.AUTH]:{title:"",queries:{}},[r.STORAGE]:{title:"Storage",queries:{cacheHitRate:{queryType:"logs",sql:e=>`
        -- reports-storage-cache-hit-rate
SELECT
  timestamp_trunc(timestamp, hour) as timestamp,
  countif( h.cf_cache_status in ('HIT', 'STALE', 'REVALIDATED', 'UPDATING') ) as hit_count,
  countif( h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC') ) as miss_count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object') and r.method = 'GET'
  ${l(e,!1)}
group by timestamp
order by timestamp desc
`},topCacheMisses:{queryType:"logs",sql:e=>`
        -- reports-storage-top-cache-misses
SELECT
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
  ${l(e,!1)}
group by path, search
order by count desc
limit 12
    `}}},[r.QUERY_PERFORMANCE]:{title:"Query performance",queries:{mostFrequentlyInvoked:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-frequently-invoked
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
    statements.rows as rows_read,
    case 
      when (statements.shared_blks_hit + statements.shared_blks_read) > 0 
      then round(
        (statements.shared_blks_hit * 100.0) / 
        (statements.shared_blks_hit + statements.shared_blks_read), 
        2
      )
      else 0
    end as cache_hit_rate${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by statements.calls desc"}
  limit 20`},mostTimeConsuming:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-time-consuming
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    coalesce(
      ((statements.total_exec_time + statements.total_plan_time) /
        nullif(sum(statements.total_exec_time + statements.total_plan_time) OVER(), 0)) *
        100,
      0
    ) as prop_total_time${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by total_time desc"}
  limit 20`},slowestExecutionTime:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-slowest-execution-time
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by max_time desc"}
  limit 20`},queryHitRate:{queryType:"db",sql:e=>`-- reports-query-performance-cache-and-index-hit-rate
select
    'index hit rate' as name,
    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio
  from pg_statio_user_indexes
  union all
  select
    'table hit rate' as name,
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio
  from pg_statio_user_tables;`},unified:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-unified
        set search_path to public, extensions;

        with base as (
          select
            auth.rolname,
            statements.query,
            statements.calls,
            statements.total_exec_time + statements.total_plan_time as total_time,
            statements.min_exec_time + statements.min_plan_time as min_time,
            statements.max_exec_time + statements.max_plan_time as max_time,
            statements.mean_exec_time + statements.mean_plan_time as mean_time,
            coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
            statements.rows as rows_read,
            statements.shared_blks_hit as debug_hit,
            statements.shared_blks_read as debug_read,
            case
              when (statements.shared_blks_hit + statements.shared_blks_read) > 0
              then (statements.shared_blks_hit::numeric * 100.0) /
                   (statements.shared_blks_hit + statements.shared_blks_read)
              else 0
            end as cache_hit_rate,
            coalesce(
              ((statements.total_exec_time + statements.total_plan_time) /
                nullif(sum(statements.total_exec_time + statements.total_plan_time) OVER(), 0)) *
                100,
              0
            ) as prop_total_time
          from pg_stat_statements as statements
            inner join pg_authid as auth on statements.userid = auth.oid
          ${t||""}
          ${s||"order by total_time desc"}
          limit 50
        ),
        query_results as (
          select
            base.*${a?`,
            case
              when (lower(base.query) like 'select%' or lower(base.query) like 'with pgrst%')
              then (
                select json_build_object(
                  'has_suggestion', array_length(index_statements, 1) > 0,
                  'startup_cost_before', startup_cost_before,
                  'startup_cost_after', startup_cost_after,
                  'total_cost_before', total_cost_before,
                  'total_cost_after', total_cost_after,
                  'index_statements', index_statements
                )
                from index_advisor(base.query)
              )
              else null
            end as index_advisor_result`:""}
          from base
        )
        select *
        from query_results
        ${r&&a?"where (index_advisor_result->>'has_suggestion')::boolean = true":""}
        ${s||"order by total_time desc"}
        limit 20`},slowQueriesCount:{queryType:"db",sql:()=>`
        -- reports-query-performance-slow-queries-count
        set search_path to public, extensions;

        -- Count of slow queries (> 1 second average)
        SELECT count(*) as slow_queries_count
        FROM pg_stat_statements 
        WHERE statements.mean_exec_time > 1000;`},queryMetrics:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-metrics
        set search_path to public, extensions;
      
        SELECT 
          COALESCE(ROUND(AVG(statements.rows::numeric / NULLIF(statements.calls, 0)), 1), 0) as avg_rows_per_call,
          COUNT(*) FILTER (WHERE statements.total_exec_time + statements.total_plan_time > 1000) as slow_queries,
          COALESCE(
            ROUND(
              SUM(statements.shared_blks_hit) * 100.0 / 
              NULLIF(SUM(statements.shared_blks_hit + statements.shared_blks_read), 0), 
              2
            ), 0
          ) || '%' as cache_hit_rate
        FROM pg_stat_statements as statements
        WHERE statements.calls > 0
        ${t||""}
        ${s||""}`}}},[r.DATABASE]:{title:"database",queries:{largeObjects:{queryType:"db",sql:e=>`-- reports-database-large-objects
SELECT
        SCHEMA_NAME,
        relname,
        table_size
      FROM
        (SELECT
          pg_catalog.pg_namespace.nspname AS SCHEMA_NAME,
          relname,
          pg_total_relation_size(pg_catalog.pg_class.oid) AS table_size
        FROM pg_catalog.pg_class
        JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
        ) t
      WHERE SCHEMA_NAME NOT LIKE 'pg_%'
      ORDER BY table_size DESC
      LIMIT 5;`}}}};e.s(["DEFAULT_QUERY_PARAMS",0,i,"DEPRECATED_REPORTS",0,["total_realtime_ingress","total_rest_options_requests","total_auth_ingress","total_auth_get_requests","total_auth_post_requests","total_auth_patch_requests","total_auth_options_requests","total_storage_options_requests","total_storage_patch_requests","total_options_requests","total_rest_ingress","total_rest_get_requests","total_rest_post_requests","total_rest_patch_requests","total_rest_delete_requests","total_storage_get_requests","total_storage_post_requests","total_storage_delete_requests","total_auth_delete_requests","total_get_requests","total_patch_requests","total_post_requests","total_ingress","total_delete_requests"],"EDGE_FUNCTION_REGIONS",0,[{key:"ap-northeast-1",label:"Tokyo"},{key:"ap-northeast-2",label:"Seoul"},{key:"ap-south-1",label:"Mumbai"},{key:"ap-southeast-1",label:"Singapore"},{key:"ap-southeast-2",label:"Sydney"},{key:"ca-central-1",label:"Canada Central"},{key:"us-east-1",label:"N. Virginia"},{key:"us-west-1",label:"N. California"},{key:"us-west-2",label:"Oregon"},{key:"eu-central-1",label:"Frankfurt"},{key:"eu-west-1",label:"Ireland"},{key:"eu-west-2",label:"London"},{key:"eu-west-3",label:"Paris"},{key:"sa-east-1",label:"São Paulo"}],"LAYOUT_COLUMN_COUNT",0,2,"PRESET_CONFIG",0,_,"REPORTS_DATEPICKER_HELPERS",0,o,"REPORT_DATERANGE_HELPER_LABELS",()=>n,"generateRegexpWhere",0,l],820308)},924529,e=>{"use strict";var t=e.i(242882),s=e.i(389959);e.i(128328);var a=e.i(86086),r=e.i(993394),n=e.i(460988),o=e.i(234745),i=e.i(912793),l=e.i(10429);let _=(e,_={},u=!0)=>{let c=(0,r.getDefaultHelper)(r.EXPLORER_DATEPICKER_HELPERS),[d,E]=(0,s.useState)({sql:_?.sql||"",iso_timestamp_start:_.iso_timestamp_start?_.iso_timestamp_start:c.calcFrom(),iso_timestamp_end:_.iso_timestamp_end?_.iso_timestamp_end:c.calcTo()}),{logsMetadata:m}=(0,i.useIsFeatureEnabled)(["logs:metadata"]);(0,s.useEffect)(()=>{E(e=>({...e,..._,sql:_?.sql??e.sql,iso_timestamp_start:_.iso_timestamp_start??e.iso_timestamp_start,iso_timestamp_end:_.iso_timestamp_end??e.iso_timestamp_end}))},[_.sql,_.iso_timestamp_start,_.iso_timestamp_end]);let S=u&&void 0!==e&&!!d.sql,R=(0,n.checkForWithClause)(d.sql||""),h=(0,n.checkForILIKEClause)(d.sql||""),{data:p,error:A,isPending:T,isRefetching:f,refetch:g}=(0,t.useQuery)({queryKey:["projects",e,"logs",d],queryFn:async({signal:t})=>{let{data:s,error:a}=await (0,o.get)("/platform/projects/{ref}/analytics/endpoints/logs.all",{params:{path:{ref:e},query:d},signal:t});if(a)throw a;return s},enabled:S,refetchOnWindowFocus:!1}),N=A?A.message:null;return!N&&p?.error&&(N=p?.error),a.IS_PLATFORM&&(R&&(N={message:"The parser does not yet support WITH and subquery statements.",docs:`${l.DOCS_URL}/guides/platform/advanced-log-filtering#the-with-keyword-and-subqueries-are-not-supported`}),h&&(N={message:"BigQuery does not support ILIKE. Use REGEXP_CONTAINS instead.",docs:`${l.DOCS_URL}/guides/platform/advanced-log-filtering#the-ilike-and-similar-to-keywords-are-not-supported`})),{params:d,isLoading:S&&T||f,logData:(p?.result??[]).map(e=>{if(m)return e;{let{metadata:t,...s}=e;return s}}),error:N,changeQuery:(e="")=>{E(t=>({...t,sql:e}))},runQuery:()=>g(),setParams:E}};e.s(["default",0,_,"useLogsQuery",0,_])}]);

//# debugId=2ce83819-75fe-18b8-4db1-5b36e85314c8
//# sourceMappingURL=5940222d4a02b7b7.js.map