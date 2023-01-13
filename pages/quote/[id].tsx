import axios from "axios";
import Head from "next/head";

import styles from "styles/QuoteEstimate.module.css";
import { Quote, QuoteProps } from "@interface";


export async function getServerSideProps(context: any)
{
    const { id } = context.params;

    const response  = await axios.get<Quote>(`http://localhost:3000/quote/${id}`);
    const quote      = response.data;

    if ( !quote )
        return { notFound: true }

    return {
        props: { quote }
    }
}


export function Quote({ quote }: QuoteProps)
{
    return (
        <div>
            <Head>
                Quote
            </Head>
            <main className={styles['main']} >
                <div
                    className={ styles['total-message'] }
                >
                    <div className={ styles['quote-message'] }>
                        Estimation is
                    </div>
                    <strong className={ styles['quote-estimate'] }>
                    {
                        Intl
                            .NumberFormat('en-US', {
                                style:    'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            })
                            .format(quote.quote_estimate)
                    }
                    </strong>
                </div>
            </main>
        </div>
    )
}


export default Quote;