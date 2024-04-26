'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Layout } from '@/components/layout'
import { useRouter } from 'next/navigation'

const CREATE_TRIP = gql`
    mutation CreateTrip($input: trips_insert_input!) {
        insert_trips_one(object: $input) {
            id
            tripTitle
            tripSummary
        }
    }
`;

export default function NewTrip() {
    // state
    const [tripData, setTripData] = useState({
        tripTitle: '',
        tripSummary: ''
    });

    // hooks
    const router = useRouter()

    // mutations
    const [createTrip, { data, loading, error }] = useMutation(CREATE_TRIP);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTripData({
            ...tripData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const createTripResponse = await createTrip({
                variables: {
                    input: tripData
                }
            });

            const { data: { insert_trips_one } } = createTripResponse;
            router.push(`/trip/${insert_trips_one.id}`)

        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Layout>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                New Trip
            </h2>
            <form
                className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl px-4 py-6 sm:p-8 mt-10'
                onSubmit={handleSubmit}
            >
                <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Trip Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="tripTitle"
                                        id="tripTitle"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                        placeholder="Blaire's Birthday Trip"
                                        onChange={handleFieldChange}
                                        value={tripData.tripTitle}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="tripSummary"
                                    name="tripSummary"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleFieldChange}
                                    value={tripData.tripSummary}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">A quick note about the trip.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Layout>
    )
}