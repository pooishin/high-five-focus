;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="fce4f681-98df-ae1f-3e6f-6c127c7da2af")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,755216,e=>{"use strict";var n=e.i(97429),t=e.i(248593),a=e.i(479084);let i=(e,n)=>`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${e})) FILTER (WHERE ${n})
    FROM
      ${e}
  ),
  '{}'
) AS ${e}`;function r(e,n,t){return(t&&(n=t.concat(n??[])),e?.length)?`IN (${e.map(a.literal).join(",")})`:n?.length?`NOT IN (${n.map(a.literal).join(",")})`:""}let o=`
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
`,l=n.z.object({grantor:n.z.string(),grantee:n.z.string(),privilege_type:n.z.union([n.z.literal("SELECT"),n.z.literal("INSERT"),n.z.literal("UPDATE"),n.z.literal("REFERENCES")]),is_grantable:n.z.boolean()}),s=n.z.object({column_id:n.z.string(),relation_schema:n.z.string(),relation_name:n.z.string(),column_name:n.z.string(),privileges:n.z.array(l)}),d=n.z.array(s);n.z.object({columnId:n.z.string(),grantee:n.z.string(),privilegeType:n.z.union([n.z.literal("ALL"),n.z.literal("SELECT"),n.z.literal("INSERT"),n.z.literal("UPDATE"),n.z.literal("REFERENCES")]),isGrantable:n.z.boolean().optional()});let c=`
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
`,m=n.z.object({id:n.z.string(),table_id:n.z.number(),schema:n.z.string(),table:n.z.string(),name:n.z.string(),ordinal_position:n.z.number(),data_type:n.z.string(),format:n.z.string(),is_identity:n.z.boolean(),identity_generation:n.z.string().nullable(),is_generated:n.z.boolean(),is_nullable:n.z.boolean(),is_updatable:n.z.boolean(),is_unique:n.z.boolean(),check:n.z.string().nullable(),default_value:n.z.any().nullable(),enums:n.z.array(n.z.string()),comment:n.z.string().nullable()}),p=n.z.array(m),_=n.z.optional(m),u=e=>e.endsWith("[]")?`${(0,a.ident)(e.slice(0,-2))}[]`:e.includes(".")?e:(0,a.ident)(e),g=`
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
`,b=n.z.object({name:n.z.string(),setting:n.z.string(),category:n.z.string(),group:n.z.string(),subgroup:n.z.string(),unit:n.z.string().nullable(),short_desc:n.z.string(),extra_desc:n.z.string().nullable(),context:n.z.string(),vartype:n.z.string(),source:n.z.string(),min_val:n.z.string().nullable(),max_val:n.z.string().nullable(),enumvals:n.z.array(n.z.string()).nullable(),boot_val:n.z.string().nullable(),reset_val:n.z.string().nullable(),sourcefile:n.z.string().nullable(),sourceline:n.z.number().nullable(),pending_restart:n.z.boolean()}),E=n.z.array(b),$=`
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
`,f=n.z.object({name:n.z.string(),schema:n.z.string().nullable(),default_version:n.z.string(),installed_version:n.z.string().nullable(),comment:n.z.string()}),h=n.z.array(f),z=n.z.optional(f),A=`
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
`,y=n.z.object({id:n.z.number(),schema:n.z.string(),name:n.z.string(),comment:n.z.string().nullable(),foreign_server_name:n.z.string(),foreign_data_wrapper_name:n.z.string(),foreign_data_wrapper_handler:n.z.string(),columns:p.optional()}),S=n.z.array(y),T=n.z.optional(y),N=({includeColumns:e})=>`
with foreign_tables as (${A})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = foreign_tables.id")}`:""}
from foreign_tables`,v=`
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
`,w=n.z.object({id:n.z.number(),schema:n.z.string(),name:n.z.string(),language:n.z.string(),definition:n.z.string(),complete_statement:n.z.string(),args:n.z.array(n.z.object({mode:n.z.union([n.z.literal("in"),n.z.literal("out"),n.z.literal("inout"),n.z.literal("variadic"),n.z.literal("table")]),name:n.z.string(),type_id:n.z.number(),has_default:n.z.boolean()})),argument_types:n.z.string(),identity_argument_types:n.z.string(),return_type_id:n.z.number(),return_type:n.z.string(),return_type_relation_id:n.z.union([n.z.number(),n.z.null()]),is_set_returning_function:n.z.boolean(),behavior:n.z.union([n.z.literal("IMMUTABLE"),n.z.literal("STABLE"),n.z.literal("VOLATILE")]),security_definer:n.z.boolean(),config_params:n.z.union([n.z.record(n.z.string(),n.z.string()),n.z.null()])}),L=n.z.array(w),R=n.z.optional(w);function I({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o}={}){let l=`
    with f as (
      ${v}
    )
    select
      f.*
    from f
  `,s=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),i&&(l=`${l} limit ${i}`),o&&(l=`${l} offset ${o}`),{sql:l,zod:L}}function O({id:e,name:n,schema:t="public",args:i=[]}){if(e)return{sql:`
      with f as (
        ${v}
      )
      select
        f.*
      from f where id = ${(0,a.literal)(e)};`,zod:R};if(n&&t&&i)return{sql:`with f as (
      ${v}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${(0,a.literal)(t)} and name = ${(0,a.literal)(n)} and p.proargtypes::text = ${i.length?`(
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
                  array[${i.map(a.literal)}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:(0,a.literal)("")}`,zod:R};throw Error("Must provide either id or name and schema")}let C=n.z.object({name:n.z.string(),definition:n.z.string(),args:n.z.array(n.z.string()).optional(),behavior:n.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:n.z.record(n.z.string(),n.z.string()).optional(),schema:n.z.string().optional(),language:n.z.string().optional(),return_type:n.z.string().optional(),security_definer:n.z.boolean().optional()});function x({name:e,schema:n,args:t,definition:i,return_type:r,language:o,behavior:l,security_definer:s,config_params:d},{replace:c=!1}={}){return`
    CREATE ${c?"OR REPLACE":""} FUNCTION ${(0,a.ident)(n)}.${(0,a.ident)(e)}(${t?.join(", ")||""})
    RETURNS ${r}
    AS ${(0,a.literal)(i)}
    LANGUAGE ${o}
    ${l}
    CALLED ON NULL INPUT
    ${s?"SECURITY DEFINER":"SECURITY INVOKER"}
    ${d?Object.entries(d).map(([e,n])=>`SET ${e} ${"FROM CURRENT"===n?"FROM CURRENT":"TO "+('""'===n?"''":n)}`).join("\n"):""};
  `}function D({name:e,schema:t="public",args:a=[],definition:i,return_type:r="void",language:o="sql",behavior:l="VOLATILE",security_definer:s=!1,config_params:d={}}){return{sql:x({name:e,schema:t,args:a,definition:i,return_type:r,language:o,behavior:l,security_definer:s,config_params:d}),zod:n.z.void()}}let j=n.z.object({name:n.z.string().optional(),schema:n.z.string().optional(),definition:n.z.string().optional()});function M(e,{name:t,schema:i,definition:r}){let o=e.argument_types.split(", "),l=e.identity_argument_types,s="string"==typeof r?x({...e,definition:r,args:o,config_params:e.config_params??{}},{replace:!0}):"",d=t&&t!==e.name?`ALTER FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}(${l}) RENAME TO ${(0,a.ident)(t)};`:"",c=i&&i!==e.schema?`ALTER FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(t||e.name)}(${l})  SET SCHEMA ${(0,a.ident)(i)};`:"";return{sql:`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof r?"TRUE":"FALSE"} THEN
        ${s}

        IF (
          SELECT id
          FROM (${v}) AS f
          WHERE f.schema = ${(0,a.literal)(e.schema)}
          AND f.name = ${(0,a.literal)(e.name)}
          AND f.identity_argument_types = ${(0,a.literal)(l)}
        ) != ${e.id} THEN
          RAISE EXCEPTION 'Cannot find function "${e.schema}"."${e.name}"(${l})';
        END IF;
      END IF;

      ${d}

      ${c}
    END;
    $$;
  `,zod:n.z.void()}}let U=n.z.object({cascade:n.z.boolean().default(!1).optional()});function F(e,{cascade:t=!1}={}){return{sql:`DROP FUNCTION ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}
  (${e.identity_argument_types})
  ${t?"CASCADE":"RESTRICT"};`,zod:n.z.void()}}e.s(["create",()=>D,"list",()=>I,"pgFunctionArrayZod",0,L,"pgFunctionCreateZod",0,C,"pgFunctionDeleteZod",0,U,"pgFunctionOptionalZod",0,R,"pgFunctionUpdateZod",0,j,"pgFunctionZod",0,w,"remove",()=>F,"retrieve",()=>O,"update",()=>M],198687);var k=e.i(198687);let H=`
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
`,q=n.z.object({id:n.z.number(),table_id:n.z.number(),schema:n.z.string(),number_of_attributes:n.z.number(),number_of_key_attributes:n.z.number(),is_unique:n.z.boolean(),is_primary:n.z.boolean(),is_exclusion:n.z.boolean(),is_immediate:n.z.boolean(),is_clustered:n.z.boolean(),is_valid:n.z.boolean(),check_xmin:n.z.boolean(),is_ready:n.z.boolean(),is_live:n.z.boolean(),is_replica_identity:n.z.boolean(),key_attributes:n.z.array(n.z.number()),collation:n.z.array(n.z.number()),class:n.z.array(n.z.number()),options:n.z.array(n.z.number()),index_predicate:n.z.string().nullable(),comment:n.z.string().nullable(),index_definition:n.z.string(),access_method:n.z.string(),index_attributes:n.z.array(n.z.object({attribute_number:n.z.number(),attribute_name:n.z.string(),data_type:n.z.string()}))}),B=n.z.array(q),P=n.z.optional(q),W=`
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
`,Y=n.z.object({id:n.z.number(),schema:n.z.string(),name:n.z.string(),is_populated:n.z.boolean(),comment:n.z.string().nullable(),columns:p.optional()}),G=n.z.array(Y),J=n.z.optional(Y),Q=({includeColumns:e})=>`
with materialized_views as (${W})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = materialized_views.id")}`:""}
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
`,X=n.z.object({id:n.z.number(),schema:n.z.string(),table:n.z.string(),table_id:n.z.number(),name:n.z.string(),action:n.z.union([n.z.literal("PERMISSIVE"),n.z.literal("RESTRICTIVE")]),roles:n.z.array(n.z.string()),command:n.z.union([n.z.literal("SELECT"),n.z.literal("INSERT"),n.z.literal("UPDATE"),n.z.literal("DELETE"),n.z.literal("ALL")]),definition:n.z.union([n.z.string(),n.z.null()]),check:n.z.union([n.z.string(),n.z.null()])}),K=n.z.array(X),Z=n.z.optional(X),ee=`
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
`,en=n.z.object({id:n.z.number().optional(),name:n.z.string(),schema:n.z.string()}),et=n.z.object({id:n.z.number(),name:n.z.string(),owner:n.z.string(),publish_insert:n.z.boolean(),publish_update:n.z.boolean(),publish_delete:n.z.boolean(),publish_truncate:n.z.boolean(),tables:n.z.array(en).nullable()}),ea=n.z.array(et),ei=n.z.optional(et),er=`
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
`,eo=n.z.object({id:n.z.number(),name:n.z.string(),isSuperuser:n.z.boolean(),canCreateDb:n.z.boolean(),canCreateRole:n.z.boolean(),inheritRole:n.z.boolean(),canLogin:n.z.boolean(),isReplicationRole:n.z.boolean(),canBypassRls:n.z.boolean(),activeConnections:n.z.number(),connectionLimit:n.z.number(),validUntil:n.z.union([n.z.string(),n.z.null()]),config:n.z.record(n.z.string(),n.z.string())}),el=n.z.array(eo),es=n.z.optional(eo);function ed(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or name")}let ec=`
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
`,em=n.z.object({id:n.z.number(),name:n.z.string(),owner:n.z.string(),comment:n.z.string().nullable()}),ep=n.z.array(em),e_=n.z.optional(em),eu=`
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
`,eg=n.z.object({relation_id:n.z.number(),schema:n.z.string(),name:n.z.string(),kind:n.z.union([n.z.literal("table"),n.z.literal("view"),n.z.literal("materialized_view"),n.z.literal("foreign_table"),n.z.literal("partitioned_table")]),privileges:n.z.array(n.z.object({grantor:n.z.string(),grantee:n.z.string(),privilege_type:n.z.union([n.z.literal("SELECT"),n.z.literal("INSERT"),n.z.literal("UPDATE"),n.z.literal("DELETE"),n.z.literal("TRUNCATE"),n.z.literal("REFERENCES"),n.z.literal("TRIGGER"),n.z.literal("MAINTAIN")]),is_grantable:n.z.boolean()}))}),eb=n.z.array(eg),eE=n.z.optional(eg),e$=`
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
`,ef=n.z.object({table_id:n.z.number(),name:n.z.string(),schema:n.z.string(),table_name:n.z.string()}),eh=n.z.object({id:n.z.number(),constraint_name:n.z.string(),source_schema:n.z.string(),source_table_name:n.z.string(),source_column_name:n.z.string(),target_table_schema:n.z.string(),target_table_name:n.z.string(),target_column_name:n.z.string()}),ez=n.z.object({id:n.z.number(),schema:n.z.string(),name:n.z.string(),rls_enabled:n.z.boolean(),rls_forced:n.z.boolean(),replica_identity:n.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:n.z.number(),size:n.z.string(),live_rows_estimate:n.z.number(),dead_rows_estimate:n.z.number(),comment:n.z.string().nullable(),primary_keys:n.z.array(ef),relationships:n.z.array(eh),columns:p.optional()}),eA=n.z.array(ez);function ey({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o,includeColumns:l=!0}={}){let s=eN({includeColumns:l}),d=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),o&&(s+=` offset ${o}`),{sql:s,zod:eA}}function eS(e){let n=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eN({includeColumns:!0})} where ${n};`,zod:ez}}function eT(e,{cascade:n=!1}={}){return{sql:`DROP TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)} ${n?"CASCADE":"RESTRICT"};`}}let eN=({includeColumns:e})=>`
  with tables as (${e$})
  ${e?`, columns as (${c})`:""}
  select
    *
    ${e?`, ${i("columns","columns.table_id = tables.id")}`:""}
  from tables`;function ev({name:e,schema:n="public",comment:t}){let i=`CREATE TABLE ${(0,a.ident)(n)}.${(0,a.ident)(e)} ();`,r=void 0!=t?`COMMENT ON TABLE ${(0,a.ident)(n)}.${(0,a.ident)(e)} IS ${(0,a.literal)(t)};`:"";return{sql:`BEGIN; ${i} ${r} COMMIT;`}}function ew(e,{name:n,schema:t,rls_enabled:i,rls_forced:r,replica_identity:o,replica_identity_index:l,primary_keys:s,comment:d}){let c=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)}`,m=void 0===t?"":`${c} SET SCHEMA ${(0,a.ident)(t)};`,p="";if(void 0!==n&&n!==e.name){let i=void 0===t?e.schema:t;p=`ALTER TABLE ${(0,a.ident)(i)}.${(0,a.ident)(e.name)} RENAME TO ${(0,a.ident)(n)};`}let _="";if(void 0!==i){let e=`${c} ENABLE ROW LEVEL SECURITY;`,n=`${c} DISABLE ROW LEVEL SECURITY;`;_=i?e:n}let u="";if(void 0!==r){let e=`${c} FORCE ROW LEVEL SECURITY;`,n=`${c} NO FORCE ROW LEVEL SECURITY;`;u=r?e:n}let g="";void 0===o||(g="INDEX"===o?`${c} REPLICA IDENTITY USING INDEX ${l};`:`${c} REPLICA IDENTITY ${o};`);let b="";void 0===s||(b+=`
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${(0,a.literal)(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${(0,a.literal)(`${c} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===s.length||(b+=`${c} ADD PRIMARY KEY (${s.map(e=>(0,a.ident)(e.name)).join(",")});`));let E=void 0==d?"":`COMMENT ON TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.name)} IS ${(0,a.literal)(d)};`;return{sql:`
BEGIN;
  ${_}
  ${u}
  ${g}
  ${b}
  ${E}
  ${m}
  ${p}
COMMIT;`}}e.s(["create",()=>ev,"list",()=>ey,"remove",()=>eT,"retrieve",()=>eS,"update",()=>ew],330006);var eL=e.i(330006);let eR=`
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
`,eI=n.z.object({id:n.z.number(),table_id:n.z.number(),enabled_mode:n.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:n.z.array(n.z.string()),name:n.z.string(),table:n.z.string(),schema:n.z.string(),condition:n.z.string().nullable(),orientation:n.z.string(),activation:n.z.string(),events:n.z.array(n.z.string()),function_name:n.z.string(),function_schema:n.z.string()}),eO=n.z.array(eI),eC=n.z.optional(eI);n.z.object({name:n.z.string(),schema:n.z.string().optional().default("public"),table:n.z.string(),function_schema:n.z.string().optional().default("public"),function_name:n.z.string(),function_args:n.z.array(n.z.string()).optional(),activation:n.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:n.z.array(n.z.string()),orientation:n.z.enum(["ROW","STATEMENT"]).optional(),condition:n.z.string().optional()}),n.z.object({name:n.z.string().optional(),enabled_mode:n.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()});let ex=`
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
`,eD=n.z.object({id:n.z.number(),name:n.z.string(),schema:n.z.string(),format:n.z.string(),enums:n.z.array(n.z.string()),attributes:n.z.array(n.z.object({name:n.z.string(),type_id:n.z.number()})),comment:n.z.string().nullable()}),ej=n.z.array(eD),eM=`
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
`,eU=n.z.object({version:n.z.string(),version_number:n.z.number(),active_connections:n.z.number(),max_connections:n.z.number()}),eF=`
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
`,ek=n.z.object({id:n.z.number(),schema:n.z.string(),name:n.z.string(),is_updatable:n.z.boolean(),comment:n.z.string().nullable(),columns:p.optional()}),eH=n.z.array(ek),eq=n.z.optional(ek),eB=({includeColumns:e})=>`
with views as (${eF})
  ${e?`, columns as (${c})`:""}
select
  *
  ${e?`, ${i("columns","columns.table_id = views.id")}`:""}
from views`;e.i(967533);var eP=e.i(721490),eW=e.i(332357),eY=e.i(193767),eG=e.i(212695),eJ=e.i(29659);e.s(["Query",()=>eP.Query,"QueryAction",()=>eG.QueryAction,"QueryFilter",()=>eY.QueryFilter,"QueryModifier",()=>eJ.QueryModifier,"countQuery",()=>eW.countQuery,"deleteQuery",()=>eW.deleteQuery,"insertQuery",()=>eW.insertQuery,"selectQuery",()=>eW.selectQuery,"truncateQuery",()=>eW.truncateQuery,"updateQuery",()=>eW.updateQuery],377171);var eQ=e.i(377171);let eV=["idx_users_email","idx_users_created_at_desc","idx_users_last_sign_in_at_desc","idx_users_name","users_phone_key"];e.s(["default",0,{roles:{list:function({includeDefaultRoles:e=!1,limit:n,offset:t}={}){let a=`
with
  roles as (${er})
select
  *
from
  roles
where
  true
`;return e||(a+=" and not pg_catalog.starts_with(name, 'pg_')"),n&&(a+=` limit ${n}`),t&&(a+=` offset ${t}`),{sql:a,zod:el}},retrieve:function(e){return{sql:`with roles as (${er}) select * from roles where ${ed(e)};`,zod:es}},create:function({name:e,isSuperuser:n=!1,canCreateDb:t=!1,canCreateRole:i=!1,inheritRole:r=!0,canLogin:o=!1,isReplicationRole:l=!1,canBypassRls:s=!1,connectionLimit:d=-1,password:c,validUntil:m,memberOf:p=[],members:_=[],admins:u=[],config:g={}}){return{sql:`
create role ${(0,a.ident)(e)}
  ${n?"superuser":""}
  ${t?"createdb":""}
  ${i?"createrole":""}
  ${r?"":"noinherit"}
  ${o?"login":""}
  ${l?"replication":""}
  ${s?"bypassrls":""}
  connection limit ${d}
  ${void 0===c?"":`password ${(0,a.literal)(c)}`}
  ${void 0===m?"":`valid until ${(0,a.literal)(m)}`}
  ${0===p.length?"":`in role ${p.map(a.ident).join(",")}`}
  ${0===_.length?"":`role ${_.map(a.ident).join(",")}`}
  ${0===u.length?"":`admin ${u.map(a.ident).join(",")}`}
  ;
${Object.entries(g).map(([n,t])=>`alter role ${(0,a.ident)(e)} set ${(0,a.ident)(n)} = ${(0,a.literal)(t)};`).join("\n")}
`}},update:function(e,n){let{name:t,isSuperuser:i,canCreateDb:r,canCreateRole:o,inheritRole:l,canLogin:s,isReplicationRole:d,canBypassRls:c,connectionLimit:m,password:p,validUntil:_}=n;return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ed(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===i?"":i?"superuser":"nosuperuser"}
    ${void 0===r?"":r?"createdb":"nocreatedb"}
    ${void 0===o?"":o?"createrole":"nocreaterole"}
    ${void 0===l?"":l?"inherit":"noinherit"}
    ${void 0===s?"":s?"login":"nologin"}
    ${void 0===d?"":d?"replication":"noreplication"}
    ${void 0===c?"":c?"bypassrls":"nobypassrls"}
    ${void 0===m?"":`connection limit ${m}`}
    ${void 0===p?"":`password ${(0,a.literal)(p)}`}
    ${void 0===_?"":"valid until %L"}
  ', old.name${void 0===_?"":`, ${(0,a.literal)(_)}`}));

  ${void 0===t?"":`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${(0,a.literal)(t)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${(0,a.literal)(t)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:n=!1}={}){return{sql:`
do $$
declare
  old record;
begin
  with roles as (${er})
  select * into old from roles where ${ed(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${n?"if exists":""} %I;', old.name));
end
$$;
`}},zod:eo},columns:{list:function({tableId:e,includeSystemSchemas:n=!1,includedSchemas:i,excludedSchemas:o,limit:l,offset:s}={}){let d=`
with
  columns as (${c})
select
  *
from
  columns
where
 true
`,m=r(i,o,n?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return m&&(d+=` and schema ${m}`),void 0!==e&&(d+=` and table_id = ${(0,a.literal)(e)} `),l&&(d=`${d} limit ${l}`),s&&(d=`${d} offset ${s}`),{sql:d,zod:p}},retrieve:function(e){return{sql:`WITH columns AS (${c}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`schema = ${(0,a.literal)(e.schema)} AND ${(0,a.ident)("table")} = ${(0,a.literal)(e.table)} AND name = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:_}},create:function({schema:e,table:n,name:t,type:i,default_value:r,default_value_format:o="literal",is_identity:l=!1,identity_generation:s="BY DEFAULT",is_nullable:d,is_primary_key:c=!1,is_unique:m=!1,comment:p,check:_}){let g="";if(l){if(void 0!==r)throw Error("Columns cannot both be identity and have a default value");g=`GENERATED ${s} AS IDENTITY`}else void 0===r||(g="expression"===o?`DEFAULT ${r}`:`DEFAULT ${(0,a.literal)(r)}`);let b="";void 0!==d&&(b=d?"NULL":"NOT NULL");let E=void 0===_?"":`CHECK (${_})`,$=void 0===p?"":`COMMENT ON COLUMN ${(0,a.ident)(e)}.${(0,a.ident)(n)}.${(0,a.ident)(t)} IS ${(0,a.literal)(p)}`;return{sql:`
BEGIN;
  ALTER TABLE ${(0,a.ident)(e)}.${(0,a.ident)(n)} ADD COLUMN ${(0,a.ident)(t)} ${u(i)}
    ${g}
    ${b}
    ${c?"PRIMARY KEY":""}
    ${m?"UNIQUE":""}
    ${E};
  ${$};
COMMIT;`}},update:function(e,{name:n,type:t,drop_default:i=!1,default_value:r,default_value_format:o="literal",is_identity:l,identity_generation:s="BY DEFAULT",is_nullable:d,is_unique:c,comment:m,check:p}){let _,g,b=void 0===n||n===e.name?"":`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} RENAME COLUMN ${(0,a.ident)(e.name)} TO ${(0,a.ident)(n)};`,E=void 0===t?"":`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET DATA TYPE ${u(t)} USING ${(0,a.ident)(e.name)}::${u(t)};`;if(i)_=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} DROP DEFAULT;`;else if(void 0===r)_="";else{let n="expression"===o?r:(0,a.literal)(r);_=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET DEFAULT ${n};`}let $=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)}`;!1===l?$+=" DROP IDENTITY IF EXISTS;":!0===e.is_identity?void 0===s?$="":$+=` SET GENERATED ${s};`:void 0===l?$="":$+=` ADD GENERATED ${s} AS IDENTITY;`,g=void 0===d?"":d?`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} DROP NOT NULL;`:`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ALTER COLUMN ${(0,a.ident)(e.name)} SET NOT NULL;`;let f="";!0===e.is_unique&&!1===c?f=`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${(0,a.literal)(e.table_id)}
      AND conkey[1] = ${(0,a.literal)(e.ordinal_position)}
  LOOP
    EXECUTE ${(0,a.literal)(`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;
`:!1===e.is_unique&&!0===c&&(f=`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ADD UNIQUE (${(0,a.ident)(e.name)});`);let h=void 0===m?"":`COMMENT ON COLUMN ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}.${(0,a.ident)(e.name)} IS ${(0,a.literal)(m)};`,z=void 0===p?"":`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${(0,a.literal)(e.table_id)}
    AND conkey[1] = ${(0,a.literal)(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;

  ${null!==p?`
  ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} ADD CONSTRAINT ${(0,a.ident)(`${e.table}_${e.name}_check`)} CHECK (${p});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${(0,a.literal)(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${(0,a.literal)(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';
`:""}
END
$$;
`;return{sql:`
BEGIN;
  ${g}
  ${E}
  ${_}
  ${$}
  ${f}
  ${h}
  ${z}
  ${b}
COMMIT;`}},remove:function(e,{cascade:n=!1}={}){return{sql:`ALTER TABLE ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)} DROP COLUMN ${(0,a.ident)(e.name)} ${n?"CASCADE":"RESTRICT"};`}},zod:m},schemas:{list:function({includeSystemSchemas:e=!1,limit:n,offset:i}={}){let r=ec;return e||(r=`${r} and not (n.nspname in (${t.DEFAULT_SYSTEM_SCHEMAS.map(a.literal).join(",")}))`),n&&(r=`${r} limit ${n}`),i&&(r=`${r} offset ${i}`),{sql:r,zod:ep}},retrieve:function({id:e,name:n}){return e?{sql:`${ec} and n.oid = ${(0,a.literal)(e)};`,zod:e_}:{sql:`${ec} and n.nspname = ${(0,a.literal)(n)};`,zod:e_}},create:function({name:e,owner:n}){return{sql:`create schema ${(0,a.ident)(e)}
  ${void 0===n?"":`authorization ${(0,a.ident)(n)}`};
`}},update:function({id:e,name:n},{name:t,owner:i}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,a.literal)(n)}::regnamespace`:(0,a.literal)(e)};
  old record;
  new_name text := ${void 0===t?null:(0,a.literal)(t)};
  new_owner text := ${void 0===i?null:(0,a.literal)(i)};
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
`}},remove:function({id:e,name:n},{cascade:t=!1}={}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,a.literal)(n)}::regnamespace`:(0,a.literal)(e)};
  old record;
  cascade bool := ${(0,a.literal)(t)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:em},tables:eL,functions:k,tablePrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o}={}){let l=`
