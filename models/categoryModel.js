let categories = [
  {
    id: 1,
    name: "Study",
  },
  {
    id: 2,
    name: "Work",
  },
];

let nextCategoryId = 3;

function getAllCategories() {
  return categories;
}

function getCategoryById(id) {
  return categories.find((category) => category.id === id);
}

function createCategory(name) {
  const newCategory = {
    id: nextCategoryId++,
    name,
  };

  categories.push(newCategory);
  return newCategory;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};