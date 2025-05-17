export const getUniqueCity = (DATA) => {
    const allCity = DATA.map((event: { City: any; }) => event.City);
    const uniqueCity = [...new Set(allCity)];
    return uniqueCity;
};
export const getUniqueCategory = (DATA) => {
    const categoryMap = new Map();
  
    DATA.forEach((event: any) => {
      if (!categoryMap.has(event.CategoryName)) {
        categoryMap.set(event.CategoryName, {
          CategoryName: event.CategoryName,
          CategoryImage: event.CategoryImage,
        });
      }
    });
  
    return Array.from(categoryMap.values());
  };

  export const sortDataByName = (data) => {
    return [...data].sort((a, b) => {
        if (a.Name < b.Name) return -1;
        if (a.Name > b.Name) return 1;
        return 0;
    });
};