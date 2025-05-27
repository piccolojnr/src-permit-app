import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','email','password','roleId','createdAt','updatedAt']);

export const RoleScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const RolePermissionScalarFieldEnumSchema = z.enum(['roleId','permissionId']);

export const StudentScalarFieldEnumSchema = z.enum(['id','studentId','name','email','course','level','number','createdAt','updatedAt']);

export const PermitScalarFieldEnumSchema = z.enum(['id','permitCode','originalCode','status','validityPeriod','amountPaid','studentId','issuedById','createdAt','updatedAt']);

export const AuditLogScalarFieldEnumSchema = z.enum(['id','action','userId','details','createdAt']);

export const RecoveryTokenScalarFieldEnumSchema = z.enum(['id','userId','token','expires','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// ROLE PERMISSION SCHEMA
/////////////////////////////////////////

export const RolePermissionSchema = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int(),
})

export type RolePermission = z.infer<typeof RolePermissionSchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.number().int(),
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// PERMIT SCHEMA
/////////////////////////////////////////

export const PermitSchema = z.object({
  id: z.number().int(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  studentId: z.number().int(),
  issuedById: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permit = z.infer<typeof PermitSchema>

/////////////////////////////////////////
// AUDIT LOG SCHEMA
/////////////////////////////////////////

export const AuditLogSchema = z.object({
  id: z.number().int(),
  action: z.string(),
  userId: z.number().int(),
  details: z.string(),
  createdAt: z.coerce.date(),
})

export type AuditLog = z.infer<typeof AuditLogSchema>

/////////////////////////////////////////
// RECOVERY TOKEN SCHEMA
/////////////////////////////////////////

export const RecoveryTokenSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type RecoveryToken = z.infer<typeof RecoveryTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  recoveryTokens: z.union([z.boolean(),z.lazy(() => RecoveryTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  permits: z.boolean().optional(),
  auditLogs: z.boolean().optional(),
  recoveryTokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  roleId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogFindManyArgsSchema)]).optional(),
  recoveryTokens: z.union([z.boolean(),z.lazy(() => RecoveryTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleDefaultArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  permissions: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  roles: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  roles: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE PERMISSION
//------------------------------------------------------

export const RolePermissionIncludeSchema: z.ZodType<Prisma.RolePermissionInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

export const RolePermissionArgsSchema: z.ZodType<Prisma.RolePermissionDefaultArgs> = z.object({
  select: z.lazy(() => RolePermissionSelectSchema).optional(),
  include: z.lazy(() => RolePermissionIncludeSchema).optional(),
}).strict();

export const RolePermissionSelectSchema: z.ZodType<Prisma.RolePermissionSelect> = z.object({
  roleId: z.boolean().optional(),
  permissionId: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

// STUDENT
//------------------------------------------------------

export const StudentIncludeSchema: z.ZodType<Prisma.StudentInclude> = z.object({
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StudentArgsSchema: z.ZodType<Prisma.StudentDefaultArgs> = z.object({
  select: z.lazy(() => StudentSelectSchema).optional(),
  include: z.lazy(() => StudentIncludeSchema).optional(),
}).strict();

export const StudentCountOutputTypeArgsSchema: z.ZodType<Prisma.StudentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StudentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StudentCountOutputTypeSelectSchema: z.ZodType<Prisma.StudentCountOutputTypeSelect> = z.object({
  permits: z.boolean().optional(),
}).strict();

export const StudentSelectSchema: z.ZodType<Prisma.StudentSelect> = z.object({
  id: z.boolean().optional(),
  studentId: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  course: z.boolean().optional(),
  level: z.boolean().optional(),
  number: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMIT
//------------------------------------------------------

export const PermitIncludeSchema: z.ZodType<Prisma.PermitInclude> = z.object({
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  issuedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PermitArgsSchema: z.ZodType<Prisma.PermitDefaultArgs> = z.object({
  select: z.lazy(() => PermitSelectSchema).optional(),
  include: z.lazy(() => PermitIncludeSchema).optional(),
}).strict();

export const PermitSelectSchema: z.ZodType<Prisma.PermitSelect> = z.object({
  id: z.boolean().optional(),
  permitCode: z.boolean().optional(),
  originalCode: z.boolean().optional(),
  status: z.boolean().optional(),
  validityPeriod: z.boolean().optional(),
  amountPaid: z.boolean().optional(),
  studentId: z.boolean().optional(),
  issuedById: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
  issuedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// AUDIT LOG
//------------------------------------------------------

export const AuditLogIncludeSchema: z.ZodType<Prisma.AuditLogInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AuditLogArgsSchema: z.ZodType<Prisma.AuditLogDefaultArgs> = z.object({
  select: z.lazy(() => AuditLogSelectSchema).optional(),
  include: z.lazy(() => AuditLogIncludeSchema).optional(),
}).strict();

export const AuditLogSelectSchema: z.ZodType<Prisma.AuditLogSelect> = z.object({
  id: z.boolean().optional(),
  action: z.boolean().optional(),
  userId: z.boolean().optional(),
  details: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// RECOVERY TOKEN
//------------------------------------------------------

export const RecoveryTokenIncludeSchema: z.ZodType<Prisma.RecoveryTokenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RecoveryTokenArgsSchema: z.ZodType<Prisma.RecoveryTokenDefaultArgs> = z.object({
  select: z.lazy(() => RecoveryTokenSelectSchema).optional(),
  include: z.lazy(() => RecoveryTokenIncludeSchema).optional(),
}).strict();

export const RecoveryTokenSelectSchema: z.ZodType<Prisma.RecoveryTokenSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  permits: z.lazy(() => PermitOrderByRelationAggregateInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogOrderByRelationAggregateInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    username: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogListRelationFilterSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  permissions: z.lazy(() => RolePermissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict());

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoleSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => RolePermissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RolePermissionWhereInputSchema: z.ZodType<Prisma.RolePermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict();

export const RolePermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.RolePermissionOrderByWithRelationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional()
}).strict();

export const RolePermissionWhereUniqueInputSchema: z.ZodType<Prisma.RolePermissionWhereUniqueInput> = z.object({
  roleId_permissionId: z.lazy(() => RolePermissionRoleIdPermissionIdCompoundUniqueInputSchema)
})
.and(z.object({
  roleId_permissionId: z.lazy(() => RolePermissionRoleIdPermissionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict());

export const RolePermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolePermissionOrderByWithAggregationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolePermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolePermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolePermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolePermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolePermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const RolePermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolePermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const StudentWhereInputSchema: z.ZodType<Prisma.StudentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  course: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict();

export const StudentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  permits: z.lazy(() => PermitOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StudentWhereUniqueInputSchema: z.ZodType<Prisma.StudentWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    studentId: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    studentId: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  studentId: z.string().optional(),
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  course: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict());

export const StudentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StudentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StudentSumOrderByAggregateInputSchema).optional()
}).strict();

export const StudentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  course: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermitWhereInputSchema: z.ZodType<Prisma.PermitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permitCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  validityPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  amountPaid: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  issuedById: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  issuedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PermitOrderByWithRelationInputSchema: z.ZodType<Prisma.PermitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permitCode: z.lazy(() => SortOrderSchema).optional(),
  originalCode: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional(),
  issuedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PermitWhereUniqueInputSchema: z.ZodType<Prisma.PermitWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    permitCode: z.string(),
    originalCode: z.string()
  }),
  z.object({
    id: z.number().int(),
    permitCode: z.string(),
  }),
  z.object({
    id: z.number().int(),
    originalCode: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    permitCode: z.string(),
    originalCode: z.string(),
  }),
  z.object({
    permitCode: z.string(),
  }),
  z.object({
    originalCode: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  permitCode: z.string().optional(),
  originalCode: z.string().optional(),
  AND: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  validityPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  amountPaid: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  issuedById: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  student: z.union([ z.lazy(() => StudentScalarRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  issuedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PermitOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permitCode: z.lazy(() => SortOrderSchema).optional(),
  originalCode: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PermitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PermitSumOrderByAggregateInputSchema).optional()
}).strict();

export const PermitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermitScalarWhereWithAggregatesInputSchema),z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitScalarWhereWithAggregatesInputSchema),z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permitCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  originalCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  validityPeriod: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  amountPaid: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  issuedById: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuditLogWhereInputSchema: z.ZodType<Prisma.AuditLogWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AuditLogOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditLogOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AuditLogWhereUniqueInputSchema: z.ZodType<Prisma.AuditLogWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogWhereInputSchema),z.lazy(() => AuditLogWhereInputSchema).array() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AuditLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditLogOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuditLogCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AuditLogAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuditLogMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuditLogMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AuditLogSumOrderByAggregateInputSchema).optional()
}).strict();

export const AuditLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditLogScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema),z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema),z.lazy(() => AuditLogScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RecoveryTokenWhereInputSchema: z.ZodType<Prisma.RecoveryTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecoveryTokenWhereInputSchema),z.lazy(() => RecoveryTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecoveryTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecoveryTokenWhereInputSchema),z.lazy(() => RecoveryTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.RecoveryTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RecoveryTokenWhereUniqueInputSchema: z.ZodType<Prisma.RecoveryTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    token: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => RecoveryTokenWhereInputSchema),z.lazy(() => RecoveryTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecoveryTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecoveryTokenWhereInputSchema),z.lazy(() => RecoveryTokenWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RecoveryTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecoveryTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecoveryTokenCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecoveryTokenAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecoveryTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecoveryTokenMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecoveryTokenSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecoveryTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecoveryTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecoveryTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RecoveryTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecoveryTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecoveryTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RecoveryTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional(),
  permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional(),
  permissions: z.lazy(() => RolePermissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolePermissionCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolePermissionUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionCreateInputSchema: z.ZodType<Prisma.RolePermissionCreateInput> = z.object({
  role: z.lazy(() => RoleCreateNestedOneWithoutPermissionsInputSchema),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const RolePermissionUncheckedCreateInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const RolePermissionUpdateInputSchema: z.ZodType<Prisma.RolePermissionUpdateInput> = z.object({
  role: z.lazy(() => RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionCreateManyInputSchema: z.ZodType<Prisma.RolePermissionCreateManyInput> = z.object({
  roleId: z.number().int(),
  permissionId: z.number().int()
}).strict();

export const RolePermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyMutationInput> = z.object({
}).strict();

export const RolePermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentCreateInputSchema: z.ZodType<Prisma.StudentCreateInput> = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUpdateInputSchema: z.ZodType<Prisma.StudentUpdateInput> = z.object({
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateManyInputSchema: z.ZodType<Prisma.StudentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentUpdateManyMutationInput> = z.object({
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateInputSchema: z.ZodType<Prisma.PermitCreateInput> = z.object({
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutPermitsInputSchema),
  issuedBy: z.lazy(() => UserCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateInputSchema: z.ZodType<Prisma.PermitUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  studentId: z.number().int(),
  issuedById: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateInputSchema: z.ZodType<Prisma.PermitUpdateInput> = z.object({
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutPermitsNestedInputSchema).optional(),
  issuedBy: z.lazy(() => UserUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  issuedById: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateManyInputSchema: z.ZodType<Prisma.PermitCreateManyInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  studentId: z.number().int(),
  issuedById: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateManyMutationInputSchema: z.ZodType<Prisma.PermitUpdateManyMutationInput> = z.object({
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  issuedById: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogCreateInputSchema: z.ZodType<Prisma.AuditLogCreateInput> = z.object({
  action: z.string(),
  details: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuditLogsInputSchema)
}).strict();

export const AuditLogUncheckedCreateInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  action: z.string(),
  userId: z.number().int(),
  details: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuditLogUpdateInputSchema: z.ZodType<Prisma.AuditLogUpdateInput> = z.object({
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional()
}).strict();

export const AuditLogUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogCreateManyInputSchema: z.ZodType<Prisma.AuditLogCreateManyInput> = z.object({
  id: z.number().int().optional(),
  action: z.string(),
  userId: z.number().int(),
  details: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuditLogUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditLogUpdateManyMutationInput> = z.object({
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenCreateInputSchema: z.ZodType<Prisma.RecoveryTokenCreateInput> = z.object({
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRecoveryTokensInputSchema)
}).strict();

export const RecoveryTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RecoveryTokenUpdateInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRecoveryTokensNestedInputSchema).optional()
}).strict();

export const RecoveryTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenCreateManyInputSchema: z.ZodType<Prisma.RecoveryTokenCreateManyInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RecoveryTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const RoleScalarRelationFilterSchema: z.ZodType<Prisma.RoleScalarRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const PermitListRelationFilterSchema: z.ZodType<Prisma.PermitListRelationFilter> = z.object({
  every: z.lazy(() => PermitWhereInputSchema).optional(),
  some: z.lazy(() => PermitWhereInputSchema).optional(),
  none: z.lazy(() => PermitWhereInputSchema).optional()
}).strict();

export const AuditLogListRelationFilterSchema: z.ZodType<Prisma.AuditLogListRelationFilter> = z.object({
  every: z.lazy(() => AuditLogWhereInputSchema).optional(),
  some: z.lazy(() => AuditLogWhereInputSchema).optional(),
  none: z.lazy(() => AuditLogWhereInputSchema).optional()
}).strict();

export const RecoveryTokenListRelationFilterSchema: z.ZodType<Prisma.RecoveryTokenListRelationFilter> = z.object({
  every: z.lazy(() => RecoveryTokenWhereInputSchema).optional(),
  some: z.lazy(() => RecoveryTokenWhereInputSchema).optional(),
  none: z.lazy(() => RecoveryTokenWhereInputSchema).optional()
}).strict();

export const PermitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditLogOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const RolePermissionListRelationFilterSchema: z.ZodType<Prisma.RolePermissionListRelationFilter> = z.object({
  every: z.lazy(() => RolePermissionWhereInputSchema).optional(),
  some: z.lazy(() => RolePermissionWhereInputSchema).optional(),
  none: z.lazy(() => RolePermissionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolePermissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionScalarRelationFilterSchema: z.ZodType<Prisma.PermissionScalarRelationFilter> = z.object({
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const RolePermissionRoleIdPermissionIdCompoundUniqueInputSchema: z.ZodType<Prisma.RolePermissionRoleIdPermissionIdCompoundUniqueInput> = z.object({
  roleId: z.number(),
  permissionId: z.number()
}).strict();

export const RolePermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionCountOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionAvgOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionMaxOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionMinOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionSumOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  course: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentSumOrderByAggregateInputSchema: z.ZodType<Prisma.StudentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const StudentScalarRelationFilterSchema: z.ZodType<Prisma.StudentScalarRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PermitCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermitCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permitCode: z.lazy(() => SortOrderSchema).optional(),
  originalCode: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PermitAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermitMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permitCode: z.lazy(() => SortOrderSchema).optional(),
  originalCode: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermitMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permitCode: z.lazy(() => SortOrderSchema).optional(),
  originalCode: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitSumOrderByAggregateInputSchema: z.ZodType<Prisma.PermitSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  validityPeriod: z.lazy(() => SortOrderSchema).optional(),
  amountPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  issuedById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const AuditLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  details: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AuditLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecoveryTokenSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecoveryTokenSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const PermitCreateNestedManyWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitCreateNestedManyWithoutIssuedByInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitCreateWithoutIssuedByInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema),z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyIssuedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuditLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuditLogCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogCreateWithoutUserInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecoveryTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecoveryTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedCreateNestedManyWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUncheckedCreateNestedManyWithoutIssuedByInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitCreateWithoutIssuedByInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema),z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyIssuedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogCreateWithoutUserInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecoveryTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecoveryTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const RoleUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const PermitUpdateManyWithoutIssuedByNestedInputSchema: z.ZodType<Prisma.PermitUpdateManyWithoutIssuedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitCreateWithoutIssuedByInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema),z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutIssuedByInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutIssuedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyIssuedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutIssuedByInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutIssuedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutIssuedByInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutIssuedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogCreateWithoutUserInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecoveryTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecoveryTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecoveryTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecoveryTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecoveryTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecoveryTokenScalarWhereInputSchema),z.lazy(() => RecoveryTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PermitUncheckedUpdateManyWithoutIssuedByNestedInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutIssuedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitCreateWithoutIssuedByInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema),z.lazy(() => PermitCreateOrConnectWithoutIssuedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutIssuedByInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutIssuedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyIssuedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutIssuedByInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutIssuedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutIssuedByInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutIssuedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogCreateWithoutUserInputSchema).array(),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema),z.lazy(() => AuditLogCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuditLogUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogWhereUniqueInputSchema),z.lazy(() => AuditLogWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AuditLogUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AuditLogUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecoveryTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema).array(),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecoveryTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecoveryTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecoveryTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecoveryTokenWhereUniqueInputSchema),z.lazy(() => RecoveryTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecoveryTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecoveryTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RecoveryTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecoveryTokenScalarWhereInputSchema),z.lazy(() => RecoveryTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleCreateNestedOneWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedOneWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutRolesNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutRolesInputSchema),z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]).optional(),
}).strict();

export const PermitCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.PermitCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitCreateWithoutStudentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.PermitUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitCreateWithoutStudentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.PermitUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitCreateWithoutStudentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitCreateWithoutStudentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutPermitsInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutPermitsInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPermitsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const StudentUpdateOneRequiredWithoutPermitsNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutPermitsNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutPermitsInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutPermitsInputSchema),z.lazy(() => StudentUpdateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPermitsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPermitsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPermitsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermitsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPermitsInputSchema),z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuditLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuditLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuditLogsInputSchema),z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRecoveryTokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecoveryTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecoveryTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutRecoveryTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRecoveryTokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecoveryTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecoveryTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRecoveryTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRecoveryTokensInputSchema),z.lazy(() => UserUpdateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecoveryTokensInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const RoleCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateWithoutUsersInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const PermitCreateWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitCreateWithoutIssuedByInput> = z.object({
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUncheckedCreateWithoutIssuedByInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  studentId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateOrConnectWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitCreateOrConnectWithoutIssuedByInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema) ]),
}).strict();

export const PermitCreateManyIssuedByInputEnvelopeSchema: z.ZodType<Prisma.PermitCreateManyIssuedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermitCreateManyIssuedByInputSchema),z.lazy(() => PermitCreateManyIssuedByInputSchema).array() ]),
}).strict();

export const AuditLogCreateWithoutUserInputSchema: z.ZodType<Prisma.AuditLogCreateWithoutUserInput> = z.object({
  action: z.string(),
  details: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuditLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  action: z.string(),
  details: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const AuditLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AuditLogCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuditLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AuditLogCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AuditLogCreateManyUserInputSchema),z.lazy(() => AuditLogCreateManyUserInputSchema).array() ]),
}).strict();

export const RecoveryTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenCreateWithoutUserInput> = z.object({
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RecoveryTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RecoveryTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RecoveryTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RecoveryTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RecoveryTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecoveryTokenCreateManyUserInputSchema),z.lazy(() => RecoveryTokenCreateManyUserInputSchema).array() ]),
}).strict();

export const RoleUpsertWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolePermissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const PermitUpsertWithWhereUniqueWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUpsertWithWhereUniqueWithoutIssuedByInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermitUpdateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutIssuedByInputSchema) ]),
  create: z.union([ z.lazy(() => PermitCreateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedCreateWithoutIssuedByInputSchema) ]),
}).strict();

export const PermitUpdateWithWhereUniqueWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUpdateWithWhereUniqueWithoutIssuedByInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateWithoutIssuedByInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutIssuedByInputSchema) ]),
}).strict();

export const PermitUpdateManyWithWhereWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUpdateManyWithWhereWithoutIssuedByInput> = z.object({
  where: z.lazy(() => PermitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateManyMutationInputSchema),z.lazy(() => PermitUncheckedUpdateManyWithoutIssuedByInputSchema) ]),
}).strict();

export const PermitScalarWhereInputSchema: z.ZodType<Prisma.PermitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permitCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  originalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  validityPeriod: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  amountPaid: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  issuedById: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AuditLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuditLogUpdateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AuditLogCreateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AuditLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AuditLogWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateWithoutUserInputSchema),z.lazy(() => AuditLogUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AuditLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AuditLogScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuditLogUpdateManyMutationInputSchema),z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AuditLogScalarWhereInputSchema: z.ZodType<Prisma.AuditLogScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogScalarWhereInputSchema),z.lazy(() => AuditLogScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  details: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RecoveryTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecoveryTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecoveryTokenUpdateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RecoveryTokenCreateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RecoveryTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecoveryTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecoveryTokenUpdateWithoutUserInputSchema),z.lazy(() => RecoveryTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RecoveryTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RecoveryTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecoveryTokenUpdateManyMutationInputSchema),z.lazy(() => RecoveryTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RecoveryTokenScalarWhereInputSchema: z.ZodType<Prisma.RecoveryTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecoveryTokenScalarWhereInputSchema),z.lazy(() => RecoveryTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecoveryTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecoveryTokenScalarWhereInputSchema),z.lazy(() => RecoveryTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateWithoutRoleInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyRoleInputSchema),z.lazy(() => UserCreateManyRoleInputSchema).array() ]),
}).strict();

