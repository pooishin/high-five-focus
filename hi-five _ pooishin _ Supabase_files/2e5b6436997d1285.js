;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="ae11fe2c-4bce-38bb-834a-6526b00322ad")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,479084,e=>{"use strict";let t=new Set(["AES128","AES256","ALL","ALLOWOVERWRITE","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","ASYMMETRIC","AUTHORIZATION","BACKUP","BETWEEN","BIGINT","BINARY","BIT","BLANKSASNULL","BOOLEAN","BOTH","BYTEDICT","CASE","CAST","CHAR","CHARACTER","CHECK","COALESCE","COLLATE","COLLATION","COLUMN","CONCURRENTLY","CONSTRAINT","CREATE","CREDENTIALS","CROSS","CURRENT_CATALOG","CURRENT_DATE","CURRENT_ROLE","CURRENT_SCHEMA","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER_ID","CURRENT_USER","DEC","DECIMAL","DEFAULT","DEFERRABLE","DEFLATE","DEFRAG","DELETE","DELTA","DELTA32K","DESC","DISABLE","DISTINCT","DO","ELSE","EMPTYASNULL","ENABLE","ENCODE","ENCRYPT","ENCRYPTION","END","EXCEPT","EXISTS","EXPLICIT","EXTRACT","FALSE","FETCH","FLOAT","FOR","FOREIGN","FREEZE","FROM","FULL","GLOBALDICT256","GLOBALDICT64K","GRANT","GREATEST","GROUP","GROUPING","GZIP","HAVING","IDENTITY","IGNORE","ILIKE","IN","INITIALLY","INNER","INOUT","INSERT","INT","INTEGER","INTERSECT","INTERVAL","INTO","IS","ISNULL","JOIN","JSON_ARRAY","JSON_ARRAYAGG","JSON_EXISTS","JSON_OBJECT","JSON_OBJECTAGG","JSON_QUERY","JSON_SCALAR","JSON_SERIALIZE","JSON_TABLE","JSON_VALUE","JSON","LATERAL","LEADING","LEAST","LEFT","LIKE","LIMIT","LOCALTIME","LOCALTIMESTAMP","LUN","LUNS","LZO","LZOP","MERGE_ACTION","MINUS","MOSTLY13","MOSTLY32","MOSTLY8","NATIONAL","NATURAL","NCHAR","NEW","NONE","NORMALIZE","NOT","NOTNULL","NULL","NULLIF","NULLS","NUMERIC","OFF","OFFLINE","OFFSET","OLD","ON","ONLY","OPEN","OR","ORDER","OUT","OUTER","OVERLAPS","OVERLAY","PARALLEL","PARTITION","PERCENT","PLACING","POSITION","PRECISION","PRIMARY","RAW","READRATIO","REAL","RECOVER","REFERENCES","REJECTLOG","RESORT","RESTORE","RETURNING","RIGHT","ROW","SELECT","SESSION_USER","SETOF","SIMILAR","SMALLINT","SOME","SUBSTRING","SYMMETRIC","SYSDATE","SYSTEM_USER","SYSTEM","TABLE","TABLESAMPLE","TAG","TDES","TEXT255","TEXT32K","THEN","TIME","TIMESTAMP","TO","TOP","TRAILING","TREAT","TRIM","TRUE","TRUNCATECOLUMNS","UNION","UNIQUE","UPDATE","USER","USING","VALUES","VARCHAR","VARIADIC","VERBOSE","WALLET","WHEN","WHERE","WINDOW","WITH","WITHOUT","XMLATTRIBUTES","XMLCONCAT","XMLELEMENT","XMLEXISTS","XMLFOREST","XMLNAMESPACES","XMLPARSE","XMLPI","XMLROOT","XMLSERIALIZE","XMLTABLE"]);function n(e){return e.replace("T"," ").replace("Z","+00")}function i(e,t,n){let i="";for(let[a,r]of(i+=e?" (":"(",t.entries()))i+=(0===a?"":", ")+n(r);return i+")"}function a(e){if(null==e)throw Error("SQL identifier cannot be null or undefined");if(!1===e)return'"f"';if(!0===e)return'"t"';if(e instanceof Date)return`"${n(e.toISOString())}"`;if(Array.isArray(e)){let t=[];for(let n of e)if(!0===Array.isArray(n))throw TypeError("Nested array to grouped list conversion is not supported for SQL identifier");else t.push(a(n));return t.toString()}else if(e===Object(e))throw Error("SQL identifier cannot be an object");let i=String(e).slice(0);if(!0===/^[_a-z][\d$_a-z]*$/.test(i)&&!1==!!t.has(i.toUpperCase()))return i;let r='"';for(let e of i)r+='"'===e?e+e:e;return r+'"'}function r(e){let t,a="";if(null==e)return"NULL";if("bigint"==typeof e)return BigInt(e).toString();if(e===1/0)return"'Infinity'";if(e===-1/0)return"'-Infinity'";if(Number.isNaN(e))return"'NaN'";if("number"==typeof e)return Number(e).toString();if(!1===e)return"'f'";if(!0===e)return"'t'";if(e instanceof Date)return`'${n(e.toISOString())}'`;if(Array.isArray(e)){let t=[];for(let[n,a]of e.entries())!0===Array.isArray(a)?t.push(i(0!==n,a,r)):t.push(r(a));return t.toString()}e===Object(e)?(t="jsonb",a=JSON.stringify(e)):a=String(e).slice(0);let o=!1,l="'";for(let e of a)"'"===e?l+=e+e:"\\"===e?(l+=e+e,o=!0):l+=e;return l+="'",!0===o&&(l=`E${l}`),t&&(l+=`::${t}`),l}function o(e,...t){let l,s;return l=0,s=RegExp("%(%|(\\d+\\$)?[ILs])","g"),e.replace(s,(e,o)=>{if("%"===o)return"%";let s=l,c=o.split("$");if(c.length>1&&(s=Number.parseInt(c[0],10)-1,o=c[1]),s<0)throw Error("specified argument 0 but arguments start at 1");if(s>t.length-1)throw Error("too few arguments");return(l=s+1,"I"===o)?a(t[s]):"L"===o?r(t[s]):"s"===o?function e(t){if(null==t)return"";if(!1===t)return"f";if(!0===t)return"t";if(t instanceof Date)return n(t.toISOString());if(Array.isArray(t)){let n=[];for(let[a,r]of t.entries())null!=r&&(!0===Array.isArray(r)?n.push(i(0!==a,r,e)):n.push(e(r)));return n.toString()}return t===Object(t)?JSON.stringify(t):String(t).toString().slice(0)}(t[s]):void 0})}e.s(["format",()=>o,"ident",()=>a,"literal",()=>r],479084)},967533,332357,29659,193767,212695,721490,e=>{"use strict";var t=e.i(479084);function n(e,t){let n=`select count(*) from ${d(e)}`,{filters:i}=t??{};return i&&(n=s(n,i)),n+";"}function i(e,t){let n=`truncate ${d(e)}`,{cascade:i}=t??{};return i&&(n+=" cascade"),n+";"}function a(e,n,i){if(!n||0===n.length)throw Error("no filters for this delete query");let a=`delete from ${d(e)}`,{returning:r,enumArrayColumns:o}=i??{};return n&&(a=s(a,n)),r&&(a+=void 0===o||0===o.length?" returning *":` returning *, ${o.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),a+";"}function r(e,n,i){if(!n||0===n.length)throw Error("no value to insert");let{returning:a,enumArrayColumns:r}=i??{},o=Object.keys(n[0]).map(e=>(0,t.ident)(e)).join(","),l="";return l=0==o.length?(0,t.format)("insert into %1$s select from jsonb_populate_recordset(null::%1$s, %2$s)",d(e),(0,t.literal)(JSON.stringify(n))):(0,t.format)("insert into %1$s (%2$s) select %2$s from jsonb_populate_recordset(null::%1$s, %3$s)",d(e),o,(0,t.literal)(JSON.stringify(n))),a&&(l+=void 0===r||0===r.length?" returning *":` returning *, ${r.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),l+";"}function o(e,n,i,a=!0,r=!1){var l,c;let u,m="";m+=`select ${n??"*"} from ${r?(l=e,`${(0,t.ident)(l.name)}`):d(e)}`;let{filters:p,pagination:_,sorts:g}=i??{};if(p&&(m=s(m,p)),g&&(c=m,m=0===(u=g.filter(e=>e.column)).length?c:c+=` order by ${u.map(e=>{let n=e.ascending?"asc":"desc",i=e.nullsFirst?"nulls first":"nulls last";return`${(0,t.ident)(e.table)}.${(0,t.ident)(e.column)} ${n} ${i}`}).join(", ")}`),_){let{limit:e,offset:n}=_??{};m+=` limit ${(0,t.literal)(e)} offset ${(0,t.literal)(n)}`}return`${m}${a?";":""}`}function l(e,n,i){let{filters:a,returning:r,enumArrayColumns:o}=i??{};if(!a||0===a.length)throw Error("no filters for this update query");let l=Object.keys(n).map(e=>(0,t.ident)(e)).join(","),c=(0,t.format)("update %1$s set (%2$s) = (select %2$s from json_populate_record(null::%1$s, %3$s))",d(e),l,(0,t.literal)(JSON.stringify(n)));return a&&(c=s(c,a)),r&&(c+=void 0===o||0===o.length?" returning *":` returning *, ${o.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),c+";"}function s(e,n){return 0===n.length?e:e+=` where ${n.map(e=>{if(Array.isArray(e.column))switch(e.operator){case"in":var n,i,a=e;if(!Array.isArray(a.column))throw Error("Use inFilterSql for single columns");if(!Array.isArray(a.value))throw Error("Values for a tuple 'in' filter must be an array");let r=`(${a.column.map(e=>(0,t.ident)(e)).join(", ")})`,o=a.value.map(e=>{if(Array.isArray(e)){if(e.length!==a.column.length)throw Error("Tuple value length must match column length");return`(${e.map(e=>c(e)).join(", ")})`}{let t=String(e).split(",");if(t.length!==a.column.length)throw Error("Tuple value length must match column length");return`(${t.map(e=>c(e)).join(", ")})`}});return`${r} ${a.operator} (${o.join(", ")})`;case"=":case"<>":case">":case"<":case">=":case"<=":var l=e;if(!Array.isArray(l.column))throw Error("Use standard applyFilters for single column");if(!Array.isArray(l.value))throw Error("Tuple filter value must be an array");if(l.value.length!==l.column.length)throw Error("Tuple filter value must have the same length as the column array");let s=`(${l.column.map(e=>(0,t.ident)(e)).join(", ")})`,d=`(${l.value.map(e=>c(e)).join(", ")})`;return`${s} ${l.operator} ${d}`;default:throw Error(`Cannot use ${e.operator} operator in a tuple filter`)}switch(e.operator){case"in":let u;return u=Array.isArray((n=e).value)?n.value.map(e=>c(e)):String(n.value).split(",").map(e=>c(e)),`${(0,t.ident)(n.column)} ${n.operator} (${u.join(",")})`;case"is":var m=e;let p=String(m.value);switch(p){case"null":case"false":case"true":case"not null":return`${(0,t.ident)(m.column)} ${m.operator} ${p}`;default:return`${(0,t.ident)(m.column)} ${m.operator} ${c(m.value)}`}case"~~":case"~~*":case"!~~":case"!~~*":return i=e,`${(0,t.ident)(i.column)}::text ${i.operator} ${c(i.value)}`;default:return`${(0,t.ident)(e.column)} ${e.operator} ${c(e.value)}`}}).join(" and ")}`}function c(e){if("string"==typeof e&&!(e?.startsWith("ARRAY[")&&e?.endsWith("]")))return(0,t.literal)(e);return e}function d(e){return`${(0,t.ident)(e.schema)}.${(0,t.ident)(e.name)}`}e.s(["countQuery",()=>n,"deleteQuery",()=>a,"insertQuery",()=>r,"selectQuery",()=>o,"truncateQuery",()=>i,"updateQuery",()=>l],332357);class u{table;action;options;pagination;constructor(e,t,n){this.table=e,this.action=t,this.options=n}range(e,t){return this.pagination={offset:e,limit:t-e+1},this}toSql(e={isCTE:!1,isFinal:!0}){try{let{actionValue:t,actionOptions:s,filters:c,sorts:d}=this.options??{};switch(this.action){case"count":return n(this.table,{filters:c});case"delete":return a(this.table,c,{returning:s?.returning,enumArrayColumns:s?.enumArrayColumns});case"insert":return r(this.table,t,{returning:s?.returning,enumArrayColumns:s?.enumArrayColumns});case"select":return o(this.table,t,{filters:c,pagination:this.pagination,sorts:d},e.isFinal,e.isCTE);case"update":return l(this.table,t,{filters:c,returning:s?.returning,enumArrayColumns:s?.enumArrayColumns});case"truncate":return i(this.table,{cascade:s?.cascade});default:return""}}catch(e){throw e}}}e.s(["QueryModifier",()=>u],29659);class m{table;action;actionValue;actionOptions;filters;sorts;constructor(e,t,n,i){this.table=e,this.action=t,this.actionValue=n,this.actionOptions=i,this.filters=[],this.sorts=[]}filter(e,t,n){return this.filters.push({column:e,operator:t,value:n}),this}match(e){return Object.entries(e).map(([e,t])=>{this.filters.push({column:e,operator:"=",value:t})}),this}order(e,t,n=!0,i=!1){return this.sorts.push({table:e,column:t,ascending:n,nullsFirst:i}),this}range(e,t){return this._getQueryModifier().range(e,t)}clone(){let e=structuredClone({table:this.table,action:this.action,actionValue:this.actionValue,actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts}),t=new m(e.table,e.action,e.actionValue,e.actionOptions);return t.filters=e.filters,t.sorts=e.sorts,t}toSql(e){return this._getQueryModifier().toSql(e)}_getQueryModifier(){return new u(this.table,this.action,{actionValue:this.actionValue,actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts})}}e.s(["QueryFilter",()=>m],193767);class p{table;constructor(e){this.table=e}count(){return new m(this.table,"count")}delete(e){return new m(this.table,"delete",void 0,e)}insert(e,t){return new m(this.table,"insert",e,t)}select(e){return new m(this.table,"select",e)}update(e,t){return new m(this.table,"update",e,t)}truncate(e){return new m(this.table,"truncate",void 0,e)}}e.s(["QueryAction",()=>p],212695);class _{from(e,t){return new p({name:e,schema:t??"public"})}}e.s(["Query",()=>_],721490),e.s([],967533)},755216,e=>{"use strict";var t=e.i(97429),n=e.i(248593),i=e.i(479084);let a=(e,t)=>`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${e})) FILTER (WHERE ${t})
    FROM
      ${e}
  ),
  '{}'
) AS ${e}`;function r(e,t,n){return(n&&(t=n.concat(t??[])),e?.length)?`IN (${e.map(i.literal).join(",")})`:t?.length?`NOT IN (${t.map(i.literal).join(",")})`:""}let o=`
-- Lists each column's privileges in the form of:
--
-- [
--   {
--     "column_id": "12345.1",
--     "relation_schema": "public",
--     "relation_name": "mytable",
--     "column_name": "mycolumn",
--     "privileges": [
--       {
--         "grantor": "postgres",
--         "grantee": "myrole",
--         "privilege_type": "SELECT",
--         "is_grantable": false
--       },
--       ...
--     ]
--   },
--   ...
-- ]
--
-- Modified from information_schema.column_privileges. We try to be as close as
-- possible to the view definition, obtained from:
--
-- select pg_get_viewdef('information_schema.column_privileges');
--
-- The main differences are:
-- - we include column privileges for materialized views
--   (reason for exclusion in information_schema.column_privileges:
--    https://www.postgresql.org/message-id/9136.1502740844%40sss.pgh.pa.us)
-- - we query a.attrelid and a.attnum to generate column_id
-- - table_catalog is omitted
-- - table_schema -> relation_schema, table_name -> relation_name
--
-- Column privileges are intertwined with table privileges in that table
-- privileges override column privileges. E.g. if we do:
--
-- grant all on mytable to myrole;
--
-- Then myrole is granted privileges for ALL columns. Likewise, if we do:
--
-- grant all (id) on mytable to myrole;
-- revoke all on mytable from myrole;
--
-- Then the grant on the id column is revoked.
--
-- This is unlike how grants for schemas and tables interact, where you need
-- privileges for BOTH the schema the table is in AND the table itself in order
-- to access the table.

select (x.attrelid || '.' || x.attnum) as column_id,
       nc.nspname as relation_schema,
       x.relname as relation_name,
       x.attname as column_name,
       coalesce(
         jsonb_agg(
           jsonb_build_object(
             'grantor', u_grantor.rolname,
             'grantee', grantee.rolname,
             'privilege_type', x.prtype,
             'is_grantable', x.grantable
           )
         ),
         '[]'
       ) as privileges
from
  (select pr_c.grantor,
          pr_c.grantee,
          a.attrelid,
          a.attnum,
          a.attname,
          pr_c.relname,
          pr_c.relnamespace,
          pr_c.prtype,
          pr_c.grantable,
          pr_c.relowner
   from
     (select pg_class.oid,
             pg_class.relname,
             pg_class.relnamespace,
             pg_class.relowner,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantor as grantor,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantee as grantee,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).is_grantable as is_grantable
      from pg_class
      where (pg_class.relkind = any (array['r',
                                           'v',
                                           'm',
                                           'f',
                                           'p'])) ) pr_c(oid, relname, relnamespace, relowner, grantor, grantee, prtype, grantable),
                                                    pg_attribute a
   where ((a.attrelid = pr_c.oid)
          and (a.attnum > 0)
          and (not a.attisdropped))
   union select pr_a.grantor,
                pr_a.grantee,
                pr_a.attrelid,
                pr_a.attnum,
                pr_a.attname,
                c.relname,
                c.relnamespace,
                pr_a.prtype,
                pr_a.grantable,
                c.relowner
   from
     (select a.attrelid,
             a.attnum,
             a.attname,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantor as grantor,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantee as grantee,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).is_grantable as is_grantable
      from (pg_attribute a
            join pg_class cc on ((a.attrelid = cc.oid)))
      where ((a.attnum > 0)
             and (not a.attisdropped))) pr_a(attrelid, attnum, attname, grantor, grantee, prtype, grantable),
                                        pg_class c
   where ((pr_a.attrelid = c.oid)
          and (c.relkind = any (ARRAY['r',
                                      'v',
                                      'm',
                                      'f',
                                      'p'])))) x,
     pg_namespace nc,
     pg_authid u_grantor,
  (select pg_authid.oid,
          pg_authid.rolname
   from pg_authid
   union all select (0)::oid as oid,
                    'PUBLIC') grantee(oid, rolname)