with table_privileges as (${eu})
select *
from table_privileges
`,s=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),i&&(l+=` limit ${i}`),o&&(l+=` offset ${o}`),{sql:l,zod:eb}},retrieve:function({id:e,name:n,schema:t="public"}){return e?{sql:`
with table_privileges as (${eu})
select *
from table_privileges
where table_privileges.relation_id = ${(0,a.literal)(e)};`,zod:eE}:{sql:`
with table_privileges as (${eu})
select *
from table_privileges
where table_privileges.schema = ${(0,a.literal)(t)}
  and table_privileges.name = ${(0,a.literal)(n)}
`,zod:eE}},grant:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:n,grantee:t,isGrantable:i})=>`execute format('grant ${e} on table %s to ${"public"===t.toLowerCase()?"public":(0,a.ident)(t)} ${i?"with grant option":""}', ${n}::regclass);`).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:n,grantee:t})=>`execute format('revoke ${e} on table %s from ${"public"===t.toLowerCase()?"public":(0,a.ident)(t)}', ${n}::regclass);`).join("\n")}
end $$;
`}},zod:eg},publications:{list:function({limit:e,offset:n}={}){let t=`with publications as (${ee}) select * from publications`;return e&&(t+=` limit ${e}`),n&&(t+=` offset ${n}`),{sql:t,zod:ea}},retrieve:function(e){return{sql:`with publications as (${ee}) select * from publications where ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:ei}},create:function({name:e,publish_insert:n=!1,publish_update:t=!1,publish_delete:i=!1,publish_truncate:r=!1,tables:o=null}){let l;l=null==o?"FOR ALL TABLES":0===o.length?"":`FOR TABLE ${o.map(e=>{if(!e.includes("."))return(0,a.ident)(e);let[n,...t]=e.split("."),i=t.join(".");return`${(0,a.ident)(n)}.${(0,a.ident)(i)}`}).join(",")}`;let s=[];return n&&s.push("insert"),t&&s.push("update"),i&&s.push("delete"),r&&s.push("truncate"),{sql:`
CREATE PUBLICATION ${(0,a.ident)(e)} ${l}
  WITH (publish = '${s.join(",")}');`}},update:function(e,{name:n,owner:t,publish_insert:i,publish_update:r,publish_delete:o,publish_truncate:l,tables:s}){return{sql:`
do $$
declare
  id oid := ${(0,a.literal)(e)};
  old record;
  new_name text := ${void 0===n?null:(0,a.literal)(n)};
  new_owner text := ${void 0===t?null:(0,a.literal)(t)};
  new_publish_insert bool := ${i??null};
  new_publish_update bool := ${r??null};
  new_publish_delete bool := ${o??null};
  new_publish_truncate bool := ${l??null};
  new_tables text := ${void 0===s?null:(0,a.literal)(null===s?"all tables":s.map(e=>{if(!e.includes("."))return(0,a.ident)(e);let[n,...t]=e.split("."),i=t.join(".");return`${(0,a.ident)(n)}.${(0,a.ident)(i)}`}).join(","))};
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
`}},remove:function(e){return{sql:`DROP PUBLICATION IF EXISTS ${(0,a.ident)(e.name)};`}},zod:et},extensions:{list:function({limit:e,offset:n}={}){let t=$;return e&&(t=`${t} LIMIT ${e}`),n&&(t=`${t} OFFSET ${n}`),{sql:t,zod:h}},retrieve:function({name:e}){return{sql:`${$} WHERE name = ${(0,a.literal)(e)};`,zod:z}},create:function({name:e,schema:n,version:t,cascade:i=!1}){return{sql:`
CREATE EXTENSION ${(0,a.ident)(e)}
  ${void 0===n?"":`SCHEMA ${(0,a.ident)(n)}`}
  ${void 0===t?"":`VERSION ${(0,a.literal)(t)}`}
  ${i?"CASCADE":""};`}},update:function(e,{update:n=!1,version:t,schema:i}){let r="";n&&(r=`ALTER EXTENSION ${(0,a.ident)(e)} UPDATE ${void 0===t?"":`TO ${(0,a.literal)(t)}`};`);let o=void 0===i?"":`ALTER EXTENSION ${(0,a.ident)(e)} SET SCHEMA ${(0,a.ident)(i)};`;return{sql:`BEGIN; ${r} ${o} COMMIT;`}},remove:function(e,{cascade:n=!1}={}){return{sql:`DROP EXTENSION ${(0,a.ident)(e)} ${n?"CASCADE":"RESTRICT"};`}},zod:f},config:{list:function({limit:e,offset:n}={}){let t=g;return e&&(t+=` LIMIT ${e}`),n&&(t+=` OFFSET ${n}`),{sql:t,zod:E}},zod:b},materializedViews:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o,includeColumns:l=!0}={}){let s=Q({includeColumns:l}),d=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),o&&(s+=` offset ${o}`),{sql:s,zod:G}},retrieve:function(e){let n=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${Q({includeColumns:!0})} where ${n};`,zod:J}},zod:Y},foreignTables:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o,includeColumns:l=!0}={}){let s=N({includeColumns:l}),d=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),o&&(s+=` offset ${o}`),{sql:s,zod:S}},retrieve:function(e){return{sql:`${N({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:T}},zod:y},views:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o,includeColumns:l=!0}={}){let s=eB({includeColumns:l}),d=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` where schema ${d}`),i&&(s+=` limit ${i}`),o&&(s+=` offset ${o}`),{sql:s,zod:eH}},retrieve:function(e){let n=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eB({includeColumns:!0})} where ${n};`,zod:eq}},zod:ek},policies:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o}={}){let l=`
    with policies as (${V})
    select *
    from policies
    `,s=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=`where schema ${s}`),i&&(l+=` limit ${i}`),o&&(l+=` offset ${o}`),{sql:l,zod:K}},retrieve:function(e){return{sql:`with policies as (${V}) select * from policies where ${function(e){if("id"in e&&e.id)return`id = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`name = ${(0,a.literal)(e.name)} AND schema = ${(0,a.literal)(e.schema)} AND table = ${(0,a.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:Z}},create:function({name:e,schema:n="public",table:t,definition:i,check:r,action:o="PERMISSIVE",command:l="ALL",roles:s=["public"]}){return{sql:`
create policy ${(0,a.ident)(e)} on ${(0,a.ident)(n)}.${(0,a.ident)(t)}
  as ${o}
  for ${l}
  to ${s.map(a.ident).join(",")}
  ${i?`using (${i})`:""}
  ${r?`with check (${r})`:""};`}},update:function(e,n){let{name:t,definition:i,check:r,roles:o}=n,l=`ALTER POLICY ${(0,a.ident)(e.name)} ON ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`,s=void 0===t?"":`${l} RENAME TO ${(0,a.ident)(t)};`,d=void 0===i?"":`${l} USING (${i});`,c=void 0===r?"":`${l} WITH CHECK (${r});`,m=void 0===o?"":`${l} TO ${o.map(a.ident).join(",")};`;return{sql:`BEGIN; ${d} ${c} ${m} ${s} COMMIT;`}},remove:function(e){return{sql:`DROP POLICY ${(0,a.ident)(e.name)} ON ${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)};`}},zod:X},triggers:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o}={}){let l=`with triggers as (${eR}) select * from triggers`,s=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),i&&(l+=` limit ${i}`),o&&(l+=` offset ${o}`),{sql:l,zod:eO}},retrieve:function(e){let n=function(e){if("id"in e&&e.id)return`${(0,a.ident)("id")} = ${(0,a.literal)(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return`${(0,a.ident)("name")} = ${(0,a.literal)(e.name)} and ${(0,a.ident)("schema")} = ${(0,a.literal)(e.schema)} and ${(0,a.ident)("table")} = ${(0,a.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:`with triggers as (${eR}) select * from triggers where ${n};`,zod:eC}},create:function({name:e,schema:t="public",table:i,function_schema:r="public",function_name:o,function_args:l=[],activation:s,events:d,orientation:c,condition:m}){let p=`${(0,a.ident)(t)}.${(0,a.ident)(i)}`,_=`${(0,a.ident)(r)}.${(0,a.ident)(o)}`,u=d.join(" or "),g=c?`for each ${c}`:"",b=m?`when (${m})`:"",E=l.map(a.literal).join(",");return{sql:`create trigger ${(0,a.ident)(e)} ${s} ${u} on ${p} ${g} ${b} execute function ${_}(${E});`,zod:n.z.void()}},update:function(e,t){let i=`${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`,r="";switch(t.enabled_mode){case"ORIGIN":r=`alter table ${i} enable trigger ${(0,a.ident)(e.name)};`;break;case"DISABLED":r=`alter table ${i} disable trigger ${(0,a.ident)(e.name)};`;break;case"REPLICA":case"ALWAYS":r=`alter table ${i} enable ${t.enabled_mode} trigger ${(0,a.ident)(e.name)};`}let o=t.name&&t.name!==e.name?`alter trigger ${(0,a.ident)(e.name)} on ${i} rename to ${(0,a.ident)(t.name)};`:"";return{sql:`begin; ${r}; ${o}; commit;`,zod:n.z.void()}},remove:function(e,{cascade:t=!1}={}){let i=`${(0,a.ident)(e.schema)}.${(0,a.ident)(e.table)}`;return{sql:`drop trigger ${(0,a.ident)(e.name)} on ${i} ${t?"cascade":""};`,zod:n.z.void()}},zod:eI},types:{list:function({includeArrayTypes:e=!1,includeSystemSchemas:n=!1,includedSchemas:a,excludedSchemas:i,limit:o,offset:l}={}){let s=ex;e||(s+=` and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let d=r(a,i,n?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return d&&(s+=` and n.nspname ${d}`),o&&(s+=` limit ${o}`),l&&(s+=` offset ${l}`),{sql:s,zod:ej}},zod:eD},version:{retrieve:function(){return{sql:eM,zod:eU}},zod:eU},indexes:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:a,limit:i,offset:o}={}){let l=`
    with indexes as (${H})
    select *
    from indexes
  `,s=r(n,a,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return s&&(l+=` where schema ${s}`),i&&(l+=` limit ${i}`),o&&(l+=` offset ${o}`),{sql:l,zod:B}},retrieve:function({id:e}){return{sql:`
    with indexes as (${H})
    select *
    from indexes
    where id = ${(0,a.literal)(e)};
  `,zod:P}},zod:q},columnPrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:i,columnIds:l,limit:s,offset:c}={}){let m=`
  with column_privileges as (${o})
  select *
  from column_privileges
  `,p=[],_=r(n,i,e?void 0:t.DEFAULT_SYSTEM_SCHEMAS);return _&&p.push(`relation_schema ${_}`),l?.length&&p.push(`column_id in (${l.map(a.literal).join(",")})`),p.length>0&&(m+=` where ${p.join(" and ")}`),s&&(m+=` limit ${s}`),c&&(m+=` offset ${c}`),{sql:m,zod:d}},grant:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:n,grantee:t,isGrantable:i})=>{let[r,o]=n.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,a.literal)(r)}
  and a.attnum = ${(0,a.literal)(o)}
into col;
execute format(
  'grant ${e} (%I) on %s to ${"public"===t.toLowerCase()?"public":(0,a.ident)(t)} ${i?"with grant option":""}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:n,grantee:t})=>{let[i,r]=n.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,a.literal)(i)}
  and a.attnum = ${(0,a.literal)(r)}
into col;
execute format(
  'revoke ${e} (%I) on %s from ${"public"===t.toLowerCase()?"public":(0,a.ident)(t)}',
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
    AND c.relname IN (${eV.map(a.literal).join(", ")});`,USER_SEARCH_INDEXES:eV}],755216)}]);

//# debugId=fce4f681-98df-ae1f-3e6f-6c127c7da2af
//# sourceMappingURL=5d7420e6da77dab3.js.map