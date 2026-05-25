
export const syncToGoogleSheets = async (data, category, webAppUrl) => {
  if (!webAppUrl) {
    console.error("Google Apps Script Web App URL is not provided.");
    return;
  }

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors", // Necessary for Google Apps Script Web App
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "syncRow",
        category: category,
        record: data,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error syncing to Google Sheets:", error);
    throw error;
  }
};

export const syncAllToGoogleSheets = async (records, category, webAppUrl) => {
  if (!webAppUrl) {
    console.error("Google Apps Script Web App URL is not provided.");
    return;
  }

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "syncAll",
        category: category,
        records: records,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error syncing all to Google Sheets:", error);
    throw error;
  }
};