where ((x.relnamespace = nc.oid)
       and (x.grantee = grantee.oid)
       and (x.grantor = u_grantor.oid)
       and (x.prtype = any (ARRAY['INSERT',
                                  'SELECT',
                                  'UPDATE',
                                  'REFERENCES']))
       and (pg_has_role(u_grantor.oid, 'USAGE')
            or pg_has_role(grantee.oid, 'USAGE')
            or (grantee.rolname = 'PUBLIC')))
group by column_id,
         nc.nspname,
         x.relname,
         x.attname
`,l=t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),is_grantable:t.z.boolean()}),s=t.z.object({column_id:t.z.string(),relation_schema:t.z.string(),relation_name:t.z.string(),column_name:t.z.string(),privileges:t.z.array(l)}),c=t.z.array(s);t.z.object({columnId:t.z.string(),grantee:t.z.string(),privilegeType:t.z.union([t.z.literal("ALL"),t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),isGrantable:t.z.boolean().optional()});let d=`
-- Adapted from information_schema.columns

SELECT
  c.oid :: int8 AS table_id,
  nc.nspname AS schema,
  c.relname AS table,
  (c.oid || '.' || a.attnum) AS id,
  a.attnum AS ordinal_position,
  a.attname AS name,
  CASE
    WHEN a.atthasdef THEN pg_get_expr(ad.adbin, ad.adrelid)
    ELSE NULL
  END AS default_value,
  CASE
    WHEN t.typtype = 'd' THEN CASE
      WHEN bt.typelem <> 0 :: oid
      AND bt.typlen = -1 THEN 'ARRAY'
      WHEN nbt.nspname = 'pg_catalog' THEN format_type(t.typbasetype, NULL)
      ELSE 'USER-DEFINED'
    END
    ELSE CASE
      WHEN t.typelem <> 0 :: oid
      AND t.typlen = -1 THEN 'ARRAY'
      WHEN nt.nspname = 'pg_catalog' THEN format_type(a.atttypid, NULL)
      ELSE 'USER-DEFINED'
    END
  END AS data_type,
  COALESCE(bt.typname, t.typname) AS format,
  a.attidentity IN ('a', 'd') AS is_identity,
  CASE
    a.attidentity
    WHEN 'a' THEN 'ALWAYS'
    WHEN 'd' THEN 'BY DEFAULT'
    ELSE NULL
  END AS identity_generation,
  a.attgenerated IN ('s') AS is_generated,
  NOT (
    a.attnotnull
    OR t.typtype = 'd' AND t.typnotnull
  ) AS is_nullable,
  (
    c.relkind IN ('r', 'p')
    OR c.relkind IN ('v', 'f') AND pg_column_is_updatable(c.oid, a.attnum, FALSE)
  ) AS is_updatable,
  uniques.table_id IS NOT NULL AS is_unique,
  check_constraints.definition AS "check",
  array_to_json(
    array(
      SELECT
        enumlabel
      FROM
        pg_catalog.pg_enum enums
      WHERE
        enums.enumtypid = coalesce(bt.oid, t.oid)
        OR enums.enumtypid = coalesce(bt.typelem, t.typelem)
      ORDER BY
        enums.enumsortorder
    )
  ) AS enums,
  col_description(c.oid, a.attnum) AS comment
