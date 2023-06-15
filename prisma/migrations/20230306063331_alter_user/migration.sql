-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oauth_id" TEXT,
ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "login_method" DROP DEFAULT,
ALTER COLUMN "user_role" DROP DEFAULT;
