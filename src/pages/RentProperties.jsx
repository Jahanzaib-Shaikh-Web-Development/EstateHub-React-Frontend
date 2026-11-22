import PageHeader from '../components/PageHeader'
import PropertyBrowser from '../components/PropertyBrowser'

export default function RentProperties() {
  return (
    <>
      <PageHeader title="Rent Properties" sub="Apartments, houses, shops and offices for rent" />
      <section className="container py-5"><PropertyBrowser purpose="rent" /></section>
    </>
  )
}
