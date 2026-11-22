import PageHeader from '../components/PageHeader'
import PropertyBrowser from '../components/PropertyBrowser'

export default function PropertyListings() {
  return (
    <>
      <PageHeader title="Property Listings" sub="Browse all homes, plots and commercial spaces" />
      <section className="container py-5"><PropertyBrowser /></section>
    </>
  )
}
