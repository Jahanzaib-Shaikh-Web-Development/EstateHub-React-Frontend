import PageHeader from '../components/PageHeader'
import AgentCard from '../components/AgentCard'
import { agents } from '../data/agents'

export default function Agents() {
  return (
    <>
      <PageHeader title="Our Real Estate Agents" sub="Experienced professionals ready to help you" />
      <section className="container py-5">
        <div className="row g-4">{agents.map((a) => <div key={a.id} className="col-sm-6 col-lg-4"><AgentCard a={a} /></div>)}</div>
      </section>
    </>
  )
}
