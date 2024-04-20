import { Layout } from '@/components/layout'

export default function NewTrip() {
    return (
        <Layout>
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        New Trip
                    </h2>
                </div>
            </div>
        </Layout>
    )
}