const getTonerColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-300';
    case 'Cyan':
      return 'bg-cyan-200';
    case 'Magenta':
      return 'bg-fuchsia-200';
    case 'Yellow':
      return 'bg-yellow-200';

    default:
      return 'bg-transparent';
  }
};
export default getTonerColor;
