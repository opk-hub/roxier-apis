const axios = require('axios');

const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

async function dataFromServer(url) {
  try {
    const response = await axios.get(url);
    // console.log(response.data);
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

const getTransactions = async (req, res) => {
  try {
    const products = await dataFromServer(url);

    // Function to get data for each month
    function getDataForEachMonth(data) {
      const monthlyData = [];

      // Loop through each month (assuming the data spans multiple years)
      for (let month = 1; month <= 12; month++) {
        const filteredData = filterDataByMonth(data, month);
        // Concatenate the arrays for each month
        monthlyData.push(...filteredData);
      }

      return monthlyData;
    }

    // Example: Get data for each month in a single array
    const monthlyData = getDataForEachMonth(products);
    // console.log(monthlyData);
    // Log data for each month
    // for (const month in monthlyData) {
    //   console.log(`Data for Month ${month}:`, monthlyData[month]);
    // }

    res.json(monthlyData);

  } catch (error) {
    console.error('Error in getTransactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Call the function


const getStatistics = async (req, res) => {
  try {
    const products = await dataFromServer(url);

    // Function to calculate sales statistics
    function calculateSalesStatistics(data) {
      let totalSaleAmount = 0;
      let totalSoldItems = 0;
      let totalNotSoldItems = 0;

      data.forEach(product => {
        if (product.sold) {
          totalSaleAmount += product.price;
          totalSoldItems += 1;
        } else {
          totalNotSoldItems += 1;
        }
      });

      return {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
      };
    }

    // Function to get sales statistics for each month
    function getStatisticsForEachMonth(data) {
      const monthlyStatistics = {};

      // Loop through each month (assuming the data spans multiple years)
      for (let month = 1; month <= 12; month++) {
        const monthlyData = filterDataByMonth(data, month);
        monthlyStatistics[month] = calculateSalesStatistics(monthlyData);
      }

      return monthlyStatistics;
    }

    // Example: Get sales statistics for each month
    const monthlyStatistics = getStatisticsForEachMonth(products);
    // console.log(monthlyStatistics);
    // // Log statistics for each month
    // for (const month in monthlyStatistics) {
    //   console.log(`Statistics for Month ${month}:`, monthlyStatistics[month]);
    // }

    res.json(monthlyStatistics);

  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// const getPriceRanges = async (req, res) => {
//   try {
//     const products = await dataFromServer(url);

//     // Function to calculate price ranges
//     function calculatePriceRanges(data) {
//       const priceRanges = {
//         '0-100': 0,
//         '101-200': 0,
//         '201-300': 0,
//         '301-400': 0,
//         '401-500': 0,
//         '501-600': 0,
//         '601-700': 0,
//         '701-800': 0,
//         '801-900': 0,
//         '901-above': 0,
//       };

//       data.forEach(product => {
//         const price = product.price;

//         if (price <= 100) {
//           priceRanges['0-100'] += 1;
//         } else if (price <= 200) {
//           priceRanges['101-200'] += 1;
//         } else if (price <= 300) {
//           priceRanges['201-300'] += 1;
//         } else if (price <= 400) {
//           priceRanges['301-400'] += 1;
//         } else if (price <= 500) {
//           priceRanges['401-500'] += 1;
//         } else if (price <= 600) {
//           priceRanges['501-600'] += 1;
//         } else if (price <= 700) {
//           priceRanges['601-700'] += 1;
//         } else if (price <= 800) {
//           priceRanges['701-800'] += 1;
//         } else if (price <= 900) {
//           priceRanges['801-900'] += 1;
//         } else {
//           priceRanges['901-above'] += 1;
//         }
//       });

//       return priceRanges;
//     }

//     // Function to get price ranges for each month
//     function getPriceRangesForEachMonth(data) {
//       const monthlyPriceRanges = {};

//       // Loop through each month (assuming the data spans multiple years)
//       for (let month = 1; month <= 12; month++) {
//         const monthlyData = filterDataByMonth(data, month);
//         monthlyPriceRanges[month] = calculatePriceRanges(monthlyData);
//       }

//       return monthlyPriceRanges;
//     }

//     // Example: Get price ranges for each month
//     const monthlyPriceRanges = getPriceRangesForEachMonth(products);
//     // console.log(monthlyPriceRanges);
//     // Log price ranges for each month
//     // for (const month in monthlyPriceRanges) {
//     //   console.log(`Price Ranges for Month ${month}:`, monthlyPriceRanges[month]);
//     // }
//     res.json(monthlyPriceRanges);

//   } catch (error) {
//     console.error('Error in getPriceRanges:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getPriceRanges = async (req, res) => {
  try {
    const products = await dataFromServer(url);

    // Function to calculate price ranges
    function calculatePriceRanges(data) {
      const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0,
      };

      data.forEach((product) => {
        const price = product.price;

        if (price <= 100) {
          priceRanges['0-100'] += 1;
        } else if (price <= 200) {
          priceRanges['101-200'] += 1;
        } else if (price <= 300) {
          priceRanges['201-300'] += 1;
        } else if (price <= 400) {
          priceRanges['301-400'] += 1;
        } else if (price <= 500) {
          priceRanges['401-500'] += 1;
        } else if (price <= 600) {
          priceRanges['501-600'] += 1;
        } else if (price <= 700) {
          priceRanges['601-700'] += 1;
        } else if (price <= 800) {
          priceRanges['701-800'] += 1;
        } else if (price <= 900) {
          priceRanges['801-900'] += 1;
        } else {
          priceRanges['901-above'] += 1;
        }
      });

      return priceRanges;
    }

    // Function to get price ranges for each month
    function getPriceRangesForEachMonth(data) {
      const monthlyPriceRanges = [];

      // Loop through each month (assuming the data spans multiple years)
      for (let month = 1; month <= 12; month++) {
        const monthlyData = filterDataByMonth(data, month);
        const priceRanges = calculatePriceRanges(monthlyData);
        monthlyPriceRanges.push(priceRanges);
      }

      return monthlyPriceRanges;
    }

    // Example: Get price ranges for each month
    const monthlyPriceRanges = getPriceRangesForEachMonth(products);
    res.json(monthlyPriceRanges);

  } catch (error) {
    console.error('Error in getPriceRanges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getTransactions, getStatistics, getPriceRanges };
