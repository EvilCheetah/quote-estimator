import Head from "next/head";

import styles from "styles/QuotePage.module.css";
import ShippingForm from "@components/ShippingForm";
import { ShippingInformationProvider } from "@provider";


export function QuotePage()
{
    return (
        <div>
          <Head>
            <title>Generate Quote</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className={ styles['main'] }>
            
            <ShippingInformationProvider>
                <ShippingForm />
            </ShippingInformationProvider>
            
          </main>
    
          <footer>
          </footer>
        </div>
    );
}

export default QuotePage;