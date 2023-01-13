export function Operable()
{
    return (
        <fieldset>
            <legend>Is a vehicle operable?</legend>
            <div>
                <input
                    id="is-operable"
                    type="radio"
                    name="vehicle-is-operable"
                />
                <label htmlFor="is-operable">Yes</label>
            </div>
            <div>
                <input
                    id="is-not-operable"
                    type="radio"
                    name="vehicle-is-operable"
                />
                <label htmlFor="is-not-operable">No</label>
            </div>
        </fieldset>
    );
}


export default Operable;