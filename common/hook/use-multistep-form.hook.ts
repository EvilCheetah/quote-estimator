import { ReactElement, useState } from "react";


export function useMultiStepForm(forms: ReactElement[])
{
    const [ currentIndex, setCurrentIndex ] = useState(0);

    function next()
    {
        setCurrentIndex( 
            (index) =>
            {  
                if (index < forms.length)
                    return ++index;
                
                return index;
            } 
        );
    }

    function previous()
    {
        setCurrentIndex(
            (index) =>
            {
                if (index > 0)
                    return --index;
                
                return index;
            }
        );
    }

    function goto(index: number)
    {
        if ((0 < index) && (index < forms.length))
            throw new Error(`Index "${index}" is out of range of forms object`);
        
        setCurrentIndex(index);
    }

    return {
        currentIndex,
        currentForm: forms[currentIndex],
        forms,
        is_first: currentIndex === 0,
        is_last:  currentIndex === (forms.length - 1),
        next,
        previous,
        goto
    };
}