export const RolePermissionCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateWithoutRoleInput> = z.object({
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const RolePermissionUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateWithoutRoleInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const RolePermissionCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionCreateManyRoleInputSchema),z.lazy(() => RolePermissionCreateManyRoleInputSchema).array() ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateManyMutationInputSchema),z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionScalarWhereInputSchema: z.ZodType<Prisma.RolePermissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permissionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const RolePermissionCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateWithoutPermissionInput> = z.object({
  role: z.lazy(() => RoleCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const RolePermissionUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const RolePermissionCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionCreateManyPermissionInputSchema),z.lazy(() => RolePermissionCreateManyPermissionInputSchema).array() ]),
}).strict();

export const RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateManyMutationInputSchema),z.lazy(() => RolePermissionUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const RoleCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateWithoutPermissionsInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRolesInput> = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRolesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const RoleUpsertWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpsertWithoutPermissionsInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const RoleUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithoutPermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutRolesInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateWithoutStudentInputSchema: z.ZodType<Prisma.PermitCreateWithoutStudentInput> = z.object({
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issuedBy: z.lazy(() => UserCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.PermitUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  issuedById: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.PermitCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const PermitCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.PermitCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermitCreateManyStudentInputSchema),z.lazy(() => PermitCreateManyStudentInputSchema).array() ]),
}).strict();

