import { Module } from "@nestjs/common";
import { MakeModule } from "./make/make.module";
import { ModelModule } from "./model/model.module";


Module({
    imports: [
        MakeModule,
        ModelModule
    ]
})
export class VehicleModule {}