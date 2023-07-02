import Barchart from '@/components/Barchart'
import Header from '@/components/Header'
import RecentOrders from '@/components/RecentOrders'
import TopCards from '@/components/TopCards'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-gray-100 h-screen'>
        <Header />
        <TopCards />
         <div> {/* grid md:grid-cols p-4 gap-4 */}
          <Barchart className='h h-96'/>
          {/* <RecentOrders/> */}
        </div>
      </main>
    </>
  )
}