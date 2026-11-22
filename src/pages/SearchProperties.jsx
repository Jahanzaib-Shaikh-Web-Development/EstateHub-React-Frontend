import PageHeader from '../components/PageHeader'
import PropertyBrowser from '../components/PropertyBrowser'

export default function SearchProperties() {
  return (
    <>
      <PageHeader title="Advanced Property Search" sub="Refine by location, type, price, bedrooms and more" />
      <section className="container py-5"><PropertyBrowser advanced /></section>
    </>
  )
}
