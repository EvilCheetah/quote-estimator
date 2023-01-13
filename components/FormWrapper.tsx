import styles from "../styles/FormWrapper.module.css"
import { FormWrapperProps } from "@interface"


export function FormWrapper({ title, children }: FormWrapperProps)
{
    return (
        <>
            <h2
                className={styles.title}
            >{title}</h2>
            {children}
        </>
    )
  }