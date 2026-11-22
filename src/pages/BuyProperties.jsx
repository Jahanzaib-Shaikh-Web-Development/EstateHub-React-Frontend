import PageHeader from '../components/PageHeader'
import PropertyBrowser from '../components/PropertyBrowser'

export default function BuyProperties() {
  return (
    <>
      <PageHeader title="Buy Properties" sub="Find your perfect home or investment" />
      <section className="container py-5"><PropertyBrowser purpose="sale" /></section>
    </>
  )
}