export const PermitUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.PermitUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermitUpdateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => PermitCreateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const PermitUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.PermitUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateWithoutStudentInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const PermitUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.PermitUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => PermitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateManyMutationInputSchema),z.lazy(() => PermitUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const StudentCreateWithoutPermitsInputSchema: z.ZodType<Prisma.StudentCreateWithoutPermitsInput> = z.object({
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentUncheckedCreateWithoutPermitsInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutPermitsInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.string(),
  name: z.string(),
  email: z.string(),
  course: z.string(),
  level: z.string(),
  number: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StudentCreateOrConnectWithoutPermitsInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutPermitsInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPermitsInputSchema) ]),
}).strict();

export const UserCreateWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateWithoutPermitsInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPermitsInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPermitsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]),
}).strict();

export const StudentUpsertWithoutPermitsInputSchema: z.ZodType<Prisma.StudentUpsertWithoutPermitsInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPermitsInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPermitsInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutPermitsInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutPermitsInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutPermitsInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPermitsInputSchema) ]),
}).strict();

export const StudentUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.StudentUpdateWithoutPermitsInput> = z.object({
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutPermitsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPermitsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPermitsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPermitsInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPermitsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuditLogsInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutIssuedByInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuditLogsInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutIssuedByInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuditLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuditLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuditLogsInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuditLogsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutRecoveryTokensInput> = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRecoveryTokensInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutIssuedByInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRecoveryTokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecoveryTokensInputSchema) ]),
}).strict();

