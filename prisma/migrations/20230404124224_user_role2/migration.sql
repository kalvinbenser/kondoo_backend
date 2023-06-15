/*
  Warnings:

  - Added the required column `user_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userRoleId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_role" INTEGER NOT NULL;