FROM
  pg_attribute a
  LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid
  AND a.attnum = ad.adnum
  JOIN (
    pg_class c
    JOIN pg_namespace nc ON c.relnamespace = nc.oid
  ) ON a.attrelid = c.oid
  JOIN (
    pg_type t
    JOIN pg_namespace nt ON t.typnamespace = nt.oid
  ) ON a.atttypid = t.oid
  LEFT JOIN (
    pg_type bt
    JOIN pg_namespace nbt ON bt.typnamespace = nbt.oid
  ) ON t.typtype = 'd'
  AND t.typbasetype = bt.oid
  LEFT JOIN (
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position
    FROM pg_catalog.pg_constraint
    WHERE contype = 'u' AND cardinality(conkey) = 1
  ) AS uniques ON uniques.table_id = c.oid AND uniques.ordinal_position = a.attnum
  LEFT JOIN (
    -- We only select the first column check
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position,
      substring(
        pg_get_constraintdef(pg_constraint.oid, true),
        8,
        length(pg_get_constraintdef(pg_constraint.oid, true)) - 8
      ) AS "definition"
    FROM pg_constraint
    WHERE contype = 'c' AND cardinality(conkey) = 1
    ORDER BY table_id, ordinal_position, oid asc
  ) AS check_constraints ON check_constraints.table_id = c.oid AND check_constraints.ordinal_position = a.attnum
WHERE
  NOT pg_is_other_temp_schema(nc.oid)
  AND a.attnum > 0
  AND NOT a.attisdropped
  AND (c.relkind IN ('r', 'v', 'm', 'f', 'p'))
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_column_privilege(
      c.oid,
      a.attnum,
      'SELECT, INSERT, UPDATE, REFERENCES'
    )
  )
`,u=t.z.object({id:t.z.string(),table_id:t.z.number(),schema:t.z.string(),table:t.z.string(),name:t.z.string(),ordinal_position:t.z.number(),data_type:t.z.string(),format:t.z.string(),is_identity:t.z.boolean(),identity_generation:t.z.string().nullable(),is_generated:t.z.boolean(),is_nullable:t.z.boolean(),is_updatable:t.z.boolean(),is_unique:t.z.boolean(),check:t.z.string().nullable(),default_value:t.z.any().nullable(),enums:t.z.array(t.z.string()),comment:t.z.string().nullable()}),m=t.z.array(u),p=t.z.optional(u),_=e=>e.endsWith("[]")?`${(0,i.ident)(e.slice(0,-2))}[]`:e.includes(".")?e:(0,i.ident)(e),g=`
SELECT
  name,
  setting,
  category,
  TRIM(split_part(category, '/', 1)) AS group,
  TRIM(split_part(category, '/', 2)) AS subgroup,
  unit,
  short_desc,
  extra_desc,
  context,
  vartype,
  source,
  min_val,
  max_val,
  enumvals,
  boot_val,
  reset_val,
  sourcefile,
  sourceline,
  pending_restart
FROM
  pg_settings
ORDER BY
  category,
  name
