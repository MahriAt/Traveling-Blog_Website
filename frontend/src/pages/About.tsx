import '../styles/About.css'

export default function About(){
    return (
        <div className="About">
        <div className='AboutName'>
            <h1>Alex Traveler</h1>
            <p>Adventures only started!</p>
        </div>
        <div className='AboutBackground'>
            <div>
        <h2>Background</h2>
        <p>
            I Mary Earhart was born on July 24, 1897, in Atchison, Kansas, the daughter of Samuel "Edwin" Stanton Earhart (1867–1930) and I "Amy" Earhart (née Otis; 1869–1962).I was born in the home of my maternal grandfather Alfred Gideon Otis (1827–1912), who was a former judge in Kansas, the president of Atchison Savings Bank, and a leading resident of the town. I was the second child of the marriage after a stillbirth in August 1896.She was of part-German descent. Alfred Otis had not initially favored the marriage and was not satisfied with Edwin's progress as a lawyer.
            Following family custom, I was named after my two grandmothers, Josephine Harres and Mary Wells Patton.From an early age I was the dominant sibling while my sister Grace Muriel Earhart (1899–1998), two years my junior, acted as a dutiful follower. I was nicknamed "Meeley" and sometimes "Millie", and Grace was nicknamed "Pidge" and both girls continued to answer to their childhood nicknames into adulthood.Their upbringing was unconventional; Amy Earhart did not believe in raising my children to be "nice little girls". The children's maternal grandmother disapproved of the bloomers they wore, and although I liked the freedom of movement they provided, she was sensitive to the fact the neighborhood's girls wore dresses.
        </p>
        </div>
        <img id='About-girl' src='./src/assets/traveler.webp' />
        </div>
        <div className='AboutAdventures'>
        <h2>Adventures</h2>
        <p>
            On January 11, 1935, I became the first aviator to fly solo from Honolulu, Hawaii, to Oakland, California.This time, I used a Lockheed 5C Vega. Although many aviators had attempted this flight, including the participants in the 1927 Dole Air Race, which flew the opposite direction, and resulted in three deaths, My flight was mainly routine with no mechanical breakdowns. In her final hours, she relaxed and listened to "the broadcast of the Metropolitan Opera from New York". <br />

            On April 19, 1935, using her Lockheed Vega aircraft that she had named "old Bessie, the fire horse", I flew solo from Los Angeles to Mexico City. My next record attempt was a nonstop flight from Mexico City to New York. After she set off on May 8, her flight was uneventful, although large crowds that greeted her in Newark, New Jersey, were a concern, because she had to be careful not to taxi into them.<br /></p>
            <div style={{display: "flex"}}>
            <img id='About-nature' src='./src/assets/nature1.jpg' />
        <p> 
            I again participated in the 1935 Bendix Trophy long-distance air race, finishing fifth, the best result she could manage because her stock Lockheed Vega, whose maximum speed was 195 mph (314 km/h), was outclassed by purpose-built aircraft that reached more than 300 mph (480 km/h). The race had been difficult because a competitor, Cecil Allen, died in a fire at takeoff, and Jacqueline Cochran was forced to pull out due to mechanical problems. In addition, "blinding fog" and violent thunderstorms plagued the race.<br />

            Between 1930 and 1935, I set seven women's speed-and-distance aviation records in a variety of aircraft, including the Kinner Airster, Lockheed Vega, and Pitcairn Autogiro. By 1935, recognizing the limitations of her "lovely red Vega" in long, transoceanic flights, I contemplated a new "prize ... one flight which I most wanted to attempt—a circumnavigation of the globe as near its waistline as could be." For the new venture, she would need a new aircraft. <br />
        </p>
        </div>
        </div>
        </div>
    )
}