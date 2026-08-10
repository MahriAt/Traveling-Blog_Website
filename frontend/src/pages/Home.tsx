import '../styles/Home.css'
import Hero from '../components/Hero'
import {type StoryProps } from "../data/StoryProps"
import StoryMarquee from '../components/StoryMarquee'
import InteractiveGlobe from '../components/Globe'
import Quote from '../components/Quote'
import LatestAdventure from '../components/LatestAdventure'

import travelStories from '../../travel-stories.json'
const stories = travelStories as StoryProps[];

function Home( { travels }: { travels: StoryProps[] }){
return (
    <>
      <div className="hero">
        <Hero />
      </div>
      
      <StoryMarquee stories={travels} />
      <div className='QuoteAndAdventure'>
        
        <Quote />
        <LatestAdventure stories= {travels} />
      </div>
      <InteractiveGlobe typedStories={travels}/>
      
      
    </>
  )
}

export default Home;
