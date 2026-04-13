import Script from "next/script";

const MODEL_PATH =
  "/models/Meshy_AI_Scrap_Metal_Automaton_biped_Character_output.glb";

const RobotScroll = () => {
  return (
    <section className="relative z-20 px-6 sm:px-12 py-16 sm:py-20" id="interactive-robot">
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-[#F5F5F5] text-2xl sm:text-4xl font-semibold drop-shadow-[0_0_12px_rgba(0,128,128,0.65)]">
            Interactive Robot
          </h2>
          <p className="mt-2 text-[#C9E7E7] text-sm sm:text-base">
            Drag to rotate, pinch or wheel to zoom
          </p>
        </div>

        <div className="mt-8 relative h-[62vh] min-h-[420px] sm:min-h-[520px] rounded-3xl overflow-hidden border border-[#008080]/40 bg-[radial-gradient(circle_at_50%_35%,rgba(0,128,128,0.16),rgba(0,0,41,0.88)_70%)] shadow-[0_24px_60px_rgba(0,0,41,0.7)]">
          <model-viewer
            src={MODEL_PATH}
            alt="3D interactive robot"
            camera-controls
            touch-action="pan-y"
            interaction-prompt="auto"
            shadow-intensity="1"
            exposure="1"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          >
          </model-viewer>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,128,128,0.08),rgba(0,0,41,0.45)_72%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-6 sm:bottom-8 px-4 text-center">
            <p className="text-[#F5F5F5] text-[11px] sm:text-xs tracking-[0.14em] uppercase">
              Interactive view only - no auto animation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RobotScroll;