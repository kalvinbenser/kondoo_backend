-- CreateTable
CREATE TABLE "RolePrivileges" (
    "id" SERIAL NOT NULL,
    "user_role_id" INTEGER NOT NULL,
    "dashboard" TEXT[],
    "create_user" TEXT[],
    "all_player" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePrivileges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RolePrivileges" ADD CONSTRAINT "RolePrivileges_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
