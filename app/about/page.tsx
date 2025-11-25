export default function About() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-10">
          About Corban Technologies
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed">
          Founded and built in Nairobi, we’re a team of Kenyan software
          engineers obsessed with solving real financial problems using
          world-class technology.
        </p>
        <p className="mt-8 text-lg text-slate-400">
          From rural SACCOs to fast-growing SMEs — we deliver secure, scalable
          systems that work even in low-bandwidth environments across East
          Africa.
        </p>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {["2019 Founded", "50+ Clients", "7 Live SACCOs", "100% Kenyan"].map(
            (stat) => (
              <div key={stat}>
                <p className="text-4xl font-bold text-teal-500">
                  {stat.split(" ")[0]}
                </p>
                <p className="text-slate-400">
                  {stat.split(" ").slice(1).join(" ")}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
