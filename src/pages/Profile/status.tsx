interface StatusElementProps {
  color: string;
  iconPath: string;
  textContent: string;
  opacity: number;
}

const StatusElement: React.FC<StatusElementProps> = ({ color, iconPath, textContent, opacity }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 text-${color}-500 rounded-full gap-x-2 bg-${color}-100/${opacity} dark:bg-gray-800`}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={iconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <h2 className="text-sm font-normal">{textContent}</h2>
    </div>
  );
}

// Example usage:
export const NonValide = () => <StatusElement color="red" iconPath="M9 3L3 9M3 3L9 9" textContent="Non validé" opacity={60} />;
export const Rattrapage = () => <StatusElement color="grey" iconPath="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10" textContent="Rattrapage" opacity={60} />;
export const Valide = () => <StatusElement color="emerald" iconPath="M10 3L4.5 8.5L2 6" textContent="Validé" opacity={60} />;
