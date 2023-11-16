module.exports = {
  privGroups: [
    {
      id: "USERS",
      name: "User Permissions",
    },
    {
      id: "ROLES",
      name: "Role Permissions",
    },
    {
      id: "CATEGORİES",
      name: "Category Permissions",
    },
    {
      id: "AUDITLOGS",
      name: "Auditlogs Permissions",
    },
  ],
  privileges: [
    //User
    {
      key: "user_view",
      name: "User View",
      group: "USERS",
      description: "User view",
    },
    {
      key: "user_add",
      name: "User Add",
      group: "USERS",
      description: "User add",
    },
    {
      key: "user_update",
      name: "User Update",
      group: "USERS",
      description: "User update",
    },
    {
      key: "user_delete",
      name: "User Delete",
      group: "USERS",
      description: "User delete",
    },
    //Role
    {
      key: "role_view",
      name: "role View",
      group: "ROLES",
      description: "role view",
    },
    {
      key: "role_add",
      name: "role Add",
      group: "ROLES",
      description: "role add",
    },
    {
      key: "role_update",
      name: "role Update",
      group: "ROLES",
      description: "role update",
    },
    {
      key: "role_delete",
      name: "role Delete",
      group: "ROLES",
      description: "role delete",
    },
    //CATEGORY
    {
      key: "category_view",
      name: "category View",
      group: "CATEGORİES",
      description: "category view",
    },
    {
      key: "category_add",
      name: "category Add",
      group: "CATEGORİES",
      description: "category add",
    },
    {
      key: "category_update",
      name: "category Update",
      group: "CATEGORİES",
      description: "category update",
    },
    {
      key: "category_delete",
      name: "category Delete",
      group: "CATEGORİES",
      description: "category delete",
    },
    //AUDITLOGS
    {
      key: "Auditlogs_view",
      name: "Auditlogs View",
      group: "AUDITLOGS",
      description: "Auditlogs view",
    },
  ],
};