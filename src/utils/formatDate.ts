const formatDate = (date: string, includeTime: boolean = true): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
    if (includeTime) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    }
  
    return new Date(date).toLocaleString('pt-BR', options);
  };

export default formatDate