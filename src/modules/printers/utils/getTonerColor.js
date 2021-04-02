const getTonerColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-200 text-gray-900';
    case 'Cyan':
      return 'bg-blue-200 text-blue-900';
    case 'Magenta':
      return 'bg-purple-200 text-purple-900';
    case 'Yellow':
      return 'bg-yellow-200 text-yellow-900';

    default:
      return 'bg-transparent';
  }
};
export default getTonerColor;
