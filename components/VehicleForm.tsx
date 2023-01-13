import { FormWrapper } from "./FormWrapper";
import { Operable } from "./input/Operable";
import { MakeInput } from "./input/MakeInput";
import { YearInput } from "./input/YearInput";
import { ModelInput } from "./input/ModelInput";


export function VehicleForm()
{
    return (
        <FormWrapper title="Vehicle">
            <YearInput  />
            <MakeInput  />
            <ModelInput />
            <Operable   />
        </FormWrapper>
    );
}


export default VehicleForm;