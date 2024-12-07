import { Module } from '@nestjs/common';
import { prisma } from '@react-monorepo/prisma';

@Module({
  providers: [
    {
      provide: 'PRISMA_SERVICE',
      useValue: prisma,  // Make Prisma client available for injection
    },
  ],
  exports: ['PRISMA_SERVICE'],  // Export it so other modules can use it
})
export class PrismaModule {}
