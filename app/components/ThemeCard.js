// Composant ThemeCard : carte individuelle pour une thématique financière
// Reçoit un titre, une description et une icône en props

export default function ThemeCard({ icon, title, description }) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all">

      {/* Icône de la thématique */}
      <div className="text-3xl mb-4">{icon}</div>

      {/* Titre de la thématique */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Description courte */}
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

    </div>
  );
}
