import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { GdprComplianceController } from './gdpr_compliance/gdprCompliance.controller'
import { GdprComplianceService } from './gdpr_compliance/gdprCompliance.service'
import { PrivacyPolicyService } from './privacy_policy/privacyPolicy.service'
import { PrivacyPolicyController } from './privacy_policy/privacyPolicy.controller'
import { TermsAndConditionController } from './terms_and_conditions/termsAndCondition.controller'
import { TermsAndConditionService } from './terms_and_conditions/termsAndCondition.service'

@Module({
  controllers: [
    GdprComplianceController,
    PrivacyPolicyController,
    TermsAndConditionController,
  ],
  imports: [],
  providers: [
    PrismaService,
    GdprComplianceService,
    PrivacyPolicyService,
    TermsAndConditionService,
  ],
})
export class RightsModule {}
