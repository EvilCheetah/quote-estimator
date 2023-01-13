import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ShippingInformationProvider } from '@provider'
import ShippingForm from '../components/ShippingForm'

const Home: NextPage = () => {
    return (
        <div>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            { `Temporary Fill` }
        </main>

        <footer>
        </footer>
        </div>
  )
}

export default Home
