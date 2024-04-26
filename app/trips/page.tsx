'use client';

import Link from 'next/link'
import { Layout } from '@/components/layout'
import { gql, useQuery } from '@apollo/client';

const GET_TRIPS = gql`
  query GetTrips {
    trips {
      id
      tripTitle
      tripSummary
    }
  }
`;

export default function Trips() {
    const { data, loading, error } = useQuery(GET_TRIPS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { trips } = data;

    return (
        <Layout>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        All Trips
                    </h2>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    {/* <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
            Edit
            </button> */}
                    <Link href="/new-trip">
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            New Trip
                        </button>
                    </Link>
                </div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 mt-10">
                {trips.map((trip: any) => {
                    const { id, tripTitle, tripSummary } = trip;

                    return (
                        <li key={id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                {/* <img
                    src={client.imageUrl}
                    alt={client.name}
                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                /> */}
                                <div className="text-sm font-medium leading-6 text-gray-900">{tripTitle}</div>
                            </div>
                            {/* <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Last invoice</dt>
                    <dd className="text-gray-700">
                    <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time>
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Amount</dt>
                    <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{client.lastInvoice.amount}</div>
                    <div
                        className={classNames(
                        statuses[client.lastInvoice.status],
                        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                        )}
                    >
                        {client.lastInvoice.status}
                    </div>
                    </dd>
                </div>
                </dl> */}
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
}