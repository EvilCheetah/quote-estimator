import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { MakeController } from "./make/make.controller";
import { MakeModule } from "./make/make.module";
import { MakeService } from "./make/make.service";
import { ModelController } from "./model/model.controller";
import { ModelModule } from "./model/model.module";
import { ModelService } from "./model/model.service";


Module({
    imports: [
        MakeModule,
        ModelModule
    ],
})
export class VehicleModule {}