export const UserUpsertWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutRecoveryTokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecoveryTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecoveryTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecoveryTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRecoveryTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecoveryTokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutRecoveryTokensInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRecoveryTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRecoveryTokensInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PermitCreateManyIssuedByInputSchema: z.ZodType<Prisma.PermitCreateManyIssuedByInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  studentId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AuditLogCreateManyUserInputSchema: z.ZodType<Prisma.AuditLogCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  action: z.string(),
  details: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RecoveryTokenCreateManyUserInputSchema: z.ZodType<Prisma.RecoveryTokenCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  token: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUpdateWithoutIssuedByInput> = z.object({
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateWithoutIssuedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutIssuedByInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutIssuedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUpdateWithoutUserInput> = z.object({
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AuditLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AuditLogUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  details: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecoveryTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RecoveryTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyRoleInputSchema: z.ZodType<Prisma.UserCreateManyRoleInput> = z.object({
  id: z.number().int().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionCreateManyRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateManyRoleInput> = z.object({
  permissionId: z.number().int()
}).strict();

export const UserUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoleInput> = z.object({
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutIssuedByNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  recoveryTokens: z.lazy(() => RecoveryTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithoutRoleInput> = z.object({
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateWithoutRoleInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutRoleInput> = z.object({
  permissionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionCreateManyPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateManyPermissionInput> = z.object({
  roleId: z.number().int()
}).strict();

export const RolePermissionUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithoutPermissionInput> = z.object({
  role: z.lazy(() => RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionInput> = z.object({
  roleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateManyStudentInputSchema: z.ZodType<Prisma.PermitCreateManyStudentInput> = z.object({
  id: z.number().int().optional(),
  permitCode: z.string(),
  originalCode: z.string(),
  status: z.string().optional(),
  validityPeriod: z.number().int(),
  amountPaid: z.number(),
  issuedById: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateWithoutStudentInputSchema: z.ZodType<Prisma.PermitUpdateWithoutStudentInput> = z.object({
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issuedBy: z.lazy(() => UserUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  issuedById: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permitCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  originalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  validityPeriod: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  amountPaid: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  issuedById: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionFindFirstArgsSchema: z.ZodType<Prisma.RolePermissionFindFirstArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionFindFirstOrThrowArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionFindManyArgsSchema: z.ZodType<Prisma.RolePermissionFindManyArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionAggregateArgsSchema: z.ZodType<Prisma.RolePermissionAggregateArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionGroupByArgsSchema: z.ZodType<Prisma.RolePermissionGroupByArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithAggregationInputSchema.array(),RolePermissionOrderByWithAggregationInputSchema ]).optional(),
  by: RolePermissionScalarFieldEnumSchema.array(),
  having: RolePermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionFindUniqueArgsSchema: z.ZodType<Prisma.RolePermissionFindUniqueArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionFindUniqueOrThrowArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const StudentFindFirstArgsSchema: z.ZodType<Prisma.StudentFindFirstArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentFindFirstOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindManyArgsSchema: z.ZodType<Prisma.StudentFindManyArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAggregateArgsSchema: z.ZodType<Prisma.StudentAggregateArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentGroupByArgsSchema: z.ZodType<Prisma.StudentGroupByArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithAggregationInputSchema.array(),StudentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: StudentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentFindUniqueArgsSchema: z.ZodType<Prisma.StudentFindUniqueArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentFindUniqueOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const PermitFindFirstArgsSchema: z.ZodType<Prisma.PermitFindFirstArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermitFindFirstOrThrowArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitFindManyArgsSchema: z.ZodType<Prisma.PermitFindManyArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitAggregateArgsSchema: z.ZodType<Prisma.PermitAggregateArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermitGroupByArgsSchema: z.ZodType<Prisma.PermitGroupByArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithAggregationInputSchema.array(),PermitOrderByWithAggregationInputSchema ]).optional(),
  by: PermitScalarFieldEnumSchema.array(),
  having: PermitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermitFindUniqueArgsSchema: z.ZodType<Prisma.PermitFindUniqueArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermitFindUniqueOrThrowArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const AuditLogFindFirstArgsSchema: z.ZodType<Prisma.AuditLogFindFirstArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditLogFindFirstOrThrowArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogFindManyArgsSchema: z.ZodType<Prisma.AuditLogFindManyArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogScalarFieldEnumSchema,AuditLogScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AuditLogAggregateArgsSchema: z.ZodType<Prisma.AuditLogAggregateArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithRelationInputSchema.array(),AuditLogOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuditLogGroupByArgsSchema: z.ZodType<Prisma.AuditLogGroupByArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
  orderBy: z.union([ AuditLogOrderByWithAggregationInputSchema.array(),AuditLogOrderByWithAggregationInputSchema ]).optional(),
  by: AuditLogScalarFieldEnumSchema.array(),
  having: AuditLogScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AuditLogFindUniqueArgsSchema: z.ZodType<Prisma.AuditLogFindUniqueArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditLogFindUniqueOrThrowArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const RecoveryTokenFindFirstArgsSchema: z.ZodType<Prisma.RecoveryTokenFindFirstArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereInputSchema.optional(),
  orderBy: z.union([ RecoveryTokenOrderByWithRelationInputSchema.array(),RecoveryTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RecoveryTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecoveryTokenScalarFieldEnumSchema,RecoveryTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecoveryTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecoveryTokenFindFirstOrThrowArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereInputSchema.optional(),
  orderBy: z.union([ RecoveryTokenOrderByWithRelationInputSchema.array(),RecoveryTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RecoveryTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecoveryTokenScalarFieldEnumSchema,RecoveryTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecoveryTokenFindManyArgsSchema: z.ZodType<Prisma.RecoveryTokenFindManyArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereInputSchema.optional(),
  orderBy: z.union([ RecoveryTokenOrderByWithRelationInputSchema.array(),RecoveryTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RecoveryTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecoveryTokenScalarFieldEnumSchema,RecoveryTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecoveryTokenAggregateArgsSchema: z.ZodType<Prisma.RecoveryTokenAggregateArgs> = z.object({
  where: RecoveryTokenWhereInputSchema.optional(),
  orderBy: z.union([ RecoveryTokenOrderByWithRelationInputSchema.array(),RecoveryTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RecoveryTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecoveryTokenGroupByArgsSchema: z.ZodType<Prisma.RecoveryTokenGroupByArgs> = z.object({
  where: RecoveryTokenWhereInputSchema.optional(),
  orderBy: z.union([ RecoveryTokenOrderByWithAggregationInputSchema.array(),RecoveryTokenOrderByWithAggregationInputSchema ]).optional(),
  by: RecoveryTokenScalarFieldEnumSchema.array(),
  having: RecoveryTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecoveryTokenFindUniqueArgsSchema: z.ZodType<Prisma.RecoveryTokenFindUniqueArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereUniqueInputSchema,
}).strict() ;

export const RecoveryTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecoveryTokenFindUniqueOrThrowArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict() ;

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoleCreateManyArgsSchema: z.ZodType<Prisma.RoleCreateManyArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
}).strict() ;

export const RoleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoleCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
}).strict() ;

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RoleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const PermissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PermissionCreateManyAndReturnArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PermissionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionCreateArgsSchema: z.ZodType<Prisma.RolePermissionCreateArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  data: z.union([ RolePermissionCreateInputSchema,RolePermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const RolePermissionUpsertArgsSchema: z.ZodType<Prisma.RolePermissionUpsertArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
  create: z.union([ RolePermissionCreateInputSchema,RolePermissionUncheckedCreateInputSchema ]),
  update: z.union([ RolePermissionUpdateInputSchema,RolePermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolePermissionCreateManyArgsSchema: z.ZodType<Prisma.RolePermissionCreateManyArgs> = z.object({
  data: z.union([ RolePermissionCreateManyInputSchema,RolePermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const RolePermissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RolePermissionCreateManyAndReturnArgs> = z.object({
  data: z.union([ RolePermissionCreateManyInputSchema,RolePermissionCreateManyInputSchema.array() ]),
}).strict() ;

export const RolePermissionDeleteArgsSchema: z.ZodType<Prisma.RolePermissionDeleteArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionUpdateArgsSchema: z.ZodType<Prisma.RolePermissionUpdateArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  data: z.union([ RolePermissionUpdateInputSchema,RolePermissionUncheckedUpdateInputSchema ]),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionUpdateManyArgsSchema: z.ZodType<Prisma.RolePermissionUpdateManyArgs> = z.object({
  data: z.union([ RolePermissionUpdateManyMutationInputSchema,RolePermissionUncheckedUpdateManyInputSchema ]),
  where: RolePermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RolePermissionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RolePermissionUpdateManyMutationInputSchema,RolePermissionUncheckedUpdateManyInputSchema ]),
  where: RolePermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionDeleteManyArgsSchema: z.ZodType<Prisma.RolePermissionDeleteManyArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentCreateArgsSchema: z.ZodType<Prisma.StudentCreateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentUpsertArgsSchema: z.ZodType<Prisma.StudentUpsertArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
  create: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
  update: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentCreateManyArgsSchema: z.ZodType<Prisma.StudentCreateManyArgs> = z.object({
  data: z.union([ StudentCreateManyInputSchema,StudentCreateManyInputSchema.array() ]),
}).strict() ;

export const StudentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StudentCreateManyAndReturnArgs> = z.object({
  data: z.union([ StudentCreateManyInputSchema,StudentCreateManyInputSchema.array() ]),
}).strict() ;

export const StudentDeleteArgsSchema: z.ZodType<Prisma.StudentDeleteArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateArgsSchema: z.ZodType<Prisma.StudentUpdateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateManyArgsSchema: z.ZodType<Prisma.StudentUpdateManyArgs> = z.object({
  data: z.union([ StudentUpdateManyMutationInputSchema,StudentUncheckedUpdateManyInputSchema ]),
  where: StudentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.StudentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ StudentUpdateManyMutationInputSchema,StudentUncheckedUpdateManyInputSchema ]),
  where: StudentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const StudentDeleteManyArgsSchema: z.ZodType<Prisma.StudentDeleteManyArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermitCreateArgsSchema: z.ZodType<Prisma.PermitCreateArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  data: z.union([ PermitCreateInputSchema,PermitUncheckedCreateInputSchema ]),
}).strict() ;

export const PermitUpsertArgsSchema: z.ZodType<Prisma.PermitUpsertArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
  create: z.union([ PermitCreateInputSchema,PermitUncheckedCreateInputSchema ]),
  update: z.union([ PermitUpdateInputSchema,PermitUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermitCreateManyArgsSchema: z.ZodType<Prisma.PermitCreateManyArgs> = z.object({
  data: z.union([ PermitCreateManyInputSchema,PermitCreateManyInputSchema.array() ]),
}).strict() ;

export const PermitCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PermitCreateManyAndReturnArgs> = z.object({
  data: z.union([ PermitCreateManyInputSchema,PermitCreateManyInputSchema.array() ]),
}).strict() ;

export const PermitDeleteArgsSchema: z.ZodType<Prisma.PermitDeleteArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitUpdateArgsSchema: z.ZodType<Prisma.PermitUpdateArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  data: z.union([ PermitUpdateInputSchema,PermitUncheckedUpdateInputSchema ]),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitUpdateManyArgsSchema: z.ZodType<Prisma.PermitUpdateManyArgs> = z.object({
  data: z.union([ PermitUpdateManyMutationInputSchema,PermitUncheckedUpdateManyInputSchema ]),
  where: PermitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermitUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PermitUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PermitUpdateManyMutationInputSchema,PermitUncheckedUpdateManyInputSchema ]),
  where: PermitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermitDeleteManyArgsSchema: z.ZodType<Prisma.PermitDeleteManyArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuditLogCreateArgsSchema: z.ZodType<Prisma.AuditLogCreateArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  data: z.union([ AuditLogCreateInputSchema,AuditLogUncheckedCreateInputSchema ]),
}).strict() ;

export const AuditLogUpsertArgsSchema: z.ZodType<Prisma.AuditLogUpsertArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
  create: z.union([ AuditLogCreateInputSchema,AuditLogUncheckedCreateInputSchema ]),
  update: z.union([ AuditLogUpdateInputSchema,AuditLogUncheckedUpdateInputSchema ]),
}).strict() ;

export const AuditLogCreateManyArgsSchema: z.ZodType<Prisma.AuditLogCreateManyArgs> = z.object({
  data: z.union([ AuditLogCreateManyInputSchema,AuditLogCreateManyInputSchema.array() ]),
}).strict() ;

export const AuditLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuditLogCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuditLogCreateManyInputSchema,AuditLogCreateManyInputSchema.array() ]),
}).strict() ;

export const AuditLogDeleteArgsSchema: z.ZodType<Prisma.AuditLogDeleteArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogUpdateArgsSchema: z.ZodType<Prisma.AuditLogUpdateArgs> = z.object({
  select: AuditLogSelectSchema.optional(),
  include: AuditLogIncludeSchema.optional(),
  data: z.union([ AuditLogUpdateInputSchema,AuditLogUncheckedUpdateInputSchema ]),
  where: AuditLogWhereUniqueInputSchema,
}).strict() ;

export const AuditLogUpdateManyArgsSchema: z.ZodType<Prisma.AuditLogUpdateManyArgs> = z.object({
  data: z.union([ AuditLogUpdateManyMutationInputSchema,AuditLogUncheckedUpdateManyInputSchema ]),
  where: AuditLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuditLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuditLogUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuditLogUpdateManyMutationInputSchema,AuditLogUncheckedUpdateManyInputSchema ]),
  where: AuditLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AuditLogDeleteManyArgsSchema: z.ZodType<Prisma.AuditLogDeleteManyArgs> = z.object({
  where: AuditLogWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RecoveryTokenCreateArgsSchema: z.ZodType<Prisma.RecoveryTokenCreateArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  data: z.union([ RecoveryTokenCreateInputSchema,RecoveryTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const RecoveryTokenUpsertArgsSchema: z.ZodType<Prisma.RecoveryTokenUpsertArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereUniqueInputSchema,
  create: z.union([ RecoveryTokenCreateInputSchema,RecoveryTokenUncheckedCreateInputSchema ]),
  update: z.union([ RecoveryTokenUpdateInputSchema,RecoveryTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecoveryTokenCreateManyArgsSchema: z.ZodType<Prisma.RecoveryTokenCreateManyArgs> = z.object({
  data: z.union([ RecoveryTokenCreateManyInputSchema,RecoveryTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const RecoveryTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RecoveryTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ RecoveryTokenCreateManyInputSchema,RecoveryTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const RecoveryTokenDeleteArgsSchema: z.ZodType<Prisma.RecoveryTokenDeleteArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  where: RecoveryTokenWhereUniqueInputSchema,
}).strict() ;

export const RecoveryTokenUpdateArgsSchema: z.ZodType<Prisma.RecoveryTokenUpdateArgs> = z.object({
  select: RecoveryTokenSelectSchema.optional(),
  include: RecoveryTokenIncludeSchema.optional(),
  data: z.union([ RecoveryTokenUpdateInputSchema,RecoveryTokenUncheckedUpdateInputSchema ]),
  where: RecoveryTokenWhereUniqueInputSchema,
}).strict() ;

export const RecoveryTokenUpdateManyArgsSchema: z.ZodType<Prisma.RecoveryTokenUpdateManyArgs> = z.object({
  data: z.union([ RecoveryTokenUpdateManyMutationInputSchema,RecoveryTokenUncheckedUpdateManyInputSchema ]),
  where: RecoveryTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RecoveryTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RecoveryTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RecoveryTokenUpdateManyMutationInputSchema,RecoveryTokenUncheckedUpdateManyInputSchema ]),
  where: RecoveryTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RecoveryTokenDeleteManyArgsSchema: z.ZodType<Prisma.RecoveryTokenDeleteManyArgs> = z.object({
  where: RecoveryTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;