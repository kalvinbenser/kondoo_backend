-- AlterTable
ALTER TABLE "GdprCompliance" ALTER COLUMN "delete_status" SET DEFAULT 'inactive';

-- AlterTable
ALTER TABLE "PrivacyPolicy" ALTER COLUMN "delete_status" SET DEFAULT 'inactive';

-- AlterTable
ALTER TABLE "TermsAndCondition" ALTER COLUMN "delete_status" SET DEFAULT 'inactive';
