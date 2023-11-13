const axios = require('axios');

const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

async function dataFromServer(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to filter data based on month
function filterDataByMonth(data, month) {
  const filteredData = data.filter(product => {
    const saleDate = new Date(product.dateOfSale);
    return saleDate.getMonth() + 1 === month; // JavaScript months are zero-based
  });

  return filteredData;
}

const getCategoriesPieChart = async (req, res) => {
  try {
    const products = await dataFromServer(url);

    const categoryCountsByMonth = {};

    // Loop through all months
    for (let month = 1; month <= 12; month++) {
      const monthlyData = filterDataByMonth(products, month);

      const categoryCounts = {};

      // Count items in each category for the current month
      monthlyData.forEach(product => {
        const category = product.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      // Save the category counts for the current month
      categoryCountsByMonth[month] = categoryCounts;
    }

    res.json(categoryCountsByMonth);

  } catch (error) {
    console.error('Error in getCategoriesPieChart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCategoriesPieChart };
