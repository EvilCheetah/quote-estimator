import styles from 'styles/Button.module.css';
import { ForwardButtonProps } from '@interface';


export function ForwardButton({ is_last, next }: ForwardButtonProps)
{
    if ( is_last )
        return (
            <button
                className={ `${styles['button']} ${styles['submit']}` }
                type="button"
            >
                Submit
            </button>
        )

    return (
        <button 
            className={ `${styles['button']} ${styles['next']}` }
            type="button"
            onClick={next}
        >
            Next
        </button>
    );
}