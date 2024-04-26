'use client';

import { Layout } from '@/components/layout'
import { gql, useQuery } from '@apollo/client';

const GET_TRIP = gql`
  query GetTrip($id: uuid!) {
    trips_by_pk(id: $id) {
      id
      tripTitle
      tripSummary
    }
  }
`;

export default function Trip({ params }: { params: { id: string } }) {
    const { data, loading, error } = useQuery(GET_TRIP, {
        variables: { id: params.id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { trips_by_pk: trip } = data;

    return (
        <Layout>
            <div>
                <h1>{trip.tripTitle}</h1>
            </div>
        </Layout>
    )
}