`,E=t.z.object({name:t.z.string(),setting:t.z.string(),category:t.z.string(),group:t.z.string(),subgroup:t.z.string(),unit:t.z.string().nullable(),short_desc:t.z.string(),extra_desc:t.z.string().nullable(),context:t.z.string(),vartype:t.z.string(),source:t.z.string(),min_val:t.z.string().nullable(),max_val:t.z.string().nullable(),enumvals:t.z.array(t.z.string()).nullable(),boot_val:t.z.string().nullable(),reset_val:t.z.string().nullable(),sourcefile:t.z.string().nullable(),sourceline:t.z.number().nullable(),pending_restart:t.z.boolean()}),f=t.z.array(E),$=`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment
FROM
  pg_available_extensions() e(name, default_version, comment)
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
`,b=t.z.object({name:t.z.string(),schema:t.z.string().nullable(),default_version:t.z.string(),installed_version:t.z.string().nullable(),comment:t.z.string()}),h=t.z.array(b),A=t.z.optional(b),T=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  obj_description(c.oid) as comment,
  fs.srvname as foreign_server_name,
  fdw.fdwname as foreign_data_wrapper_name,
  handler.proname as foreign_data_wrapper_handler
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  inner join pg_foreign_table ft on ft.ftrelid = c.oid
  inner join pg_foreign_server fs on fs.oid = ft.ftserver
  inner join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
  inner join pg_proc handler on handler.oid = fdw.fdwhandler
where
  c.relkind = 'f'
`,S=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),comment:t.z.string().nullable(),foreign_server_name:t.z.string(),foreign_data_wrapper_name:t.z.string(),foreign_data_wrapper_handler:t.z.string(),columns:m.optional()}),z=t.z.array(S),N=t.z.optional(S),y=({includeColumns:e})=>`
with foreign_tables as (${T})
  ${e?`, columns as (${d})`:""}
select
  *
  ${e?`, ${a("columns","columns.table_id = foreign_tables.id")}`:""}
from foreign_tables`,L=`
-- CTE with sane arg_modes, arg_names, and arg_types.
-- All three are always of the same length.
-- All three include all args, including OUT and TABLE args.
with functions as (
  select
    *,
    -- proargmodes is null when all arg modes are IN
    coalesce(
      p.proargmodes,
      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_modes,
    -- proargnames is null when all args are unnamed
    coalesce(
      p.proargnames,
      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_names,
    -- proallargtypes is null when all arg modes are IN
    coalesce(p.proallargtypes, p.proargtypes) as arg_types,
    array_cat(
      array_fill(false, array[pronargs - pronargdefaults]),
      array_fill(true, array[pronargdefaults])) as arg_has_defaults
  from
    pg_proc as p
  where
    p.prokind = 'f'
)
select
  f.oid as id,
  n.nspname as schema,
  f.proname as name,
  l.lanname as language,
  case
    when l.lanname = 'internal' then ''
    else f.prosrc
  end as definition,
  case
    when l.lanname = 'internal' then f.prosrc
    else pg_get_functiondef(f.oid)
  end as complete_statement,
  coalesce(f_args.args, '[]') as args,
  pg_get_function_arguments(f.oid) as argument_types,
  pg_get_function_identity_arguments(f.oid) as identity_argument_types,
  f.prorettype as return_type_id,
  pg_get_function_result(f.oid) as return_type,
  nullif(rt.typrelid, 0) as return_type_relation_id,
  f.proretset as is_set_returning_function,
  case
    when f.provolatile = 'i' then 'IMMUTABLE'
    when f.provolatile = 's' then 'STABLE'
    when f.provolatile = 'v' then 'VOLATILE'
  end as behavior,
  f.prosecdef as security_definer,
  f_config.config_params as config_params
from
  functions f
  left join pg_namespace n on f.pronamespace = n.oid
  left join pg_language l on f.prolang = l.oid
  left join pg_type rt on rt.oid = f.prorettype
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as config_params
    from
      (
        select
          oid,
          (string_to_array(unnest(proconfig), '='))[1] as param,
          (string_to_array(unnest(proconfig), '='))[2] as value
        from
          functions
      ) as t
    group by
      oid
  ) f_config on f_config.oid = f.oid
  left join (
    select
      oid,
      jsonb_agg(jsonb_build_object(
        'mode', t2.mode,
        'name', name,
        'type_id', type_id,
        -- Cast null into false boolean
        'has_default', COALESCE(has_default, false)
      )) as args
    from
      (
        select
          oid,
          unnest(arg_modes) as mode,
          unnest(arg_names) as name,
          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume
          -- integer, we need to cast it to be properly parsed
          unnest(arg_types)::int8 as type_id,
          unnest(arg_has_defaults) as has_default
        from
          functions
      ) as t1,
      lateral (
        select
          case
            when t1.mode = 'i' then 'in'
            when t1.mode = 'o' then 'out'
            when t1.mode = 'b' then 'inout'
            when t1.mode = 'v' then 'variadic'
            else 'table'
          end as mode
      ) as t2
    group by
      t1.oid
  ) f_args on f_args.oid = f.oid
`,R=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),language:t.z.string(),definition:t.z.string(),complete_statement:t.z.string(),args:t.z.array(t.z.object({mode:t.z.union([t.z.literal("in"),t.z.literal("out"),t.z.literal("inout"),t.z.literal("variadic"),t.z.literal("table")]),name:t.z.string(),type_id:t.z.number(),has_default:t.z.boolean()})),argument_types:t.z.string(),identity_argument_types:t.z.string(),return_type_id:t.z.number(),return_type:t.z.string(),return_type_relation_id:t.z.union([t.z.number(),t.z.null()]),is_set_returning_function:t.z.boolean(),behavior:t.z.union([t.z.literal("IMMUTABLE"),t.z.literal("STABLE"),t.z.literal("VOLATILE")]),security_definer:t.z.boolean(),config_params:t.z.union([t.z.record(t.z.string(),t.z.string()),t.z.null()])}),I=t.z.array(R),v=t.z.optional(R);function O({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o}={}){let l=`
    with f as (
      ${L}
    )
    select
      f.*
    from f
  `,s=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),a&&(l=`${l} limit ${a}`),o&&(l=`${l} offset ${o}`),{sql:l,zod:I}}function w({id:e,name:t,schema:n="public",args:a=[]}){if(e)return{sql:`
      with f as (
        ${L}
      )
      select
        f.*
      from f where id = ${(0,i.literal)(e)};`,zod:v};if(t&&n&&a)return{sql:`with f as (
      ${L}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${(0,i.literal)(n)} and name = ${(0,i.literal)(t)} and p.proargtypes::text = ${a.length?`(
          select string_agg(type_oid::text, ' ') from (
            select (
              split_args.arr[
                array_length(
                  split_args.arr,
                  1
                )
              ]::regtype::oid
            ) as type_oid from (
              select string_to_array(
                unnest(
                  array[${a.map(i.literal)}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:(0,i.literal)("")}`,zod:v};throw Error("Must provide either id or name and schema")}let C=t.z.object({name:t.z.string(),definition:t.z.string(),args:t.z.array(t.z.string()).optional(),behavior:t.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:t.z.record(t.z.string(),t.z.string()).optional(),schema:t.z.string().optional(),language:t.z.string().optional(),return_type:t.z.string().optional(),security_definer:t.z.boolean().optional()});function D({name:e,schema:t,args:n,definition:a,return_type:r,language:o,behavior:l,security_definer:s,config_params:c},{replace:d=!1}={}){return`
    CREATE ${d?"OR REPLACE":""} FUNCTION ${(0,i.ident)(t)}.${(0,i.ident)(e)}(${n?.join(", ")||""})
    RETURNS ${r}
    AS ${(0,i.literal)(a)}
    LANGUAGE ${o}
    ${l}
    CALLED ON NULL INPUT
    ${s?"SECURITY DEFINER":"SECURITY INVOKER"}
    ${c?Object.entries(c).map(([e,t])=>`SET ${e} ${"FROM CURRENT"===t?"FROM CURRENT":"TO "+('""'===t?"''":t)}`).join("\n"):""};
  `}function x({name:e,schema:n="public",args:i=[],definition:a,return_type:r="void",language:o="sql",behavior:l="VOLATILE",security_definer:s=!1,config_params:c={}}){return{sql:D({name:e,schema:n,args:i,definition:a,return_type:r,language:o,behavior:l,security_definer:s,config_params:c}),zod:t.z.void()}}let U=t.z.object({name:t.z.string().optional(),schema:t.z.string().optional(),definition:t.z.string().optional()});function M(e,{name:n,schema:a,definition:r}){let o=e.argument_types.split(", "),l=e.identity_argument_types,s="string"==typeof r?D({...e,definition:r,args:o,config_params:e.config_params??{}},{replace:!0}):"",c=n&&n!==e.name?`ALTER FUNCTION ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.name)}(${l}) RENAME TO ${(0,i.ident)(n)};`:"",d=a&&a!==e.schema?`ALTER FUNCTION ${(0,i.ident)(e.schema)}.${(0,i.ident)(n||e.name)}(${l})  SET SCHEMA ${(0,i.ident)(a)};`:"";return{sql:`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof r?"TRUE":"FALSE"} THEN
        ${s}

        IF (
          SELECT id
          FROM (${L}) AS f
          WHERE f.schema = ${(0,i.literal)(e.schema)}
          AND f.name = ${(0,i.literal)(e.name)}
          AND f.identity_argument_types = ${(0,i.literal)(l)}
        ) != ${e.id} THEN
          RAISE EXCEPTION 'Cannot find function "${e.schema}"."${e.name}"(${l})';
        END IF;
      END IF;

      ${c}

      ${d}
    END;
    $$;
  `,zod:t.z.void()}}let j=t.z.object({cascade:t.z.boolean().default(!1).optional()});function F(e,{cascade:n=!1}={}){return{sql:`DROP FUNCTION ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.name)}
  (${e.identity_argument_types})
  ${n?"CASCADE":"RESTRICT"};`,zod:t.z.void()}}e.s(["create",()=>x,"list",()=>O,"pgFunctionArrayZod",0,I,"pgFunctionCreateZod",0,C,"pgFunctionDeleteZod",0,j,"pgFunctionOptionalZod",0,v,"pgFunctionUpdateZod",0,U,"pgFunctionZod",0,R,"remove",()=>F,"retrieve",()=>w,"update",()=>M],198687);var k=e.i(198687);let H=`
  SELECT
    idx.indexrelid::int8 AS id,
    idx.indrelid::int8 AS table_id,
    n.nspname AS schema,
    idx.indnatts AS number_of_attributes,
    idx.indnkeyatts AS number_of_key_attributes,
    idx.indisunique AS is_unique,
    idx.indisprimary AS is_primary,
    idx.indisexclusion AS is_exclusion,
    idx.indimmediate AS is_immediate,
    idx.indisclustered AS is_clustered,
    idx.indisvalid AS is_valid,
    idx.indcheckxmin AS check_xmin,
    idx.indisready AS is_ready,
    idx.indislive AS is_live,
    idx.indisreplident AS is_replica_identity,
    idx.indkey::smallint[] AS key_attributes,
    idx.indcollation::integer[] AS collation,
    idx.indclass::integer[] AS class,
    idx.indoption::smallint[] AS options,
    idx.indpred AS index_predicate,
    obj_description(idx.indexrelid, 'pg_class') AS comment,
    ix.indexdef as index_definition,
    am.amname AS access_method,
    jsonb_agg(
      jsonb_build_object(
        'attribute_number', a.attnum,
        'attribute_name', a.attname,
        'data_type', format_type(a.atttypid, a.atttypmod)
      )
      ORDER BY a.attnum
    ) AS index_attributes
  FROM
    pg_index idx
    JOIN pg_class c ON c.oid = idx.indexrelid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_am am ON c.relam = am.oid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
    JOIN pg_indexes ix ON c.relname = ix.indexname
  GROUP BY
    idx.indexrelid, idx.indrelid, n.nspname, idx.indnatts, idx.indnkeyatts, idx.indisunique, 
    idx.indisprimary, idx.indisexclusion, idx.indimmediate, idx.indisclustered, idx.indisvalid, 
    idx.indcheckxmin, idx.indisready, idx.indislive, idx.indisreplident, idx.indkey, 
    idx.indcollation, idx.indclass, idx.indoption, idx.indexprs, idx.indpred, ix.indexdef, am.amname
`,B=t.z.object({id:t.z.number(),table_id:t.z.number(),schema:t.z.string(),number_of_attributes:t.z.number(),number_of_key_attributes:t.z.number(),is_unique:t.z.boolean(),is_primary:t.z.boolean(),is_exclusion:t.z.boolean(),is_immediate:t.z.boolean(),is_clustered:t.z.boolean(),is_valid:t.z.boolean(),check_xmin:t.z.boolean(),is_ready:t.z.boolean(),is_live:t.z.boolean(),is_replica_identity:t.z.boolean(),key_attributes:t.z.array(t.z.number()),collation:t.z.array(t.z.number()),class:t.z.array(t.z.number()),options:t.z.array(t.z.number()),index_predicate:t.z.string().nullable(),comment:t.z.string().nullable(),index_definition:t.z.string(),access_method:t.z.string(),index_attributes:t.z.array(t.z.object({attribute_number:t.z.number(),attribute_name:t.z.string(),data_type:t.z.string()}))}),P=t.z.array(B),Y=t.z.optional(B),q=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  c.relispopulated as is_populated,
  obj_description(c.oid) as comment
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
where
  c.relkind = 'm'
`,G=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_populated:t.z.boolean(),comment:t.z.string().nullable(),columns:m.optional()}),W=t.z.array(G),J=t.z.optional(G),Q=({includeColumns:e})=>`
with materialized_views as (${q})
  ${e?`, columns as (${d})`:""}
select
  *
  ${e?`, ${a("columns","columns.table_id = materialized_views.id")}`:""}
from materialized_views`,V=`
select
  pol.oid :: int8 as id,
  n.nspname as schema,
  c.relname as table,
  c.oid :: int8 as table_id,
  pol.polname as name,
  case
    when pol.polpermissive then 'PERMISSIVE'::text
    else 'RESTRICTIVE'::text
  end as action,
  case
    when pol.polroles = '{0}'::oid[] then array_to_json(string_to_array('public'::text, ''::text)::name[])
    else array_to_json(array(
      select pg_roles.rolname
      from pg_roles
      where pg_roles.oid = any(pol.polroles)
      order by pg_roles.rolname
    ))
  end as roles,
  case pol.polcmd
    when 'r'::"char" then 'SELECT'::text
    when 'a'::"char" then 'INSERT'::text
    when 'w'::"char" then 'UPDATE'::text
    when 'd'::"char" then 'DELETE'::text
    when '*'::"char" then 'ALL'::text
    else null::text
  end as command,
  pg_get_expr(pol.polqual, pol.polrelid) as definition,
  pg_get_expr(pol.polwithcheck, pol.polrelid) as check
from
  pg_policy pol
  join pg_class c on c.oid = pol.polrelid
  left join pg_namespace n on n.oid = c.relnamespace
`,X=t.z.object({id:t.z.number(),schema:t.z.string(),table:t.z.string(),table_id:t.z.number(),name:t.z.string(),action:t.z.union([t.z.literal("PERMISSIVE"),t.z.literal("RESTRICTIVE")]),roles:t.z.array(t.z.string()),command:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("ALL")]),definition:t.z.union([t.z.string(),t.z.null()]),check:t.z.union([t.z.string(),t.z.null()])}),K=t.z.array(X),Z=t.z.optional(X),ee=`
SELECT
  p.oid :: int8 AS id,
  p.pubname AS name,
  p.pubowner::regrole::text AS owner,
  p.pubinsert AS publish_insert,
  p.pubupdate AS publish_update,
  p.pubdelete AS publish_delete,
  p.pubtruncate AS publish_truncate,
  CASE
    WHEN p.puballtables THEN NULL
    ELSE pr.tables
  END AS tables
FROM
  pg_catalog.pg_publication AS p
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        array_agg(
          json_build_object(
            'id',
            c.oid :: int8,
            'name',
            c.relname,
            'schema',
            nc.nspname
          )
        ),
        '{}'
      ) AS tables
    FROM
      pg_catalog.pg_publication_rel AS pr
      JOIN pg_class AS c ON pr.prrelid = c.oid
      join pg_namespace as nc on c.relnamespace = nc.oid
    WHERE
      pr.prpubid = p.oid
  ) AS pr ON 1 = 1
`,et=t.z.object({id:t.z.number().optional(),name:t.z.string(),schema:t.z.string()}),en=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),publish_insert:t.z.boolean(),publish_update:t.z.boolean(),publish_delete:t.z.boolean(),publish_truncate:t.z.boolean(),tables:t.z.array(et).nullable()}),ei=t.z.array(en),ea=t.z.optional(en),er=`
-- Can't use pg_authid here since some managed Postgres providers don't expose it
-- https://github.com/supabase/postgres-meta/issues/212

select
  r.oid as id,
  rolname as name,
  rolsuper as "isSuperuser",
  rolcreatedb as "canCreateDb",
  rolcreaterole as "canCreateRole",
  rolinherit as "inheritRole",
  rolcanlogin as "canLogin",
  rolreplication as "isReplicationRole",
  rolbypassrls as "canBypassRls",
  (
    select
      count(*)
    from
      pg_stat_activity
    where
      r.rolname = pg_stat_activity.usename
  ) as "activeConnections",
  case when rolconnlimit = -1 then current_setting('max_connections') :: int8
       else rolconnlimit
  end as "connectionLimit",
  rolvaliduntil as "validUntil",
  coalesce(r_config.role_configs, '{}') as config
from
  pg_roles r
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as role_configs
    from
      (
        select
          oid,
          (string_to_array(unnest(rolconfig), '='))[1] as param,
          (string_to_array(unnest(rolconfig), '='))[2] as value
        from
          pg_roles
      ) as _
    group by
      oid
  ) r_config on r_config.oid = r.oid
`,eo=t.z.object({id:t.z.number(),name:t.z.string(),isSuperuser:t.z.boolean(),canCreateDb:t.z.boolean(),canCreateRole:t.z.boolean(),inheritRole:t.z.boolean(),canLogin:t.z.boolean(),isReplicationRole:t.z.boolean(),canBypassRls:t.z.boolean(),activeConnections:t.z.number(),connectionLimit:t.z.number(),validUntil:t.z.union([t.z.string(),t.z.null()]),config:t.z.record(t.z.string(),t.z.string())}),el=t.z.array(eo),es=t.z.optional(eo);function ec(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)}`;throw Error("Must provide either id or name")}let ed=`
-- Adapted from information_schema.schemata

