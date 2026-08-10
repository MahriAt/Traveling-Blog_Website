import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import stories from "../../travel-stories.json";
import { type StoryProps } from "../data/StoryProps";

interface CountryFeature {
  type: "Feature";
  properties: { name: string };
  geometry: any;
}


const GEOJSON_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const AUTO_ROTATE_SPEED = 0.05; // degrees per frame
const RESUME_AUTOROTATE_DELAY = 3000; // ms after last interaction
const DRAG_SENSITIVITY = 350; // higher = slower drag rotation

export default function InteractiveGlobe({ typedStories }: { typedStories: StoryProps[] } ) {
  const storiesByCountry = new Map(typedStories.map((story) => [story.country, story]));
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<StoryProps | null>(null);
  const selectedRef = useRef<string | null>(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    if (!svgRef.current) return;
    let cancelled = false;
    let svg = d3.select(svgRef.current);
    svg.selectAll("*").remove()

    const width = 600;
    const height = 600;

    svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);

    const projection = d3
      .geoOrthographic()
      .scale(260)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    let pathGen = d3.geoPath(projection);

    // Radial gradient so the sphere reads as lit/solid instead of a flat disc
    const defs = svg.append("defs");
    const gradient = defs
      .append("radialGradient")
      .attr("id", "globe-shading")
      .attr("cx", "35%")
      .attr("cy", "35%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3A4250");
    gradient.append("stop").attr("offset", "60%").attr("stop-color", "#242A33");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#12151A");

    // Solid sphere body — this is what fills the "hollow" gap
    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .attr("fill", "url(#globe-shading)")
      .attr("stroke", "#0C0E11")
      .attr("stroke-width", 1);

    // Graticule (lat/long grid lines) on top of the sphere body
    const graticule = d3.geoGraticule();
    const graticulePath = svg
      .append("path")
      .datum(graticule())
      .attr("fill", "none")
      .attr("stroke", "#3A4250")
      .attr("stroke-width", 0.4)
      .attr("stroke-opacity", 0.5)
      .attr("d", pathGen as any);

    let countriesGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
    let autoRotateTimer: number | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    function redraw() {
      pathGen = d3.geoPath(projection);
      graticulePath.attr("d", pathGen as any);
      if (countriesGroup) {
        countriesGroup.selectAll<SVGPathElement, CountryFeature>("path").attr("d", pathGen as any);
      }
    }

    function startAutoRotate() {
      stopAutoRotate();
      autoRotateTimer = window.setInterval(() => {
        const [lambda, phi] = projection.rotate();
        projection.rotate([lambda + AUTO_ROTATE_SPEED, phi]);
        redraw();
      }, 30);
    }

    function stopAutoRotate() {
      if (autoRotateTimer !== null) {
        window.clearInterval(autoRotateTimer);
        autoRotateTimer = null;
      }
    }

    function onInteractionEnd() {
      stopAutoRotate();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(startAutoRotate, RESUME_AUTOROTATE_DELAY);
    }

    d3.json<{ features: CountryFeature[] }>(GEOJSON_URL).then((data) => {
      if (!data || cancelled) return;

      countriesGroup = svg.append("g");

      countriesGroup
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", pathGen as any)
        .attr("fill", "#3A4250")
        .attr("stroke", "#171B21")
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .on("mouseenter", function (_event, d) {
          d3.select(this).attr("fill", "#D9A441");
          setHovered(d.properties.name);
        })
        .on("mouseleave", function (_event, d) {
          const isSelected = d.properties.name === selectedRef.current;
          d3.select(this).attr("fill", isSelected ? "#D9A441" : "#3A4250");
          setHovered(null);
        })
        .on("click", (_event, d) => {
            const countryName = d.properties.name;
            setSelected(countryName);       // keeps your existing highlight logic working
            const story = storiesByCountry.get(countryName);
            setSelectedStory(story ?? null);

        });

      setLoading(false);
      startAutoRotate();
    });

    // clickDistance() lets a plain click still register on a country
    // even though the whole svg has a drag handler attached
    const drag = d3
      .drag<SVGSVGElement, unknown>()
      .clickDistance(10)
      .on("start", onInteractionEnd)
      .on("drag", (event) => {
        const [lambda, phi] = projection.rotate();
        projection.rotate([
          lambda + event.dx / DRAG_SENSITIVITY * 60,
          phi - event.dy / DRAG_SENSITIVITY * 60,
        ]);
        redraw();
      });

    svg.call(drag as any);

    return () => {
      cancelled = true;
      stopAutoRotate();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      svg.selectAll("*").remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="globe-container">
      <svg ref={svgRef} style={{ width: "50%", height: 480, touchAction: "none" }} />

      {loading && (
        <p style={{ color: "#9AA3AF", fontSize: 14, marginTop: 12 }}>Loading globe…</p>
      )}

      <div className="globe-container-story">
        {selectedStory ? (
            <div style={{ textAlign: "center", margin: 20}}>
                <h1 style={{color: "#fff", fontFamily:  "'Times New Roman', Times, serif",}}>{selectedStory.country}</h1>
            <h3 style={{ margin: 0, fontSize: 22, textTransform: "uppercase" }}>
                {selectedStory.title}
            </h3>
            <p style={{ maxHeight:"350px", marginTop: 8, fontSize: 14, color: "#9AA3AF",  overflow: "hidden"}}>
                {selectedStory.description}
            </p>
            </div>
        ) : selected ? (
            <span>{selected} <br />no story yet</span>
        ) : ("Click a country to read my adventures.")}
      </div>
    </div>

  );
}
