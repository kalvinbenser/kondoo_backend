-- CreateTable
CREATE TABLE "GdprCompliance" (
    "gdpr_compliance_id" SERIAL NOT NULL,
    "gdpr_compliance" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "delete_status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GdprCompliance_pkey" PRIMARY KEY ("gdpr_compliance_id")
);

-- CreateTable
CREATE TABLE "GdprComplianceStatusHistory" (
    "gdpr_compliance_status_history_id" SERIAL NOT NULL,
    "gdpr_compliance_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GdprComplianceStatusHistory_pkey" PRIMARY KEY ("gdpr_compliance_status_history_id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "privacy_policy_id" SERIAL NOT NULL,
    "privacy_policy" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "delete_status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("privacy_policy_id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicyStatusHistory" (
    "privacy_policy_status_history_id" SERIAL NOT NULL,
    "privacy_policy_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivacyPolicyStatusHistory_pkey" PRIMARY KEY ("privacy_policy_status_history_id")
);

-- CreateTable
CREATE TABLE "TermsAndCondition" (
    "terms_and_condition_id" SERIAL NOT NULL,
    "terms_and_condition" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "delete_status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TermsAndCondition_pkey" PRIMARY KEY ("terms_and_condition_id")
);

-- CreateTable
CREATE TABLE "TermsAndConditionStatusHistory" (
    "terms_and_condition_status_history_id" SERIAL NOT NULL,
    "terms_and_condition_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "updated_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TermsAndConditionStatusHistory_pkey" PRIMARY KEY ("terms_and_condition_status_history_id")
);
