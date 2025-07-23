const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()             
    .replace(/\s+/g, "")       
    .replace(/[^\w-]+/g, "");  
};

export default generateSlug;
