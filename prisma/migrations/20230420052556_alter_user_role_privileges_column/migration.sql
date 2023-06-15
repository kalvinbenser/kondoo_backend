/*
  Warnings:

  - You are about to drop the `RolePrivileges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RolePrivileges" DROP CONSTRAINT "RolePrivileges_user_role_id_fkey";

-- DropTable
DROP TABLE "RolePrivileges";

-- CreateTable
CREATE TABLE "UserRolePrivileges" (
    "id" SERIAL NOT NULL,
    "user_role_id" INTEGER NOT NULL,
    "screen_name" TEXT NOT NULL,
    "permission" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRolePrivileges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRolePrivileges_user_role_id_key" ON "UserRolePrivileges"("user_role_id");

-- AddForeignKey
ALTER TABLE "UserRolePrivileges" ADD CONSTRAINT "UserRolePrivileges_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
