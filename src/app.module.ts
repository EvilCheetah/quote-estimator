import { Module } from '@nestjs/common';
import { MakeModule } from './make/make.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
    imports: [
        PrismaModule,
        MakeModule
    ]
})
export class AppModule {}
