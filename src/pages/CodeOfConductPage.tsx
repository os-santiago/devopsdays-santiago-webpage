import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CodeOfConductPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20 px-4">
      <article className="toy max-w-3xl mx-auto space-y-8 bg-card p-6 sm:p-10 text-muted-foreground leading-relaxed">
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground text-center">
          Código de <span className="text-land-red">conducta</span>
        </h1>

        <p>
          Todos los asistentes, oradores, patrocinadores y voluntarios en DevOpsDays Santiago 2027 deben estar de acuerdo con el siguiente código de conducta. Los organizadores harán cumplir este código durante todo el evento. Esperamos la cooperación de todos los participantes para ayudar a garantizar un entorno seguro para todos.
        </p>

        <section aria-labelledby="quick-version" className="space-y-4">
          <h2 id="quick-version" lang="en" className="text-2xl font-bold text-foreground">The Quick Version</h2>
          <p>
            Nuestra conferencia se dedica a proporcionar una experiencia de conferencia sin acoso para todos, independientemente de su género, identidad y expresión de género, edad, orientación sexual, discapacidad, apariencia física, tamaño corporal, raza, etnia, religión (o falta de ella) o tecnología o tecnología opciones. No toleramos el acoso de los participantes de la conferencia en ninguna forma. El lenguaje y las imágenes sexuales no son apropiados para ningún lugar de conferencias, incluidas conversaciones, talleres, fiestas, Twitter y otros medios en línea. Los participantes de la conferencia que violen estas reglas pueden ser sancionados o expulsados de la conferencia sin un reembolso a discreción de los organizadores de la conferencia.
          </p>
        </section>

        <section aria-labelledby="less-quick-version" className="space-y-4">
          <h2 id="less-quick-version" lang="en" className="text-2xl font-bold text-foreground">The Less Quick Version</h2>
          <p>
            El acoso incluye comentarios verbales ofensivos relacionados con género, identidad y expresión de género, edad, orientación sexual, discapacidad, apariencia física, tamaño corporal, raza, etnia, religión, opciones tecnológicas, imágenes sexuales en espacios públicos, intimidación deliberada, acoso, seguimiento, hostigamiento fotografía o grabación, interrupción sostenida de conversaciones u otros eventos, contacto físico inapropiado y atención sexual desagradable. Se espera que los participantes pidieran detener cualquier comportamiento de acosión cumplan de inmediato.
          </p>
          <p>
            Los patrocinadores también están sujetos a la política contra el acoso. En particular, los patrocinadores no deben usar imágenes sexualizadas, actividades u otro material. El personal del stand (incluidos los voluntarios) no debe usar ropa/uniformes/disfraces sexualizados, ni crear un ambiente sexualizado.
          </p>
          <p>
            Si un participante se involucra en el comportamiento de hostigamiento, los organizadores de la conferencia pueden tomar cualquier acción que considere apropiada, incluida la advertencia del delincuente o la expulsión de la conferencia sin reembolso.
          </p>
          <p>
            Si está siendo acosado, observe que alguien más está siendo acosado o tiene cualquier otra inquietud, comuníquese con un miembro del personal de la conferencia de inmediato.
          </p>
          <p>
            El personal de la conferencia puede ser identificado por distintas insignias de personal. El personal de la conferencia estará encantado de ayudar a los participantes a contactar a la seguridad del hotel/lugar o a la aplicación de la ley local, proporcionar escoltas o ayudar a aquellos que experimentan acoso para que se sientan seguros durante la conferencia. Valoramos su asistencia.
          </p>
          <p>
            Esperamos que los participantes sigan estas reglas en los lugares de conferencia y talleres y eventos sociales relacionados con la conferencia.
          </p>
        </section>

        <p lang="en" className="border-t border-border pt-6 text-sm">
          The DevOpsDays Santiago 2027 Code of Conduct is based on{" "}
          <a href="https://confcodeofconduct.com/" className="text-primary underline underline-offset-4">confcodeofconduct.com</a>.
        </p>
      </article>
    </main>
    <Footer />
  </div>
);

export default CodeOfConductPage;
