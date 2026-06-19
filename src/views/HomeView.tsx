import NavBar from "../components/common/NavBar"
import CTA from "../components/landing/CTA"
import Feat from "../components/landing/Feat"
import Footer from "../components/landing/Footer"
import Hero from "../components/landing/Hero"
import Metrics from "../components/landing/Metrics"
import Ratings from "../components/landing/Ratings"

const HomeView = () => {
    return (
        <div>
            <NavBar></NavBar>

            <Hero></Hero>

            <Feat></Feat>

            <Metrics></Metrics>

            <Ratings></Ratings>

            <CTA></CTA>

            <Footer></Footer>
        </div>
    )
}

export default HomeView