select
  n.oid as id,
  n.nspname as name,
  u.rolname as owner,
   obj_description(n.oid, 'pg_namespace') AS comment
from
  pg_namespace n,
  pg_roles u
where
  n.nspowner = u.oid
  and (
    pg_has_role(n.nspowner, 'USAGE')
    or has_schema_privilege(n.oid, 'CREATE, USAGE')
  )
  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')
  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')
`,eu=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),comment:t.z.string().nullable()}),em=t.z.array(eu),ep=t.z.optional(eu),e_=`
-- Despite the name \`table_privileges\`, this includes other kinds of relations:
-- views, matviews, etc. "Relation privileges" just doesn't roll off the tongue.
--
-- For each relation, get its relacl in a jsonb format,
-- e.g.
--
-- '{postgres=arwdDxt/postgres}'
--
-- becomes
--
-- [
--   {
--     "grantee": "postgres",
--     "grantor": "postgres",
--     "is_grantable": false,
--     "privilege_type": "INSERT"
--   },
--   ...
-- ]
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,eg=t.z.object({relation_id:t.z.number(),schema:t.z.string(),name:t.z.string(),kind:t.z.union([t.z.literal("table"),t.z.literal("view"),t.z.literal("materialized_view"),t.z.literal("foreign_table"),t.z.literal("partitioned_table")]),privileges:t.z.array(t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("TRUNCATE"),t.z.literal("REFERENCES"),t.z.literal("TRIGGER"),t.z.literal("MAINTAIN")]),is_grantable:t.z.boolean()}))}),eE=t.z.array(eg),ef=t.z.optional(eg),e$=`
SELECT
  c.oid :: int8 AS id,
  nc.nspname AS schema,
  c.relname AS name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  CASE
    WHEN c.relreplident = 'd' THEN 'DEFAULT'
    WHEN c.relreplident = 'i' THEN 'INDEX'
    WHEN c.relreplident = 'f' THEN 'FULL'
    ELSE 'NOTHING'
  END AS replica_identity,
  pg_total_relation_size(format('%I.%I', nc.nspname, c.relname)) :: int8 AS bytes,
  pg_size_pretty(
    pg_total_relation_size(format('%I.%I', nc.nspname, c.relname))
  ) AS size,
  pg_stat_get_live_tuples(c.oid) AS live_rows_estimate,
  pg_stat_get_dead_tuples(c.oid) AS dead_rows_estimate,
  obj_description(c.oid) AS comment,
  coalesce(pk.primary_keys, '[]') as primary_keys,
  coalesce(
    jsonb_agg(relationships) filter (where relationships is not null),
    '[]'
  ) as relationships
FROM
  pg_namespace nc
  JOIN pg_class c ON nc.oid = c.relnamespace
  left join (
    select
      c.oid::int8 as table_id,
      jsonb_agg(
        jsonb_build_object(
          'table_id', c.oid::int8,
          'schema', n.nspname,
          'table_name', c.relname,
          'name', a.attname
        )
        order by array_position(i.indkey, a.attnum)
      ) as primary_keys
    from
      pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
    where
      i.indisprimary
    group by c.oid
  ) as pk
  on pk.table_id = c.oid
  left join (
    select
      c.oid :: int8 as id,
      c.conname as constraint_name,
      nsa.nspname as source_schema,
      csa.relname as source_table_name,
      sa.attname as source_column_name,
      nta.nspname as target_table_schema,
      cta.relname as target_table_name,
      ta.attname as target_column_name
    from
      pg_constraint c
    join (
      pg_attribute sa
      join pg_class csa on sa.attrelid = csa.oid
      join pg_namespace nsa on csa.relnamespace = nsa.oid
    ) on sa.attrelid = c.conrelid and sa.attnum = any (c.conkey)
    join (
      pg_attribute ta
      join pg_class cta on ta.attrelid = cta.oid
      join pg_namespace nta on cta.relnamespace = nta.oid
    ) on ta.attrelid = c.confrelid and ta.attnum = any (c.confkey)
    where
      c.contype = 'f'
  ) as relationships
  on (relationships.source_schema = nc.nspname and relationships.source_table_name = c.relname)
  or (relationships.target_table_schema = nc.nspname and relationships.target_table_name = c.relname)
WHERE
  c.relkind IN ('r', 'p')
  AND NOT pg_is_other_temp_schema(nc.oid)
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
    )
    OR has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  c.relname,
  c.relrowsecurity,
  c.relforcerowsecurity,
  c.relreplident,
  nc.nspname,
  pk.primary_keys
