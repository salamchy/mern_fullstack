import DealsImg from "../assets/deals.png"

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={DealsImg} alt="" />
      </div>

      <div className="deals__content">
        <h5 className="uppercase">Get Up to 20% Discount</h5>
        <h4>Deals of This Month</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quia repellat odit doloribus cumque animi recusandae sunt eaque culpa vitae, ipsum error rerum dicta nemo molestias inventore. Iure neque et adipisci dicta vero deleniti dolorem reiciendis expedita, beatae quasi consectetur!</p>

        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>18</h4>
            <p>Min</p>
          </div>
          <div className="deals__countdown__card">
            <h4>35</h4>
            <p>Sec</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default DealsSection