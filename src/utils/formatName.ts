const formatName = (name: string, includeTwoWords: boolean = false): string => {
    const words = name.split(' ');
  
    const formattedWords = includeTwoWords ? words.slice(0, 2) : words;
  
    const formattedName = formattedWords
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    return formattedName;
  };

  export default formatName;