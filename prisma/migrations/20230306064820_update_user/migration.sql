/*
  Warnings:

  - You are about to drop the column `oauth_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'blocked');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauth_id",
ADD COLUMN     "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "country_code" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "display_picture" DROP NOT NULL;
