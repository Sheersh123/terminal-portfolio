import NavBar from "@/components/NavBar";
import TerminalHeader from "@/components/TerminalHeader";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanlines" id="top">
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-12 space-y-8">
        <TerminalHeader />

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="education">
          <EducationSection />
        </section>

        <section id="terminal">
          <div className="space-y-2">
            <p className="text-terminal-gray text-xs font-mono">
              💡 Try typing commands below — type <span className="text-primary">'help'</span> to get started
            </p>
            <InteractiveTerminal />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
