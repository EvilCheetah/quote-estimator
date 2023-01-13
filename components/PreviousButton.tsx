import styles from 'styles/Button.module.css';
import { PreviousButtonProps } from "@interface";


export function PreviousButton({ is_first, previous }: PreviousButtonProps)
{
    if ( is_first )
        return (<></>);
    
    return (
        <button
            className={ `${styles['button']} ${styles['previous']}` }
            type="button"
            onClick={previous}
        >
            Back
        </button>
    );
}