import TravelCard from './travelCard'
import { type StoryProps } from '../data/StoryProps';
import '../styles/StoryMarquee.css'

export default function StoryMarquee( { stories }: { stories: StoryProps[] } ) {
  return (
    <section className="marquee-section">
      <div className="marquee-fade-left" />
      <div className="marquee-fade-right" />

      <div className="marquee-wrap">
        <div className="marquee-track">
          {/* rendered twice back-to-back so the loop resets seamlessly */}
          {[...stories, ...stories].map((story, i) => (
            story.image && story.image.length > 0 && (
              <TravelCard
                  key={`${story.title}-${i}`}
                  {...story}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
}