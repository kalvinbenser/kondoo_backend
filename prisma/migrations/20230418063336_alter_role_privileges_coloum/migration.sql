/*
  Warnings:

  - You are about to drop the column `all_player` on the `RolePrivileges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RolePrivileges" DROP COLUMN "all_player",
ADD COLUMN     "all_players" TEXT[];
