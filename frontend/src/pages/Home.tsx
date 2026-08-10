import '../styles/Home.css'
import Hero from '../components/Hero'
import {type StoryProps } from "../data/StoryProps"
import StoryMarquee from '../components/StoryMarquee'
import InteractiveGlobe from '../components/Globe'
import Quote from '../components/Quote'
import LatestAdventure from '../components/LatestAdventure'
import LogIn from '../components/LogIn'



function Home({
    travels,
    isAuthor,
    setIsAuthor
}: {
    travels: StoryProps[];
    isAuthor: boolean | null;
    setIsAuthor: React.Dispatch<React.SetStateAction<boolean | null>> ;
}){
return (
    <>
      <div className="hero">
        <Hero />
      </div>
       {isAuthor === null && (
                <LogIn setIsAuthor={setIsAuthor} />
            )}

      <StoryMarquee stories={travels} />
      <div className='QuoteAndAdventure'>
        
        <Quote />
        <LatestAdventure stories= {travels} />
      </div>
      <InteractiveGlobe typedStories={travels}/>
      <button style={{
        position: "fixed", 
        background: "#17777a", 
        width: "50px",
        height: "50px",
        bottom: "20px",
        right: "20px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center"
        }} onClick={() => setIsAuthor(null)}><img style={{width: "50px"}}src= "./src/assets/write.png" /></button>
      
    </>
  )
}

export default Home;