`,eb=t.z.object({table_id:t.z.number(),name:t.z.string(),schema:t.z.string(),table_name:t.z.string()}),eh=t.z.object({id:t.z.number(),constraint_name:t.z.string(),source_schema:t.z.string(),source_table_name:t.z.string(),source_column_name:t.z.string(),target_table_schema:t.z.string(),target_table_name:t.z.string(),target_column_name:t.z.string()}),eA=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),rls_enabled:t.z.boolean(),rls_forced:t.z.boolean(),replica_identity:t.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:t.z.number(),size:t.z.string(),live_rows_estimate:t.z.number(),dead_rows_estimate:t.z.number(),comment:t.z.string().nullable(),primary_keys:t.z.array(eb),relationships:t.z.array(eh),columns:m.optional()}),eT=t.z.array(eA);function eS({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o,includeColumns:l=!0}={}){let s=ey({includeColumns:l}),c=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(s+=` where schema ${c}`),a&&(s+=` limit ${a}`),o&&(s+=` offset ${o}`),{sql:s,zod:eT}}function ez(e){let t=function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)} and ${(0,i.ident)("schema")} = ${(0,i.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${ey({includeColumns:!0})} where ${t};`,zod:eA}}function eN(e,{cascade:t=!1}={}){return{sql:`DROP TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}}let ey=({includeColumns:e})=>`
  with tables as (${e$})
  ${e?`, columns as (${d})`:""}
  select
    *
    ${e?`, ${a("columns","columns.table_id = tables.id")}`:""}
  from tables`;function eL({name:e,schema:t="public",comment:n}){let a=`CREATE TABLE ${(0,i.ident)(t)}.${(0,i.ident)(e)} ();`,r=void 0!=n?`COMMENT ON TABLE ${(0,i.ident)(t)}.${(0,i.ident)(e)} IS ${(0,i.literal)(n)};`:"";return{sql:`BEGIN; ${a} ${r} COMMIT;`}}function eR(e,{name:t,schema:n,rls_enabled:a,rls_forced:r,replica_identity:o,replica_identity_index:l,primary_keys:s,comment:c}){let d=`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.name)}`,u=void 0===n?"":`${d} SET SCHEMA ${(0,i.ident)(n)};`,m="";if(void 0!==t&&t!==e.name){let a=void 0===n?e.schema:n;m=`ALTER TABLE ${(0,i.ident)(a)}.${(0,i.ident)(e.name)} RENAME TO ${(0,i.ident)(t)};`}let p="";if(void 0!==a){let e=`${d} ENABLE ROW LEVEL SECURITY;`,t=`${d} DISABLE ROW LEVEL SECURITY;`;p=a?e:t}let _="";if(void 0!==r){let e=`${d} FORCE ROW LEVEL SECURITY;`,t=`${d} NO FORCE ROW LEVEL SECURITY;`;_=r?e:t}let g="";void 0===o||(g="INDEX"===o?`${d} REPLICA IDENTITY USING INDEX ${l};`:`${d} REPLICA IDENTITY ${o};`);let E="";void 0===s||(E+=`
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${(0,i.literal)(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${(0,i.literal)(`${d} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===s.length||(E+=`${d} ADD PRIMARY KEY (${s.map(e=>(0,i.ident)(e.name)).join(",")});`));let f=void 0==c?"":`COMMENT ON TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.name)} IS ${(0,i.literal)(c)};`;return{sql:`
BEGIN;
  ${p}
  ${_}
  ${g}
  ${E}
  ${f}
  ${u}
  ${m}
COMMIT;`}}e.s(["create",()=>eL,"list",()=>eS,"remove",()=>eN,"retrieve",()=>ez,"update",()=>eR],330006);var eI=e.i(330006);let ev=`
SELECT
  pg_t.oid AS id,
  pg_t.tgrelid AS table_id,
  CASE
    WHEN pg_t.tgenabled = 'D' THEN 'DISABLED'
    WHEN pg_t.tgenabled = 'O' THEN 'ORIGIN'
    WHEN pg_t.tgenabled = 'R' THEN 'REPLICA'
    WHEN pg_t.tgenabled = 'A' THEN 'ALWAYS'
  END AS enabled_mode,
  (
    STRING_TO_ARRAY(
      ENCODE(pg_t.tgargs, 'escape'), '\\000'
    )
  )[:pg_t.tgnargs] AS function_args,
  is_t.trigger_name AS name,
  is_t.event_object_table AS table,
  is_t.event_object_schema AS schema,
  is_t.action_condition AS condition,
  is_t.action_orientation AS orientation,
  is_t.action_timing AS activation,
  ARRAY_AGG(is_t.event_manipulation)::text[] AS events,
  pg_p.proname AS function_name,
  pg_n.nspname AS function_schema
FROM
  pg_trigger AS pg_t
JOIN
  pg_class AS pg_c
ON pg_t.tgrelid = pg_c.oid
JOIN information_schema.triggers AS is_t
ON is_t.trigger_name = pg_t.tgname
AND pg_c.relname = is_t.event_object_table
AND pg_c.relnamespace = (quote_ident(is_t.event_object_schema))::regnamespace
JOIN pg_proc AS pg_p
ON pg_t.tgfoid = pg_p.oid
JOIN pg_namespace AS pg_n
ON pg_p.pronamespace = pg_n.oid
GROUP BY
  pg_t.oid,
  pg_t.tgrelid,
  pg_t.tgenabled,
  pg_t.tgargs,
  pg_t.tgnargs,
  is_t.trigger_name,
  is_t.event_object_table,
  is_t.event_object_schema,
  is_t.action_condition,
  is_t.action_orientation,
  is_t.action_timing,
  pg_p.proname,
  pg_n.nspname
`,eO=t.z.object({id:t.z.number(),table_id:t.z.number(),enabled_mode:t.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:t.z.array(t.z.string()),name:t.z.string(),table:t.z.string(),schema:t.z.string(),condition:t.z.string().nullable(),orientation:t.z.string(),activation:t.z.string(),events:t.z.array(t.z.string()),function_name:t.z.string(),function_schema:t.z.string()}),ew=t.z.array(eO),eC=t.z.optional(eO);t.z.object({name:t.z.string(),schema:t.z.string().optional().default("public"),table:t.z.string(),function_schema:t.z.string().optional().default("public"),function_name:t.z.string(),function_args:t.z.array(t.z.string()).optional(),activation:t.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:t.z.array(t.z.string()),orientation:t.z.enum(["ROW","STATEMENT"]).optional(),condition:t.z.string().optional()}),t.z.object({name:t.z.string().optional(),enabled_mode:t.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()});let eD=`
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(t_enums.enums, '[]') as enums,
  coalesce(t_attributes.attributes, '[]') as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
  left join (
    select
      enumtypid,
      jsonb_agg(enumlabel order by enumsortorder) as enums
    from
      pg_enum
    group by
      enumtypid
  ) as t_enums on t_enums.enumtypid = t.oid
  left join (
    select
      oid,
      jsonb_agg(
        jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
        order by a.attnum asc
      ) as attributes
    from
      pg_class c
      join pg_attribute a on a.attrelid = c.oid
    where
      c.relkind = 'c' and not a.attisdropped
    group by
      c.oid
  ) as t_attributes on t_attributes.oid = t.typrelid
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,ex=t.z.object({id:t.z.number(),name:t.z.string(),schema:t.z.string(),format:t.z.string(),enums:t.z.array(t.z.string()),attributes:t.z.array(t.z.object({name:t.z.string(),type_id:t.z.number()})),comment:t.z.string().nullable()}),eU=t.z.array(ex),eM=`
select
  version(),
  current_setting('server_version_num')::int8 as version_number,
  (
    select
      count(*) as active_connections
    from
      pg_stat_activity
  ) as active_connections,
  current_setting('max_connections')::int8 as max_connections
`,ej=t.z.object({version:t.z.string(),version_number:t.z.number(),active_connections:t.z.number(),max_connections:t.z.number()}),eF=`
SELECT
  c.oid :: int8 AS id,
  n.nspname AS schema,
  c.relname AS name,
  (pg_relation_is_updatable(c.oid, false) & 20) = 20 AS is_updatable,
  obj_description(c.oid) AS comment
FROM
  pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'v'
`,ek=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_updatable:t.z.boolean(),comment:t.z.string().nullable(),columns:m.optional()}),eH=t.z.array(ek),eB=t.z.optional(ek),eP=({includeColumns:e})=>`
with views as (${eF})
  ${e?`, columns as (${d})`:""}
select
  *
  ${e?`, ${a("columns","columns.table_id = views.id")}`:""}
from views`;e.i(967533);var eY=e.i(721490),eq=e.i(332357),eG=e.i(193767),eW=e.i(212695),eJ=e.i(29659);e.s(["Query",()=>eY.Query,"QueryAction",()=>eW.QueryAction,"QueryFilter",()=>eG.QueryFilter,"QueryModifier",()=>eJ.QueryModifier,"countQuery",()=>eq.countQuery,"deleteQuery",()=>eq.deleteQuery,"insertQuery",()=>eq.insertQuery,"selectQuery",()=>eq.selectQuery,"truncateQuery",()=>eq.truncateQuery,"updateQuery",()=>eq.updateQuery],377171);var eQ=e.i(377171);let eV=["idx_users_email","idx_users_created_at_desc","idx_users_last_sign_in_at_desc","idx_users_name","users_phone_key"];e.s(["default",0,{roles:{list:function({includeDefaultRoles:e=!1,limit:t,offset:n}={}){let i=`
with
  roles as (${er})
select
  *
from
  roles
where
  true
`;return e||(i+=" and not pg_catalog.starts_with(name, 'pg_')"),t&&(i+=` limit ${t}`),n&&(i+=` offset ${n}`),{sql:i,zod:el}},retrieve:function(e){return{sql:`with roles as (${er}) select * from roles where ${ec(e)};`,zod:es}},create:function({name:e,isSuperuser:t=!1,canCreateDb:n=!1,canCreateRole:a=!1,inheritRole:r=!0,canLogin:o=!1,isReplicationRole:l=!1,canBypassRls:s=!1,connectionLimit:c=-1,password:d,validUntil:u,memberOf:m=[],members:p=[],admins:_=[],config:g={}}){return{sql:`
create role ${(0,i.ident)(e)}
  ${t?"superuser":""}
  ${n?"createdb":""}
  ${a?"createrole":""}
  ${r?"":"noinherit"}
  ${o?"login":""}
  ${l?"replication":""}
  ${s?"bypassrls":""}
  connection limit ${c}
  ${void 0===d?"":`password ${(0,i.literal)(d)}`}
  ${void 0===u?"":`valid until ${(0,i.literal)(u)}`}
  ${0===m.length?"":`in role ${m.map(i.ident).join(",")}`}
  ${0===p.length?"":`role ${p.map(i.ident).join(",")}`}
  ${0===_.length?"":`admin ${_.map(i.ident).join(",")}`}
  ;
${Object.entries(g).map(([t,n])=>`alter role ${(0,i.ident)(e)} set ${(0,i.ident)(t)} = ${(0,i.literal)(n)};`).join("\n")}
`}},update:function(e,t){let{name:n,isSuperuser:a,canCreateDb:r,canCreateRole:o,inheritRole:l,canLogin:s,isReplicationRole:c,canBypassRls:d,connectionLimit:u,password:m,validUntil:p}=t;return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ec(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===a?"":a?"superuser":"nosuperuser"}
    ${void 0===r?"":r?"createdb":"nocreatedb"}
    ${void 0===o?"":o?"createrole":"nocreaterole"}
    ${void 0===l?"":l?"inherit":"noinherit"}
    ${void 0===s?"":s?"login":"nologin"}
    ${void 0===c?"":c?"replication":"noreplication"}
    ${void 0===d?"":d?"bypassrls":"nobypassrls"}
    ${void 0===u?"":`connection limit ${u}`}
    ${void 0===m?"":`password ${(0,i.literal)(m)}`}
    ${void 0===p?"":"valid until %L"}
  ', old.name${void 0===p?"":`, ${(0,i.literal)(p)}`}));

  ${void 0===n?"":`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${(0,i.literal)(n)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${(0,i.literal)(n)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:t=!1}={}){return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ec(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${t?"if exists":""} %I;', old.name));
end
$$;
`}},zod:eo},columns:{list:function({tableId:e,includeSystemSchemas:t=!1,includedSchemas:a,excludedSchemas:o,limit:l,offset:s}={}){let c=`
with
  columns as (${d})
select
  *
from
  columns
where
 true
`,u=r(a,o,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return u&&(c+=` and schema ${u}`),void 0!==e&&(c+=` and table_id = ${(0,i.literal)(e)} `),l&&(c=`${c} limit ${l}`),s&&(c=`${c} offset ${s}`),{sql:c,zod:m}},retrieve:function(e){return{sql:`WITH columns AS (${d}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`schema = ${(0,i.literal)(e.schema)} AND ${(0,i.ident)("table")} = ${(0,i.literal)(e.table)} AND name = ${(0,i.literal)(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:p}},create:function({schema:e,table:t,name:n,type:a,default_value:r,default_value_format:o="literal",is_identity:l=!1,identity_generation:s="BY DEFAULT",is_nullable:c,is_primary_key:d=!1,is_unique:u=!1,comment:m,check:p}){let g="";if(l){if(void 0!==r)throw Error("Columns cannot both be identity and have a default value");g=`GENERATED ${s} AS IDENTITY`}else void 0===r||(g="expression"===o?`DEFAULT ${r}`:`DEFAULT ${(0,i.literal)(r)}`);let E="";void 0!==c&&(E=c?"NULL":"NOT NULL");let f=void 0===p?"":`CHECK (${p})`,$=void 0===m?"":`COMMENT ON COLUMN ${(0,i.ident)(e)}.${(0,i.ident)(t)}.${(0,i.ident)(n)} IS ${(0,i.literal)(m)}`;return{sql:`
BEGIN;
  ALTER TABLE ${(0,i.ident)(e)}.${(0,i.ident)(t)} ADD COLUMN ${(0,i.ident)(n)} ${_(a)}
    ${g}
    ${E}
    ${d?"PRIMARY KEY":""}
    ${u?"UNIQUE":""}
    ${f};
  ${$};
COMMIT;`}},update:function(e,{name:t,type:n,drop_default:a=!1,default_value:r,default_value_format:o="literal",is_identity:l,identity_generation:s="BY DEFAULT",is_nullable:c,is_unique:d,comment:u,check:m}){let p,g,E=void 0===t||t===e.name?"":`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} RENAME COLUMN ${(0,i.ident)(e.name)} TO ${(0,i.ident)(t)};`,f=void 0===n?"":`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)} SET DATA TYPE ${_(n)} USING ${(0,i.ident)(e.name)}::${_(n)};`;if(a)p=`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)} DROP DEFAULT;`;else if(void 0===r)p="";else{let t="expression"===o?r:(0,i.literal)(r);p=`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)} SET DEFAULT ${t};`}let $=`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)}`;!1===l?$+=" DROP IDENTITY IF EXISTS;":!0===e.is_identity?void 0===s?$="":$+=` SET GENERATED ${s};`:void 0===l?$="":$+=` ADD GENERATED ${s} AS IDENTITY;`,g=void 0===c?"":c?`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)} DROP NOT NULL;`:`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ALTER COLUMN ${(0,i.ident)(e.name)} SET NOT NULL;`;let b="";!0===e.is_unique&&!1===d?b=`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${(0,i.literal)(e.table_id)}
      AND conkey[1] = ${(0,i.literal)(e.ordinal_position)}
  LOOP
    EXECUTE ${(0,i.literal)(`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;
`:!1===e.is_unique&&!0===d&&(b=`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ADD UNIQUE (${(0,i.ident)(e.name)});`);let h=void 0===u?"":`COMMENT ON COLUMN ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)}.${(0,i.ident)(e.name)} IS ${(0,i.literal)(u)};`,A=void 0===m?"":`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${(0,i.literal)(e.table_id)}
    AND conkey[1] = ${(0,i.literal)(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;

  ${null!==m?`
  ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} ADD CONSTRAINT ${(0,i.ident)(`${e.table}_${e.name}_check`)} CHECK (${m});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${(0,i.literal)(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${(0,i.literal)(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';
`:""}
END
$$;
`;return{sql:`
BEGIN;
  ${g}
  ${f}
  ${p}
  ${$}
  ${b}
  ${h}
  ${A}
  ${E}
COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`ALTER TABLE ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)} DROP COLUMN ${(0,i.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}},zod:u},schemas:{list:function({includeSystemSchemas:e=!1,limit:t,offset:a}={}){let r=ed;return e||(r=`${r} and not (n.nspname in (${n.DEFAULT_SYSTEM_SCHEMAS.map(i.literal).join(",")}))`),t&&(r=`${r} limit ${t}`),a&&(r=`${r} offset ${a}`),{sql:r,zod:em}},retrieve:function({id:e,name:t}){return e?{sql:`${ed} and n.oid = ${(0,i.literal)(e)};`,zod:ep}:{sql:`${ed} and n.nspname = ${(0,i.literal)(t)};`,zod:ep}},create:function({name:e,owner:t}){return{sql:`create schema ${(0,i.ident)(e)}
  ${void 0===t?"":`authorization ${(0,i.ident)(t)}`};
`}},update:function({id:e,name:t},{name:n,owner:a}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,i.literal)(t)}::regnamespace`:(0,i.literal)(e)};
  old record;
  new_name text := ${void 0===n?null:(0,i.literal)(n)};
  new_owner text := ${void 0===a?null:(0,i.literal)(a)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  if new_owner is not null then
    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));
  end if;

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.nspname then
    execute(format('alter schema %I rename to %I;', old.nspname, new_name));
  end if;
end
$$;
`}},remove:function({id:e,name:t},{cascade:n=!1}={}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,i.literal)(t)}::regnamespace`:(0,i.literal)(e)};
  old record;
  cascade bool := ${(0,i.literal)(n)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:eu},tables:eI,functions:k,tablePrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o}={}){let l=`
with table_privileges as (${e_})
select *
from table_privileges
`,s=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),a&&(l+=` limit ${a}`),o&&(l+=` offset ${o}`),{sql:l,zod:eE}},retrieve:function({id:e,name:t,schema:n="public"}){return e?{sql:`
with table_privileges as (${e_})
select *
from table_privileges
where table_privileges.relation_id = ${(0,i.literal)(e)};`,zod:ef}:{sql:`
with table_privileges as (${e_})
select *
from table_privileges
where table_privileges.schema = ${(0,i.literal)(n)}
  and table_privileges.name = ${(0,i.literal)(t)}
`,zod:ef}},grant:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:n,isGrantable:a})=>`execute format('grant ${e} on table %s to ${"public"===n.toLowerCase()?"public":(0,i.ident)(n)} ${a?"with grant option":""}', ${t}::regclass);`).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:n})=>`execute format('revoke ${e} on table %s from ${"public"===n.toLowerCase()?"public":(0,i.ident)(n)}', ${t}::regclass);`).join("\n")}
end $$;
`}},zod:eg},publications:{list:function({limit:e,offset:t}={}){let n=`with publications as (${ee}) select * from publications`;return e&&(n+=` limit ${e}`),t&&(n+=` offset ${t}`),{sql:n,zod:ei}},retrieve:function(e){return{sql:`with publications as (${ee}) select * from publications where ${function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:ea}},create:function({name:e,publish_insert:t=!1,publish_update:n=!1,publish_delete:a=!1,publish_truncate:r=!1,tables:o=null}){let l;l=null==o?"FOR ALL TABLES":0===o.length?"":`FOR TABLE ${o.map(e=>{if(!e.includes("."))return(0,i.ident)(e);let[t,...n]=e.split("."),a=n.join(".");return`${(0,i.ident)(t)}.${(0,i.ident)(a)}`}).join(",")}`;let s=[];return t&&s.push("insert"),n&&s.push("update"),a&&s.push("delete"),r&&s.push("truncate"),{sql:`
CREATE PUBLICATION ${(0,i.ident)(e)} ${l}
  WITH (publish = '${s.join(",")}');`}},update:function(e,{name:t,owner:n,publish_insert:a,publish_update:r,publish_delete:o,publish_truncate:l,tables:s}){return{sql:`
do $$
declare
  id oid := ${(0,i.literal)(e)};
  old record;
  new_name text := ${void 0===t?null:(0,i.literal)(t)};
  new_owner text := ${void 0===n?null:(0,i.literal)(n)};
  new_publish_insert bool := ${a??null};
  new_publish_update bool := ${r??null};
  new_publish_delete bool := ${o??null};
  new_publish_truncate bool := ${l??null};
  new_tables text := ${void 0===s?null:(0,i.literal)(null===s?"all tables":s.map(e=>{if(!e.includes("."))return(0,i.ident)(e);let[t,...n]=e.split("."),a=n.join(".");return`${(0,i.ident)(t)}.${(0,i.ident)(a)}`}).join(","))};
begin
  select * into old from pg_publication where oid = id;
  if old is null then
    raise exception 'Cannot find publication with id %', id;
  end if;

  if new_tables is null then
    null;
  elsif new_tables = 'all tables' then
    if old.puballtables then
      null;
    else
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I for all tables;', old.pubname));
    end if;
  else
    if old.puballtables then
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I;', old.pubname));
    elsif exists(select from pg_publication_rel where prpubid = id) then
      execute(
        format(
          'alter publication %I drop table %s',
          old.pubname,
          (select string_agg(prrelid::regclass::text, ', ') from pg_publication_rel where prpubid = id)
        )
      );
    end if;

    -- At this point the publication must have no tables.

    if new_tables != '' then
      execute(format('alter publication %I add table %s', old.pubname, new_tables));
    end if;
  end if;

  execute(
    format(
      'alter publication %I set (publish = %L);',
      old.pubname,
      concat_ws(
        ', ',
        case when coalesce(new_publish_insert, old.pubinsert) then 'insert' end,
        case when coalesce(new_publish_update, old.pubupdate) then 'update' end,
        case when coalesce(new_publish_delete, old.pubdelete) then 'delete' end,
        case when coalesce(new_publish_truncate, old.pubtruncate) then 'truncate' end
      )
    )
  );

  execute(format('alter publication %I owner to %I;', old.pubname, coalesce(new_owner, old.pubowner::regrole::name)));

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.pubname then
    execute(format('alter publication %I rename to %I;', old.pubname, coalesce(new_name, old.pubname)));
  end if;

  -- We need to retrieve the publication later, so we need a way to uniquely identify which publication this is.
  -- We can't rely on id because it gets changed if it got recreated.
  -- We use a temp table to store the unique name - DO blocks can't return a value.
  create temp table pg_meta_publication_tmp (name) on commit drop as values (coalesce(new_name, old.pubname));
end $$;
`}},remove:function(e){return{sql:`DROP PUBLICATION IF EXISTS ${(0,i.ident)(e.name)};`}},zod:en},extensions:{list:function({limit:e,offset:t}={}){let n=$;return e&&(n=`${n} LIMIT ${e}`),t&&(n=`${n} OFFSET ${t}`),{sql:n,zod:h}},retrieve:function({name:e}){return{sql:`${$} WHERE name = ${(0,i.literal)(e)};`,zod:A}},create:function({name:e,schema:t,version:n,cascade:a=!1}){return{sql:`
CREATE EXTENSION ${(0,i.ident)(e)}
  ${void 0===t?"":`SCHEMA ${(0,i.ident)(t)}`}
  ${void 0===n?"":`VERSION ${(0,i.literal)(n)}`}
  ${a?"CASCADE":""};`}},update:function(e,{update:t=!1,version:n,schema:a}){let r="";t&&(r=`ALTER EXTENSION ${(0,i.ident)(e)} UPDATE ${void 0===n?"":`TO ${(0,i.literal)(n)}`};`);let o=void 0===a?"":`ALTER EXTENSION ${(0,i.ident)(e)} SET SCHEMA ${(0,i.ident)(a)};`;return{sql:`BEGIN; ${r} ${o} COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`DROP EXTENSION ${(0,i.ident)(e)} ${t?"CASCADE":"RESTRICT"};`}},zod:b},config:{list:function({limit:e,offset:t}={}){let n=g;return e&&(n+=` LIMIT ${e}`),t&&(n+=` OFFSET ${t}`),{sql:n,zod:f}},zod:E},materializedViews:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o,includeColumns:l=!0}={}){let s=Q({includeColumns:l}),c=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(s+=` where schema ${c}`),a&&(s+=` limit ${a}`),o&&(s+=` offset ${o}`),{sql:s,zod:W}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)} and ${(0,i.ident)("schema")} = ${(0,i.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${Q({includeColumns:!0})} where ${t};`,zod:J}},zod:G},foreignTables:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o,includeColumns:l=!0}={}){let s=y({includeColumns:l}),c=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(s+=` where schema ${c}`),a&&(s+=` limit ${a}`),o&&(s+=` offset ${o}`),{sql:s,zod:z}},retrieve:function(e){return{sql:`${y({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)} and ${(0,i.ident)("schema")} = ${(0,i.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:N}},zod:S},views:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o,includeColumns:l=!0}={}){let s=eP({includeColumns:l}),c=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(s+=` where schema ${c}`),a&&(s+=` limit ${a}`),o&&(s+=` offset ${o}`),{sql:s,zod:eH}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)} and ${(0,i.ident)("schema")} = ${(0,i.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eP({includeColumns:!0})} where ${t};`,zod:eB}},zod:ek},policies:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o}={}){let l=`
    with policies as (${V})
    select *
    from policies
    `,s=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=`where schema ${s}`),a&&(l+=` limit ${a}`),o&&(l+=` offset ${o}`),{sql:l,zod:K}},retrieve:function(e){return{sql:`with policies as (${V}) select * from policies where ${function(e){if("id"in e&&e.id)return`id = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`name = ${(0,i.literal)(e.name)} AND schema = ${(0,i.literal)(e.schema)} AND table = ${(0,i.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:Z}},create:function({name:e,schema:t="public",table:n,definition:a,check:r,action:o="PERMISSIVE",command:l="ALL",roles:s=["public"]}){return{sql:`
create policy ${(0,i.ident)(e)} on ${(0,i.ident)(t)}.${(0,i.ident)(n)}
  as ${o}
  for ${l}
  to ${s.map(i.ident).join(",")}
  ${a?`using (${a})`:""}
  ${r?`with check (${r})`:""};`}},update:function(e,t){let{name:n,definition:a,check:r,roles:o}=t,l=`ALTER POLICY ${(0,i.ident)(e.name)} ON ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)}`,s=void 0===n?"":`${l} RENAME TO ${(0,i.ident)(n)};`,c=void 0===a?"":`${l} USING (${a});`,d=void 0===r?"":`${l} WITH CHECK (${r});`,u=void 0===o?"":`${l} TO ${o.map(i.ident).join(",")};`;return{sql:`BEGIN; ${c} ${d} ${u} ${s} COMMIT;`}},remove:function(e){return{sql:`DROP POLICY ${(0,i.ident)(e.name)} ON ${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)};`}},zod:X},triggers:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o}={}){let l=`with triggers as (${ev}) select * from triggers`,s=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),a&&(l+=` limit ${a}`),o&&(l+=` offset ${o}`),{sql:l,zod:ew}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,i.ident)("id")} = ${(0,i.literal)(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return`${(0,i.ident)("name")} = ${(0,i.literal)(e.name)} and ${(0,i.ident)("schema")} = ${(0,i.literal)(e.schema)} and ${(0,i.ident)("table")} = ${(0,i.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:`with triggers as (${ev}) select * from triggers where ${t};`,zod:eC}},create:function({name:e,schema:n="public",table:a,function_schema:r="public",function_name:o,function_args:l=[],activation:s,events:c,orientation:d,condition:u}){let m=`${(0,i.ident)(n)}.${(0,i.ident)(a)}`,p=`${(0,i.ident)(r)}.${(0,i.ident)(o)}`,_=c.join(" or "),g=d?`for each ${d}`:"",E=u?`when (${u})`:"",f=l.map(i.literal).join(",");return{sql:`create trigger ${(0,i.ident)(e)} ${s} ${_} on ${m} ${g} ${E} execute function ${p}(${f});`,zod:t.z.void()}},update:function(e,n){let a=`${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)}`,r="";switch(n.enabled_mode){case"ORIGIN":r=`alter table ${a} enable trigger ${(0,i.ident)(e.name)};`;break;case"DISABLED":r=`alter table ${a} disable trigger ${(0,i.ident)(e.name)};`;break;case"REPLICA":case"ALWAYS":r=`alter table ${a} enable ${n.enabled_mode} trigger ${(0,i.ident)(e.name)};`}let o=n.name&&n.name!==e.name?`alter trigger ${(0,i.ident)(e.name)} on ${a} rename to ${(0,i.ident)(n.name)};`:"";return{sql:`begin; ${r}; ${o}; commit;`,zod:t.z.void()}},remove:function(e,{cascade:n=!1}={}){let a=`${(0,i.ident)(e.schema)}.${(0,i.ident)(e.table)}`;return{sql:`drop trigger ${(0,i.ident)(e.name)} on ${a} ${n?"cascade":""};`,zod:t.z.void()}},zod:eO},types:{list:function({includeArrayTypes:e=!1,includeSystemSchemas:t=!1,includedSchemas:i,excludedSchemas:a,limit:o,offset:l}={}){let s=eD;e||(s+=` and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let c=r(i,a,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(s+=` and n.nspname ${c}`),o&&(s+=` limit ${o}`),l&&(s+=` offset ${l}`),{sql:s,zod:eU}},zod:ex},version:{retrieve:function(){return{sql:eM,zod:ej}},zod:ej},indexes:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:a,offset:o}={}){let l=`
    with indexes as (${H})
    select *
    from indexes
  `,s=r(t,i,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),a&&(l+=` limit ${a}`),o&&(l+=` offset ${o}`),{sql:l,zod:P}},retrieve:function({id:e}){return{sql:`
    with indexes as (${H})
    select *
    from indexes
    where id = ${(0,i.literal)(e)};
  `,zod:Y}},zod:B},columnPrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,columnIds:l,limit:s,offset:d}={}){let u=`
  with column_privileges as (${o})
  select *
  from column_privileges
  `,m=[],p=r(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return p&&m.push(`relation_schema ${p}`),l?.length&&m.push(`column_id in (${l.map(i.literal).join(",")})`),m.length>0&&(u+=` where ${m.join(" and ")}`),s&&(u+=` limit ${s}`),d&&(u+=` offset ${d}`),{sql:u,zod:c}},grant:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:n,isGrantable:a})=>{let[r,o]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,i.literal)(r)}
  and a.attnum = ${(0,i.literal)(o)}
into col;
execute format(
  'grant ${e} (%I) on %s to ${"public"===n.toLowerCase()?"public":(0,i.ident)(n)} ${a?"with grant option":""}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:n})=>{let[a,r]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,i.literal)(a)}
  and a.attnum = ${(0,i.literal)(r)}
into col;
execute format(
  'revoke ${e} (%I) on %s from ${"public"===n.toLowerCase()?"public":(0,i.ident)(n)}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},zod:s},query:eQ,getIndexWorkerStatusSQL:()=>`SELECT EXISTS (
    SELECT 1 FROM pg_locks
    WHERE locktype = 'advisory'
    AND (classid::bigint << 32 | objid::bigint) = hashtext('auth_index_worker')::bigint
  ) as is_in_progress;`,getIndexStatusesSQL:()=>`SELECT c.relname as index_name, i.indisvalid as is_valid, i.indisready as is_ready
    FROM pg_index i
    JOIN pg_class c ON c.oid = i.indexrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth'
    AND c.relname IN (${eV.map(i.literal).join(", ")});`,USER_SEARCH_INDEXES:eV}],755216)}]);

//# debugId=ae11fe2c-4bce-38bb-834a-6526b00322ad
//# sourceMappingURL=5d466a1f1518a702.js.map